"use client";

import React, { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { Loader2 } from "lucide-react";

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (file: File) => void;
  className?: string;
  isCover?: boolean;
  isAdmin: boolean;
  loading?: boolean;
}

export function EditableImage({
  src,
  alt,
  onChange,
  className,
  isCover,
  isAdmin,
  loading = false,
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(src);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview !== src) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, src]);

  return (
    <div className={`relative ${className}`}>
      {isCover ? (
        <AspectRatio
          ratio={
            typeof window !== "undefined" && window.innerWidth < 768
              ? 16 / 10
              : 16 / 6
          }
          className="overflow-hidden"
        >
          <Image src={preview} alt={alt} fill className="object-cover" />
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          )}
        </AspectRatio>
      ) : (
        <Avatar className="h-20 w-20 md:h-28 md:w-28 border-4 border-white">
          <AvatarImage src={preview} alt={alt} className="object-cover"/>
          {/* <AvatarFallback>{alt[0]}</AvatarFallback> */}
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </div>
          )}
        </Avatar>
      )}
      {isAdmin && (
        <button
          type="button"
          onClick={handleClick}
          className={`absolute bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full border shadow-md flex items-center justify-center transition ${
            isCover
              ? "bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4"
              : "-top-4 -right-2 transform translate-x-1/4 translate-y-1/4"
          }`}
        >
          <FiEdit2 className="w-2 h-2" />
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );
}
