"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-950">
      
      {/* Background Red Neon Blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-red-700 via-red-500 to-pink-600 opacity-20 blur-3xl animate-blob"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-500 opacity-15 blur-2xl animate-blob animation-delay-2000"
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, -360, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center p-12"
      >
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-500 animate-text-glow">
          404
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          Oops! Halaman yang kamu cari tidak ditemukan.
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-3xl px-10 py-4 bg-gradient-to-r from-red-600 to-red-400 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </motion.div>

      {/* Neon Glow Animation */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px #f87171, 0 0 20px #f87171, 0 0 30px #f87171; }
          50% { text-shadow: 0 0 20px #f87171, 0 0 40px #f87171, 0 0 60px #f87171; }
        }
        .animate-text-glow { animation: text-glow 2s infinite alternate; }
      `}</style>
    </div>
  );
}
