import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductFormSkeleton = () => {
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
};

export default ProductFormSkeleton;
