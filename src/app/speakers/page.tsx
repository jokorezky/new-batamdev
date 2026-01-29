"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Linkedin, Globe, Mic } from "lucide-react";
import { useSpeakers } from "@/hooks/use-speakers";

const dicebear = (seed: string) =>
  `https://api.dicebear.com/7.x/personas/png?seed=${encodeURIComponent(seed)}`;

export default function SpeakersPage(): JSX.Element {
  const { speakers, loading } = useSpeakers();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-red-500"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          <Mic className="w-12 h-12" />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative px-4 pt-36 pb-28 md:pt-44 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
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
          Speakers & Mentors
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-sm md:text-lg">
          Practitioners and industry leaders sharing real-world experience and applied knowledge.
        </p>

        <div className="mt-8 flex justify-center text-red-500">
          <Mic />
        </div>
      </section>

      <section className="px-4 max-w-6xl mx-auto pb-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker, i) => {
            const user = speaker.userId;

            const image =
              user.picture || dicebear(user.username || user.full_name);

            const slug = user.username;

            return (
              <motion.div
                key={speaker._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
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
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={image}
                    alt={user.full_name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-red-400">
                    {user.full_name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {user.job_title || "Community Speaker"}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex gap-3 text-red-400">
                      {user.linkedin && (
                        <Link href={`https://linkedin.com/${user.linkedin}`}>
                          <Linkedin className="w-4 h-4 hover:text-red-300 transition" />
                        </Link>
                      )}
                      {user.github && (
                        <Link href={`https://github.com/${user.github}`}>
                          <Globe className="w-4 h-4 hover:text-red-300 transition" />
                        </Link>
                      )}
                    </div>

                    <Link href={`/p/${slug}`}>
                      <Button
                        size="sm"
                        className="rounded-xl bg-red-600 hover:bg-red-700"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            Interested in Speaking or Mentoring?
          </h2>

          <p className="text-gray-400 mb-8 text-sm md:text-base">
            We welcome practitioners who bring real experience, practical insights, and meaningful contributions. No marketing-driven sessions.
          </p>

          <Link href="/speakers/apply">
            <Button
              size="lg"
              className="px-10 rounded-2xl bg-red-600 hover:bg-red-700"
            >
              Submit Application
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
