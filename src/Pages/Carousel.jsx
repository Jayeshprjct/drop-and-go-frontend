import { useState, useEffect } from "react";
import styles from "../styles/CarouselC.module.css";

const CarouselC = () => {
  const images = [
    "src/assets/img1.jpeg",
    "src/assets/img2.jpeg",
    "src/assets/img3.jpeg",
    "src/assets/img4.jpeg",
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
          alt={``}
          width={630}
          height={550}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default CarouselC;
