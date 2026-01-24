"use client";

import React, { useState, useMemo, useCallback } from "react";
import AsyncSelect from "react-select/async";
import type { OptionsOrGroups, GroupBase } from "react-select";
import { ControllerRenderProps } from "react-hook-form";
import { useListCategories } from "@/hooks/use-category-community";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import debounce from "lodash.debounce";

interface CategoryOption {
  value: string;
  label: string;
  data?: any;
}

interface CategoryAsyncSelectProps {
  readonly label: string;
  readonly name: string;
  readonly placeholder?: string;
  readonly isRequired?: boolean;
  readonly description?: string;
  readonly field: ControllerRenderProps<any, string>;
  readonly isMulti?: boolean;
}

export function CategoryAsyncSelect({
  label,
  name,
  placeholder = "Search categories...",
  isRequired = false,
  description,
  field,
  isMulti = false,
}: Readonly<CategoryAsyncSelectProps>) {
  const [inputValue, setInputValue] = useState("");
  const { categories, loading, refetch } = useListCategories({
    search: inputValue,
    limit: 10,
  });

  const loadOptions = useCallback(
    (
      inputValue: string,
      callback: (
        options: OptionsOrGroups<CategoryOption, GroupBase<CategoryOption>>
      ) => void
    ) => {
      refetch().then(() => {
        const options = categories.map((category) => ({
          value: category._id,
          label: category.name,
          data: category,
        }));
        callback(options);
      });
    },
    [categories, refetch]
  );

  const debouncedLoadOptions = useMemo(
    () => debounce(loadOptions, 500),
    [loadOptions]
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
        <AsyncSelect<CategoryOption, boolean, GroupBase<CategoryOption>>
          isMulti={isMulti}
          cacheOptions
          defaultOptions
          loadOptions={debouncedLoadOptions}
          placeholder={placeholder}
          value={field.value}
          onChange={(value) => {
            field.onChange(value || (isMulti ? [] : null));
          }}
          onBlur={field.onBlur}
          onInputChange={(newValue) => setInputValue(newValue)}
          styles={customStyles}
          classNamePrefix="react-select"
          isLoading={loading}
          noOptionsMessage={() =>
            inputValue
              ? loading
                ? "Searching..."
                : "No categories found"
              : "Type to search categories"
          }
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
