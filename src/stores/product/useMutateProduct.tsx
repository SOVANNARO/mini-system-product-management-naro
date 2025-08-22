import mutationKey from "@/constants/mutationKey";
import queryKey from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductService } from "./services";
const useMutateProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createProduct } = useMutation({
    mutationKey: [mutationKey.product.create],
    mutationFn: createProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.product.list],
      });
    },
  });

  return { createProduct };
};

export default useMutateProduct;
