import { Textarea } from "@/components/ui/textarea";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/FormField";

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  rows?: number;
}

export function TextareaField({
  label,
  name,
  placeholder,
  isRequired = false,
  isDisabled = false,
  rows = 3,
}: TextareaFieldProps) {
  return (
    <FormField name={name}>
      {(field) => (
        <FormItem>
          <FormLabel className="font-bold text-gray-600">
            {label} {isRequired && <span className="text-red-500">*</span>}{" "}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={isDisabled}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    </FormField>
  );
}
