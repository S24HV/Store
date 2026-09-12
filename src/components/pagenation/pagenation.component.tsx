import React, { FC, useState } from "react";

import CustomButton from "../custom-button/custom-button.component";

import "./pagenation.scss";

interface IPagenationProps {
  itemsQuantity: number;
  limit: number;
  currentPage: number;
  chosePage: (page: number) => void;
}

const Pagenation: FC<IPagenationProps> = ({
  itemsQuantity,
  limit,
  chosePage,
  currentPage,
}) => {
  const pages = Array(Math.round(itemsQuantity / limit))
    .fill(1)
    .map((n, i) => n + i);

  const pageFilter = (page: number): boolean => {
    if (currentPage - 2 <= 0) return page <= 5;
    if (currentPage + 2 >= pages.length) return page > pages.length - 4;
    return page >= currentPage - 1 && page < currentPage + 3;
  };

  const changePageHandler = (page: number): void => {
    chosePage(page);
  };

  const prevPageHandler = (): void => {
    chosePage(currentPage - 1);
  };

  const nextPageHandler = (): void => {
    chosePage(currentPage + 1);
  };

  return (
    <div className="pages-container">
      <CustomButton
        onClick={prevPageHandler}
        disabled={currentPage === 1}>
        prev
      </CustomButton>
      <span
        className={`page-num ${1 === currentPage ? "work" : ""}`}
        onClick={() => changePageHandler(1)}>
        {1}
      </span>
      {currentPage > 3 && <span className="dots">...</span>}
      {pages
        .filter((page) => pageFilter(page))
        .map((pageNum) => {
          if (pageNum === 1) return null;
          return (
            <span
              key={pageNum}
              className={`page-num ${pageNum === currentPage ? "work" : ""}`}
              onClick={() => changePageHandler(pageNum)}>
              {pageNum}
            </span>
          );
        })}
      <CustomButton
        onClick={nextPageHandler}
        disabled={currentPage === pages.length}>
        next
      </CustomButton>
    </div>
  );
};

export default Pagenation;
