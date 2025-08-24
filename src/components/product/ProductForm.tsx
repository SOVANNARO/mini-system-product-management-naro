"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusIcon, XIcon } from "lucide-react";
import useQueryCategories from "@/stores/product/useQueryCategories";
import TextInputField from "../form/TextInputField";
import TextAreaField from "../form/TextAreaField";
import NumberInputField from "../form/NumberInputField";
import CategorySelectField from "../form/CategorySelectField";
import ActionButton from "../form/ActionButton";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  sku: z.string().min(1, "SKU is required"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  submitButtonText: string;
}

const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText,
}: ProductFormProps) => {
  const { data: categoriesData } = useQueryCategories();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      sku: "",
      stock: 0,
      category: "",
    },
    mode: "onTouched",
  });

  return (
    <>
      <div className="flex justify-end items-center mb-6">
        <div className="flex space-x-3">
          <ActionButton variant="outline" onClick={onCancel} icon={XIcon}>
            Cancel
          </ActionButton>
          <ActionButton
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            icon={PlusIcon}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {submitButtonText}
          </ActionButton>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6"
      >
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <div className="space-y-4">
              <TextInputField
                name="title"
                control={control}
                label="Title"
                placeholder="Enter product title"
              />
              <TextAreaField
                name="description"
                control={control}
                label="Description"
                placeholder="Enter product description"
                rows={4}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Pricing and Inventory
            </h2>
            <div className="space-y-4">
              <NumberInputField
                name="price"
                control={control}
                label="Price"
                placeholder="0.00"
              />
              <TextInputField
                name="sku"
                control={control}
                label="SKU"
                placeholder="Enter SKU"
              />
              <NumberInputField
                name="stock"
                control={control}
                label="Stock"
                placeholder="0"
                integer
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <CategorySelectField
              name="category"
              control={control}
              label="Product Category"
              categories={categoriesData || []}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
