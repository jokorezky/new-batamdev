"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAcceptCollaboration } from "@/hooks/events";
import { AuthDialog } from "@/components/AuthDialog";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CollaborationAcceptSuccess() {
  const searchParams = useSearchParams();
  const { user, loadingUser } = useSelector((state: RootState) => state.auth);

  const eventId = searchParams.get("event");
  const communityId = searchParams.get("community");
  const eventName = searchParams.get("eventName");
  const communityName = searchParams.get("communityName");

  const { acceptCollaboration, loading, error } = useAcceptCollaboration();

  const [done, setDone] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loadingUser) return;

    if (!user) {
      setAuthDialogOpen(true);
      return;
    }

    if (eventId && communityId && !done && user) {
      const run = async () => {
        try {
          const result = await acceptCollaboration(eventId, communityId);

          // Handle message if collaboration was already accepted
          if (result?.message) {
            setMessage(result.message);
          }

          setDone(true);
        } catch (err: any) {
          console.error("Parent got error:", err.message);
        }
      };
      run();
    }
  }, [eventId, communityId, done, user, loadingUser]);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Sedang memuat...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthDialog
        open={authDialogOpen}
        setOpen={setAuthDialogOpen}
        alertMessage="Anda harus login akun Admin komunitas terlebih dahulu untuk menerima undangan kolaborasi"
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Terjadi kesalahan saat menerima undangan. Silakan coba lagi.
        </p>
      </div>
    );
  }

  if (!done || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memproses undangan...</p>
      </div>
    );
  }

  // Tampilkan pesan jika kolaborasi sudah pernah diterima
  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Informasi Kolaborasi</h2>
          <p className="mb-4">{message}</p>
          <Link href="/events" className="text-blue-600 hover:underline">
            Kembali ke halaman event
          </Link>
        </div>
      </div>
    );
  }

  // Success page
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Undangan Diterima!
        </h2>
        <p className="text-gray-600 mb-6">
          Komunitas <span className="font-semibold">{communityName}</span>{" "}
          berhasil bergabung sebagai kolaborator dalam event{" "}
          <span className="font-semibold">{eventName}</span>.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-medium text-blue-800 mb-2">Apa berikutnya?</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Event akan muncul di halaman komunitas Anda</li>
            <li>
              Anggota yang mendaftar akan otomatis menjadi member komunitas
            </li>
            <li>Anda akan menerima update tentang event ini</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3">
          <Link
            href="/events"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            Lihat Event
          </Link>
          <Link
            href="/settings/community"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Jika ini adalah kesalahan, silakan hubungi tim support Kinigo.
        </p>
      </div>
    </div>
  );
}
