"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import useMutateProduct from "@/stores/product/useMutateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import usePageTitleStore from "@/stores/usePageTitleStore";
import { useEffect } from "react";

// Define the schema for form validation
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  sku: z.string().min(1, "SKU is required"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

const AddProduct = () => {
  const router = useRouter();
  const { createProduct } = useMutateProduct();
  const setTitle = usePageTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Add Product");
  }, [setTitle]);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      sku: "",
      stock: 0,
      category: "",
    },
    mode: "onTouched",
  });

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
          onClick: () => handleSubmit(onSubmit)(),
        },
      });
    }
  };

  return (
    <>
      <div className="flex justify-end items-center mb-6">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
            onClick={handleCancel}
          >
            <XIcon className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            disabled={!isValid}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            onClick={handleSubmit(onSubmit)}
          >
            <PlusIcon className="w-4 h-4 " />
            Add Product
          </Button>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter product title" />
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Enter product description"
                      rows={4}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Pricing and Inventory
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0.00"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  )}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <Controller
                  name="sku"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter SKU" />
                  )}
                />
                {errors.sku && (
                  <p className="text-red-500 text-sm">{errors.sku.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  )}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fragrances">Fragrances</SelectItem>
                      <SelectItem value="skincare">Skincare</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                      <SelectItem value="home-decoration">
                        Home Decoration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
