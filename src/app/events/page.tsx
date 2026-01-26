"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface EventItem {
  title: string;
  date: string;
  location: string;
  highlight?: string;
  slug: string;
}

const events: EventItem[] = [
  {
    title: "HackTown 2026",
    date: "15 March 2026",
    location: "Batam, Indonesia",
    highlight: "Flagship Hackathon",
    slug: "asdfsaf",
  },
  {
    title: "AI Security Workshop",
    date: "10 April 2026",
    location: "Online / Hybrid",
    highlight: "Limited Seats",
    slug: "ai-security-workshop",
  },
  {
    title: "Startup & Dev Meetup",
    date: "22 May 2026",
    location: "Batam",
    slug: "startup-dev-meetup",
  },
];

export default function EventsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="text-center max-w-2xl mx-auto pt-36 pb-24 md:pt-44 md:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent"
        >
          Events
        </motion.h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-400 text-sm md:text-lg">
          coding, AI, cybersecurity, dan builder mindset.
        </p>
      </section>
      <section className="px-4 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-black/60 border border-red-600/40 rounded-3xl p-5 md:p-6 backdrop-blur-xl hover:scale-[1.03] transition shadow-glow"
            >
              {event.highlight && (
                <span className="absolute -top-3 right-4 bg-red-600 text-xs px-3 py-1 rounded-full">
                  {event.highlight}
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-semibold text-red-500 mb-2">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Calendar className="w-4 h-4" /> {event.date}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" /> {event.location}
              </div>
              <Link
                href={`/events/${event.slug}`}
                className="mt-5 w-full bg-red-600/90 hover:bg-red-600
  py-2.5 rounded-xl flex items-center justify-center
  gap-2 text-sm md:text-base transition"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="px-4 py-20 md:py-32 text-center bg-gradient-to-b from-black via-red-900/30 to-black">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Build. Connect. Level Up.
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm md:text-base">
          Jangan cuma nonton. Ikut event dan jadi bagian dari movement teknologi masa depan.
        </p>
        <button className="bg-red-600 px-8 py-4 rounded-2xl text-lg hover:bg-red-700 transition">
          Join Next Event
        </button>
      </section>
    </main>
  );
}
