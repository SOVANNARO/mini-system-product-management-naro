"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMutateProduct from "@/stores/product/useMutateProduct";
import { toast } from "sonner";
import usePageTitleStore from "@/stores/usePageTitleStore";
import ProductForm, { ProductFormData } from "@/components/product/ProductForm";

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
      toast.success("Product created successfully", {
        description: `${data.title} has been added to your inventory.`,
        action: {
          label: "View Products",
          onClick: () => router.push("/"),
        },
      });
      router.push("/");
    } catch {
      toast.error("Failed to create product", {
        description:
          "An error occurred while creating the product. Please try again.",
        action: {
          label: "Retry",
          onClick: () => onSubmit(data),
        },
      });
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
