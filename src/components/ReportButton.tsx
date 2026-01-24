"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ReportButtonProps {
  jobId: string;
}

export default function ReportButton({ jobId }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleReport = () => setIsOpen(true);

  const handleConfirm = () => {
    const reportObject = {
      jobId,
      reason,
      createdAt: new Date().toISOString(),
    };

    console.log("Report Object:", reportObject); // <-- console log object
    setIsOpen(false);
    setReason(""); // reset textarea
    // TODO: panggil API untuk submit reportObject
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="!bg-transparent border-none text-white shadow-none hover:bg-white hover:text-navy-700 p-0"
          variant="outline"
          size="sm"
          onClick={handleReport}
        >
          <Info /> Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Job</DialogTitle>
        </DialogHeader>
        <p>Silakan tulis alasan kamu melaporkan pekerjaan ini:</p>

        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-2"
          placeholder="Tulis alasan di sini..."
          rows={4}
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button className="text-white" onClick={handleConfirm}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
