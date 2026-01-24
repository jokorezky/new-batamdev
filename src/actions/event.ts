"use server";

import { revalidatePath } from "next/cache";
export async function revalidateEventPage(slugname: string) {
  revalidatePath(`/events/${slugname}`);
}
