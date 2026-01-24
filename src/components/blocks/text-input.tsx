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
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CurrencyInput } from "../ui/currency-input";

type PropsType<T extends FieldValues> = Readonly<{
  id?: string;
  control: Control<T>;
  name: Path<T>;
  label?: string;
  labelAction?: React.ReactNode;
  placeholder?: string;
  description?: string;
  className?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "currency"
    | "number"
    | "time"
    | "decimal";
  disabled?: boolean;
  optional?: boolean;
  min?: string;
  max?: string;
  step?: boolean;
}>;

export function TextInput<T extends FieldValues>({
  id,
  control,
  name,
  label,
  labelAction,
  className,
  placeholder,
  type = "text",
  description,
  disabled,
  optional,
  min = "0",
  max = undefined,
  step,
}: PropsType<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let inputType = type;

  if (type === "password") {
    if (showPassword) {
      inputType = "text";
    } else {
      inputType = "password";
    }
  }

  return (
    <div id={id} className={cn("w-full", className)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel className="gap-x-0 justify-between">
                <div className="mb-2">
                  {label}
                  {!optional && <span className="text-red-500">*</span>}
                </div>
                {labelAction && <>{labelAction}</>}
              </FormLabel>
            )}
            <FormControl>
              {type === "currency" ? (
                <div className={cn(disabled && "cursor-not-allowed")}>
                  <CurrencyInput
                    placeholder={placeholder}
                    disabled={disabled}
                    className="h-9"
                    {...field}
                  />
                </div>
              ) : (
                <div
                  className={cn("relative", disabled && "cursor-not-allowed")}
                >
                  <Input
                    disabled={disabled}
                    placeholder={placeholder}
                    type={inputType}
                    step={type === "number" && step ? 0.1 : undefined}
                    min={type === "number" ? min : undefined}
                    max={type === "number" ? max : undefined}
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (type === "decimal") {
                        value = value.replace(/[^0-9.,]/g, "");
                        value = value.replace(".", ",");
                      }
                      field.onChange(value);
                    }}
                    onBlur={(e) => {
                      if (type === "number" && max !== undefined) {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange("");
                          return;
                        }
                        const numValue = Number(value);
                        if (isNaN(numValue)) {
                          field.onChange(min || "0");
                          return;
                        }
                        if (numValue > Number(max)) {
                          field.onChange(max);
                          return;
                        }
                        if (min !== undefined && numValue < Number(min)) {
                          field.onChange(min);
                          return;
                        }
                      }
                      field.onBlur();
                    }}
                  />
                  {type === "password" && (
                    <>
                      {showPassword ? (
                        <EyeOff
                          className="w-5 h-5 absolute opacity-40 right-4 top-[50%] -translate-y-1/2 cursor-pointer"
                          onClick={toggleShowPassword}
                        />
                      ) : (
                        <Eye
                          className="w-5 h-5 absolute opacity-40 right-4 top-[50%] -translate-y-1/2 cursor-pointer"
                          onClick={toggleShowPassword}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
}
