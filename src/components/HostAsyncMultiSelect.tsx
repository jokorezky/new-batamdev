"use client";

import React, { useState, useMemo, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { ControllerRenderProps } from "react-hook-form";
import { useSearchUsers } from "@/hooks/use-user";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface HostAsyncMultiSelectProps {
  readonly label: string;
  readonly name: string;
  readonly placeholder?: string;
  readonly isRequired?: boolean;
  readonly description?: string;
  readonly field: ControllerRenderProps<any, string>;
}

export function HostAsyncMultiSelect({
  label,
  name,
  placeholder = "Search hosts...",
  isRequired = false,
  description,
  field,
}: Readonly<HostAsyncMultiSelectProps>) {
  // 1. State hooks first
  const [inputValue, setInputValue] = useState("");

  // 2. Data fetching hooks next
  const { users, loading } = useSearchUsers(inputValue);

  // 4. Memoized callbacks
  const loadOptions = useCallback(
    (searchTerm: string) => {
      setInputValue(searchTerm);
      return Promise.resolve(
        users.map((user) => ({
          value: user._id,
          label: user.full_name || user.username || "",
        }))
      );
    },
    [users]
  );

  const customStyles = useMemo(
    () => ({
      control: (provided: any) => ({
        ...provided,
        minHeight: "40px",
        borderColor: "hsl(var(--input))",
        "&:hover": {
          borderColor: "hsl(var(--input))",
        },
      }),
      multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: "hsl(var(--secondary))",
      }),
      multiValueLabel: (provided: any) => ({
        ...provided,
        color: "hsl(var(--secondary-foreground))",
      }),
    }),
    []
  );

  return (
    <FormItem>
      <FormLabel className="font-bold">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </FormLabel>
      <FormControl>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          styles={customStyles}
          classNamePrefix="react-select"
          isLoading={loading}
          noOptionsMessage={() =>
            inputValue
              ? loading
                ? "Searching..."
                : "No users found"
              : "Type to search users"
          }
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
