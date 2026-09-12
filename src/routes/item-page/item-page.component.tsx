import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { discoundPrice } from "../../utils/helper-functions";
import { getOneProduct } from "../../services/products.requests";
import { IProduct } from "../../types/products.api.interface";

import ImageSlide from "../../components/image-slide/image-slide.component";

import "./item-page.scss";

type CategoryRouteParams = {
  id: string;
};

const ItemPage = () => {
  const { id } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const itemId = Number(id);
  const [item, setItem] = useState<IProduct | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const productRes = await getOneProduct(itemId);
      setItem(productRes);
    })();
  }, []);

  return (
    <div className="item-page-container">
      <button
        className="item-back-btn"
        onClick={() => nav(-1)}>
        Back to results
      </button>
      <ImageSlide images={item?.images || []} />
      <h1 className="title">{item?.title}</h1>
      <div className="price-info-control-element ">
        <div className="item-price-container ">
          <span className="item-discount-price">
            $
            {(item?.discountPercentage &&
              discoundPrice(item?.price || 0, item?.discountPercentage || 0)) ||
              item?.price}
          </span>
          {item?.discountPercentage && (
            <>
              <span className="item-price">${item?.price}</span>
              <span className="item-discount">
                -{item?.discountPercentage}%
              </span>
            </>
          )}
        </div>
      </div>
      <div className="item-left">{item?.stock} items left</div>
      <div className="item-description-container ">{item?.description}</div>
    </div>
  );
};

export default ItemPage;
