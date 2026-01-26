"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Cpu, Shield, Users, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function HackathonPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative px-4 pt-40 pb-28 md:pt-48 md:pb-40 text-center bg-gradient-to-b from-black via-red-900/50 to-black">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          BatamDev Hackathon 2026
        </motion.h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-sm md:text-lg">
          Real-world challenge. Real impact. Bukan lomba presentasi ini simulasi dunia nyata.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/hackathon/register"
            className="bg-red-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
          >
            Register Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#details"
            className="border border-red-600 text-red-400 px-8 py-4 rounded-2xl text-lg hover:bg-red-600/20 transition"
          >
            View Details
          </Link>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-600/20 to-transparent blur-3xl" />
      </section>

      {/* META INFO */}
      <section className="px-4 py-12 md:py-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetaCard icon={<Calendar />} title="Date" value="15–17 March 2026" />
        <MetaCard icon={<Users />} title="Participants" value="Selected Teams Only" />
        <MetaCard icon={<Shield />} title="Format" value="Legal & Controlled Simulation" />
      </section>

      {/* WHY */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto" id="details">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why This Hackathon Is Different
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Cpu />}
            title="Real Systems"
            desc="Peserta menghadapi sistem nyata: API, infra, dan attack surface realistis."
          />
          <Feature
            icon={<Shield />}
            title="Security First"
            desc="Semua skenario legal, sandboxed, dan diawasi profesional Red Team."
          />
          <Feature
            icon={<Rocket />}
            title="Career Leverage"
            desc="Portofolio, exposure, dan validasi skill bukan sekadar piala."
          />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 py-20 md:py-32 bg-black/70">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Hackathon Flow
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <TimelineItem step="01" title="Selection & Briefing" desc="Registrasi, seleksi tim, dan technical briefing." />
          <TimelineItem step="02" title="Build & Attack" desc="Build solution, analyze system, exploit & defend." />
          <TimelineItem step="03" title="Evaluation" desc="Dinilai oleh engineer, security expert, dan industry lead." />
          <TimelineItem step="04" title="Demo & Winner" desc="Live demo, breakdown attack path, dan penentuan pemenang." />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-28 md:py-40 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Only For Serious Builders
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          Kalau kamu cuma cari lomba cepat menang ini bukan tempatmu.
        </p>
        <Link
          href="/hackathon/register"
          className="bg-red-600 px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-red-700 transition"
        >
          Apply Now
        </Link>
      </section>
    </main>
  );
}

function MetaCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-black/60 border border-red-600/40 rounded-2xl p-6 backdrop-blur-xl text-center">
      <div className="flex justify-center text-red-500 mb-3">{icon}</div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-black/60 border border-red-600/40 rounded-2xl p-6 backdrop-blur-xl text-center hover:scale-105 transition">
      <div className="flex justify-center text-red-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-red-500 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function TimelineItem({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-6 items-start"
    >
      <div className="text-red-600 text-2xl font-bold">{step}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}
