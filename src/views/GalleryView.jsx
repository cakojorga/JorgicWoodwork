"use client";

import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import classes from "./Galerija.module.css";
import { lockScroll, unlockScroll } from "../utility/smoothScroll";

// While the full-size photo loads, the lightbox already shows the thumbnail
// (cached from the grid) blown up and blurred, at the photo's real shape, with
// a spinner on top; the sharp photo then fades in over it.
function LightboxImage({ thumb, src, alt, onError }) {
  const [ratio, setRatio] = useState(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={classes.lightboxFrame}
      style={ratio ? { aspectRatio: ratio, width: `min(90vw, calc(90vh * ${ratio}))` } : undefined}
    >
      {thumb && (
        <img
          src={thumb}
          alt=""
          aria-hidden="true"
          className={`${classes.lightboxThumb} ${loaded ? classes.lightboxHidden : ""}`}
          onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
        />
      )}
      {!loaded && (
        <span className={classes.lightboxSpinner} role="status" aria-label="Učitavanje slike" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${classes.modalImage} ${classes.lightboxFull} ${loaded ? classes.lightboxShown : ""}`}
        onLoad={(e) => {
          // The photo's exact shape (the thumbnail's can differ by a rounding pixel)
          setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight);
          setLoaded(true);
        }}
        onError={onError}
      />
    </div>
  );
}

// Photo grid, lightbox and pagination for one gallery category.
// The page's photos are loaded on the server (lib/galleryPage.jsx),
// so they are already in the HTML for visitors and search engines.
export default function GalleryView({ category, images, currentPage, totalPages, startIndex, pageTitle }) {
  // Next.js 16 doesn't refresh <title> when only ?page changes after an
  // in-app navigation; the server HTML (what search engines read) is correct.
  useEffect(() => {
    if (pageTitle) document.title = pageTitle;
  }, [pageTitle]);

  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // Lightbox photos come resized from Next.js image optimisation; if that ever
  // fails (e.g. Firebase is slow to hand over the original), show the original.
  const [failedImage, setFailedImage] = useState(null);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const currentImages = images;

  const currentIndex = currentImages.findIndex((item) => item.original === selectedImage);

  const goNext = () => {
    if (currentImages.length === 0) return;

    const nextIndex = (currentIndex + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIndex].original);
  };

  const goPrev = () => {
    if (currentImages.length === 0) return;

    const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;

    setSelectedImage(currentImages[prevIndex].original);
  };

  const closeModal = () => setOpened(false);

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  useEffect(() => {
    if (!selectedImage) return;

    if (nextIndex < currentImages.length) {
      const nextImg = new Image();
      nextImg.src = currentImages[nextIndex].original;
    }

    if (prevIndex >= 0) {
      const prevImg = new Image();
      prevImg.src = currentImages[prevIndex].original;
    }
  }, [selectedImage, currentImages, currentIndex, nextIndex, prevIndex]);

  useEffect(() => {
    if (!opened) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Stop the page behind the lightbox from scrolling
  useEffect(() => {
    if (!opened) return;
    lockScroll();
    return unlockScroll;
  }, [opened]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  // Column count also comes from CSS media queries (Galerija.module.css),
  // so the server-rendered grid is already right before hydration.
  const theme = useTheme();
  const phoneview = useMediaQuery(theme.breakpoints.down("sm"));
  const tabletview = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const basePath = `/galerija/${category.slug}`;
  // Page 1 is the plain URL, later pages are /galerija/<slug>/<n> (static, prefetched)
  const pagePath = (page) => (page === 1 ? basePath : `${basePath}/${page}`);
  const imageLabel = (index) => `${category.title} – slika ${startIndex + index + 1}`;

  return (
    <div className="container">
      <div className={classes.pageSettings}>
        {opened && selectedImage && (
          <div
            className={classes.modal}
            role="dialog"
            aria-modal="true"
            aria-label={imageLabel(currentIndex)}
            onClick={(e) => {
              // Clicking the dark backdrop (not the image or buttons) closes it
              if (e.target === e.currentTarget) closeModal();
            }}
            data-lenis-prevent
          >
            <button className={classes.arrowButton} onClick={goPrev} aria-label="Prethodna slika">
              {"<"}
            </button>

            <div className={classes.modalContent} {...handlers}>
              <button
                className={classes.closeButton}
                onClick={closeModal}
                aria-label="Zatvori"
                autoFocus
              >
                X
              </button>
              <LightboxImage
                key={selectedImage}
                thumb={currentImages[currentIndex]?.thumb}
                src={
                  failedImage === selectedImage
                    ? currentImages[currentIndex]?.source ?? selectedImage
                    : selectedImage
                }
                onError={() => setFailedImage(selectedImage)}
                alt={imageLabel(currentIndex)}
              />
            </div>
            <button className={classes.arrowButton} onClick={goNext} aria-label="Sljedeća slika">
              {">"}
            </button>
          </div>
        )}

        <h1 className={classes.title}>{category.title}</h1>
        <div className={classes.line} aria-hidden="true"></div>
        <p className={classes.description}>{category.description}</p>

        <div className={classes.galleryContainer}>
          {/* A category whose Firebase folder is still empty */}
          {currentImages.length === 0 && (
            <p className={classes.emptyGallery}>Fotografije iz ove kategorije uskoro.</p>
          )}
          <div className={classes.galleryPlaceholder}>
            <ImageList
              variant="masonry"
              cols={phoneview ? 1 : tabletview ? 2 : 3}
              gap={phoneview ? 8 : 10}
              className={classes.imageList}
            >
              {currentImages.map((image, index) => (
                <ImageListItem key={image.name} className={classes.imageItem}>
                  <img
                    src={image.thumb}
                    alt={imageLabel(index)}
                    className={classes.image}
                    onClick={() => {
                      setSelectedImage(image.original);
                      setOpened(true);
                    }}
                    loading={index < 3 ? "eager" : "lazy"}
                    fetchPriority={index < 3 ? "high" : undefined}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
          {totalPages > 1 && (
            <nav className={classes.paginationNav} aria-label="Stranice galerije">
              <ul className={classes.paginationList}>
                <li>
                  {currentPage === 1 ? (
                    <span className={`${classes.pageItem} ${classes.pageDisabled}`} aria-hidden="true">
                      &larr;
                    </span>
                  ) : (
                    <Link
                      href={pagePath(currentPage - 1)}
                      className={classes.pageItem}
                      aria-label="Prethodna stranica"
                      rel="prev"
                    >
                      &larr;
                    </Link>
                  )}
                </li>
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <Link
                      href={pagePath(number)}
                      className={`${classes.pageItem} ${currentPage === number ? classes.pageActive : ""}`}
                      aria-current={currentPage === number ? "page" : undefined}
                      aria-label={`Stranica ${number}`}
                    >
                      {number}
                    </Link>
                  </li>
                ))}
                <li>
                  {currentPage < totalPages ? (
                    <Link
                      href={pagePath(currentPage + 1)}
                      className={classes.pageItem}
                      aria-label="Sljedeća stranica"
                      rel="next"
                    >
                      &rarr;
                    </Link>
                  ) : (
                    <span className={`${classes.pageItem} ${classes.pageDisabled}`} aria-hidden="true">
                      &rarr;
                    </span>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
