import { z } from "zod";
export const domainSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
  communityId: z.string().min(1, "Domain is required"),
});
