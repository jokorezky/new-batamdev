"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/FormField";

interface DatePickerFieldProps {
  label: string;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export function DatePickerField({
  label,
  name,
  isRequired = false,
  isDisabled = false,
}: DatePickerFieldProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <FormField name={name}>
      {(field) => (
        <FormItem>
          <FormLabel className="font-bold text-gray-600">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-between text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  disabled={isDisabled}
                >
                  {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    field.onChange(selectedDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    </FormField>
  );
}
