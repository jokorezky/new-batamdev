"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { MediaFolderType } from "@/types/MediaFolderType";
import { uploadFile } from "@/hooks/uploadFile";
import { useOnboardingForm } from "@/hooks/onboarding";
export default function Step3ResumeBioView({ onBack }: { onBack: () => void }) {
  const [bio, setBio] = useState("");
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { submitStep3 } = useOnboardingForm();

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  const handleResumeSubmit = async () => {
    if (files.length === 0) {
      console.log("Tidak ada file diupload");
      return;
    }

    setLoading(true);

    try {
      console.log("Mulai upload...");
      const uploaded = await uploadFile(files[0], MediaFolderType.RESUME);
      console.log("HASIL UPLOAD:", uploaded);
      await submitStep3(uploaded.data, bio);
      setLoading(false);
      router.push(`/jobs`);
    } catch (error) {
      setLoading(false);
      console.error("Gagal upload:", error);
    }
  };

  return (
    <div className="w-full bg-white px-6 py-10 flex flex-col items-center">
      <div className="text-sm text-gray-500 mb-8">
        Mengatur profil Anda —{" "}
        <span className="font-semibold">40% selesai!</span>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2">
        Selesaikan dengan resume dan bio!
      </h1>
      <p className="text-gray-600 text-center">
        Pastikan resume Anda rapi dan mudah dibaca.
      </p>

      <div className="w-full max-w-4xl mt-10 space-y-8">
        <div className="border rounded-2xl p-6 shadow-sm bg-neutral-50">
          <p className="font-semibold mb-3 text-lg">Resume</p>

          <div className="w-full border border-dashed rounded-xl p-4 bg-white">
            <FileUpload onChange={handleFileUpload} />
          </div>

          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            Kami menerima dokumen PDF atau Microsoft Office dengan ukuran
            maksimal 5MB. Resume Anda hanya akan ditampilkan kepada perusahaan
            yang Anda lamar.
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm bg-neutral-50">
          <p className="font-semibold mb-3 text-lg">Short Bio</p>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-4 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Tulis bio singkat kamu..."
          ></textarea>

          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
            Bantu perusahaan memahami kekuatan dan keahlian Anda melalui bio
            singkat ini.
          </p>
        </div>

        <div className="flex justify-between py-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 h-10 rounded-full"
          >
            KEMBALI
          </Button>

          <Button
            className="px-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleResumeSubmit}
            disabled={loading}
          >
            {loading ? "MENYELESAIKAN..." : "SELESAI"}
          </Button>
        </div>
      </div>
    </div>
  );
}
