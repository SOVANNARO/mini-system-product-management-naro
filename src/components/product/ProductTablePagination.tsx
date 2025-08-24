import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ActionButton from "../form/ActionButton";
import { ProductResponse } from "@/types/product";

interface ProductTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newSkip: number) => void;
  data: ProductResponse;
}

const ProductTablePagination: React.FC<ProductTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  data,
}) => {
  const handlePageClick = (pageNumber: number) => {
    const newSkip = (pageNumber - 1) * data.limit;
    onPageChange(newSkip);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <ActionButton
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`h-8 w-8 p-0 ${
            currentPage === i ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </ActionButton>
      );
    }
    if (startPage > 1) {
      pageNumbers.unshift(
        <ActionButton
          key="ellipsis-start"
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled
        >
          ...
        </ActionButton>
      );
    }
    if (endPage < totalPages) {
      pageNumbers.push(
        <ActionButton
          key="ellipsis-end"
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled
        >
          ...
        </ActionButton>
      );
    }
    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * data.limit + 1;
  const endIndex = Math.min(currentPage * data.limit, data.total);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <div className="flex-1 text-sm text-gray-700">
        Showing {startIndex} to {endIndex} from {data.total}
      </div>
      <div className="flex items-center space-x-1">
        <ActionButton
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
        />
        {renderPageNumbers()}
        <ActionButton
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
        />
      </div>
    </div>
  );
};

export default ProductTablePagination;
