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
          <FormLabel className="font-bold">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
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
                <label htmlFor={name} className="cursor-pointer">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </label>
              ) : (
                <label
                  htmlFor={name}
                  className="cursor-pointer w-48 h-48 border-2 border-dashed border-gray-400 rounded-lg text-center flex items-center justify-center  "
                >
                  {select}
                </label>
              )}
              <p className="pt-2 text-muted-foreground text-sm">{hinText}</p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    </FormField>
  );
}
