import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import React from "react";

const EditProduct = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">Product</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-600">Edit Product</span>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <Input placeholder="Smartwatch E2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  placeholder="Smartwatch for men women notify you incoming calls, SMS notifications. when you connect the smartphone with fitness tracker. Connect fitness tracker with your phone, you will never miss a call and a message. The smart watches for android phones will vibrate to alert you if your phone receives any notifications. You can reject calls and view message directly from your watch. A best gift for family and friends"
                  rows={6}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price
                </label>
                <Input type="number" placeholder="400.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage (%)
                </label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <Input placeholder="302002" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <Input type="number" placeholder="124" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <Select>
                <option value="watch">Watch</option>
                {/* Add more options as needed */}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
