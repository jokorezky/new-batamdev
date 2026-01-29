"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navItem = (href: string) =>
    clsx(
      "relative transition font-semibold",
      pathname === href
        ? "text-red-500 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-500 after:rounded-full"
        : "text-red-400 hover:text-red-600"
    );

  const links = [
    ["/", "Home"],
    ["/events", "Event"],
    ["/hackathon", "Hackathon"],
    ["/members", "Members"],
    ["/partners", "Partners"],
    ["/speakers", "Speakers"],
    ["/about", "About"],
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-lg bg-black/90 border border-red-600/50 rounded-3xl px-4 py-3 md:px-6 md:py-5 flex items-center justify-between shadow-lg w-[95%] max-w-5xl" >
        <Link href="/" className="flex items-center">
          <img
            src="/header-logo.png"
            alt="BatamDev Logo"
            className="h-8 md:h-10 w-auto cursor-pointer rounded-md"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-10">
          <nav className="hidden md:flex gap-6">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className={navItem(href)}>
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href="/join"
            className={clsx(
              "px-4 py-2 md:px-6 md:py-3 rounded-xl transition font-semibold",
              pathname === "/join"
                ? "bg-red-700"
                : "bg-red-600 hover:bg-red-700"
            )}
          >
            Join
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="relative w-11 h-11 rounded-xl
              border border-red-500/40
              bg-black/70 backdrop-blur
              hover:bg-red-500/10 transition
              shadow-[0_0_20px_-5px_rgba(239,68,68,0.7)]"
            >
              <span
                className={clsx(
                  "absolute left-1/2 top-1/2 h-[2px] w-5 bg-red-400 transition-all duration-300",
                  open
                    ? "rotate-45 -translate-x-1/2 -translate-y-1/2"
                    : "-translate-x-1/2 -translate-y-[8px]"
                )}
              />
              <span
                className={clsx(
                  "absolute left-1/2 top-1/2 h-[2px] w-5 bg-red-400 transition-all duration-300",
                  open
                    ? "opacity-0"
                    : "-translate-x-1/2 -translate-y-1/2"
                )}
              />
              <span
                className={clsx(
                  "absolute left-1/2 top-1/2 h-[2px] w-5 bg-red-400 transition-all duration-300",
                  open
                    ? "-rotate-45 -translate-x-1/2 -translate-y-1/2"
                    : "-translate-x-1/2 translate-y-[6px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={clsx(
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={clsx(
            `
  absolute top-24 left-1/2 -translate-x-1/2
  w-[92%] rounded-3xl
  border border-red-600/40
  overflow-hidden
  bg-black/95 backdrop-blur-xl
  shadow-[0_0_50px_-10px_rgba(239,68,68,0.8)]
  transition-all duration-500
  `,
            open
              ? "opacity-100 translate-y-0 scale-100 mt-4"
              : "opacity-0 -translate-y-6 scale-95"
          )}

        >
          <nav className="flex flex-col divide-y">
            {links.map(([href, label], i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={clsx(
                  "px-6 py-5 text-lg font-semibold transition-all duration-300",
                  pathname === href
                    ? "text-red-500 bg-red-500/10"
                    : "text-red-300 hover:bg-red-500/10 hover:text-red-400"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
