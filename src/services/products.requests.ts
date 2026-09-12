import {
  IProduct,
  IProductsFetch,
  SortEnum,
} from "../types/products.api.interface";

const API_URL = "https://dummyjson.com/products";

export const getProductsPage = async (
  page: number,
  limit: number,
  sortType: SortEnum
): Promise<IProductsFetch> => {
  const res = await fetch(
    `${API_URL}?skip=${(page - 1) * limit}&limit=${limit}&sortBy=${sortType}`
  );

  const products = await res.json();

  return products;
};

export const getOneProduct = async (id: number): Promise<IProduct> => {
  const res = await fetch(`${API_URL}/${id}`);

  const products = await res.json();

  return products;
};
