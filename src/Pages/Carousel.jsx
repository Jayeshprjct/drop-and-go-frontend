import { useState, useEffect } from "react";
import styles from "../styles/CarouselC.module.css";

const CarouselC = () => {
  const images = [
    "/../public/img1.jpeg",
    "/../public/img2.jpeg",
    "/../public/img3.jpeg",
    "/../public/img4.jpeg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide(
        currentSlide === images.length - 1 ? 0 : currentSlide + 1
      );
    };

    const intervalId = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentSlide, images.length]);

  return (
    <div className={styles.carousel}>
      <div className={styles.imgDiv}>
        <img
          src={images[currentSlide]}
          alt={`Slide${currentSlide}`}
          width={630}
          height={550}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default CarouselC;
