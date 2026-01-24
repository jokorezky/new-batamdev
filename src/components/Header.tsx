import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNav } from "@/components/main-nav";
import { SubNav } from "@/components/sub-nav";
import { Auth } from "@/components/Auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Search from "@/components/search";
import { ArrowBigLeft, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function Header() {
  const isAuthenticated = useAuth();
  const pathname = usePathname();
  const isValidFormat = /^\/\d{4}\/\d{2}\/\d{2}\/[^/]+$/.test(pathname);
  const isDarkHeader = /^\/academies\/[^/]+\/learning$/.test(pathname);
  const hideAllHeader =
    pathname === "/companies/create" ||
    pathname === "/companies/create-new-company" ||
    pathname === "/jobs/create" ||
    pathname === "/jobs/onboarding";

  const isUserSlugRoute =
    /^\/[^/]+(\/|$)/.test(pathname) &&
    !pathname.startsWith("/jobs") &&
    !pathname.startsWith("/events") &&
    !pathname.startsWith("/companies") &&
    !pathname.startsWith("/about") &&
    !pathname.startsWith("/category") &&
    !pathname.startsWith("/advertise") &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/podcast") &&
    !pathname.startsWith("/subscription") &&
    !pathname.startsWith("/news");

  const modules = useSelector((state: RootState) => state.moduleAjar.modules);
  const title = modules[0]?.learningProgram?.title;
  const staticRoutes = [
    "/jobs",
    "/events",
    "/companies",
    "/about",
    "/advertise",
    "/dashboard",
  ];
  const isDynamicRoute =
    !staticRoutes.includes(pathname) && /^\/[a-zA-Z0-9-_]+$/.test(pathname);

  const [hideNav, setHideNav] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isPodcast = pathname.startsWith("/podcast");

  const shouldHideSubNav =
    pathname === "/events/create" ||
    pathname === "/collaboration/accept" ||
    isPodcast ||
    isUserSlugRoute ||
    (pathname.includes("/events/") && pathname.endsWith("/edit"));


  const isSubscriptionPage = pathname === "/subscription";
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > scrollTop && currentScroll > 100) {
        setHideNav(true);
      } else if (currentScroll < scrollTop && currentScroll < 10) {
        setHideNav(false);
      }

      setScrollTop(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop]);

  useEffect(() => {
    if (hideNav) {
      setTimeout(() => setShowLogo(true), 100);
    } else {
      setShowLogo(false);
    }
  }, [hideNav]);

  if (hideAllHeader) return null;

  if (isSubscriptionPage) {
    return (
      <header className="sticky top-0 w-full bg-gray-50 z-50">
        <nav className="w-full flex justify-center py-4">
          <div className="flex items-center gap-2">
            <Link href="/" passHref>
              <div className="relative cursor-pointer">
                <Image
                  src="/logo-text-black.png"
                  alt="Logo"
                  width={130}
                  height={10}
                  priority
                />
              </div>
            </Link>
            <p className="uppercase text-gray-500 text-sm">Subscription</p>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 w-full transition-all duration-300 z-50 ${isPodcast
        ? hideNav
          ? ""
          : "bg-muted border-b border-gray-200"
        : isDarkHeader
          ? "bg-muted border-b border-gray-200 border-b-[1px] border-gray-500"
          : hideNav
            ? ""
            : "bg-muted border-b border-gray-200"
        }`}
    >
      <nav
        className={`w-full transition-all duration-300 relative z-10 ${hideNav ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
      >
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="flex gap-3 sm:gap-5 items-center">
              {isDarkHeader ? (
                <div className="flex items-center gap-4 sm:gap-8">
                  <Link href="/" passHref>
                    <div className="relative cursor-pointer">
                      <Image
                        src="/Asset 4.svg"
                        alt="Logo"
                        width={70}
                        height={10}
                        priority
                      />
                    </div>
                  </Link>
                  <Link href="/academies" passHref>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-gray-800 hover:text-white font-bold text-sm sm:text-base lg:text-xl"
                    >
                      <ArrowBigLeft className="w-4 h-4 sm:w-5 sm:h-5" /> {title}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="md:hidden pt-2">
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                      <DrawerTrigger onClick={() => setIsDrawerOpen(true)}>
                        <Menu
                          className={`w-6 h-6 sm:w-5 sm:h-5 mr-3 ${isPodcast ? "text-white" : "text-[#d3cdcd]"
                            }`}
                        />
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerDescription>
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                            >
                              <AccordionItem value="item-1">
                                <Link
                                  href="/"
                                  passHref
                                  onClick={() => setIsDrawerOpen(false)}
                                >
                                  <p className="py-4 text-left font-bold">
                                    NEWS
                                  </p>
                                </Link>
                              </AccordionItem>
                              <AccordionItem value="item-2">
                                <Link
                                  href="/jobs"
                                  passHref
                                  onClick={() => setIsDrawerOpen(false)}
                                >
                                  <p className="py-4 text-left font-bold">
                                    JOBS
                                  </p>
                                </Link>
                              </AccordionItem>
                              <AccordionItem value="item-3">
                                <AccordionTrigger className="font-bold">
                                  EVENTS
                                </AccordionTrigger>
                                <AccordionContent className="text-left">
                                  <div
                                    className="ml-2"
                                    onClick={() => setIsDrawerOpen(false)}
                                  >
                                    <Link href="/events" passHref>
                                      <p className="py-2 text-left font-bold">
                                        UPCOMMING
                                      </p>
                                    </Link>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-2">
                                <Link
                                  href="/podcast"
                                  passHref
                                  onClick={() => setIsDrawerOpen(false)}
                                >
                                  <p className="py-4 text-left font-bold">
                                    PODTCAST VIDEO
                                  </p>
                                </Link>
                              </AccordionItem>
                              <AccordionItem value="item-4">
                                <AccordionTrigger className="font-bold">
                                  DATABASE
                                </AccordionTrigger>
                                <AccordionContent className="text-left">
                                  <div className="ml-2">
                                    <Link
                                      href="companies"
                                      passHref
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <p className="py-2 text-left font-bold">
                                        COMPANIES
                                      </p>
                                    </Link>
                                    <Link
                                      href="/companies/why-kinigo-database"
                                      passHref
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <p className="py-2 text-left font-bold">
                                        WHY KINIGO DATABASE
                                      </p>
                                    </Link>
                                    <Link
                                      href="/companies/create-new-company"
                                      passHref
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <p className="py-2 text-left font-bold">
                                        CREATE COMPANY
                                      </p>
                                    </Link>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-5">
                                <AccordionTrigger className="font-bold">
                                  ABOUT
                                </AccordionTrigger>
                                <AccordionContent className="text-left">
                                  <div className="ml-2">
                                    <Link
                                      href="/about"
                                      passHref
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <p className="py-2 text-left font-bold">
                                        KINIGO
                                      </p>
                                    </Link>
                                    <Link
                                      href="/about/team"
                                      passHref
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <p className="py-2 text-left font-bold">
                                        TEAM
                                      </p>
                                    </Link>
                                    <Link
                                      href="/about/wall-of-love"
                                      passHref
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      <p className="py-2 text-left font-bold">
                                        WALL OFF LOVE
                                      </p>
                                    </Link>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </DrawerDescription>
                        </DrawerHeader>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <Link href="/" passHref>
                    <div className="relative cursor-pointer py-3 sm:py-0">
                      <Image
                        src={isPodcast ? "/Asset 4.svg" : "/Asset 4.svg"}
                        alt="Logo"
                        width={50}
                        height={10}
                        priority
                        className="w-[30px] sm:w-[40px] sm:h-[40px]"
                      />
                    </div>
                  </Link>
                </div>
              )}

              {!isDarkHeader && (
                <div className="hidden md:flex">
                  <MainNav isAuthenticated={isAuthenticated} />
                </div>
              )}
            </div>

            {isDarkHeader ? (
              <Search placeholder="Cari Module/Konten" textColor="text-white" />
            ) : (
              <div className="flex items-center space-x-2">
                <Auth />
              </div>
            )}
          </div>
        </div>
      </nav>
      {!shouldHideSubNav && (
        <div
          className={`relative flex items-center px-4 sm:px-8 md:px-16 lg:px-32 transition-all duration-300 bg-white border-t border-gray-100 ${isDynamicRoute ? "" : "py-3 sm:py-5"
            } ${isDarkHeader ? "" : ""} ${hideNav
              ? isValidFormat
                ? "!bg-white border-b border-gray-200 sm:-translate-y-[4.3rem] -translate-y-[3.3rem]"
                : "sm:-translate-y-[4.3rem] -translate-y-[3.3rem]"
              : "translate-y-0"
            }`}
        >
          {!isDynamicRoute && (
            <SubNav
              isAuthenticated={isAuthenticated}
              isValidFormat={hideNav && isValidFormat}
              hideNav={hideNav}
              showLogo={showLogo}
            />
          )}
        </div>
      )}
    </header>
  );
}
