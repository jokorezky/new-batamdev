import { notFound } from "next/navigation";
import BeritaDetailClient from "./BeritaDetailClient";
import { stripHtmlAndTruncate } from "@/lib/stripHtmlAndTruncate";
import type { Metadata } from "next";

export const dynamicParams = true;
export const dynamic = "auto";
type ResolvedParams = { slug: string };

async function resolveParams(
  params: ResolvedParams | Promise<ResolvedParams>
): Promise<ResolvedParams> {
  return params instanceof Promise ? await params : params;
}

const urlEndpoint =
  process.env.NEXT_PUBLIC_API_URL_INTERNAL || `https://api.kinigo.id`;

async function fetchNewsData(slug: string) {
  try {
    const url = `${urlEndpoint}/storyline/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const resolved = await resolveParams(params);
  const storyline = await fetchNewsData(resolved.slug);

  if (!storyline) {
    return {
      title: "Berita Tidak Ditemukan",
      description: "Halaman berita tidak ditemukan",
    };
  }

  const processedContent = stripHtmlAndTruncate(storyline.description, 200);
  const url = `https://kinigo.id/${storyline.url}`;
  return {
    title: storyline.title,
    description: processedContent,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: storyline.title,
      description: processedContent,
      url: url,
      type: "article",
      publishedTime: storyline.createdAt,
      // authors: [storyline.userId.full_name],
      images: storyline.thumbnail_url
        ? [
            {
              url: storyline.thumbnail_url,
              width: 800,
              height: 600,
              alt: storyline.titleThumbnail || storyline.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: storyline.title,
      description: processedContent,
      images: storyline.thumbnail_url ? [storyline.thumbnail_url] : [],
    },
  };
}

export default async function BeritaDetail(props: any) {
  const params = await props.params;
  const resolved = await resolveParams(params);
  const storyline = await fetchNewsData(resolved.slug);
  if (!storyline) return notFound();

  return <BeritaDetailClient news={storyline} />;
}
