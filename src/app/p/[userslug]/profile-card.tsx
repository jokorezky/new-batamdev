"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/User";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetNewsByUserSlug } from "@/hooks/useNewsMutation";
import { Linkedin, Globe, Mail } from "lucide-react";

export function ProfileWithArticles({ user }: { user: User }) {
  const prof: User = user;
  const { news } = useGetNewsByUserSlug(prof.username, 1, 10);

  const cleanText = (htmlText: string, maxLength = 150) => {
    if (!htmlText) return "";
    let text = htmlText.replace(/<[^>]*>/g, " ");
    text = text.replace(/kinigo\.id\s*-\s*/g, "");
    text = text.replace(/\s+/g, " ").trim();
    if (text.length > maxLength) text = text.substring(0, maxLength) + "...";
    return text;
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12 md:py-16">
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
                src={prof.picture || "https://i.pravatar.cc/300"}
                alt={prof.full_name || "User"}
                width={150}
                height={150}
                className="rounded-full border-4 border-red-500 object-cover"
              />
              <h1 className="text-2xl font-bold text-red-400">
                {prof.full_name || "User Name"}
              </h1>
              <p className="text-sm text-zinc-400">
                {prof.bio || "Bio is not available yet"}
              </p>

              {/* <div className="flex flex-wrap gap-2 justify-center mt-2">
                <Badge className="bg-red-600/20 text-red-400 border-red-600/40">
                  Verified
                </Badge>
              </div> */}

              <div className="flex gap-4 mt-4">
                <IconLink icon={<Linkedin />} url={prof.linkedin ? `https://linkedin.com/in/${prof.linkedin}` : "#"} />
                <IconLink icon={<Globe />} url={prof.website || "#"} />
                <IconLink icon={<Mail />} url={prof.email ? `mailto:${prof.email}` : "#"} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="md:col-span-2 space-y-6 md:pr-2">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/60 border border-red-600/30 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h2 className="text-xl font-semibold text-red-400 mb-2">
              {/* Speaker Overview */}
              Overview
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Description is not available yet.
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
            <p className="text-zinc-400 text-sm">
              No data available
            </p>
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
            <p className="text-zinc-400 text-sm italic">
              No sessions available
            </p>
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
            <p className="text-zinc-400 text-sm italic">
              No data available
            </p>
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
              <IconLink icon={<Linkedin />} url={prof.linkedin ? `https://linkedin.com/in/${prof.linkedin}` : "#"} />
              <IconLink icon={<Globe />} url={prof.website || "#"} />
              <IconLink icon={<Mail />} url={prof.email ? `mailto:${prof.email}` : "#"} />
            </div>
          </motion.div>

          {news.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Latest Insights
              </h2>

              {news.map((article) => (
                <Card
                  key={article._id}
                  className="bg-black/60 border border-red-600/30 backdrop-blur-xl p-4 hover:border-red-500 transition"
                >
                  <h3 className="text-red-400 font-semibold text-lg hover:underline">
                    <Link href={`/${article.url}`}>{article.title}</Link>
                  </h3>
                  <p className="text-zinc-300 text-sm">
                    {cleanText(article.content, 150)}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {format(new Date(article.createdAt), "h:mm a - MMMM d, yyyy", { locale: id })}
                  </p>
                </Card>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

function IconLink({ icon, url }: { icon: React.ReactNode; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full border border-red-600/40 text-red-400 hover:bg-red-600/20 hover:scale-110 transition"
    >
      {icon}
    </a>
  );
}
