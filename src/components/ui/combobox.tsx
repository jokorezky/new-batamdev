"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboboxProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
  source: {
    value: string;
    label: React.ReactNode;
  }[];
  disabled?: boolean;
  align?: "start" | "center" | "end";
  onSearch?: (keyword: string) => void;
  placeholder?: string;
}>;

export function Combobox({
  value,
  onChange,
  source,
  disabled,
  align = "start",
  onSearch,
  placeholder,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleInputChange = (val: string) => {
    if (
      onSearch &&
      !source.some((item) =>
        extractText(item.label).toLowerCase().includes(val.toLowerCase())
      )
    ) {
      onSearch(val);
    }
  };

  const extractText = (label: React.ReactNode): string => {
    if (typeof label === "string" || typeof label === "number") {
      return label.toString();
    }
    if (Array.isArray(label)) {
      return label.map(extractText).join("");
    }
    if (React.isValidElement(label)) {
      const props = label.props as { children?: React.ReactNode };
      return extractText(props.children);
    }
    return "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn(
            "justify-between w-full overflow-hidden",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          {value ? (
            <span className="truncate">
              {source.find((item) => item.value === value)?.label}
            </span>
          ) : (
            <span className="truncate text-muted-foreground">
              {placeholder ?? "Select one..."}
            </span>
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align={align}>
        <Command>
          <CommandInput
            placeholder="Search anything..."
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty>No one found.</CommandEmpty>
            <CommandGroup>
              {source.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={[extractText(item.label)]}
                  onSelect={(currentValue: string) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
