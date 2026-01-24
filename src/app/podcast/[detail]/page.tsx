import { headers } from "next/headers";
import PodcastClient from "@/components/PodcastClient";

export default async function PodcastPage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /android|iphone|ipad|ipod/i.test(userAgent.toLowerCase());

  return <PodcastClient isMobile={isMobile} />;
}
