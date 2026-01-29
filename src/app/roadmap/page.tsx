"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import {
  CheckCircle,
  Clock,
  Lock,
  ArrowRight,
} from "lucide-react";

type Status = "done" | "progress" | "planned";

interface RoadmapItem {
  title: string;
  desc: string;
  status: Status;
  link?: string;
  votes?: {
    up: number;
    down: number;
  };
}

interface Quarter {
  quarter: string;
  focus: string;
  kpi: string;
  progress: number;
  items: RoadmapItem[];
}

// helper: mapping backend status -> frontend status
const mapStatus = (status: string): Status => {
  switch (status) {
    case "DONE":
      return "done";
    case "PROGRESS":
      return "progress";
    case "PLANNED":
      return "planned";
    default:
      return "planned";
  }
};

export default function RoadmapPage() {
  const { roadmap, loading, error } = useRoadmap(2026);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error loading roadmap</p>;
  if (!roadmap) return <p className="text-center mt-20">No roadmap found</p>;

  // mapping backend data ke frontend type
  const quarters: Quarter[] = roadmap.quarters.map((q) => ({
    quarter: q.quarter,
    focus: q.focus,
    kpi: q.kpi,
    progress: q.progress,
    items: q.items.map((i) => ({
      title: i.title,
      desc: i.desc,
      status: mapStatus(i.status),
      votes: i.votes,
    })),
  }));

  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-28 md:pt-44 md:pb-36 px-4 space-y-16">
      <section className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent"
        >
          BatamDev Roadmap {roadmap.year}
        </motion.h1>
        <p className="mt-6 text-gray-400 text-sm md:text-base">
          Transparent execution plan. Visible progress. Community-driven signals.
        </p>
      </section>

      <StatusLegend />

      <div className="max-w-5xl mx-auto space-y-20">
        {quarters.map((q, i) => (
          <motion.section
            key={q.quarter}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="p-6 md:p-8 rounded-3xl bg-black/60 border border-red-600/30 backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-red-400">
                  {q.quarter}
                </h2>
                <p className="text-gray-400 text-sm mt-1">{q.focus}</p>
              </div>
              <div className="text-sm text-gray-300">
                KPI: <span className="text-red-400">{q.kpi}</span>
              </div>
            </div>

            <div className="mb-10">
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${q.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Progress: {q.progress}%
              </p>
            </div>

            <div className="space-y-4">
              {q.items.map((item, idx) => (
                <RoadmapItemCard key={idx} item={item} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  );
}

function RoadmapItemCard({ item }: { item: RoadmapItem }) {
  const statusConfig = {
    done: {
      icon: <CheckCircle className="text-red-500 shrink-0" />,
      border: "border-red-600/50",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
    },
    progress: {
      icon: <Clock className="text-orange-400 animate-pulse shrink-0" />,
      border: "border-orange-500/40",
      glow: "",
    },
    planned: {
      icon: <Lock className="text-gray-500 shrink-0" />,
      border: "border-gray-700",
      glow: "",
    },
  }[item.status];

  return (
    <div
      className={`p-5 rounded-2xl bg-black/70 border ${statusConfig.border} ${statusConfig.glow}
      flex flex-col md:flex-row md:items-center md:justify-between gap-4`}
    >
      <div className="flex gap-4">
        {statusConfig.icon}
        <div>
          <h3 className="font-semibold text-sm md:text-base">
            {item.title}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            {item.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
        {item.status === "planned" && item.votes && (
          <VoteBox up={item.votes.up} down={item.votes.down} />
        )}

        {item.link && item.status === "done" && (
          <Link
            href={item.link}
            className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
          >
            View <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

function StatusLegend() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 text-sm">
      <LegendItem
        icon={<CheckCircle className="text-red-500" />}
        label="Completed"
        desc="Already executed"
        border="border-red-600/40"
      />
      <LegendItem
        icon={<Clock className="text-orange-400" />}
        label="In Progress"
        desc="Currently running"
        border="border-orange-500/40"
      />
      <LegendItem
        icon={<Lock className="text-gray-400" />}
        label="Planned"
        desc="Open for voting"
        border="border-gray-700"
      />
    </div>
  );
}

function LegendItem({
  icon,
  label,
  desc,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  border: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-black/60 border ${border} backdrop-blur`}
    >
      {icon}
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

function VoteBox({ up, down }: { up: number; down: number }) {
  return (
    <div className="flex items-center gap-2 text-xs md:text-sm">
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-700 hover:border-red-500/50 hover:text-red-400 transition">
        👍 {up}
      </button>
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition">
        👎 {down}
      </button>
    </div>
  );
}
