"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // Import use from React
import useMutateProduct from "@/stores/product/useMutateProduct";
import { toast } from "sonner";
import usePageTitleStore from "@/stores/usePageTitleStore";
import ProductForm, { ProductFormData } from "@/components/product/ProductForm";
import useQueryProductById from "@/stores/product/useQueryProductById";
import { Skeleton } from "@/components/ui/skeleton";

const EditProduct = ({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const { updateProduct } = useMutateProduct();
  const setTitle = usePageTitleStore((state) => state.setTitle);

  // Unwrap params if it's a Promise
  const unwrappedParams =
    typeof params === "object" && "then" in params ? use(params) : params;
  const id = unwrappedParams.id;

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
      toast.success("Product updated successfully", {
        description: `${data.title} has been updated in your inventory.`,
        action: {
          label: "View Products",
          onClick: () => router.push("/"),
        },
      });
      router.push("/");
    } catch {
      toast.error("Failed to update product", {
        description:
          "An error occurred while updating the product. Please try again.",
        action: {
          label: "Retry",
          onClick: () => onSubmit(data),
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/4" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="flex justify-end space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
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
