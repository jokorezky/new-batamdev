import { Metadata } from "next";
import { ClientProvider } from "@/components/ClientProvider";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BatamDev – Empowering Batam's Tech Community",
  description:
    "BatamDev is a technology and developer community in Batam focused on collaboration, events, hackathons, and growing digital talent.",
  icons: {
    icon: "/header-logo.png",
    shortcut: "/header-logo.png",
    apple: "/header-logo.png",
  },
  keywords: [
    "BatamDev",
    "Batam Developer Community",
    "Tech Community Batam",
    "Hackathon Batam",
    "Developer Events Batam",
    "Software Engineers Batam"
  ],
  openGraph: {
    title: "BatamDev – Empowering Batam's Tech Community",
    description:
      "A developer community in Batam for collaboration, hackathons, workshops, and real-world tech innovation.",
    url: "https://batamdev.org",
    siteName: "BatamDev",
    images: [
      {
        url: "https://batamdev.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BatamDev – Empowering Batam's Tech Community",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BatamDev – Empowering Batam's Tech Community",
    description:
      "Connecting developers in Batam through events, hackathons, and technology collaboration.",
    images: ["https://batamdev.org/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6946744130532669" />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
