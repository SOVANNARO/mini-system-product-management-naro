export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  sku: string;
  stock: number;
  category: Category;
  thumbnail: string;
  meta: Meta;
}

export enum Category {
  Beauty = "beauty",
  Fragrances = "fragrances",
  Furniture = "furniture",
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export interface GetAllProductsParams {
  limit: number;
  skip: number;
}
