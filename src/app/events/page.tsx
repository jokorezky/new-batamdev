"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Mic, CalendarDays } from "lucide-react";
import { useGetEventsQuery } from "@/hooks/events";

interface HostDetails {
  name: string;
  picture?: string | null;
  username?: string;
  title?: string;
}

interface EventItem {
  id: string;
  title: string;
  date: Date;
  location: string;
  slugname: string;
  isPast: boolean;
  hostDetails: HostDetails[];
}

export default function EventsPage(): JSX.Element {
  const [page] = useState(1);
  const order: "ASC" | "DESC" = "DESC";

  const { data: dataEvents, loading } = useGetEventsQuery(page, 100, order);
  const now = new Date();

  const events: EventItem[] = useMemo(() => {
    if (!dataEvents?.data) return [];

    return dataEvents.data.map((e: any) => {
      const eventDate = new Date(e.startDate);

      return {
        id: e._id,
        title: e.title,
        date: eventDate,
        location: e.location || "Batam",
        slugname: e.slugname,
        isPast: eventDate < now,
        hostDetails: Array.isArray(e.hostDetails) ? e.hostDetails : [],
      };
    });
  }, [dataEvents, now]);

  const resolveAvatar = (
    picture?: string | null,
    seed: string = "guest",
    style: string = "adventurer"
  ): string => {
    if (
      picture &&
      !picture.includes("coderjs.s3.ap-southeast-2.amazonaws.com")
    ) {
      return picture;
    }

    return `https://api.dicebear.com/6.x/${style}/svg?seed=${encodeURIComponent(
      seed
    )}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-red-500"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <CalendarDays className="w-12 h-12" />
        </motion.div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-32 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent"
        >
          Events
        </motion.h1>
        <p className="mt-4 text-gray-400 text-sm md:text-lg">
          Curated sessions shaping builders, engineers, and the future of tech.
        </p>
      </section>
      <section className="relative px-4 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative flex flex-col rounded-3xl p-6
                backdrop-blur-xl border transition-all
                ${event.isPast
                  ? "bg-black/40 border-gray-700/40 opacity-70"
                  : "bg-black/60 border-red-600/40 hover:border-red-500"}`}
            >
              <span
                className={`absolute -top-3 right-4 text-xs px-3 py-1 rounded-full
                  ${event.isPast
                    ? "bg-gray-700 text-gray-300"
                    : "bg-red-600 text-white"}`}
              >
                {event.isPast ? "Completed" : "Upcoming"}
              </span>

              <h3 className="line-clamp-3 text-xl md:text-2xl font-semibold text-red-500 mb-3">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                {event.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>

              {event.hostDetails.length > 0 && (
                <div className="relative mb-6 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="relative flex items-center">
                      {event.hostDetails.slice(0, 5).map((host, idx) => (
                        <motion.img
                          key={`${event.id}-host-${idx}`}
                          src={resolveAvatar(
                            host.picture,
                            host.username || host.name,
                            "adventurer"
                          )}
                          alt={host.name}
                          title={host.name}
                          className="
              w-9 h-9 rounded-full
              bg-black object-cover
              border border-red-500/60
              shadow-[0_0_12px_rgba(255,0,0,0.35)]
              -ml-2 first:ml-0
            "
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.04 }}
                        />
                      ))}

                      {event.hostDetails.length > 5 && (
                        <span className="
            ml-2 text-xs font-medium
            text-gray-400
          ">
                          +{event.hostDetails.length - 5}
                        </span>
                      )}
                    </div>

                    <div className="leading-tight">
                      <span className="
          block text-[10px] tracking-widest uppercase
          text-red-400
        ">
                        Host
                      </span>


                    </div>
                  </div>

                  <div className="
      hidden md:block
      w-2 h-2 rounded-full
      bg-red-500/70
      shadow-[0_0_12px_rgba(255,0,0,0.6)]
    " />
                </div>
              )}



              <Link
                href={`/events/${event.slugname}`}
                className={`mt-auto w-full py-2.5 rounded-xl
                  flex items-center justify-center gap-2
                  text-sm md:text-base transition
                  ${event.isPast
                    ? "bg-gray-700"
                    : "bg-red-600/90 hover:bg-red-600"}`}
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-6 py-28 md:py-36
        bg-gradient-to-b from-black via-red-900/20 to-black">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center
            bg-black/60 border border-red-600/40
            rounded-[2.5rem] p-10 md:p-16 backdrop-blur-xl"
        >
          <div className="mx-auto mb-6 w-16 h-16 rounded-full
            bg-red-600/20 flex items-center justify-center">
            <Mic className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent">
            Be a Speaker
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Share real-world insights and help shape the next generation of builders.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/speakers/apply"
              className="inline-flex items-center gap-2
              bg-red-600 px-10 py-4 rounded-2xl
              hover:bg-red-700 transition"
            >
              Apply as Speaker <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/speakers"
              className="relative border border-red-600 text-red-400 px-10 py-4 rounded-2xl hover:bg-red-600/20 transition text-sm md:text-base shadow-md hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]"
            >
              All Speaker
            </Link>
          </div>

        </motion.div>
      </section>
    </main>
  );
}
