"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputWithIcon } from "@/components/blocks/input-with-icon";
import { Badge } from "@/components/ui/badge";
import { Mic, ShieldCheck, Rocket, User, Globe, Mail } from "lucide-react";

export default function ApplySpeakerPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white px-4 pt-36 pb-24">
      <section className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Badge className="mx-auto w-fit bg-red-600/20 text-red-400 border-red-600/40">
            Speaker Application
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Apply as a <span className="text-red-500">Future Speaker</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Share real-world experience, inspire builders, and help shape the
            future of technology through impactful talks.
          </p>
        </motion.div>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[{
            icon: <Mic className="w-6 h-6" />,
            title: "Authority & Personal Branding",
            desc: "Position yourself as a trusted expert. Your name becomes associated with clarity, depth, and real-world impact.",
          },{
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Credibility That Compounds",
            desc: "Speaking builds long-term trust. One strong talk can outperform years of self-promotion.",
          },{
            icon: <Rocket className="w-6 h-6" />,
            title: "Career & Opportunity Leverage",
            desc: "Open doors to consulting, leadership roles, partnerships, and global invitations.",
          }].map((item) => (
            <Card
              key={item.title}
              className="bg-black/60 border border-red-600/30 rounded-3xl backdrop-blur-xl"
            >
              <CardContent className="p-6 space-y-4">
                <div className="text-red-400">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Extended Value */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {[{
            title: "Personal Brand That Feels Earned",
            desc: "You don’t chase attention — attention comes to you. Speaking validates your experience publicly and professionally.",
          },{
            title: "Network With Decision Makers",
            desc: "Access founders, CTOs, investors, and senior engineers who value insight over noise.",
          },{
            title: "Content That Works Everywhere",
            desc: "One talk turns into clips, articles, podcasts, and long-term digital assets.",
          },{
            title: "Reputation Beyond Your Company",
            desc: "Your influence is no longer tied to a single role or employer. You become independently credible.",
          }].map((item) => (
            <Card
              key={item.title}
              className="bg-black/50 border border-red-600/20 rounded-3xl"
            >
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-red-400">{item.title}</h4>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/70 border border-red-600/40 rounded-3xl backdrop-blur-xl">
            <CardContent className="p-8 space-y-8">
              <h2 className="text-2xl font-semibold text-red-400">
                Speaker Application Form
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <InputWithIcon placeholder="Full Name" icon={<User />} />
                <InputWithIcon placeholder="Email Address" icon={<Mail />} />
                <InputWithIcon placeholder="Primary Expertise (e.g. Backend, AI, Security)" />
                <InputWithIcon placeholder="Website / LinkedIn / GitHub" icon={<Globe />} />
              </div>

              <Textarea
                rows={5}
                placeholder="Tell us about your background, experience, and why you want to speak."
              />

              <Textarea
                rows={4}
                placeholder="Proposed talk topics or session ideas (optional)"
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <p className="text-xs text-zinc-500 max-w-xl">
                  All submissions are reviewed manually. Quality, clarity, and
                  authenticity matter more than popularity.
                </p>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 rounded-2xl px-10"
                >
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </section>
    </main>
  );
}
