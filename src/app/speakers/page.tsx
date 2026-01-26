"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Twitter,
  Globe,
  Mic,
} from "lucide-react";

interface Speaker {
  name: string;
  role: string;
  company: string;
  expertise: string[];
  image: string;
  slug: string;
}

const speakers: Speaker[] = [
  {
    name: "Alex Builder",
    role: "Principal Engineer",
    company: "AI Systems Lab",
    expertise: ["AI Systems", "Scalable Architecture", "LLMs"],
    image: "https://i.pravatar.cc/300?img=11",
    slug: "alex-builder",
  },
  {
    name: "Rina Cyber",
    role: "Red Team Lead",
    company: "Cyber Defense Group",
    expertise: ["Offensive Security", "Threat Modeling"],
    image: "https://i.pravatar.cc/300?img=32",
    slug: "rina-cyber",
  },
  {
    name: "Daniel Nova",
    role: "Startup CTO",
    company: "FutureStack",
    expertise: ["Startup Systems", "Product Engineering"],
    image: "https://i.pravatar.cc/300?img=45",
    slug: "daniel-nova",
  },
];

export default function SpeakersPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative px-4 pt-36 pb-28 md:pt-44 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-4xl md:text-6xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent
          "
        >
          Speakers of BatamDev
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-sm md:text-lg">
          Engineers, builders, and security leaders shaping real-world systems not theory.
        </p>

        <div className="mt-8 flex justify-center gap-3 text-red-500">
          <Mic />
        </div>
      </section>

      <section className="px-4 max-w-6xl mx-auto pb-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="
                group relative
                rounded-3xl
                bg-black/60
                border border-red-600/30
                backdrop-blur-xl
                overflow-hidden
                hover:border-red-500
                transition
              "
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-red-400">
                  {speaker.name}
                </h3>
                <p className="text-sm text-zinc-400">
                  {speaker.role} · {speaker.company}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {speaker.expertise.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-red-600/20 text-red-400 border-red-600/40"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-3 text-red-400">
                    <Linkedin className="w-4 h-4 hover:text-red-300 transition" />
                    <Twitter className="w-4 h-4 hover:text-red-300 transition" />
                    <Globe className="w-4 h-4 hover:text-red-300 transition" />
                  </div>

                  <Link href={`/${speaker.slug}`}>
                    <Button
                      size="sm"
                      className="rounded-xl bg-red-600 hover:bg-red-700"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-red-600/10 blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-28 text-center bg-gradient-to-b from-black to-red-900/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Speak at Our Event?
          </h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            We invite builders with real systems, real experience, and real
            impact. No marketing talks.
          </p>

          <Link href="/speakers/apply">
            <Button
              size="lg"
              className="px-10 rounded-2xl bg-red-600 hover:bg-red-700"
            >
              Apply as Speaker
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
