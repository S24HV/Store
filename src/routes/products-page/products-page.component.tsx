import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IProduct, SortEnum } from "../../types/products.api.interface";

import Pagenation from "../../components/pagenation/pagenation.component";
import ProductItem from "../../components/product-item/product-item.component";

import "./page.scss";
import { getProductsPage } from "../../services/products.requests";

type CategoryRouteParams = {
  page: string;
};

const ProductsPage = () => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState(SortEnum.default);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);

  const { page } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const limit = 12;

  useEffect(() => {
    (async () => {
      const productsRes = await getProductsPage(Number(page), limit, sortType);
      setProducts(productsRes.products);
      setTotal(productsRes.total);
    })();
  }, [page, sortType]);

  const chosePage = (page: number): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    nav(`/${page}`);
  };

  return (
    <div>
      <div className="sort-container">
        <span
          className={sortType === "name" ? "selected" : ""}
          onClick={() =>
            setSortType(sortType === "name" ? SortEnum.default : SortEnum.name)
          }>
          Sort by name
        </span>
        <span
          className={sortType === "price" ? "selected" : ""}
          onClick={() =>
            setSortType(
              sortType === "price" ? SortEnum.default : SortEnum.price
            )
          }>
          Sort by price
        </span>
        <span
          className={sortType === "stock" ? "selected" : ""}
          onClick={() =>
            setSortType(
              sortType === "stock" ? SortEnum.default : SortEnum.stock
            )
          }>
          Sort by stock
        </span>
      </div>

      <div className="products-container">
        {products.map((product, i) => (
          <ProductItem
            key={product.id}
            item={product}
          />
        ))}
      </div>

      <Pagenation
        currentPage={Number(page)}
        itemsQuantity={total}
        chosePage={chosePage}
        limit={limit}
      />
    </div>
  );
};

export default ProductsPage;
