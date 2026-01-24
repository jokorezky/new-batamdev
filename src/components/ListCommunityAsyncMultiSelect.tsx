"use client";

import React, { useState, useMemo, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { ControllerRenderProps } from "react-hook-form";
// import { useSearchUsers } from "@/hooks/use-user";
import { useSearchCommunities } from "@/hooks/use-community";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface CommunityAsyncSelectProps {
  readonly label: string;
  readonly name: string;
  readonly placeholder?: string;
  readonly isRequired?: boolean;
  readonly description?: string;
  readonly field: ControllerRenderProps<any, string>;
}

export function CommunityAsyncSelect({
  label,
  name,
  placeholder = "Search community...",
  isRequired = false,
  description,
  field,
}: Readonly<CommunityAsyncSelectProps>) {
  // 1. State hooks first
  const [inputValue, setInputValue] = useState("");

  // 2. Data fetching hooks next
  const { communities, loading } = useSearchCommunities({
    keyword: inputValue,
    limit: 5,
    skip: 0,
  });

  // 4. Memoized callbacks
  const loadOptions = useCallback(
    (searchTerm: string) => {
      setInputValue(searchTerm);
      return Promise.resolve(
        communities.map((community) => ({
          value: community._id,
          label: community.name,
        }))
      );
    },
    [communities]
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
                : "No community found"
              : "Type to search community"
          }
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
