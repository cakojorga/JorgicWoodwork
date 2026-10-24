"use client";

import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { HiArrowRight, HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { useSwipeable } from "react-swipeable";
import classes from "./Galerija.module.css";
import { lockScroll, unlockScroll } from "../utility/smoothScroll";
import { galleryData, galleryPath } from "../utility/galleryData";
import { business, formatPhone } from "../utility/site";

// "1 fotografija", "3 fotografije", "12 fotografija"
function photoCount(n) {
  const last = n % 10;
  const lastTwo = n % 100;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return `${n} fotografije`;
  return `${n} fotografija`;
}

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
export default function GalleryView({ category, images, currentPage, totalPages, totalImages, startIndex, pageTitle }) {
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

  // The open lightbox gets its own browser-history entry (same URL), so the
  // phone's back button / back gesture closes the photo instead of leaving the
  // gallery. Next.js copies its router state into entries made with pushState.
  const openModal = (image) => {
    setSelectedImage(image);
    setOpened(true);
    window.history.pushState({ lightbox: true }, "");
  };

  // Every way of closing (X, Escape, backdrop) goes back through history, which
  // removes the entry again; the popstate listener below then hides the lightbox.
  const closeModal = () => {
    if (window.history.state?.lightbox) {
      window.history.back();
    } else {
      setOpened(false);
    }
  };

  // Back button / gesture (and closeModal above) land here
  useEffect(() => {
    if (!opened) return;
    const onPopState = () => setOpened(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [opened]);

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

  // Category row: on phones it's one sideways-scrolling line (Galerija.module.css).
  // `more` says on which side there are still hidden categories, which turns on
  // the fade and arrow on that side so it's obvious the row can be scrolled.
  const chipRowRef = useRef(null);
  const [more, setMore] = useState({ left: false, right: false });

  function updateMore() {
    const row = chipRowRef.current;
    if (!row) return;
    const { scrollLeft, scrollWidth, clientWidth } = row;
    // 4px tolerance: browsers can stop a pixel short of the very end
    setMore({ left: scrollLeft > 4, right: scrollLeft + clientWidth < scrollWidth - 4 });
  }

  function scrollChips(direction) {
    chipRowRef.current?.scrollBy({ left: direction * 160, behavior: "smooth" });
  }

  useEffect(() => {
    const row = chipRowRef.current;
    // Start with the current category in the middle of the row
    const active = row?.querySelector("[aria-current='page']");
    if (row && active) {
      row.scrollLeft = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    }
    updateMore();
    // Rotating the phone / resizing changes whether the row overflows at all
    window.addEventListener("resize", updateMore);
    return () => window.removeEventListener("resize", updateMore);
  }, []);

  const phone = business.phones[0];

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
            <div className={classes.modalBar}>
              <span className={classes.modalCounter}>
                {currentIndex + 1} / {currentImages.length}
              </span>
              <button
                className={classes.closeButton}
                onClick={closeModal}
                aria-label="Zatvori"
                autoFocus
              >
                <HiXMark aria-hidden="true" />
              </button>
            </div>

            <button className={classes.arrowButton} onClick={goPrev} aria-label="Prethodna slika">
              <HiChevronLeft aria-hidden="true" />
            </button>

            <div className={classes.modalContent} {...handlers}>
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
              <HiChevronRight aria-hidden="true" />
            </button>
          </div>
        )}

        <header className={classes.header}>
          <nav aria-label="Putanja" className={classes.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Početna</Link>
              </li>
              <li>
                <Link href="/#o-nama">Galerija</Link>
              </li>
              <li aria-current="page">{category.title}</li>
            </ol>
          </nav>

          <div className={classes.headerRow}>
            <div className={classes.headerText}>
              <h1 className={classes.title}>{category.title}</h1>
              <p className={classes.description}>{category.description}</p>
              {totalImages > 0 && (
                <>
                  <p className={classes.meta}>
                    <span>{photoCount(totalImages)}</span>
                    {totalPages > 1 && <span>strana {currentPage} od {totalPages}</span>}
                  </p>
                  <p className={classes.hint}>
                    <HiOutlineArrowsExpand aria-hidden="true" />
                    Kliknite na fotografiju da je uvećate
                  </p>
                </>
              )}
            </div>
            <Link href="/#kontakt" className={classes.headerCta}>
              Zatraži ponudu
              <HiArrowRight aria-hidden="true" />
            </Link>
          </div>

          {/* Jump straight to another category */}
          <nav
            aria-label="Kategorije"
            className={classes.categoryNav}
            data-more-left={more.left || undefined}
            data-more-right={more.right || undefined}
          >
            {/* Arrows only help with scrolling; the links themselves are reachable
                by keyboard, so the arrows stay out of the tab order */}
            <button
              type="button"
              className={`${classes.scrollHint} ${classes.scrollHintLeft}`}
              onClick={() => scrollChips(-1)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <HiChevronLeft />
            </button>
            <button
              type="button"
              className={`${classes.scrollHint} ${classes.scrollHintRight}`}
              onClick={() => scrollChips(1)}
              tabIndex={-1}
              aria-hidden="true"
            >
              <HiChevronRight />
            </button>
            <ul ref={chipRowRef} onScroll={updateMore} data-lenis-prevent>
              {galleryData.map((item) => {
                const active = item.slug === category.slug;
                return (
                  <li key={item.id}>
                    <Link
                      href={galleryPath(item)}
                      className={`${classes.chip} ${active ? classes.chipActive : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      <item.icon aria-hidden="true" />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

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
                  <button
                    type="button"
                    className={classes.imageButton}
                    onClick={() => openModal(image.original)}
                  >
                    <img
                      src={image.thumb}
                      alt={imageLabel(index)}
                      className={classes.image}
                      loading={index < 3 ? "eager" : "lazy"}
                      fetchPriority={index < 3 ? "high" : undefined}
                    />
                    <span className={classes.zoomHint} aria-hidden="true">
                      <HiOutlineArrowsExpand />
                    </span>
                  </button>
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

        {/* Next step after browsing: ask for an offer or call */}
        <aside className={classes.ctaBand}>
          <div className={classes.ctaCopy}>
            <p className={classes.ctaEyebrow}>Po mjeri Vašeg prostora</p>
            <h2 className={classes.ctaTitle}>Želite slično rješenje?</h2>
            <p className={classes.ctaText}>
              Pošaljite nam upit ili nas pozovite. Dolazimo na mjerenje i
              predlažemo rješenje prema Vašim željama.
            </p>
          </div>
          <div className={classes.ctaActions}>
            <Link href="/#kontakt" className={classes.ctaPrimary}>
              Zatraži ponudu
              <HiArrowRight aria-hidden="true" />
            </Link>
            <a href={`tel:${phone}`} className={classes.ctaPhone}>
              <LuPhone aria-hidden="true" />
              {formatPhone(phone)}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
