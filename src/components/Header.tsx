"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();

  const navItem = (href: string) =>
    clsx(
      "relative transition font-semibold",
      pathname === href
        ? "text-red-500 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-500 after:rounded-full"
        : "text-red-400 hover:text-red-600"
    );

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50
      backdrop-blur-lg bg-black/90 border border-red-600/50
      rounded-3xl px-4 py-3 md:px-6 md:py-5
      flex items-center justify-between shadow-lg
      w-[95%] max-w-5xl"
    >
      <Link href="/" className="flex items-center">
        <img
          src="/header-logo.png"
          alt="BatamDev Logo"
          className="h-8 md:h-10 w-auto cursor-pointer rounded-md"
        />
      </Link>

      <div className="flex items-center gap-4 md:gap-10">
        <nav className="hidden md:flex gap-6">
          <Link href="/" className={navItem("/")}>
            Home
          </Link>
          <Link href="/events" className={navItem("/events")}>
            Event
          </Link>
          <Link href="/hackathon" className={navItem("/hackathon")}>
            Hackathon
          </Link>
          <Link href="/members" className={navItem("/members")}>
            Members
          </Link>
          <Link href="/partners" className={navItem("/partners")}>
            Partners
          </Link>
          <Link href="/speakers" className={navItem("/speakers")}>
            Speakers
          </Link>
          <Link href="/about" className={navItem("/about")}>
            About
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/join"
          className={clsx(
            "px-4 py-2 md:px-6 md:py-3 rounded-xl transition",
            pathname === "/join"
              ? "bg-red-700"
              : "bg-red-600 hover:bg-red-700"
          )}
        >
          Join
        </Link>

        <div className="md:hidden">
          <button className="text-red-400 text-2xl">☰</button>
        </div>
      </div>
    </header>
  );
}
