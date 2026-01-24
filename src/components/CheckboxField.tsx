import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface CheckboxFieldProps {
  label: string;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export function CheckboxField({
  label,
  name,
  isRequired = false,
  isDisabled = false,
}: CheckboxFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex space-x-2">
            <FormControl>
              <Checkbox
                id={name}
                disabled={isDisabled}
                checked={field.value || false} // Default false jika undefined
                onCheckedChange={field.onChange} // Update form state
                className="text-white focus:ring-red-500 !checked:bg-red-500 !border-red-500"
              />
            </FormControl>
            <FormLabel
              htmlFor={name}
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                fieldState.error ? "text-red-500" : "text-black"
              }`} // Warna berubah merah jika error
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}
