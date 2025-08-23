import mutationKey from "@/constants/mutationKey";
import queryKey from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductService,
  updateProductService,
  deleteProductService,
} from "./services";
import { ProductFormData } from "@/components/product/ProductForm";

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

  const { mutateAsync: updateProduct } = useMutation({
    mutationKey: [mutationKey.product.update],
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) =>
      updateProductService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.product.list],
      });
    },
  });

  const { mutateAsync: deleteProduct } = useMutation({
    mutationKey: [mutationKey.product.delete],
    mutationFn: (id: string) => deleteProductService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.product.list],
      });
    },
  });

  return { createProduct, updateProduct, deleteProduct };
};

export default useMutateProduct;
