import { Metadata } from "next";
import { ClientProvider } from "@/components/ClientProvider";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "batamdev - Empowering Batam's Tech Community",
  description: "Kinigo adalah ekosistem teknologi terdepan di Batam...",
  icons: {
    icon: "/header-logo.png",
    shortcut: "/header-logo.png",
    apple: "/header-logo.png",
  },
  keywords: [],
  openGraph: {
    title: "kinigo - Menuju Masa Depan",
    description: "Kinigo adalah ekosistem teknologi terdepan di Batam...",
    url: "https://kinigo.id",
    siteName: "Kinigo",
    images: [
      {
        url: "https://kinigo.id/_e632d0d5-adf9-46bd-8b1b-bb358d61e6f7.jpeg",
        width: 1200,
        height: 630,
        alt: "kinigo - Menuju Masa Depan",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "kinigo - Menuju Masa Depan",
    description: "Kinigo adalah ekosistem teknologi terdepan di Batam...",
    images: ["https://kinigo.id/_e632d0d5-adf9-46bd-8b1b-bb358d61e6f7.jpeg"],
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
    <html lang="id">
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
