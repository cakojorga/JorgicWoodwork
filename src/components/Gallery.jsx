import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import classes from "./Gallery.module.css";
import { gallerySliderData } from "../utility/gallerySliderData";

export default function Gallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePreviousClick = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? gallerySliderData.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % gallerySliderData.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextClick();
    }, 5000);
    return () => clearTimeout(timer);
  }, [slideIndex]);


  return (
    <>
      
      <section
        id="gallery"
        aria-labelledby="gallery-title"
        className={classes.galleryContainer}
      >
        <motion.div className={classes.imageContainer}>
          <button
            className={`${classes.navButton} ${classes.navButtonLeft}`}
            onClick={handlePreviousClick}
          >
            &lt;
          </button>
          {gallerySliderData.map((item, index) => (
            <motion.img
              key={item.id}
              src={item.img}
              alt={item.alt}
              className={slideIndex === index ? classes.block : classes.hidden}
              onClick={() => {
                setSelectedImage(item);
              }}
            />
          ))}
          <button
            className={`${classes.navButton} ${classes.navButtonRight}`}
            onClick={handleNextClick}
          >
            &gt;
          </button>
        </motion.div>
      </section>
    </>
  );
}
