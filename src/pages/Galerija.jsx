import { useParams } from "react-router-dom";
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
import { Helmet } from "react-helmet-async";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const { title } = useParams();
  const galleryItem = galleryData.find((item) => item.title === title);
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentIndex = galleryItem
    ? images.findIndex((item) => item === selectedImage)
    : -1;
  useEffect(() => {
    setLoading(true);
    async function loadImages() {
      try {
        const folderRef = ref(storage, galleryItem.folder);

        const result = await listAll(folderRef);

        const urls = await Promise.all(
          result.items.map((item) => getDownloadURL(item)),
        );

        setImages(urls);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [galleryItem]);
  const goNext = () => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((item) => item === selectedImage);

    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const goPrev = () => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((item) => item === selectedImage);

    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    setSelectedImage(images[prevIndex]);
  };

  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  const nextIndex = (currentIndex + 1) % images.length;

  useEffect(() => {
    if (!selectedImage) return;

    const nextImg = new Image();
    nextImg.src = images[nextIndex];

    const prevImg = new Image();
    prevImg.src = images[prevIndex];
  }, [selectedImage, images, currentIndex, nextIndex, prevIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpened(false);
      }

      if (e.key === "ArrowRight") {
        goNext();
      }

      if (e.key === "ArrowLeft") {
        goPrev();
      }
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

  const phoneview = window.matchMedia("(max-width: 600px)").matches;
  const tabletview = window.matchMedia(
    "(min-width: 601px) and (max-width: 1024px)",
  ).matches;
  if (!galleryItem) {
    return (
      <div className={classes.containerError}>
        <h1>Nepostojeći artikal</h1>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>{galleryItem.title} po mjeri | Jorgić Woodwork</title>

        <link
          rel="canonical"
          href={`https://tvojdomen.com/galerija/${title}`}
        />

        <meta
          name="description"
          content={`${galleryItem.description} - Jorgić Woodwork`}
        />

        <meta
          name="keywords"
          content={`${galleryItem.title}, namještaj po mjeri, stolarija, Jorgić Woodwork`}
        />

        <meta
          property="og:title"
          content={`${galleryItem.title} | Jorgić Woodwork`}
        />

        <meta property="og:description" content={galleryItem.description} />

        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container">
        <div className={classes.pageSettings}>
          {opened && selectedImage && (
            <div className={classes.modal}>
              <button
                className={classes.arrowButton}
                onClick={() => {
                  const currentIndex = images.findIndex(
                    (item) => item === selectedImage,
                  );
                  const prevIndex =
                    (currentIndex - 1 + images.length) % images.length;
                  setSelectedImage(images[prevIndex]);
                }}
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
                onClick={() => {
                  const currentIndex = images.findIndex(
                    (item) => item === selectedImage,
                  );
                  const nextIndex = (currentIndex + 1) % images.length;
                  setSelectedImage(images[nextIndex]);
                }}
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
              <ImageList
                variant="masonry"
                cols={phoneview ? 1 : tabletview ? 2 : 3}
                gap={phoneview ? 8 : 10}
                className={classes.imageList}
              >
                {images.map((url, index) => (
                  <ImageListItem key={index} className={classes.imageItem}>
                    <img
                      src={url}
                      alt={`${title} ${index + 1}`}
                      className={classes.image}
                      onClick={() => {
                        setSelectedImage(url);
                        setOpened(true);
                      }}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
