import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { FormField } from "@/components/FormField";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  description?: string;
}

export function InputField({
  label,
  name,
  placeholder,
  type = "text",
  isRequired = false,
  isDisabled = false,
  description,
}: InputFieldProps) {
  return (
    <FormField name={name}>
      {(field) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-bold">
            {label} {isRequired && <span className="text-red-500">*</span>}{" "}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={isDisabled} // Tambahkan disabled berdasarkan properti isDisabled
              {...field}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>{description}</FormDescription>
        </FormItem>
      )}
    </FormField>
  );
}
