import React from "react";
import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FormNumberFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  integer?: boolean;
}

const NumberInputField = ({
  name,
  control,
  label,
  placeholder,
  integer = false,
}: FormNumberFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              type="number"
              placeholder={placeholder}
              onChange={(e) =>
                field.onChange(
                  integer
                    ? parseInt(e.target.value, 10) || 0
                    : parseFloat(e.target.value) || 0
                )
              }
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default NumberInputField;
