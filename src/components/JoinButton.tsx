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
import { CheckCircle, Flame, XCircle } from "lucide-react";

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
    if (!isAuthenticated) {
      toast({
        title: "Akses Terkunci",
        description: "Login diperlukan untuk bergabung ke event ini.",
        variant: "destructive",
      });
      return;
    }

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
        if (event.eventSlug) await revalidateEventPage(event.eventSlug);
      } catch {
        toast({
          title: "Gagal",
          description: "Tidak bisa bergabung. Coba lagi.",
          variant: "destructive",
        });
      }
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setPaymentProof(e.target.files[0]);
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProof || !senderName) return;

    setIsUploading(true);
    try {
      const upload = await uploadFile(paymentProof, MediaFolderType.EVENT);
      await attendEvent({
        eventId: event._id!,
        paymentProof: upload.data,
        fullName: senderName,
        ticket: Number(event.ticket_price),
      });
      setShowPaymentModal(false);
      setShowCongratsModal(true);
      refetch();
      if (event.eventSlug) await revalidateEventPage(event.eventSlug);
    } finally {
      setIsUploading(false);
    }
  };


  if (loading) {
    return (
      <div className="w-full py-3 rounded-xl text-center font-semibold
        bg-neutral-900 text-red-400 animate-pulse border border-red-500/20">
        ⏳ Checking access…
      </div>
    );
  }

  if (eventHasPassed) {
    return (
      <div className="w-full py-3 rounded-xl text-center font-semibold
        bg-neutral-950 text-neutral-500 border border-white/10 flex items-center justify-center gap-2">
        <XCircle className="w-4 h-4" />
        Event Closed
      </div>
    );
  }

  if (hasAttended) {
    return (
      <div className="w-full py-3 rounded-xl text-center font-semibold
        bg-red-500/10 text-red-400 border border-red-500/30
        flex items-center justify-center gap-2">
        <CheckCircle className="w-5 h-5" />
        You’re Registered
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={handleJoin}
        className="
          w-full py-4 text-lg font-bold rounded-xl
          bg-gradient-to-r from-red-600 to-red-800
          hover:from-red-500 hover:to-red-700
          text-white shadow-lg shadow-red-500/30
          hover:shadow-red-500/50 hover:scale-[1.03]
          transition-all duration-300
          flex items-center justify-center gap-2
        "
      >
        <Flame className="w-5 h-5 animate-pulse" />
        Join Event
      </Button>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-neutral-950 border border-red-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-400">
              {event.title}
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              Complete payment to unlock your access.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-white/10 p-4 bg-black">
            <p className="text-center text-sm text-neutral-400">Ticket Price</p>
            <p className="text-center text-3xl font-extrabold text-red-500">
              Rp {Number(event.ticket_price).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="space-y-3">
            <Input
              placeholder="Sender Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="bg-black border border-white/10 text-white"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-neutral-400"
            />
          </div>

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setShowPaymentModal(false)}
              className="bg-neutral-800 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePaymentSubmit}
              disabled={isUploading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isUploading ? "Uploading…" : "Confirm Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCongratsModal} onOpenChange={setShowCongratsModal}>
        <DialogContent className="bg-neutral-950 text-center border border-red-500/30">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold text-red-500">
              Access Granted
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              Welcome to {event.title}
            </DialogDescription>
          </DialogHeader>

          {event.community?.admins?.[0]?.picture && (
            <Image
              src={event.community.admins[0].picture}
              alt="Admin"
              width={96}
              height={96}
              className="mx-auto rounded-full ring-2 ring-red-500/40"
            />
          )}

          <p className="mt-4 italic text-neutral-400">
            “You’re now part of something powerful.”
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
