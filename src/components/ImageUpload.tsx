"use client";

import { useState, useEffect } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  label: string;
  name: string;
  select: string;
  isRequired?: boolean;
  hinText?: string;
  onFileChange?: (file: File | null) => void;
  initialImage?: string;
}

export function ImageUpload({
  label,
  name,
  select,
  isRequired = false,
  hinText,
  onFileChange,
  initialImage,
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (!file.type.startsWith("image")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);

      if (onFileChange) {
        onFileChange(file);
      }
    } else {
      setImagePreview(null);
      setSelectedFile(null);
      if (onFileChange) {
        onFileChange(null);
      }
    }
  };

  return (
    <FormField name={name}>
      {(field) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-bold text-red-500 text-center block">
            {label} {isRequired && <span className="text-red-600">*</span>}
          </FormLabel>
          <FormControl>
            {/* Parent div untuk center horizontal & vertical */}
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <Input
                id={name}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                  field.onChange(e.target.files?.[0] || "");
                }}
                className="hidden"
              />
              {imagePreview ? (
                <label
                  htmlFor={name}
                  className="cursor-pointer w-48 h-48 rounded-xl overflow-hidden shadow-[0_0_15px_2px_rgba(239,68,68,0.6)] transition-all hover:scale-105 mx-auto flex items-center justify-center"
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-48 object-contain rounded-xl"
                  />
                </label>
              ) : (
                <label
                  htmlFor={name}
                  className="cursor-pointer w-48 h-48 border-2 border-dashed border-red-600/60 rounded-xl text-center flex items-center justify-center bg-black/80 text-red-400 hover:border-red-500 hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.5)] transition-all mx-auto"
                >
                  {select}
                </label>
              )}
              {hinText && (
                <p className="pt-2 text-sm text-red-400 text-center">{hinText}</p>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    </FormField>
  );
}
