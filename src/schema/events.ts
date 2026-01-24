import { z } from "zod";

export const eventSchema = z
  .object({
    _id: z.string().optional(),
    type_actifity: z.string().min(1, "Activity type is required"),
    communityId: z.string().min(1, "community type is required"),
    category: z.string().min(1, "Category is required"),
    format: z.string().min(1, "Format is required"),
    title: z.string().min(1, "Title is required"),
    startDate: z.date(),
    endDate: z.date(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    timezone: z.string().min(1, "Timezone is required"),
    address: z.string().min(1, "Address is required"),
    location_map: z.string().optional(),
    capacity: z.number().optional(),
    isApprovalRequired: z.boolean().optional(),
    isFree: z.boolean(),
    is_active: z.boolean().optional(),
    content: z.string().min(1, "Content is required"),
    thumbnail_url: z.union([z.string(), z.instanceof(File)]).optional(),
    bank_account: z.string().optional(),
    account_number: z.string().optional(),
    account_name: z.string().optional(),
    ticket_price: z.string().optional(),
    hosts: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .nonempty("Please select at least one host"),
    collaboratingCommunities: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional()
      .default([]),
    useRegistrationLink: z.boolean().default(false),
    registration_link: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.useRegistrationLink) {
      if (!data.registration_link || data.registration_link.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Registration link is required when using custom registration",
          path: ["registration_link"],
        });
      } else {
        try {
          new URL(data.registration_link);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Registration link must be a valid URL",
            path: ["registration_link"],
          });
        }
      }
    }
  });
