import { del, get, post, put } from "@/lib/api";
import {
  GetAllProductsParams,
  ProductRequest,
  ProductResponse,
} from "@/types/product";
import apiPath from "@/constants/apiPath";
import { ProductDetailResponse } from "@/types/ProductDetail";

export const getAllProductService = async (
  params?: Partial<GetAllProductsParams>
): Promise<ProductResponse> => {
  const limit = params?.limit ?? 10;
  const skip = params?.skip ?? 0;

  const url = apiPath.product.get
    .replace("{limit}", limit.toString())
    .replace("{skip}", skip.toString());
  return get<ProductResponse>(url);
};

export const getProductByIdService = async (id: string) => {
  const url = apiPath.product.getById.replace("{id}", id);
  return get<ProductDetailResponse>(url);
};

export const createProductService = async (data: ProductRequest) => {
  const url = apiPath.product.create;
  return post(url, data);
};

export const updateProductService = async (
  id: string,
  data: Partial<ProductRequest>
) => {
  const url = apiPath.product.update.replace("{id}", id);
  return put(url, data);
};

export const deleteProductService = async (id: string) => {
  const url = apiPath.product.delete.replace("{id}", id);
  return del(url);
};

export const getCategoriesService = async (): Promise<string[]> => {
  const url = apiPath.product.categories;
  return get<string[]>(url);
};
