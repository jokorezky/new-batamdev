'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateCommunityPage(slug: string) {
    revalidatePath(`/community/${slug}`);
}