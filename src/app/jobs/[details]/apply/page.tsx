"use client";

import React, { useState, useRef } from "react";
import { useCheckOnboardingStatus } from "@/hooks/onboarding";
import { usePathname } from "next/navigation";
import { useGetJobById } from "@/hooks/use-jobs";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetMeQuery } from "@/hooks/useGetMeQuery";
import { useCreateJobApplication } from "@/hooks/job-application";
import { motion } from "framer-motion";

export default function Apply() {
  const { status, loading } = useCheckOnboardingStatus();
  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[70vh] text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Memeriksa profil kamu...
      </div>
    );
  }

  if (status && !status.isCompleted) return <OnboardingRequiredPage />;
  if (status?.isCompleted && !submitted)
    return <CompletedPage onSubmit={() => setSubmitted(true)} />;

  return <SuccessPage />;
}

function OnboardingRequiredPage() {
  const pathname = usePathname();
  const jobId = pathname.split("/")[2];
  const { job } = useGetJobById(jobId || "");
  const onboardingUrl = jobId ? `/jobs/onboarding?id=${jobId}` : "/onboarding";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-3">Profil kamu belum lengkap</h1>

      <p className="text-gray-600 mb-8 max-w-lg">
        Lengkapi profil dasar kamu agar bisa melamar posisi{" "}
        <span className="text-blue-600 font-medium">{job?.title}</span> di{" "}
        <span className="text-blue-600 font-medium">
          {job?.companyId?.name}
        </span>
        .
      </p>

      <img src="/cal.png" className="w-48 h-48 mb-10" />

      <Link href={onboardingUrl}>
        <Button className="px-8 h-11 bg-green-600 hover:bg-green-700 text-white rounded-full">
          LENGKAPI PROFIL
        </Button>
      </Link>
    </div>
  );
}

function CompletedPage({ onSubmit }: { onSubmit: () => void }) {
  const pathname = usePathname();
  const jobId = pathname.split("/")[2];
  const { job } = useGetJobById(jobId || "");

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-3">Kirim lamaran pekerjaan ini?</h1>

      <p className="text-gray-600 mb-8 max-w-lg">
        Profil kamu akan dikirim untuk posisi{" "}
        <span className="text-blue-600 font-medium">{job?.title}</span> di{" "}
        <span className="text-blue-600 font-medium">
          {job?.companyId?.name}
        </span>
        .
      </p>

      <img src="/cal.png" className="w-48 h-48 mb-10" />

      <div className="flex flex-col gap-3">
        <Button
          onClick={onSubmit}
          className="px-8 h-11 bg-green-600 hover:bg-green-700 text-white rounded-full"
        >
          KIRIM LAMARAN
        </Button>

        <Link href="/settings/profile">
          <Button className="rounded-full px-8 h-11" variant="outline">
            LIHAT PROFIL SAYA
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SuccessPage() {
  const { data } = useGetMeQuery();
  const pathname = usePathname();
  const jobId = pathname.split("/")[2];

  const { job } = useGetJobById(jobId || "");
  const { createJobApplication, loading: submitting } =
    useCreateJobApplication();

  const hasSubmittedRef = useRef(false);

  const [startMerge, setStartMerge] = useState(false);
  const [merged, setMerged] = useState(false);
  React.useEffect(() => {
    if (!jobId) return;

    if (!hasSubmittedRef.current) {
      hasSubmittedRef.current = true;

      createJobApplication({ jobId }).then(() => {
        setTimeout(() => setStartMerge(true), 300);
        setTimeout(() => setMerged(true), 1300);
      });
    }
  }, [jobId]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center text-center px-4 mt-10">
      {submitting || !merged ? (
        <>
          <h1 className="text-4xl font-bold mb-4 text-green-600">
            Sedang Memuat...
          </h1>

          <p className="text-gray-700 max-w-xl mb-2">
            Mohon tunggu sebentar, kami sedang memproses data kamu.
          </p>

          <p className="text-gray-500 max-w-xl mb-10">
            Halaman akan tampil begitu proses selesai.
          </p>
        </>
      ) : (
        <>
          {!submitting && merged && (
            <motion.div
              className="absolute w-40 h-40 bg-green-400/30 blur-3xl rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          )}
          {!submitting && merged && (
            <motion.p
              className="text-green-600 font-semibold text-lg mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Lamaran berhasil dikirim...
            </motion.p>
          )}
          <p className="text-gray-700 max-w-xl mb-2">
            Terima kasih sudah melamar. Profil kamu telah berhasil diteruskan ke
            perusahaan terkait.
          </p>

          <p className="text-gray-500 max-w-xl mb-10">
            Kamu dapat menutup halaman ini atau kembali melanjutkan pencarian
            pekerjaan lainnya.
          </p>
        </>
      )}

      <div className="relative w-60 h-60 flex items-center justify-center mb-12">
        <motion.img
          src={data?.getMe?.picture}
          className="w-20 h-20 rounded-full absolute shadow-lg z-20"
          initial={{ x: -120, opacity: 0, scale: 0.9 }}
          animate={{
            x: startMerge ? 0 : -120,
            opacity: 1,
            scale: merged ? 1.3 : 1.1,
          }}
          transition={{ duration: 1 }}
        />

        <motion.img
          src={job?.companyId?.logo}
          className="w-20 h-20 rounded-xl absolute shadow-lg z-20"
          initial={{ x: 120, opacity: 0, scale: 0.9 }}
          animate={{
            x: startMerge ? 0 : 120,
            opacity: 1,
            scale: merged ? 1.3 : 1.1,
          }}
          transition={{ duration: 1 }}
        />

        {submitting && (
          <motion.div
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <ArrowRight className="w-10 h-10 text-green-600 opacity-70" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
