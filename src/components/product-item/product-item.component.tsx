import { FC, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types/products.api.interface";
import { discoundPrice } from "../../utils/helper-functions";
import "./product-item.scss";

interface Props {
  item: IProduct;
}

const HEADER_ZONE = 80; 

const ProductItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [allowInfo, setAllowInfo] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? discoundPrice(item.price, item.discountPercentage)
    : item.price.toFixed(2);

  const mainImage = item.images?.[0] || item.thumbnail || "";
  const hoverImage = item.images && item.images.length > 1 ? item.images[1] : null;

  const checkPosition = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
   
    const infoOk = rect.bottom > HEADER_ZONE + 100;
    setAllowInfo(infoOk);

   
    if (isHovered && !infoOk) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    checkPosition();

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    checkPosition();
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.bottom > HEADER_ZONE + 100) {
        setIsHovered(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const showInfo = isHovered && allowInfo;
  const currentImage = showInfo && hoverImage ? hoverImage : mainImage;

  return (
    <div
      ref={cardRef}
      className={`product-card ${showInfo ? "show-info" : ""}`}
      onClick={() => navigate(`/shop/${item.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="image-wrapper">
        <img src={currentImage} alt={item.title} loading="lazy" />
      </div>

      <div className="product-info">
        <div className="product-brand">S24HV</div>
        <h3 className="product-name">{item.title}</h3>

        <div className="product-price-row">
          {hasDiscount && (
            <span className="product-old-price">${item.price.toFixed(2)}</span>
          )}
          <span className="product-price">${finalPrice}</span>
          {hasDiscount && (
            <span className="product-discount">
              -{Math.round(item.discountPercentage)}%
            </span>
          )}
        </div>

        <div className="product-actions">
          <button onClick={(e) => e.stopPropagation()}>QUICK BUY +</button>
          <button onClick={(e) => e.stopPropagation()}>WISHLIST +</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;