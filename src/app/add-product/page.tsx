"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMutateProduct from "@/stores/product/useMutateProduct";
import usePageTitleStore from "@/stores/usePageTitleStore";
import ProductForm, { ProductFormData } from "@/components/product/ProductForm";
import { showToast } from "@/components/utils/toast";

const AddProduct = () => {
  const router = useRouter();
  const { createProduct } = useMutateProduct();
  const setTitle = usePageTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Add Product");
  }, [setTitle]);

  const handleCancel = () => {
    router.push("/");
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data);
      showToast(
        "success",
        "Product created successfully",
        `${data.title} has been added to your inventory.`,
        {
          label: "View Products",
          onClick: () => router.push("/"),
        }
      );
      router.push("/");
    } catch {
      showToast(
        "error",
        "Failed to create product",
        "An error occurred while creating the product. Please try again.",
        {
          label: "Retry",
          onClick: () => onSubmit(data),
        }
      );
    }
  };

  return (
    <ProductForm
      onSubmit={onSubmit}
      onCancel={handleCancel}
      submitButtonText="Add Product"
    />
  );
};

export default AddProduct;