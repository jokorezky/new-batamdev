import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address." });

export const fullnameSchema = z
  .string()
  .min(1, { message: "Full name is required." });

export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters." });

export const stringSchema = z.string();

export const acceptTermsSchema = z
  .boolean()
  .refine((value) => value === true, { message: "You must accept the terms." });

export const dateSchema = z
  .string()
  .refine((value) => !isNaN(Date.parse(value)), {
    message: "Please enter a valid date.",
  })
  .transform((value) => new Date(value));

export const birthDateSchema = z.coerce.date({
  errorMap: () => ({ message: "Tanggal lahir tidak valid." }),
});
