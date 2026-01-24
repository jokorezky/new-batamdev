'use client';

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScanSearchIcon } from "lucide-react";
import Image from "next/image";

export default function ImagePreviewClient({ imageUrl }: { imageUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        className="absolute bottom-7 right-7 animate-pulse hover:animate-none"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <ScanSearchIcon />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative w-full h-[80vh]">
            <Image
              src={imageUrl}
              alt="Full Size Event Image"
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
