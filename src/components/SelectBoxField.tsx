import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface SelectBoxFieldProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  noBorder?: boolean;
  isFormLabelBold?: boolean;
}

export function SelectBoxField({
  label,
  name,
  options,
  isRequired = false,
  isDisabled = false,
  onChange,
  noBorder = false,
  isFormLabelBold = true,
}: SelectBoxFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={`${
              isFormLabelBold ? "font-bold" : "font-normal"
            } text-gray-600`}
          >
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>

          <FormControl>
            <Select
              disabled={isDisabled}
              onValueChange={(value) => {
                if (field.value !== value) {
                  field.onChange(value);
                  onChange?.(value);
                }
              }}
              value={field.value ?? ""}
            >
              <SelectTrigger
                className={
                  noBorder
                    ? "h-10 border-0 border-b border-gray-300 rounded-none px-0 focus:ring-0 focus:border-black"
                    : "h-10 border border-gray-300 rounded-md"
                }
              >
                <SelectValue placeholder="Pilih opsi" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
