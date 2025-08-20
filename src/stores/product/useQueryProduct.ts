import { useQuery } from "@tanstack/react-query";
import { getAllProductService } from "@/stores/product/services";
import queryKey from "@/constants/queryKey";
import {
  ProductResponse,
  Product,
  GetAllProductsParams,
} from "@/types/product";

const useQueryProduct = (
  params: GetAllProductsParams = { limit: 10, skip: 0 }
) => {
  const { data, error, isLoading } = useQuery<ProductResponse, Error>({
    queryKey: [queryKey.product.list, params],
    queryFn: () => getAllProductService(params),
    staleTime: 1000 * 60 * 5,
    enabled: true,
    select: (responseData: ProductResponse) => {
      return {
        ...responseData,
        products: responseData.products.sort(
          (a: Product, b: Product) =>
            new Date(b.meta.createdAt).getTime() -
            new Date(a.meta.createdAt).getTime()
        ),
      };
    },
  });

  return { data, error, isLoading };
};

export default useQueryProduct;
