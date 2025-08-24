import React from "react";
import { Control, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreaProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  rows?: number;
}

const TextAreaField = ({
  name,
  control,
  label,
  placeholder,
  rows,
}: FormTextAreaProps) => {
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
            <Textarea {...field} placeholder={placeholder} rows={rows} />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default TextAreaField;
