"use client";
import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import useMutateProduct from "@/stores/product/useMutateProduct";
import usePageTitleStore from "@/stores/usePageTitleStore";
import ProductForm, { ProductFormData } from "@/components/product/ProductForm";
import useQueryProductById from "@/stores/product/useQueryProductById";
import { showToast } from "@/components/utils/toast";
import ProductFormSkeleton from "@/components/product/ProductFormSkeleton";

interface EditProductProps {
  params: Promise<{ id: string }>;
}

const EditProduct = ({ params }: EditProductProps) => {
  const router = useRouter();
  const { updateProduct } = useMutateProduct();
  const setTitle = usePageTitleStore((state) => state.setTitle);

  const { id } = use(params);

  const { data: product, isLoading } = useQueryProductById(id);

  useEffect(() => {
    setTitle("Edit Product");
  }, [setTitle]);

  const handleCancel = () => {
    router.push("/");
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct({ id, data });
      showToast(
        "success",
        "Product updated successfully",
        `${data.title} has been updated in your inventory.`,
        {
          label: "View Products",
          onClick: () => router.push("/"),
        }
      );
      router.push("/");
    } catch {
      showToast(
        "error",
        "Failed to update product",
        "An error occurred while updating the product. Please try again.",
        {
          label: "Retry",
          onClick: () => onSubmit(data),
        }
      );
    }
  };

  if (isLoading) {
    return <ProductFormSkeleton />;
  }

  return (
    <ProductForm
      initialData={product}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      submitButtonText="Update Product"
    />
  );
};

export default EditProduct;
