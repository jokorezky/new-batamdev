"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Combobox } from "../ui/combobox";

type PropsType<T extends FieldValues> = Readonly<{
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  source: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  optional?: boolean;
  onSearch?: (keyword: string) => void;
  placeholder?: string;
}>;

export function ComboboxInput<T extends FieldValues>({
  control,
  name,
  label,
  className,
  description,
  source,
  disabled,
  optional,
  onSearch,
  placeholder,
}: PropsType<T>) {
  return (
    <div className={cn("w-full", className)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel className="gap-x-0">
                {label}
                {!optional && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <div
                className={cn("w-full grid", disabled && "cursor-not-allowed")}
              >
                <Combobox
                  value={field.value}
                  onChange={field.onChange}
                  source={source}
                  disabled={disabled}
                  onSearch={onSearch}
                  placeholder={placeholder}
                />
              </div>
            </FormControl>
            {description && (
              <FormDescription className="dark:text-white text-xs">
                {description}
              </FormDescription>
            )}
            <FormMessage className="text-red-500 text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
