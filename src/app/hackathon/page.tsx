"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Rocket, Users, ShieldCheck, Briefcase } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SponsorHackTownPage(): JSX.Element {
  const valueRef = useRef<HTMLDivElement | null>(null);

  const scrollToValue = () => {
    valueRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <section className="relative px-4 pt-40 pb-32 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <Badge className="mx-auto w-fit bg-red-600/20 text-red-400 border-red-600/40">
            HackTown Sponsorship
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Build the Future.
            <br />
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Sponsor HackTown.
            </span>
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-lg">
            HackTown is where builders, security engineers, and innovators
            collaborate on real-world problems.
            <br />
            Sponsorship here means impact — not just exposure.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link href="/hackathon/apply">
              <Button
                size="lg"
                className="rounded-2xl px-10 bg-red-600 hover:bg-red-700"
              >
                Become a Sponsor
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              onClick={scrollToValue}
              className="rounded-2xl px-10 border-red-600/40 text-red-400 hover:bg-red-600/10"
            >
              See Sponsorship Value
            </Button>
          </div>
        </motion.div>
      </section>

      <section
        ref={valueRef}
        className="px-4 max-w-6xl mx-auto py-32"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Why Companies Choose HackTown
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "High-Signal Audience",
              desc: "Senior developers, security engineers, founders, and builders — no noise, no fillers.",
            },
            {
              icon: <Rocket className="w-6 h-6" />,
              title: "Brand With Impact",
              desc: "Your brand is positioned as an ecosystem enabler, not just a logo on a banner.",
            },
            {
              icon: <Briefcase className="w-6 h-6" />,
              title: "Talent Access",
              desc: "Meet potential hires and collaborators in real technical environments.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: "Credibility & Trust",
              desc: "Association with real-world security, engineering, and innovation initiatives.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full bg-black/60 border border-red-600/30 rounded-3xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,0,0,0.35)] transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="text-red-400">{item.icon}</div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-32 text-center bg-gradient-to-b from-black via-red-900/30 to-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Ready to Build With Us?
        </motion.h2>

        <p className="text-zinc-400 max-w-xl mx-auto mb-10">
          Let’s create meaningful impact through collaboration,
          innovation, and real-world engineering.
        </p>

        <Link href="/hackathon/apply">
          <Button
            size="lg"
            className="rounded-2xl px-12 py-6 bg-red-600 hover:bg-red-700 text-lg"
          >
            Apply as Sponsor Hackathon
          </Button>
        </Link>
      </section>
    </main>
  );
}
