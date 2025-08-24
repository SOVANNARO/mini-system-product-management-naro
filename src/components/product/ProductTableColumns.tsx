import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActionButton from "../form/ActionButton";
import { Product } from "@/types/product";

export const getColumns = (
  router: AppRouterInstance,
  onDelete: (id: string) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
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
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      return (
        <div className="flex space-x-2">
          <ActionButton
            variant="ghost"
            size="icon"
            icon={PencilIcon}
            onClick={() => router.push(`/edit-product/${row.original.id}`)}
            aria-label={`Edit ${row.original.title}`}
          />
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <ActionButton
                variant="ghost"
                size="icon"
                icon={TrashIcon}
                onClick={() => setIsDeleteDialogOpen(true)}
                aria-label={`Delete ${row.original.title}`}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this product?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <ActionButton
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="destructive"
                  onClick={() => {
                    onDelete(row.original.id.toString());
                    setIsDeleteDialogOpen(false);
                  }}
                >
                  Delete
                </ActionButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
