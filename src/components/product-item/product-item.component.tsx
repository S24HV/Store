import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import { IProduct } from "../../types/products.api.interface";
import { discoundPrice } from "../../utils/helper-functions";

import "./product-item.scss";

interface IProductItemProps {
  item: IProduct;
  className?: string;
}

const ProductItem: FC<IProductItemProps> = ({ item, className }) => {
  const nav = useNavigate();

  return (
    <div
      className={`card-item ${className || ""}`}
      onClick={() => nav(`/product/${item.id}`)}>
      <img
        className="card-img"
        src={item.thumbnail}
        alt={item.description}
      />
      <h3 className="product-title">{item.title}</h3>
      <div className="price-container">
        <span>{item.stock} in stock</span>
        <div className="price">
          {item.discountPercentage ? (
            <>
              <span className="discount-price">${item.price}</span> $
              {discoundPrice(item.price, item.discountPercentage)}
            </>
          ) : (
            <>${item.price}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
