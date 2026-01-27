"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useListUsers } from "@/hooks/use-user";

/* =======================
   Types
======================= */
interface User {
  _id: string;
  username: string;
  full_name: string;
  picture?: string;
  job_title?: string;
  isCoreTeam?: boolean;
}

/* =======================
   Framer Motion
======================= */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function MembersPage(): JSX.Element {
  /* =======================
     Pagination State
  ======================= */
  const LIMIT = 24;
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { refetch: fetchUsers, data } = useListUsers(page, LIMIT, "", "DESC");

  useEffect(() => {
    const load = async () => {
      if (!hasMore) return;
      setLoading(true);
      await fetchUsers();
      setLoading(false);
    };
    load();
  }, [page]);

  useEffect(() => {
    const list = data?.listUsers?.data;
    const totalPage = data?.listUsers?.totalPage ?? 1;

    if (!list) return;

    setUsers((prev) => {
      const normalized: User[] = list.map((u: any) => ({
        ...u,
        isCoreTeam: Boolean(u.isCoreTeam),
      }));
      return [...prev, ...normalized];
    });

    if (page >= totalPage) {
      setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <main className="min-h-screen bg-black text-white px-6 overflow-x-hidden">
      <section className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-32 text-center bg-gradient-to-b from-black via-red-900/40 to-black">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-red-500 to-orange-400
            bg-clip-text text-transparent"
        >
          Community Members
        </motion.h1>

        <p className="mt-4 text-sm md:text-base text-zinc-400">
          Designers, engineers, mentors, hackers, founders, and builders shaping the future of technology.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-6xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {users.map((user) => (
            <motion.div key={user._id} variants={item}>
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
                    <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-0 rounded-full blur-xl ${user.isCoreTeam
                          ? "bg-red-500/40"
                          : "bg-zinc-500/20"
                          }`}
                      />
                      <Image
                        src={
                          user.picture &&
                            !user.picture.includes("coderjs.s3.ap-southeast-2.amazonaws.com")
                            ? user.picture
                            : `https://api.dicebear.com/6.x/bottts/svg?seed=${encodeURIComponent(
                              user.full_name
                            )}`
                        }
                        alt={user.full_name}
                        width={72}
                        height={72}
                        className="relative z-10 rounded-full border-2 border-red-500 bg-black"
                      />

                    </div>

                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm md:text-base capitalize">
                        {user.full_name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        @{user.username}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* LOADER / END */}
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {loading && (
            <span className="text-zinc-500 text-sm animate-pulse">
              Loading more members...
            </span>
          )}

          {!hasMore && !loading && (
            <span className="text-zinc-600 text-sm">
              You’ve reached the end.
            </span>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center">
        <Button
          size="lg"
          className="rounded-2xl px-10 py-6 text-lg
          bg-red-600 hover:bg-red-700 transition"
        >
          Join the Community
        </Button>
      </section>
    </main>
  );
}
