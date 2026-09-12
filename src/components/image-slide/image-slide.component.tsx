import React, { useState, FC, useEffect } from "react";
import "./image-slide.scss";

interface IImageSlideProps {
  images: string[];
}

const ImageSlide: FC<IImageSlideProps> = ({ images }) => {
  const [imageSelected, setImageSelected] = useState(images[0]);

  useEffect(() => setImageSelected(images[0]), [images]);

  const slidePage = (action: string) => {
    switch (action) {
      case "next":
        if (imageSelected === images[images.length - 1]) {
          setImageSelected(images[0]);
          return;
        }
        setImageSelected(images[images.indexOf(imageSelected) + 1] || "");
        return;
      case "prev":
        if (imageSelected === images[0]) {
          setImageSelected(images[images.length - 1]);
          return;
        }
        setImageSelected(images[images.indexOf(imageSelected) - 1] || "");
        return;
    }
  };

  return (
    <div className="item-img-container">
      <div className="item-img-control-container">
        <span
          className="item-img-control-btn left"
          onClick={() => slidePage("prev")}>
          {"<"}
        </span>
        <img
          className="item-img"
          src={imageSelected}
          alt="Selected"
        />
        <span
          className="item-img-control-btn right"
          onClick={() => slidePage("next")}>
          {">"}
        </span>
      </div>
      <div className="img-selected-container">
        {images.map((url) => (
          <span
            key={url}
            className={`img-selector ${
              imageSelected === url ? "selected" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlide;
