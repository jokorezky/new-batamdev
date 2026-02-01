"use client";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname, useSearchParams } from "next/navigation";
import { store, persistor } from "@/redux/store";
import { apolloClient } from "@/lib/apolloClient";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextIntlClientProvider } from "next-intl";
import { useLanguage, LanguageProvider } from "@/providers/LanguageProvider";
import * as gtag from "@/lib/gtag";

function IntlWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();

  let messages;
  try {
    messages = require(`../locales/${locale}.json`);
  } catch (error) {
    console.error(`Locale ${locale} not found, falling back to default`);
    try {
      messages = require(`../locales/id.json`);
    } catch {
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && searchParams) {
      const url = `${pathname}?${searchParams.toString()}`;
      const newUrl = `https://kinigo.id/${url}`;
      gtag.pageview(newUrl);
    }
  }, [pathname, searchParams]);

  return null;
}

function FooterConditional() {
  const pathname = usePathname();

  const noFooterRoutes = ["/academies", "/settings"];
  const shouldHideFooter = noFooterRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider clientId="594544788808-r86u62us389pralrq94jjffau32vdq5j.apps.googleusercontent.com">
            <LanguageProvider>
              <IntlWrapper>
                <TooltipProvider>
                  <GoogleAnalyticsTracker />
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <FooterConditional />
                  <Toaster />
                </TooltipProvider>
              </IntlWrapper>
            </LanguageProvider>
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
