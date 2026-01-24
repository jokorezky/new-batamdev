"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGetLatestHomepageEvent } from "@/hooks/events";

export const LampContainer = ({
  children,
  className,
  url,
}: {
  children?: React.ReactNode;
  className?: string;
  url?: string;
}) => {
  const { event } = useGetLatestHomepageEvent();
  const eventUrl = url || (event ? `/events/${event._id}` : "/events");

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-neutral-950 pt-32 pb-24 rounded-sm",
        className
      )}
    >
      {/* Ambient light */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-[420px]"
      >
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {children}

        <div className="mt-10">
          <Link href={eventUrl}>
            <Button
              variant="outline"
              className="px-10 text-sm font-semibold tracking-wide border-white/20 hover:border-white hover:bg-white hover:text-black transition"
            >
              Lihat Event
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
