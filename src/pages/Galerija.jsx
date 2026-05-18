import { useParams } from "react-router-dom";
import { galleryData } from "../utility/galleryData";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import classes from "./Galerija.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function GalleryPage() {

  const { title } = useParams();
  const galleryItem = galleryData.find(item => item.title === title);
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  


  if (!galleryItem) {
    return (
      <div className={classes.containerError}>
        <h1>Nepostojeći artikal</h1>
      </div>
    );
  }

  console.log(selectedImage);
  console.log(opened);

  const phoneview = window.innerWidth <= 600;
  const tabletview = window.innerWidth > 600 && window.innerWidth <= 1024;
  const currentIndex = galleryItem.itemData.findIndex(
    (item) => item.img === selectedImage,
  );
  const goNext = () => {
    const nextIndex = (currentIndex + 1) % galleryItem.itemData.length;
    setSelectedImage(galleryItem.itemData[nextIndex].img);
  };

  const goPrev = () => {
    const prevIndex =
      (currentIndex - 1 + galleryItem.itemData.length) %
      galleryItem.itemData.length;

    setSelectedImage(galleryItem.itemData[prevIndex].img);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  useEffect(() => {
    if (!selectedImage) return;

    const currentIndex = galleryItem.itemData.findIndex(
      (item) => item.img === selectedImage,
    );

    const nextIndex = (currentIndex + 1) % galleryItem.itemData.length;
    const prevIndex =
      (currentIndex - 1 + galleryItem.itemData.length) %
      galleryItem.itemData.length;

    const nextImg = new Image();
    nextImg.src = galleryItem.itemData[nextIndex].img;

    const prevImg = new Image();
    prevImg.src = galleryItem.itemData[prevIndex].img;
  }, [selectedImage]);


  return (
    <div className="container">
      <div className={classes.pageSettings}>
        {opened && selectedImage && (
          <div className={classes.modal}>
            <button
              className={classes.arrowButton}
              onClick={() => {
                const currentIndex = galleryItem.itemData.findIndex(
                  (item) => item.img === selectedImage,
                );
                const prevIndex =
                  (currentIndex - 1 + galleryItem.itemData.length) %
                  galleryItem.itemData.length;
                setSelectedImage(galleryItem.itemData[prevIndex].img);
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
                const currentIndex = galleryItem.itemData.findIndex(
                  (item) => item.img === selectedImage,
                );
                const nextIndex =
                  (currentIndex + 1) % galleryItem.itemData.length;
                setSelectedImage(galleryItem.itemData[nextIndex].img);
              }}
            >
              {">"}
            </button>
          </div>
        )}
        <h1 className={classes.title}>{galleryItem.title}</h1>
        <div className={classes.line} aria-hidden="true"></div>
        <p className={classes.description}>{galleryItem.description}</p>
        <ImageList
          variant="masonry"
          cols={phoneview ? 1 : tabletview ? 2 : 3}
          gap={phoneview ? 8 : 10}
          className={classes.imageList}
        >
          {galleryItem.itemData.map((item) => (
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={item.img}
              className={classes.imageItem}
            >
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}`}
                  src={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  className={classes.image}
                  onClick={() => {
                    setSelectedImage(item.img);
                    setOpened(true);
                  }}
                />
              </ImageListItem>
            </motion.li>
          ))}
        </ImageList>
      </div>
    </div>
  );
}