import { Metadata } from "next";
import { notFound } from "next/navigation";
import EventPage from "./EventPage";
import { tiptapToPlainText } from "@/lib/tiptapToPlainText";

const urlEndpoint =
  process.env.NEXT_PUBLIC_API_URL_INTERNAL || `https://api.kinigo.id`;
export const dynamic = "force-dynamic";
export const revalidate = 60;

const urlWeb = "https://kinigo.id";

async function fetchEventData(slug: string) {
  try {
    const url = `${urlEndpoint}/events/by-slug?slugname=${slug}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { detail: eventSlug } = params;

  const event = await fetchEventData(eventSlug);

  if (!event) {
    return {
      title: "Event Not Found - kinigo",
      description: "Event tidak ditemukan",
    };
  }

  const description = tiptapToPlainText(event.content, 200);
  const url = `${urlWeb}/events/${event.slugname}`;

  const imageUrl = event.image?.startsWith("http")
    ? event.image
    : `${urlWeb}${
        event.image?.startsWith("/") ? event.image : `/${event.image}`
      }`;

  // OVERRIDE metadata dari layout
  return {
    title: `${event.title} | kinigo Events`,
    description,

    // Hapus/override metadata yang tidak perlu
    keywords: undefined,
    authors: undefined,

    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${event.title} | kinigo Events`,
      description,
      url,
      type: "article",
      siteName: "kinigo",
      locale: "id_ID",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | kinigo Events`,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: any) {
  const { detail: eventSlug } = params;

  const event = await fetchEventData(eventSlug);

  if (!event) {
    notFound();
  }

  const description = tiptapToPlainText(event.content, 300);

  // JSON-LD untuk Event
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: description,
    image: event.image,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.address,
      address: event.address,
    },
    organizer: {
      "@type": "Organization",
      name: event.community?.name || "kinigo",
      url: event.community?.website,
    },
    url: `${urlWeb}/events/${event.slugname}`,
    inLanguage: "id-ID",
    offers: {
      "@type": "Offer",
      url: `${urlWeb}/events/${event.slugname}`,
      price: "0",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
  };

  // JSON-LD untuk Organization (dipindah dari layout)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kinigo",
    url: "https://kinigo.id",
    logo: "https://kinigo.id/favicon.png",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61575679883007",
      "https://www.linkedin.com/company/108433688",
    ],
    description: "Kinigo adalah ekosistem teknologi terdepan di Batam...",
  };

  // JSON-LD untuk Breadcrumb (dipindah dari layout)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kinigo.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: "https://kinigo.id/events",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: event.title,
        item: `${urlWeb}/events/${event.slugname}`,
      },
    ],
  };

  return (
    <>
      {/* Script JSON-LD - RENDER DI SERVER */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <EventPage event={event} eventSlug={eventSlug} />
    </>
  );
}
