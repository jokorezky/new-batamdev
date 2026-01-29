"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  // Calendar,
  // ShieldCheck,
  Rocket,
  // Archive,
  Handshake,
  Building2,
} from "lucide-react";
import Link from "next/link";

interface HackathonItem {
  title: string;
  year: string;
  status: "ONGOING" | "COMPLETED";
  theme: string;
  slug: string;
}

// const hackathons: HackathonItem[] = [
//   {
//     title: "batamdev Hackathon",
//     year: "2026",
//     status: "ONGOING",
//     theme: "AI • Security • Systems",
//     slug: "2026",
//   },
//   {
//     title: "batamdev Hackathon",
//     year: "2025",
//     status: "COMPLETED",
//     theme: "Web • Startup • Automation",
//     slug: "2025",
//   },
//   {
//     title: "Cyber Defense Challenge",
//     year: "2024",
//     status: "COMPLETED",
//     theme: "Red Team • Blue Team",
//     slug: "2024-cyber",
//   },
// ];

export default function HackathonArchivePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-26 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent"
        >
          Hackathon Archive
        </motion.h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-400 text-sm md:text-lg">
          A proven track record of competitions, experiments, and elite builders.
        </p>
      </section>

      {/* <section className="px-4 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-6 backdrop-blur-xl border transition hover:scale-[1.03]
                ${
                  item.status === "ONGOING"
                    ? "bg-red-900/30 border-red-600 shadow-glow"
                    : "bg-black/60 border-red-600/30"
                }`}
            >
              <span
                className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold
                ${
                  item.status === "ONGOING"
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {item.status}
              </span>

              <div className="mb-4 flex items-center gap-2 text-red-500">
                {item.status === "ONGOING" ? <Rocket /> : <Archive />}
                <span className="font-semibold">{item.year}</span>
              </div>

              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{item.theme}</p>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                <Calendar className="w-4 h-4" /> {item.year}
                <ShieldCheck className="w-4 h-4 ml-4" /> Verified Event
              </div>

              <Link
                href={`/hackathon/${item.slug}`}
                className={`block w-full text-center py-3 rounded-xl transition
                ${
                  item.status === "ONGOING"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border border-red-600/40 hover:bg-red-600/20"
                }`}
              >
                {item.status === "ONGOING"
                  ? "View Live Hackathon"
                  : "View Archive"}
              </Link>
            </motion.div>
          ))}
        </div>
      </section> */}
      <section className="px-4 max-w-3xl mx-auto py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Rocket className="mx-auto mb-6 w-12 h-12 text-red-500 animate-bounce" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Hackathon Archive Coming Soon
          </h2>

          <p className="text-gray-400 text-sm md:text-base mb-6">
            Our past and upcoming hackathons are being curated. Check back soon for a full record of competitions, experiments, and elite builders.
          </p>

          <Link
            href="/partner"
            className="inline-block px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
          >
            Partner With Us
          </Link>
        </motion.div>
      </section>


      <section className="px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            max-w-5xl mx-auto
            rounded-3xl
            bg-gradient-to-br from-red-900/40 via-black/80 to-black
            border border-red-600/40
            backdrop-blur-xl
            p-8 md:p-12
            text-center
          "
        >
          <div className="flex justify-center gap-4 mb-6 text-red-500">
            <Handshake className="w-8 h-8" />
            <Building2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Host a Hackathon With Us
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm md:text-base">
            Partner with batamdev to run high-impact hackathons. real systems,
            real builders, real evaluation. Ideal for companies, institutions,
            and organizations seeking talent, innovation, and visibility.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/partner"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
            >
              Become a Partner
            </Link>

            <Link
              href="/sponsor"
              className="px-8 py-4 rounded-xl border border-red-600/40 hover:bg-red-600/20 font-semibold transition"
            >
              Sponsor a Hackathon
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-20 md:py-32 text-center text-gray-500 text-sm">
        <p>
          Only hackathons with real systems, real impact, and real evaluation are
          listed here.
        </p>
      </section>
    </main>
  );
}
