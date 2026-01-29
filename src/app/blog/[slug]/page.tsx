
import { notFound } from "next/navigation";
import BeritaDetailClient from "./BeritaDetailClient";
import { stripHtmlAndTruncate } from "@/lib/stripHtmlAndTruncate";
import type { Metadata } from "next";

export const dynamicParams = true;
export const dynamic = "auto";
type ResolvedParams = { slug: string };

const urlEndpoint =
  process.env.NEXT_PUBLIC_API_URL_INTERNAL || `https://api.kinigo.id`;

async function resolveParams(
  params: ResolvedParams | Promise<ResolvedParams>
): Promise<ResolvedParams> {
  return params instanceof Promise ? await params : params;
}

async function fetchNewsData(slug: string) {
  try {
    const url = `${urlEndpoint}/news/blog/${slug}`;
    console.log("url", url)
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
  const news = await fetchNewsData(resolved.slug);
  if (!news) {
    return {
      title: "Berita Tidak Ditemukan",
      description: "Halaman berita tidak ditemukan",
    };
  }

  const processedContent = stripHtmlAndTruncate(news.content, 200);
  const url = `https://batamdev.org/${news.url}`;
  return {
    title: news.title,
    description: processedContent,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: news.title,
      description: processedContent,
      url: url,
      type: "article",
      publishedTime: news.createdAt,
      authors: [news.userId.full_name],
      images: news.thumbnail_url
        ? [
            {
              url: news.thumbnail_url,
              width: 800,
              height: 600,
              alt: news.titleThumbnail || news.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: processedContent,
      images: news.thumbnail_url ? [news.thumbnail_url] : [],
    },
  };
}

export default async function BeritaDetail(props: any) {
  const params = await props.params;
  const resolved = await resolveParams(params);
  const news = await fetchNewsData(resolved.slug);
  if (!news) return notFound();

  return <BeritaDetailClient news={news} />;
}
