import { useQuery } from "@tanstack/react-query";
import { getAllProductService } from "@/stores/product/services";
import queryKey from "@/constants/queryKey";

const useQueryProduct = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey.product.list],
    queryFn: getAllProductService,
    staleTime: 1000 * 60 * 5,
    enabled: true,
    select: (data) => {
      return data.sort(
        (a, b) =>
          new Date(b.meta.createdAt).getTime() -
          new Date(a.meta.createdAt).getTime()
      );
    },
  });

  return { data, error, isLoading };
};

export default useQueryProduct;
