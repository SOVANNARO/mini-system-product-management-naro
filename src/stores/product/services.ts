import { del, get, post, put } from "@/lib/api";
import {
  GetAllProductsParams,
  ProductRequest,
  ProductResponse,
} from "@/types/product";
import apiPath from "@/constants/apiPath";

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

export const createProductService = async (data: ProductRequest) => {
  try {
    const url = apiPath.product.create;
    const response = await post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};
