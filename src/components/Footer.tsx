import { usePathname } from "next/navigation";


export function Footer() {
  const pathname = usePathname();
  if (
    pathname === "/companies/create" ||
    pathname === "/jobs/create" ||
    pathname === "/jobs/onboarding"
  )
    return null;
  return (
    <footer className="py-12 text-center text-gray-400 border-t border-red-600/30 bg-black text-sm md:text-base">
      © 2026 Batamdev Community. All rights reserved.
    </footer>
  );
}
