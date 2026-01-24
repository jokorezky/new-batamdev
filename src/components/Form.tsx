"use client";

import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  children: React.ReactNode;
  onSubmit: (data: T) => void;
}

export function Form<T extends FieldValues>({
  form,
  children,
  onSubmit,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {children}
      </form>
    </FormProvider>
  );
}
