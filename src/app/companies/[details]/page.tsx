import { notFound } from "next/navigation";
import CompaniesDetailClient from "./CompaniesDetailClient";
import type { Metadata } from "next";

export const dynamicParams = true;
export const dynamic = "auto";
type ResolvedParams = { details: string };

const urlEndpoint = process.env.NEXT_PUBLIC_API_URL || "https://api.kinigo.id";

async function resolveParams(
  params: ResolvedParams | Promise<ResolvedParams>
): Promise<ResolvedParams> {
  return params instanceof Promise ? await params : params;
}

async function fetchCompanyData(slug: string) {
  try {
    const url = `${urlEndpoint}/companies/${slug}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata(props: {
  params: Promise<ResolvedParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const resolved = await resolveParams(params);
  const company = await fetchCompanyData(resolved.details);

  if (!company) {
    return {
      title: "Perusahaan Tidak Ditemukan",
      description: "Halaman perusahaan tidak ditemukan",
    };
  }

  const url = `https://kinigo.id/companies/${company.url}`;
  return {
    title: company.name,
    description: company.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: company.name,
      description: company.description,
      url: url,
      type: "website",
      images: company.logo
        ? [
            {
              url: company.logo,
              width: 800,
              height: 600,
              alt: company.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: company.name,
      description: company.description,
      images: company.logo ? [company.logo] : [],
    },
  };
}

export default async function CompaniesDetail(props: {
  params: Promise<ResolvedParams>;
}) {
  const params = await props.params;
  const resolved = await resolveParams(params);
  const company = await fetchCompanyData(resolved.details);

  if (!company) return notFound();

  return <CompaniesDetailClient company={company} />;
}
