"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { CommunityResponse, CommunityMember } from "@/types/Community";
import { useCommunityMembers } from "@/hooks/use-community";

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

export function CommunityMembers({
  community,
}: {
  community: CommunityResponse;
}) {
  const LIMIT = 12;

  const [page, setPage] = useState(1);
  const [membersList, setMembersList] = useState<CommunityMember[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { members, pagination, refetch } = useCommunityMembers(
    community._id,
    page,
    LIMIT
  );

  /**
   * ============================
   * LOAD DATA (PER PAGE)
   * ============================
   */
  useEffect(() => {
    const load = async () => {
      if (!hasMore) return;
      setLoading(true);
      await refetch();
      setLoading(false);
    };
    load();
  }, [page]);

  /**
   * ============================
   * APPEND RESULT (ONCE)
   * ============================
   */
  useEffect(() => {
    if (!members || members.length === 0) return;

    setMembersList((prev) => [...prev, ...members]);

    if (!pagination?.hasNextPage) {
      setHasMore(false);
    }
  }, [members, pagination?.hasNextPage]);

  /**
   * ============================
   * OBSERVER
   * ============================
   */
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => p + 1);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <main className="min-h-screen bg-black text-white px-6 overflow-x-hidden">
      <section className="max-w-6xl mx-auto py-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {membersList.map((member) => (
            <motion.div
              key={`member-${member._id}`}
              variants={item}
            >
              <Link href={`/p/${member.username}`}>
                <div
                  className="group relative bg-white/5 backdrop-blur-xl
                  border border-white/10 rounded-3xl
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-red-500
                  hover:shadow-[0_0_40px_rgba(255,0,0,0.35)]"
                >
                  <div className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden">
                      <div className="absolute inset-0 rounded-full blur-xl bg-red-500/30" />

                      <Image
                        src={
                          member.picture &&
                            !member.picture.includes("coderjs.s3.ap-southeast-2.amazonaws.com")
                            ? member.picture
                            : `https://api.dicebear.com/6.x/bottts/svg?seed=${encodeURIComponent(
                              member.full_name
                            )}`
                        }
                        alt={member.full_name}
                        width={72}
                        height={72}
                        className="relative z-10 rounded-full border-2 border-red-500 bg-black object-cover"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <p className="font-semibold text-sm md:text-base capitalize">
                        {member.full_name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        @{member.username}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div
          ref={loadMoreRef}
          className="h-20 flex items-center justify-center"
        >
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
    </main>
  );
}
