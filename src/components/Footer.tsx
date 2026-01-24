import Link from "next/link";
import SocialIcons from "@/components/SocialIcons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "kinigo",
    isActive: true,
    subLinks: [
      { href: "/jobs", label: "Karir" },
      { href: "/about", label: "Tentang Kami" },
      { href: "/", label: "Partner" },
      { href: "/", label: "Blog" },
    ],
  },
  {
    href: "/",
    label: "Layanan",
    subLinks: [
      { href: "/jobs/employers", label: "Premium Fitur" },
      { href: "/jobs", label: "Jobs" },
      { href: "/events", label: "Event" },
      { href: "/podcast", label: "Podcast Video" },
    ],
  },
  {
    href: "/",
    label: "Bantuan",
    subLinks: [
      { href: "/", label: "Hubungi Kami" },
      { href: "/", label: "FAQ" },
      { href: "/legal/privacy", label: "Kebijakan Privasi" },
      { href: "/legal/terms", label: "Syarat dan Ketentuan" },
    ],
  },
];

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  if (
    pathname === "/companies/create" ||
    pathname === "/jobs/create" ||
    pathname === "/jobs/onboarding"
  )
    return null;
  return (
    <footer
      className={cn("py-10 px-4 md:px-0 bg-[#212623] text-white", className)}
      {...props}
    >
      <div className="w-full max-w-[1440px] mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-32">
          <div className="flex flex-col w-full md:w-1/2">
            <img src="/logo-no-text.png" alt="Logo" className="mb-4 w-3/6" />
            <p className="text-sm font-bold">PT. Kinigo Stategi Global</p>
            <p className="text-sm capitalize">
              Ruko Batu Besar Center Nongsa Batam Blok A 06
            </p>
            <SocialIcons />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navLinks.map(({ href, label, subLinks }) => (
              <div className="space-y-4" key={label}>
                <Link
                  key={label}
                  href={href}
                  className="capitalize font-bold transition-colors"
                >
                  {label}
                </Link>
                {subLinks && (
                  <ul className="text-md space-y-2">
                    {subLinks.map(({ href, label }) => (
                      <li key={label}>
                        <Link href={href} className="text-md hover:underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
