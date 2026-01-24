import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch("https://api.kinigo.id/news/lists", {
    next: { revalidate: 60 },
  });

  const json = await res.json();

  const posts = Array.isArray(json.data) ? json.data : [];

  const blogUrls = posts.map((post: any) => ({
    url: `https://kinigo.id/${post.url}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [
    {
      url: "https://kinigo.id/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://kinigo.id/events",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://kinigo.id/companies",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
