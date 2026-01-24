"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IEventInput } from "@/types/Events";
import { revalidateEventPage } from "@/actions/event";
import { useToast } from "@/hooks/use-toast";
import { useHasAttended, useEventAttendance } from "@/hooks/use-attend";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { MediaFolderType } from "@/types/MediaFolderType";
import { uploadFile } from "@/hooks/uploadFile";
import { Input } from "@/components/ui/input";

interface JoinButtonProps extends IEventInput {
  eventSlug?: string;
}
export default function JoinButton(event: Readonly<JoinButtonProps>) {
  const isAuthenticated = useAuth();
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [senderName, setSenderName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { hasAttended, loading, refetch } = useHasAttended(event._id!);
  const { attendEvent } = useEventAttendance();

  const date = new Date(event.startDate);
  const [hours, minutes] = event.startTime.split(":").map(Number);
  const eventDateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );

  const now = new Date();
  const eventHasPassed = now.getTime() > eventDateTime.getTime();

  const handleJoin = async () => {
    if (isAuthenticated) {
      if (event.isFree) {
        try {
          await attendEvent({
            eventId: event._id!,
            paymentProof: "",
            fullName: senderName || "Guest",
            ticket: 1,
          });
          setShowCongratsModal(true);
          refetch();
          if (event.eventSlug) {
            await revalidateEventPage(event.eventSlug);
          }
        } catch (error) {
          console.error("Error joining free event:", error);
          alert("Gagal join acara gratis. Coba lagi.");
        }
      } else {
        setShowPaymentModal(true);
      }
    } else {
      toast({
        title: "Login Diperlukan",
        description:
          "Silakan login terlebih dahulu untuk bisa bergabung dengan acara ini.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProof || !senderName) {
      alert("Please fill in all required fields");
      return;
    }

    setIsUploading(true);
    try {
      const uploadResult = await uploadFile(
        paymentProof,
        MediaFolderType.EVENT
      );
      const paymentProofUrl = uploadResult.data;

      await attendEvent({
        eventId: event._id!,
        paymentProof: paymentProofUrl,
        fullName: senderName,
        ticket: Number(event.ticket_price),
      });

      setShowPaymentModal(false);
      setShowCongratsModal(true);
      refetch();
      if (event.eventSlug) {
        await revalidateEventPage(event.eventSlug);
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to submit payment. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="w-full py-3 text-center font-semibold text-gray-500 bg-gray-100 rounded-xl animate-pulse">
          ⏳ Mengecek status kehadiran...
        </div>
      )}

      {!loading && eventHasPassed && (
        <p className="w-full py-3 text-center font-semibold text-gray-700 bg-gray-200 rounded-xl">
          Acara telah selesai
        </p>
      )}

      {!loading && !eventHasPassed && !hasAttended && (
        <Button
          onClick={handleJoin}
          className="w-full py-3 font-semibold text-white text-lg rounded-xl shadow-lg shadow-green-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600"
        >
          Join This Event
        </Button>
      )}

      {!loading && !eventHasPassed && hasAttended && (
        <p className="w-full py-3 text-center font-semibold text-green-700 bg-green-100 rounded-xl">
          🎉 Kamu sudah terdaftar di acara ini
        </p>
      )}

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-700">
              {event.title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-base text-gray-600">
              Lengkapi proses pendaftaran dengan melakukan pembayaran tiket
              sesuai nominal di bawah ini, lalu unggah bukti pembayaran untuk
              konfirmasi.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="mb-4 text-center">
              <span className="block text-sm text-gray-500">Harga Tiket</span>
              <span className="text-3xl font-bold text-green-600">
                Rp {Number(event.ticket_price).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="space-y-2 text-gray-700 text-base">
              <div className="flex justify-between border-b pb-2">
                <span>Bank</span>
                <span className="font-medium">{event.bank_account}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Nama Rekening</span>
                <span className="font-medium">{event.account_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Nomor Rekening</span>
                <span className="font-medium">{event.account_number}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Pengirim
            </label>
            <Input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Masukkan nama sesuai rekening pengirim"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unggah Bukti Pembayaran
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format gambar (.jpg, .png) — Maksimal 2MB.
            </p>
            {paymentProof && (
              <p className="text-sm text-green-600 mt-1">
                File terpilih: {paymentProof.name}
              </p>
            )}
          </div>

          <p className="mt-5 text-gray-500 italic text-center">
            "Bergabunglah dan wujudkan koneksi baru, inspirasi, serta peluang
            tanpa batas!"
          </p>

          <DialogFooter className="mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowPaymentModal(false)}
            >
              Batal
            </Button>
            <Button
              onClick={handlePaymentSubmit}
              disabled={isUploading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isUploading ? "Mengunggah..." : "Kirim Bukti & Konfirmasi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCongratsModal} onOpenChange={setShowCongratsModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">
              Selamat!
            </DialogTitle>
            <DialogDescription className="mt-2 text-base text-gray-600">
              Sampai jumpa di acara {event.title}
            </DialogDescription>
          </DialogHeader>
          {event?.community?.admins && event.community.admins.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              {event.community.admins[0]?.picture && (
                <Image
                  src={event.community.admins[0].picture}
                  alt={
                    event.community.admins[0]?.full_name || "Community admin"
                  }
                  width={100}
                  height={100}
                  className="rounded-full shadow-md"
                />
              )}
              {event.community.admins[0]?.full_name && (
                <p className="font-semibold text-lg">
                  {event.community.admins[0].full_name}
                </p>
              )}
              <p className="text-gray-600 italic">
                "Setiap langkah kecil yang kamu ambil hari ini adalah pondasi
                bagi masa depanmu."
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
