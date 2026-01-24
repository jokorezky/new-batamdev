"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { IEvent } from "@/types/Events";

interface CommunityLampProps {
  event?: IEvent;
  loading?: boolean;
  error?: boolean;
}

export function CommunityLamp({
  event,
  loading = false,
  error = false,
}: CommunityLampProps) {
  const MotionWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
    >
      {children}
    </motion.div>
  );

  if (loading) {
    return (
      <LampContainer url="/events">
        <MotionWrapper>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Community Event
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-serif font-semibold text-white">
            Memuat event terbaru
          </h2>
        </MotionWrapper>
      </LampContainer>
    );
  }

  if (error || !event) {
    return (
      <LampContainer url="/events">
        <MotionWrapper>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Community Event
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-serif font-semibold text-white">
            Tidak ada event terbaru
          </h2>
        </MotionWrapper>
      </LampContainer>
    );
  }

  const formattedDate = format(new Date(event.startDate), "d MMMM yyyy", {
    locale: id,
  });

  return (
    <LampContainer url={`/events/${event.slugname}`}>
      <MotionWrapper>
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Upcoming Meetup
        </p>

        <h1 className="mt-4 text-3xl md:text-4xl font-serif font-bold leading-tight text-white max-w-3xl mx-auto">
          {event.title}
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          {formattedDate}
          {event.community && (
            <span className="ml-2">— oleh {event.community.name}</span>
          )}
        </p>
      </MotionWrapper>
    </LampContainer>
  );
}
