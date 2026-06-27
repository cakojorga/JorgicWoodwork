import { Link, useParams, useSearchParams } from "react-router-dom";
import { galleryData } from "../utility/galleryData";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import classes from "./Galerija.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const { title } = useParams();
  const galleryItem = galleryData.find((item) => item.title === title);
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [totalImages, setTotalImages] = useState(0);

  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const imagesPerPage = 12;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const currentImages = images.slice(startIndex, endIndex);

  const currentIndex = currentImages.findIndex(
    (item) => item.original === selectedImage,
  );

  useEffect(() => {
    setLoading(true);

    async function loadImages() {
      try {
        const originalFolderRef = ref(storage, galleryItem.folder);
        const thumbFolderRef = ref(storage, `${galleryItem.folder}-thumbnails`);

        const [originalResult, thumbResult] = await Promise.all([
          listAll(originalFolderRef),
          listAll(thumbFolderRef),
        ]);

        const imageData = await Promise.all(
          originalResult.items.map(async (originalItem) => {
            const thumbItem = thumbResult.items.find(
              (item) => item.name === originalItem.name,
            );

            const originalUrl = await getDownloadURL(originalItem);
            const thumbUrl = thumbItem
              ? await getDownloadURL(thumbItem)
              : originalUrl;

            return {
              original: originalUrl,
              thumb: thumbUrl,
            };
          }),
        );

        setImages(imageData);
        setTotalImages(imageData.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (galleryItem) {
      loadImages();
    }
  }, [galleryItem]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [currentPage]);
const goNext = () => {
  if (currentImages.length === 0) return;

  const nextIndex = (currentIndex + 1) % currentImages.length;
  setSelectedImage(currentImages[nextIndex].original);
};

 const goPrev = () => {
   if (currentImages.length === 0) return;

   const prevIndex =
     (currentIndex - 1 + currentImages.length) % currentImages.length;

   setSelectedImage(currentImages[prevIndex].original);
 };

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
 }, [selectedImage, currentImages, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpened(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, goNext, goPrev]);

  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  const theme = useTheme();
  const phoneview = useMediaQuery(theme.breakpoints.down("sm"));
  const tabletview = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  if (!galleryItem) {
    return (
      <div className={classes.containerError}>
        <h1>Nepostojeći artikal</h1>
      </div>
    );
  }

  if (
    !loading &&
    (currentPage < 1 || (currentPage > totalPages && totalPages > 0))
  ) {
    return (
      <div className={classes.containerError}>
        <h1>Nepostojeća stranica</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={classes.pageSettings}>
        {opened && selectedImage && (
          <div className={classes.modal}>
            <button
              className={classes.arrowButton}
              onClick={goPrev}
              
            >
              {"<"}
            </button>

            <div className={classes.modalContent} {...handlers}>
              <button
                className={classes.closeButton}
                onClick={() => setOpened(false)}
              >
                X
              </button>
              <motion.img
                key={selectedImage}
                src={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={classes.modalImage}
              />
            </div>
            <button
              className={classes.arrowButton}
              onClick={goNext}
             
            >
              {">"}
            </button>
          </div>
        )}

        <h1 className={classes.title}>{galleryItem.title}</h1>
        <div className={classes.line} aria-hidden="true"></div>
        <p className={classes.description}>{galleryItem.description}</p>

        <div className={classes.galleryContainer}>
          {loading ? (
            <div className={classes.loadingContainer}>
              <CircularProgress className={classes.loader} />
            </div>
          ) : (
            <>
              <div className={classes.galleryPlaceholder}>
                <ImageList
                  variant="masonry"
                  cols={phoneview ? 1 : tabletview ? 2 : 3}
                  gap={phoneview ? 8 : 10}
                  className={classes.imageList}
                >
                  {currentImages.map((image, index) => (
                    <ImageListItem key={index} className={classes.imageItem}>
                      <img
                        src={image.thumb}
                        alt={`Gallery ${startIndex + index + 1}`}
                        className={classes.image}
                        onClick={() => {
                          setSelectedImage(image.original);
                          setOpened(true);
                        }}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
              {totalPages > 1 && (
                <nav
                  className={classes.paginationNav}
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ul
                    className={classes.paginationList}
                    style={{
                      display: "flex",
                      listStyle: "none",
                      gap: "8px",
                      padding: 0,
                    }}
                  >
                    {currentPage == 1 ? (
                      <span className={classes.disabled}>&larr;</span>
                    ) : (
                      <Link
                        to={`/Galerija/${title}?page=${currentPage - 1}`}
                        className={classes.orangeBtn}
                      >
                        &larr;
                      </Link>
                    )}
                    {pageNumbers.map((number) => (
                      <li key={number}>
                        <Link
                          className={classes.paginationNumber}
                          to={`/Galerija/${title}?page=${number}`}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "36px",
                            height: "38px",
                            textDecoration: "none",
                            borderRadius: "1px",
                            backgroundColor:
                              currentPage === number ? "#617fe0" : "#fff",
                            color: currentPage === number ? "#fff" : "#000",
                            fontWeight:
                              currentPage === number ? "bold" : "normal",
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          {number}
                        </Link>
                      </li>
                    ))}
                    {currentPage < totalPages ? (
                      <Link
                        to={`/Galerija/${title}?page=${currentPage + 1}`}
                        className={classes.orangeBtn}
                      >
                        &rarr;
                      </Link>
                    ) : (
                      <span className={classes.disabled}>&rarr;</span>
                    )}
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
