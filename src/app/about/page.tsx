"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  ShieldCheck,
  Users,
  Code
} from "lucide-react";

export default function AboutPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative px-4 pt-36 pb-28 md:pt-44 md:pb-36 text-center
        bg-gradient-to-b from-black via-red-900/40 to-black"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent
          "
        >
          Building Serious Builders
        </motion.h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-sm md:text-lg leading-relaxed">
          BatamDev is a technology community and experimentation platform
          focused on real-world systems, hackathons, and elite technical growth.
        </p>
      </section>

      <section className="px-4 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            What is BatamDev?
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            BatamDev is not just a community.
            It is an ecosystem where developers, security engineers,
            system builders, and innovators collaborate through
            hackathons, events, and real technical challenges.
            <br /><br />
            We focus on execution, experimentation, and measurable outcomes -
            not hype, not theory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <InfoCard icon={<Code />} title="Builders First" />
          <InfoCard icon={<ShieldCheck />} title="Real Systems" />
          <InfoCard icon={<Users />} title="Strong Community" />
          <InfoCard icon={<Rocket />} title="Future Oriented" />
        </motion.div>
      </section>

      {/* WHY WE EXIST */}
      <section className="px-4 py-28 bg-black/80 border-t border-red-600/20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-red-400 mb-6"
          >
            Why We Exist
          </motion.h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Too many tech communities stop at talks and slides.
            BatamDev exists to push builders beyond comfort —
            into building, breaking, securing, and shipping real systems.
            <br /><br />
            We believe serious talent is forged through challenges,
            not certificates.
          </p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="px-4 py-28 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-400 mb-12 text-center"
        >
          What We Build
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <BuildCard
            icon={<Rocket />}
            title="Hackathons"
            desc="High-signal competitions with real-world scenarios and evaluation."
          />
          <BuildCard
            icon={<Users />}
            title="Technical Events"
            desc="Deep-dive sessions with practitioners, not influencers."
          />
          <BuildCard
            icon={<ShieldCheck />}
            title="Security Challenges"
            desc="Red team, blue team, and system defense simulations."
          />
        </div>
      </section>

      {/* IMPACT */}
      <section className="px-4 py-28 bg-gradient-to-b from-black via-red-900/30 to-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <Stat value="5+" label="Years of Community" />
          <Stat value="20+" label="Events & Hackathons" />
          <Stat value="500+" label="Builders Impacted" />
          <Stat value="∞" label="Experiments Ahead" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Be Part of the Ecosystem
        </motion.h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          Join as a builder, collaborate as a partner,
          or contribute as a speaker.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/join"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
          >
            Join Community
          </Link>
          <Link
            href="/partners"
            className="px-6 py-3 rounded-xl border border-red-600/40 hover:bg-red-600/20 transition"
          >
            Become a Partner
          </Link>
        </div>
      </section>
    </main>
  );
}

/* COMPONENTS */

function InfoCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="p-6 rounded-2xl bg-black/60 border border-red-600/30
      flex flex-col items-center justify-center gap-3 backdrop-blur-xl"
    >
      <div className="text-red-500">{icon}</div>
      <p className="font-semibold text-sm">{title}</p>
    </div>
  );
}

function BuildCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-3xl bg-black/60 border border-red-600/30 backdrop-blur-xl"
    >
      <div className="text-red-500 mb-4">{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-6 rounded-2xl bg-black/60 border border-red-600/30 backdrop-blur-xl">
      <p className="text-4xl font-extrabold text-red-400">{value}</p>
      <p className="text-gray-400 text-sm mt-2">{label}</p>
    </div>
  );
}
