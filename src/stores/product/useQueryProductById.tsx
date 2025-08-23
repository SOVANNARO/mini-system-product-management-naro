import { useQuery } from "@tanstack/react-query";
import queryKey from "@/constants/queryKey";
import { getProductByIdService } from "./services";
import { ProductDetailResponse } from "@/types/ProductDetail";

const useQueryProductById = (id: string) => {
  return useQuery<ProductDetailResponse, Error>({
    queryKey: [queryKey.product.detail, id],
    queryFn: () => getProductByIdService(id),
    enabled: !!id,
  });
};

export default useQueryProductById;
