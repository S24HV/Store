import { useState, useEffect, FC } from "react";
import "./image-slide.scss";

interface Props {
  images: string[];
}

const ImageSlide: FC<Props> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  if (!images.length) return null;

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery">
      <div className="main-image">
        <button className="nav-btn prev" onClick={prev}>
          ‹
        </button>

        <img src={images[current]} alt="Product" />

        <button className="nav-btn next" onClick={next}>
          ›
        </button>
      </div>

      {images.length > 1 && (
        <div className="thumbnails">
          {images.map((img, index) => (
            <button
              key={index}
              className={`thumb ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            >
              <img src={img} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlide;