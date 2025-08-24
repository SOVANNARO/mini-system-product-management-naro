import React from "react";
import { Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
}

const TextInputField = ({
  name,
  control,
  label,
  placeholder,
}: FormFieldProps) => {
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
            <Input {...field} placeholder={placeholder} />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default TextInputField;
