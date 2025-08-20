import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  TrashIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Product, ProductResponse } from "@/types/product";

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Image
          src={row.original.thumbnail}
          alt={row.getValue("title")}
          width={40}
          height={40}
          className="object-cover rounded-md"
        />
        <div className="font-medium">{row.getValue("title")}</div>
      </div>
    ),
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "meta.createdAt",
    header: "Added",
    cell: ({ row }) => {
      const date = new Date(row.original.meta.createdAt);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Edit", row.original.id)}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Delete", row.original.id)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

interface ProductTableProps {
  data: ProductResponse;
  onPageChange: (newSkip: number) => void;
  currentPage: number;
  totalPages: number;
}

export function ProductTable({
  data,
  onPageChange,
  currentPage,
  totalPages,
}: ProductTableProps) {
  const table = useReactTable({
    data: data.products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`h-8 w-8 p-0 ${
            currentPage === i ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <Button
          key="ellipsis-start"
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled
        >
          ...
        </Button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <Button
          key="ellipsis-end"
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled
        >
          ...
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="flex-1 text-sm text-gray-700">
          Showing {data.skip + 1} to{" "}
          {Math.min(data.skip + data.limit, data.total)} from {data.total}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {renderPageNumbers()}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
