import {
  useFormContext,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { ReactElement } from "react";

interface FormFieldProps {
  name: string;
  children: (field: ControllerRenderProps<FieldValues, string>) => ReactElement<any>;
}

export function FormField({ name, children }: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => children(field)}
    />
  );
}
