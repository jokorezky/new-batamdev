// app/[userSlug]/page.tsx
import { redirect, notFound } from "next/navigation";
import CommunityPage from "./components/CommunityPage";
import { CommunityResponse, CommunityMembersSummary } from "@/types/Community";

type ResolvedParams = { userSlug: string };

const urlEndpoint =
  process.env.NEXT_PUBLIC_API_URL_INTERNAL || `https://api.kinigo.id`;

async function resolveParams(
  params: ResolvedParams | Promise<ResolvedParams>
): Promise<ResolvedParams> {
  return params instanceof Promise ? await params : params;
}

async function fetchShortById(
  shortId: string
): Promise<{ description: string } | null> {
  try {
    const url = `${urlEndpoint}/short/${shortId}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch short URL error:", error);
    return null;
  }
}

async function fetchCommunityByUrl(
  slug: string
): Promise<CommunityResponse | null> {
  try {
    const url = `${urlEndpoint}/community/by-url?url=${slug}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch community error:", error);
    return null;
  }
}

async function fetchCommunityMembersSummary(
  communityId: string
): Promise<CommunityMembersSummary | null> {
  try {
    const url = `${urlEndpoint}/community/members/summary?communityId=${communityId}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error("Fetch members summary error:", res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch members summary error:", error);
    return null;
  }
}

export default async function UserSlugPage(props: any) {
  const params = await props.params;
  const resolved = await resolveParams(params);
  const slug = resolved.userSlug;

  const short = await fetchShortById(slug);
  if (short?.description) {
    return redirect(short.description);
  }

  const community = await fetchCommunityByUrl(slug);
  if (!community) return notFound();

  const membersSummary = await fetchCommunityMembersSummary(community._id);

  return (
    <CommunityPage
      community={community}
      totalMembers={membersSummary?.totalMembers || "0"}
      sampleMembers={membersSummary?.sampleMembers || []}
    />
  );
}
