"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  id: string;
  username: string;
  full_name: string;
  picture?: string;
  job_title?: string;
  isCoreTeam?: boolean;
}

const users: User[] = [
  {
    id: "1",
    username: "joko",
    full_name: "Joko Pratama",
    job_title: "Security Engineer",
    isCoreTeam: true,
  },
  {
    id: "2",
    username: "alexdev",
    full_name: "Alex Tan",
    job_title: "Fullstack Developer",
  },
  {
    id: "3",
    username: "rizkyai",
    full_name: "Rizky AI",
    job_title: "AI Engineer",
  },
  {
    id: "4",
    username: "naufaldev",
    full_name: "Naufal Dev",
    job_title: "Backend Engineer",
  },
];

/* ===== Framer Motion Variants ===== */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function MembersPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-black text-white px-6 overflow-x-hidden">
      <section className="text-center max-w-2xl mx-auto pt-36 pb-24 md:pt-44 md:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent"
        >
          Community Members
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-4 text-sm md:text-base text-zinc-400"
        >
          Builders, hackers, founders, and engineers shaping the future.
        </motion.p>
      </section>

      {/* ===== MEMBERS GRID ===== */}
      <section className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {users.map((user) => (
            <motion.div key={user.id} variants={item}>
              <Link href={`/${user.username}`}>
                <Card
                  className="group relative bg-white/5 backdrop-blur-xl
                  border border-white/10 rounded-3xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-red-500
                  hover:shadow-[0_0_40px_rgba(255,0,0,0.35)]"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    {/* AVATAR */}
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full blur-xl ${
                          user.isCoreTeam
                            ? "bg-red-500/40"
                            : "bg-zinc-500/20"
                        }`}
                      />
                      <Image
                        src={
                          user.picture ||
                          `https://api.dicebear.com/6.x/bottts/svg?seed=${user.full_name}`
                        }
                        alt={user.full_name}
                        width={72}
                        height={72}
                        className="relative z-10 rounded-full border-2 border-red-500 bg-black"
                      />
                    </div>

                    {/* INFO */}
                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm md:text-base">
                        {user.full_name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        @{user.username}
                      </p>
                      {user.job_title && (
                        <p className="text-[11px] text-zinc-500">
                          {user.job_title}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button
            size="lg"
            className="rounded-2xl px-10 py-6 text-lg
              bg-red-600 hover:bg-red-700 transition"
          >
            Join the Community
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
