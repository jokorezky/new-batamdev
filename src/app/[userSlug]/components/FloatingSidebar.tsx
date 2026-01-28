"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Image,
  Info,
  Settings,
} from "lucide-react";

const items = [
  { id: "events", icon: Calendar },
  { id: "members", icon: Users },
  { id: "event-gallery", icon: Image },
  { id: "about", icon: Info },
  { id: "settings", icon: Settings },
];

export function FloatingSidebar({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="
        fixed left-6 top-1/2 -translate-y-1/2 z-50
        rounded-2xl glass-dark
        shadow-[0_0_40px_rgba(239,68,68,0.35)]
        p-2 space-y-2
      "
    >
      {items.map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`
            h-11 w-11 rounded-xl flex items-center justify-center
            transition-all duration-200
            ${
              active === id
                ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.7)]"
                : "text-neutral-400 hover:text-red-400 hover:bg-white/5"
            }
          `}
        >
          <Icon size={18} />
        </button>
      ))}
    </motion.aside>
  );
}
