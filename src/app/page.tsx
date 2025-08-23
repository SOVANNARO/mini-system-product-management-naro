"use client";
import { useState } from "react";
import { ProductTable } from "@/components/product/ProductTable";
import useQueryProduct from "@/stores/product/useQueryProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import usePageTitleStore from "@/stores/usePageTitleStore";
import { useEffect } from "react";
import { toast } from "sonner";
import useMutateProduct from "@/stores/product/useMutateProduct";

export default function Home() {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    skip: 1,
    limit: 10,
  });

  const { data, error, isLoading } = useQueryProduct(pagination);
  const { deleteProduct } = useMutateProduct();

  const setTitle = usePageTitleStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Product");
  }, [setTitle]);

  const handlePageChange = (newSkip: number) => {
    setPagination((prev) => ({ ...prev, skip: newSkip }));
  };

  const handleAddProduct = () => {
    router.push("/add-product");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      ) : data ? (
        <>
          <div className="flex justify-end items-center mb-4">
            <Button
              className="bg-blue-500 cursor-pointer hover:bg-blue-500"
              onClick={handleAddProduct}
            >
              <PlusIcon /> Add Product
            </Button>
          </div>
          <ProductTable
            data={data}
            onPageChange={handlePageChange}
            currentPage={Math.floor(data.skip / data.limit) + 1}
            totalPages={Math.ceil(data.total / data.limit)}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
