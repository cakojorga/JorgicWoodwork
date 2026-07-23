import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import classes from "./Gallery.module.css";
import { gallerySliderData } from "../utility/gallerySliderData";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Gallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
  const theme = useTheme();
  const phoneview = useMediaQuery(theme.breakpoints.down("sm"));
  const tabletview = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const canHover = !phoneview && !tabletview;

  const imageStyle = {
    transition: "transform 0.3s ease in", // Makes the enlargement smooth
    transform: isHovered ? "scale(1.1)" : "scale(1)", // Grows 20% on hover
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className={classes.galleryContainer}
    >
      <div
        className={classes.imageContainer}
        {...handlers}
        onMouseEnter={canHover ? () => setIsHovered(true) : undefined}
        onMouseLeave={canHover ? () => setIsHovered(false) : undefined}
      >
        <button
          className={`${classes.navButton} ${classes.navButtonLeft}`}
          onClick={handlePreviousClick}
        >
          &lt;
        </button>
        <div className={classes.imageOverlay}></div>
        {gallerySliderData.map((item, index) => (
          <Link to={`/Galerija/${item.title}`} key={item.id}>
            <img
              loading="eager"
              decoding="async"
              key={item.id}
              src={item.img}
              alt={item.alt}
              className={slideIndex === index ? classes.block : classes.hidden}
              style={imageStyle}
            />
            {slideIndex === index && (
              <div className={classes.titleOverPicture}>
                {item.title} <span>↗</span>
              </div>
            )}
          </Link>
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
