import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ProductResponse } from "@/types/product";
import { getColumns } from "./ProductTableColumns";
import ProductTablePagination from "./ProductTablePagination";

interface ProductTableProps {
  data: ProductResponse;
  onPageChange: (newSkip: number) => void;
  currentPage: number;
  totalPages: number;
  onDelete: (id: string) => void;
}

export function ProductTable({
  data,
  onPageChange,
  currentPage,
  totalPages,
  onDelete,
}: ProductTableProps) {
  const router = useRouter();
  const columns = getColumns(router, onDelete);

  const table = useReactTable({
    data: data.products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <ProductTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        data={data}
      />
    </div>
  );
}
