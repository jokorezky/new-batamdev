import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const navLinks = [
  { href: "/", labelKey: "news" },
  { href: "/jobs", labelKey: "jobs" },
  { href: "/events", labelKey: "events" },
  { href: "/podcast", labelKey: "podcast" },
  { href: "/companies", labelKey: "database" },
  { href: "/about", labelKey: "about" },
];

export function MainNav({
  isAuthenticated,
}: React.HTMLAttributes<HTMLElement> & { isAuthenticated: boolean }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const links = navLinks;
  const isPodcast = pathname.startsWith("/podcast");

  return (
    <nav className="flex items-center space-x-2 lg:space-x-2">
      {links.map(({ href, labelKey }) => {
        const isActive =
          pathname === href ||
          pathname.startsWith(`${href}/`) ||
          (href === "/" && /^\/category\//.test(pathname)) ||
          (href === "/" && pathname.startsWith("/news/"));

        return (
          <Link
            key={labelKey}
            href={href}
            className={`uppercase tracking-wide text-[13px] font-medium px-3 py-5 transition-colors 
             hover:text-green-600 ${
               isPodcast && isActive
                 ? "text-green-600 font-bold border-b-2 border-green-600"
                 : isActive
                 ? "text-green-600 border-b-2 border-green-600"
                 : "text-gray-500"
             }`}
          >
            {t(labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
