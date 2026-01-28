"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Mic,
  Calendar,
  ShieldCheck,
} from "lucide-react";

export default function SpeakerDetailPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white px-4 pt-36 pb-24 md:pt-44 md:pb-32">
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:sticky md:top-32"
        >
          <Card className="bg-black/60 border border-red-600/40 backdrop-blur-xl rounded-3xl">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <Image
                src="https://i.pravatar.cc/300"
                alt="Speaker Profile"
                width={150}
                height={150}
                className="rounded-full border-4 border-red-500"
              />

              <h1 className="text-2xl font-bold text-red-400">
                Alex Builder
              </h1>
              <p className="text-sm text-zinc-400">
                Principal Engineer · AI Systems
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                  Verified Speaker
                </Badge>
                <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                  International
                </Badge>
              </div>

              <Button
                size="lg"
                className="w-full mt-4 bg-red-600 hover:bg-red-700 rounded-2xl"
              >
                <Mic className="w-4 h-4 mr-2" />
                Book Speaker
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <div
          className="
            md:col-span-2
            space-y-8
            md:max-h-[calc(100vh-8rem)]
            md:overflow-y-auto
            md:pr-2
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/60 border border-red-600/30 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-2">
              Speaker Overview
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Alex is a systems-focused engineer specializing in large-scale
              AI-powered platforms, distributed architecture, and real-world
              security tradeoffs. Known for practical, no-fluff talks backed
              by production experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-black/60 border border-red-600/30 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Expertise Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "AI Systems",
                "Scalable Architecture",
                "LLM Integration",
                "System Design",
                "Security by Design",
              ].map((topic) => (
                <Badge
                  key={topic}
                  className="bg-red-600/20 text-red-400 border-red-600/40"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/60 border border-red-600/30 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Talks & Sessions
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Building AI Systems That Survive Reality",
                  event: "BatamDev Hackathon 2026",
                },
                {
                  title: "Designing Secure Architectures Under Pressure",
                  event: "Cyber Defense Conference",
                },
              ].map((talk, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-red-600/20 bg-black/40 hover:border-red-500 transition"
                >
                  <h3 className="font-semibold">{talk.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {talk.event}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-black/60 border border-red-600/30 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Availability & Format
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-400" />
                Conferences & Hackathons
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                Technical Keynotes & Panels
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/60 border border-red-600/30 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Connect
            </h2>
            <div className="flex gap-4">
              <IconLink icon={<Linkedin />} />
              <IconLink icon={<Twitter />} />
              <IconLink icon={<Globe />} />
              <IconLink icon={<Mail />} />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function IconLink({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-3 rounded-full border border-red-600/40 text-red-400 hover:bg-red-600/20 hover:scale-110 transition">
      {icon}
    </button>
  );
}
