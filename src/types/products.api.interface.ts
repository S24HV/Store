export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  thumbnail: string;
  discountPercentage: number;
}

export interface IProductsFetch {
  products: IProduct[];
  limit: number;
  skip: number;
  total: number;
}

export enum SortEnum {
  default = "default",
  price = "price",
  name = "name",
  stock = "stock",
}
