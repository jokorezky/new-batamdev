"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxItem {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

interface ComboboxProps {
  readonly items: readonly ComboboxItem[];
  readonly placeholder?: string;
  readonly searchPlaceholder?: string;
  readonly emptyText?: string;
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly disabled?: boolean;
}

export function Combobox({
  items,
  placeholder = "Select an item...",
  searchPlaceholder = "Filter items...",
  emptyText = "No items found.",
  className,
  value,
  onChange,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const filteredItems = (items ?? []).filter(
    (item) =>
      item?.label &&
      item.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative">
      <select
        aria-hidden="true"
        className="absolute opacity-0 w-0 h-0"
        tabIndex={-1}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" className="text-gray-600">
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </select>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-between text-gray-600", className)}
            disabled={disabled}
            onClick={() => {
              setOpen(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
          >
            {value
              ? items.find((item) => item.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="p-1">
            <input
              ref={inputRef}
              type="text"
              placeholder={searchPlaceholder}
              className="w-full h-9 px-3 py-2 text-sm border-b rounded-t-md focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              <div className="grid gap-1 p-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.value}
                    className={cn(
                      "w-full text-left p-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
                      value === item.value &&
                        "bg-accent text-accent-foreground",
                      item.disabled && "opacity-50 pointer-events-none"
                    )}
                    onClick={() => {
                      onChange?.(item.value);
                      setOpen(false);
                      setSearchValue("");
                    }}
                    disabled={item.disabled}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      {value === item.value && <Check className="h-4 w-4" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
