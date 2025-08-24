"use client";
import { useState } from "react";
import { ProductTable } from "@/components/product/ProductTable";
import useQueryProduct from "@/stores/product/useQueryProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import usePageTitleStore from "@/stores/usePageTitleStore";
import { useEffect } from "react";
import { toast } from "sonner";
import useMutateProduct from "@/stores/product/useMutateProduct";
import ActionButton from "@/components/form/ActionButton";
import ProductTableSkeleton from "@/components/product/ProductTableSkeleton";

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
        <ProductTableSkeleton />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      ) : data ? (
        <>
          <div className="flex justify-end items-center mb-4">
            <ActionButton
              onClick={handleAddProduct}
              icon={PlusIcon}
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Product
            </ActionButton>
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
