import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import classes from "./Gallery.module.css";
import { gallerySliderData } from "../utility/gallerySliderData";

export default function Gallery() {
  const [slideIndex, setSlideIndex] = useState(0);


  const handlePreviousClick = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? gallerySliderData.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % gallerySliderData.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePreviousClick(),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextClick();
    }, 5000);

    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className={classes.galleryContainer}
    >
      <div className={classes.imageContainer} {...handlers}>
        <button
          className={`${classes.navButton} ${classes.navButtonLeft}`}
          onClick={handlePreviousClick}
        >
          &lt;
        </button>

        {gallerySliderData.map((item, index) => (
          <img
            loading="lazy"
            decoding="async"
            key={item.id}
            src={item.img}
            alt={item.alt}
            className={slideIndex === index ? classes.block : classes.hidden}
          />
        ))}

        <button
          className={`${classes.navButton} ${classes.navButtonRight}`}
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
