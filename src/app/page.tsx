"use client";
import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { ProductTable } from "@/components/product/ProductTable";
import useQueryProduct from "@/stores/product/useQueryProduct";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [pagination, setPagination] = useState({
    skip: 1,
    limit: 10,
  });

  const { data, error, isLoading } = useQueryProduct(pagination);

  const handlePageChange = (newSkip: number) => {
    setPagination((prev) => ({ ...prev, skip: newSkip }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
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
              <ProductTable
                data={data}
                onPageChange={handlePageChange}
                currentPage={Math.floor(data.skip / data.limit) + 1}
                totalPages={Math.ceil(data.total / data.limit)}
              />
            </>
          ) : (
            <p>No data available</p>
          )}
        </main>
      </div>
    </div>
  );
}
