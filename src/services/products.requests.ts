import {
  IProduct,
  IProductsFetch,
  SortEnum,
} from "../types/products.api.interface";

const API_URL = "https://dummyjson.com/products";

export const getProductsPage = async (
  page: number = 1,
  limit: number = 30,
  sortType: SortEnum = SortEnum.default,
  category?: string | null,
  search?: string | null
): Promise<IProductsFetch> => {
  let url = "";

  if (search && search.trim()) {
    url = `${API_URL}/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${(page - 1) * limit}`;
  } else if (category && category !== "all" && category !== "default") {
    url = `${API_URL}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${(page - 1) * limit}`;
  } else {
    url = `${API_URL}?limit=${limit}&skip=${(page - 1) * limit}`;
  }

  if (sortType && sortType !== SortEnum.default) {
    url += `&sortBy=${sortType}&order=asc`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
};

export const getOneProduct = async (id: number): Promise<IProduct> => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  return res.json();
};