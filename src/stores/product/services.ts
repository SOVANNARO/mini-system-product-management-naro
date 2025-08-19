import { del, get, post, put } from "@/lib/api";
import { ProductResponse } from "@/types/product";
import apiPath from "@/constants/apiPath";

export const getAllProductService = async () =>
  get<ProductResponse[]>(apiPath.user.get);
