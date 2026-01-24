"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AuthDialog } from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  image: string;
}

const heroContent: HeroProps = {
  title: "Rekrut talenta terbaik yang haus teknologi & inovasi",
  subtitle: "Untuk Perusahaan",
  description:
    "Akses digital marketer, data analyst, developer, dan profesional unggulan dari komunitas startup Indonesia & Singapura.",
  buttonText: "Pelajari Premium",
  image:
    "https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/11/10-dc-heroes-with-the-coolest-civilian-jobs.jpg", // Gambar hero
};

interface Feature {
  icon: string;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    icon: "account",
    title: "Temukan Kandidat Berbakat",
    description:
      "Akses database dengan 40.000+ talenta yang berpengalaman di dunia startup.",
    image: "/features/search.jpg",
  },
  {
    icon: "clock",
    title: "Rekomendasi Otomatis",
    description:
      "Sistem AI kami membantu menemukan kandidat paling relevan dalam hitungan detik.",
    image: "/features/ai-hiring.jpg",
  },
  {
    icon: "people",
    title: "2x Lebih Banyak Kandidat",
    description:
      "Featured Jobs meningkatkan visibilitas anda & menarik kandidat berkualitas.",
    image: "/features/team.jpg",
  },
  {
    icon: "system",
    title: "Dashboard Modern",
    description: "Kelola & review pelamar menggunakan dashboard canggih kami.",
    image: "/features/dashboard.jpg",
  },
  {
    icon: "branding",
    title: "Branding Perusahaan",
    description:
      "Perkuat citra melalui foto, testimoni & halaman company profile.",
    image: "/features/branding.jpg",
  },
  {
    icon: "results",
    title: "Hasil Terbaik",
    description:
      "Perusahaan Premium merasakan peningkatan efisiensi & kualitas perekrutan.",
    image: "/features/results.jpg",
  },
];

interface PricingPlan {
  name: string;
  price: string;
  cycle?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  image?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Flexible",
    price: "400.000",
    cycle: "Bayar per post job",
    features: ["Bayar hanya sesuai kebutuhan"],
    ctaText: "Posting Sekarang",
    ctaLink: "/jobs/employers/job-postings/paid?plan=flexible",
    image: "/pricing/flexible.jpg",
  },
  {
    name: "Premium",
    price: "1.300.000",
    cycle: "/bulan (Ditagih 6 bulan)",
    features: [
      "Job Posting tanpa batas",
      "5 Featured Job",
      "Rekomendasi talenta",
      "Employer branding",
      "Wawasan gaji",
    ],
    ctaText: "Dapatkan Premium",
    ctaLink: "",
    image: "/pricing/premium.jpg",
  },
  {
    name: "Premium+",
    price: "3.500.000",
    cycle: "/bulan (Ditagih 6 bulan)",
    features: [
      "Job Posting tanpa batas",
      "5 Featured Job",
      "Rekomendasi talenta",
      "Employer branding",
      "Wawasan gaji",
      "Kredit pencarian talenta tanpa batas",
    ],
    ctaText: "Dapatkan Premium+",
    ctaLink: "",
    image: "/pricing/premium-plus.jpg",
  },
];

const faqData = [
  {
    q: "Layanan apa saja yang ditawarkan?",
    a: "Talenta kami mencakup berbagai bidang seperti software engineering, analisis data, pemasaran digital, desain, dan lainnya.",
  },
  {
    q: "Bagaimana proses perekrutannya?",
    a: "Kami mencocokkan Anda dengan talenta paling relevan sesuai kebutuhan bisnis.",
  },
  {
    q: "Apakah talenta Anda berpengalaman?",
    a: "Semua talenta telah melalui kurasi internal untuk memastikan kualitas profesional.",
  },
];

export default function JobsEmployers() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const isAuthenticated = useAuth();
  const premiumRef = React.useRef<HTMLDivElement | null>(null);
  const [isMonthly, setIsMonthly] = React.useState(false);

  const pricesLocked = true;

  function getMonthlyPrice(price: string) {
    const base = parseInt(price.replace(/\./g, ""));
    const monthly = base * 1.2;
    return monthly.toLocaleString("id-ID");
  }
  return (
    <div className="w-full">
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-green-700 to-green-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,255,180,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(#1fff87_1px,transparent_1px),linear-gradient(90deg,#1fff87_1px,transparent_1px)] bg-[size:48px_48px] opacity-10" />

        <div className="max-w-7xl mx-auto relative z-10 px-6 py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            {heroContent.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-xl max-w-3xl mx-auto text-gray-200"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <Button
              onClick={() =>
                premiumRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 text-lg bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/30"
            >
              {heroContent.buttonText}
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Harga Jelas, Tanpa Kerumitan
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Tanpa biaya tersembunyi. Pilih paket yang sesuai kebutuhan Anda.
        </p>

        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-200 p-1 rounded-full">
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-6 py-2 text-sm font-medium rounded-full ${
                !isMonthly
                  ? "bg-gradient-to-b from-green-700 to-green-900 text-white"
                  : "text-gray-500"
              }`}
            >
              Setiap 6 bulan
            </button>

            <button
              onClick={() => setIsMonthly(true)}
              className={`px-6 py-2 text-sm font-medium rounded-full ${
                isMonthly
                  ? "bg-gradient-to-b from-green-700 to-green-900 text-white"
                  : "text-gray-500"
              }`}
            >
              Setiap Bulan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((p, i) => {
            const isFlexible = p.name === "Flexible";
            const isLocked = pricesLocked && !isFlexible;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-3xl p-10 shadow-xl border bg-white text-gray-900 relative min-h-[530px] ${
                  p.name === "Premium"
                    ? "scale-105 bg-gradient-to-b from-green-700 to-green-900 text-white"
                    : ""
                }`}
              >
                {isFlexible && p.name === "Premium" && (
                  <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-3 py-1 text-xs font-semibold rounded-full">
                    PALING POPULER
                  </div>
                )}

                <div className="text-4xl font-extrabold h-14 flex items-center">
                  {isFlexible ? (
                    <div>
                      <del>Rp. {p.price}</del>
                    </div>
                  ) : isLocked ? (
                    <div className="select-none">
                      <span className="opacity-0 pointer-events-none">
                        Rp. {p.price}
                      </span>
                    </div>
                  ) : (
                    <div>
                      Rp.{" "}
                      {isMonthly && p.name !== "Flexible"
                        ? getMonthlyPrice(p.price)
                        : p.price}
                    </div>
                  )}
                </div>
                {isFlexible && (
                  <span className="text-base font-medium">
                    {p.name === "Flexible"
                      ? p.cycle
                      : isMonthly
                      ? "/bulan"
                      : p.cycle}
                  </span>
                )}

                <h3 className="text-2xl font-bold mt-4">{p.name}</h3>

                <ul className="mt-6 space-y-3">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          p.name === "Premium"
                            ? "bg-white"
                            : "bg-green-900 text-white"
                        }`}
                      >
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {isFlexible && (
                  <p className="mt-4 text-sm text-gray-600">
                    Setiap pengguna berhak atas 1 postingan gratis setiap
                    minggu. Jika ingin menambahkan postingan lebih dari itu
                    dalam minggu yang sama, biaya tambahan sebesar Rp35.000 per
                    posting akan dikenakan.
                  </p>
                )}

                <Button
                  disabled={isLocked || (!isAuthenticated && p.ctaLink === "")}
                  aria-disabled={isLocked ? "true" : "false"}
                  onClick={() => {
                    if (isLocked) return;
                    if (!isAuthenticated) {
                      setAuthDialogOpen(true);
                      return;
                    }
                    window.location.href = p.ctaLink;
                  }}
                  className={`absolute bottom-6 left-6 right-6 py-5 rounded-xl text-lg transition ${
                    p.name === "Premium"
                      ? "bg-white text-green-900 hover:bg-gray-100"
                      : "bg-gradient-to-b from-green-700 to-green-900 text-white"
                  } ${
                    isLocked
                      ? "pointer-events-none opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {p.ctaText}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section ref={premiumRef} className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Fitur Premium yang Membuat Anda Unggul
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
          Solusi lengkap untuk meningkatkan efisiensi perekrutan dan memperkuat
          branding perusahaan Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl shadow-xl hover:shadow-2xl transition bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-green-700 to-green-900 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md">
                {i + 1}
              </div>

              <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-neutral-900 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Hasil Premium yang Lebih Maksimal
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tingkatkan visibilitas, tarik kandidat berkualitas, dan percepat
            proses perekrutan dengan teknologi yang dirancang untuk hasil
            terbaik.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="rounded-2xl border bg-white dark:bg-neutral-800 p-10 shadow-sm hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center shadow-md">
                <div className="w-6 h-6 rounded-full bg-white/60 backdrop-blur-sm"></div>
              </div>
              <h3 className="text-xl font-semibold">Visibilitas Tinggi</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Lowongan tampil lebih menonjol dan menjangkau lebih banyak
                kandidat potensial.
              </p>
            </div>

            <div className="rounded-2xl border bg-white dark:bg-neutral-800 p-10 shadow-sm hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center shadow-md">
                <div className="w-6 h-6 rounded-lg bg-white/60 backdrop-blur-sm"></div>
              </div>
              <h3 className="text-xl font-semibold">
                Kandidat Lebih Berkualitas
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Sistem smart-filter membantu Anda menemukan kandidat yang
                relevan dan berpengalaman.
              </p>
            </div>

            <div className="rounded-2xl border bg-white dark:bg-neutral-800 p-10 shadow-sm hover:shadow-xl transition">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center shadow-md">
                <div className="w-6 h-6 rotate-45 bg-white/60 backdrop-blur-sm"></div>
              </div>
              <h3 className="text-xl font-semibold">
                Kekuatan Brand Perusahaan
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                Tingkatkan kredibilitas dan tampilkan profesionalisme yang
                menarik kandidat terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Pertanyaan yang Sering Diajukan
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border shadow-sm bg-white dark:bg-neutral-900"
            >
              <h3 className="text-xl font-semibold">{faq.q}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {!isAuthenticated && (
        <AuthDialog open={authDialogOpen} setOpen={setAuthDialogOpen} />
      )}
    </div>
  );
}
