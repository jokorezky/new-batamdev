"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <motion.img
        src="/Asset 4.svg"
        alt="Logo Background"
        className="absolute w-[500px] h-[500px] opacity-10"
        initial={{ opacity: 0.05 }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <h1 className="text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Oops! Halaman yang kamu cari tidak ditemukan
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="rounded-2xl px-8 text-white">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
