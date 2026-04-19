import { useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import image1 from "../assets/slider1.jpg";
import image2 from "../assets/slider2.jpg";
import image3 from "../assets/slider3.jpg"; 
import image5 from "../assets/slider5.jpg"; 
import image6 from "../assets/slider6.jpg"; 
import classes from "./Gallery.module.css";

export default function Gallery() {
  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
      perView: 3,
      gap: 20,
      autoplay: 3000, 
      hoverpause: true, 
      animationDuration: 800,
    });

    glide.mount();

    return () => glide.destroy(); // cleanup
  }, []);

  return (
    <div className={`glide ${classes.gallery}`}>
      <div data-glide-el="track" className="glide__track">
        <ul className="glide__slides">
          <li className="glide__slide">
            <img src={image1} alt="Image 1" />
          </li>
          <li className="glide__slide">
            <img src={image2} alt="Image 2" />
          </li>
          <li className="glide__slide">
            <img src={image3} alt="Image 3" />
          </li>
          <li className="glide__slide">
            <img src={image5} alt="Image 5" />
          </li>
          <li className="glide__slide">
            <img src={image6} alt="Image 6" />
          </li>
        </ul>
      </div>
    </div>
  );
}
