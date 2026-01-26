"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Shield,
} from "lucide-react";

const EVENT = {
  title: "BatamDev Cyber Hackathon 2026",
  image: "https://res.cloudinary.com/dbnxkii6r/image/upload/v1769046294/image/event/image/event/bc516cee-bab6-429a-abe7-74ecca0b4901_Workshop%20%283%29.png",
  date: "12–14 April 2026",
  time: "09:00 – 21:00 WIB",
  location: "Batam, Indonesia",
  organizer: "BatamDev Community",
  attendees: 128,
  registerUrl: "#",
  description: `
A high-intensity hackathon designed for developers, security engineers,
and builders who want to test real-world systems under controlled conditions.
This is not a competition for beginners. this is a battlefield for serious minds.
  `,
  highlights: [
    "Real-world security & system challenges",
    "Mentorship from industry professionals",
    "Team-based & solo mission tracks",
    "Live evaluation & technical review",
    "Exclusive networking with senior engineers",
  ],
};

export default function FuturisticEventDetail() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src={EVENT.image}
          alt={EVENT.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-end px-4 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {EVENT.title}
          </motion.h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {EVENT.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {EVENT.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {EVENT.location}
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-12">
          <div className="prose prose-invert max-w-none">
            <h2>Mission Briefing</h2>
            <p>{EVENT.description}</p>
          </div>

          <div className="bg-black/60 border border-red-600/40 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-red-500 mb-4">
              What You Will Experience
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {EVENT.highlights.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-500">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-4 md:sticky top-28 h-fit">
          <div className="bg-black/70 border border-red-600/40 rounded-3xl p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-3">
              <Shield className="text-red-500" />
              <p className="font-semibold">
                Hosted by {EVENT.organizer}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              {EVENT.attendees} Participants
            </div>

            <Link
              href={EVENT.registerUrl}
              className="w-full bg-gradient-to-r from-red-600 to-red-800
              py-4 rounded-xl flex items-center justify-center gap-2
              text-lg font-bold hover:scale-[1.03] transition"
            >
              Join Event <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-xs text-gray-500 text-center">
              Limited seats • Technical selection
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
