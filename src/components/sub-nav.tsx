import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type NavLink = {
  href: string;
  label: string;
  subMenu?: { href: string; label: string }[];
};

export function SubNav({
  isAuthenticated,
  isValidFormat,
  hideNav,
  showLogo,
}: React.HTMLAttributes<HTMLElement> & {
  isAuthenticated: boolean;
  isValidFormat: boolean;
  hideNav: boolean;
  showLogo: boolean;
}) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  const isDashboard = /^\/(dashboard|settings|academies)/.test(pathname);
  const isJobs = pathname.startsWith("/jobs");
  const isEvents = pathname.startsWith("/events");
  const isCommunity = pathname.startsWith("/category/community");
  const isEventCreate = pathname.startsWith("/events/create");

  const isCompanies = pathname.startsWith("/companies");
  const isAbout = pathname.startsWith("/about");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.roles?.includes("ADMIN_COMMUNITY") || false;

  const navLinks: NavLink[] = [
    { href: "/category/startup", label: t("startup") },
    { href: "/category/opini", label: t("opini") },
    { href: "/category/insights", label: t("insights") },
    { href: "/category/ai", label: t("ai") },
    { href: "/category/top-stories", label: t("topStories") },
    { href: "/category/ecommerce", label: t("ecommerce") },
    { href: "/category/cyber-security", label: t("cyberSecurity") },
    { href: "/category/community", label: t("community") },
  ];

  const authNavLinks: NavLink[] = [
    { href: "/dashboard", label: t("home") },
    { href: "/academies", label: t("academy") },
    { href: "/events", label: t("events") },
    { href: "/jobs", label: t("jobs") },
  ];

  const handleToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const links = isAbout
    ? [
      {
        href: "/about",
        label: t("kinigo"),
        subMenu: [
          { href: "/about/team", label: t("team") },
          { href: "/about/culture", label: t("culture") },
          { href: "/about/join-us", label: t("joinUs") },
        ],
      },
      { href: "/about/get-newsletter", label: t("getNewsletter") },
      { href: "/about/mobile-apps", label: t("mobileApps") },
      { href: "/about/wall-of-love", label: t("wallOfLove") },
    ]
    : isCompanies
      ? [
        { href: "/companies", label: t("companies") },
        {
          href: "/companies/why-kinigo-database",
          label: t("whyKinigoDatabase"),
        },
        { href: "/companies/create", label: t("createNewCompany") },
      ]
      : isJobs
        ? [
          { href: "/jobs", label: t("browseJobs") },
          { href: "/jobs/why", label: t("whyKinigoJobs") },
        ]
        : isEvents
          ? [{ href: "/events", label: t("upcoming") }]
          : isDashboard
            ? isAuthenticated
              ? authNavLinks
              : navLinks
            : navLinks;
  const isJobsDetail = /^\/jobs\/[a-fA-F0-9]{24}$/.test(pathname);

  const isJobApply = pathname.match(/^\/jobs\/[^/]+\/apply$/);

  const isJobsList =
    pathname === "/jobs" ||
    pathname.startsWith("/jobs/why") ||
    pathname.startsWith("/jobs?") ||
    isJobApply ||
    isJobsDetail;
  return (
    <div className="w-full max-w-[1440px] mx-auto relative">
      <nav className="flex flex-col lg:flex-row items-center justify-between w-full space-y-4 lg:space-y-0 lg:space-x-6 px-0 1440:px-32">
        <div className="flex items-center space-x-0 overflow-x-auto whitespace-nowrap w-full">
          {hideNav && (
            <div
              className={`transition-all duration-500 ease-out ${showLogo
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
                }`}
            >
              <Link href="/" passHref>
                <div className="relative cursor-pointer mr-5">
                  <Image
                    src={isValidFormat ? "/Asset 4.svg" : "/Asset 4.svg"}
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                    style={{ maxWidth: 100 }}
                    className="w-[30px] sm:w-[40px] sm:h-[40px]"
                  />
                </div>
              </Link>
            </div>
          )}

          {links.map(({ href, label, subMenu }) => {
            const isActive = pathname === href;
            if (subMenu) {
              const isDropdownOpen = openDropdown === label;
              return (
                <DropdownMenu
                  key={label}
                  open={isDropdownOpen}
                  onOpenChange={(open) => setOpenDropdown(open ? label : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={() => handleToggle(label)}
                      className={`inline-flex items-center pr-2 py-2 text-sm uppercase transition-colors hover:text-green-700 ${isValidFormat ? "text-white" : ""
                        } ${subMenu.some((item) => pathname === item.href)
                          ? "text-green-700 font-bold"
                          : "text-[#2f2e2e]"
                        }`}
                    >
                      {label}
                      {isDropdownOpen ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 py-2 shadow-lg rounded-md border border-gray-200"
                    sideOffset={4}
                    align="start"
                  >
                    {subMenu.map((item) => (
                      <DropdownMenuItem key={item.href}>
                        <Link
                          href={item.href}
                          className={`w-full text-[13px] py-2 hover:text-green-600 ${pathname === item.href
                              ? "text-green-700"
                              : ""
                            }`}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={label}
                href={href}
                className={`inline-flex items-center uppercase px-3  font-extralight text-[12px] 
             text-gray-600 hover:text-green-600 ${isValidFormat ? "text-white" : ""
                  } ${isActive ? "text-green-600" : "text-[#d3cdcd]"}`}
              >
                {label}
              </Link>
            );
          })}
          {isEvents && !isAdmin && isCommunity && (
            <Link href="/community/create">
              <Button
                variant="ghost"
                className="relative uppercase font-bold text-white px-4 py-2 rounded-none bg-gradient-to-r from-green-700 via-orange-500 to-green-700 animate-gradient text-shadow-lg"
              >
                <span className="relative flex items-center z-10 text-white">
                  Dirikan Komunitas
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </Link>
          )}
        </div>

        {!isAdmin && isCommunity && (
          <div className="hidden lg:block">
            <Link href="/community/create">
              <Button
                variant="ghost"
                className="relative uppercase font-bold text-white px-4 py-2 rounded-none bg-gradient-to-r from-green-700 via-orange-500 to-green-700 animate-gradient text-shadow-lg"
              >
                <span className="relative flex items-center z-10 text-white">
                  Dirikan Komunitas
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        )}
        {isEvents && !isEventCreate && isAdmin && (
          <div className="hidden lg:block">
            <Link href="/events/create">
              <Button
                variant="ghost"
                className="relative uppercase font-bold text-white px-4 py-2 rounded-none bg-gradient-to-r from-green-700 via-orange-500 to-green-700 animate-gradient text-shadow-lg"
              >
                <span className="relative flex items-center z-10 text-white">
                  Create Event
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        )}
        {isJobs && (
          <div className="hidden lg:flex space-x-2">
            <Link href="/jobs">
              <Button
                variant={isJobsList ? "ghost" : "outline"}
                className={`relative uppercase font-bold px-4 py-2 rounded-none
                ${isJobsList
                    ? "bg-gradient-to-r from-green-700 via-green-500 to-green-800 animate-gradient text-shadow-lg text-white hover:text-white"
                    : ""
                  }`}
              >
                <span className="relative flex items-center z-10">
                  For Jobseekers
                </span>
              </Button>
            </Link>

            <Link href="/jobs/employers">
              <Button
                variant={
                  pathname.startsWith("/jobs/employers") ||
                    pathname.startsWith("/jobs/create")
                    ? "ghost"
                    : "outline"
                }
                className={`relative uppercase font-bold px-4 py-2 rounded-none
                ${pathname.startsWith("/jobs/employers") ||
                    pathname.startsWith("/jobs/create")
                    ? "bg-gradient-to-r from-green-700 via-green-500 to-green-800 animate-gradient text-shadow-lg text-white hover:text-white"
                    : ""
                  }`}
              >
                <span className="relative flex items-center z-10">
                  For Employers
                </span>
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
