import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductTableSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTableSkeleton;
