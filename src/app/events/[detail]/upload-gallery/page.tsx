"use client";

import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon, X, Upload, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useGetEventAlbum } from "@/hooks/use-event-photo";
import { useGetEventDetail } from "@/hooks/events";
import { uploadEventPhotos } from "@/hooks/uploadFile";

export default function EventPhotosPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const eventSlug = params.detail as string;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { event, loading: eventLoading } = useGetEventDetail(eventSlug);
  const { album, loading: albumLoading, refetch } = useGetEventAlbum(eventSlug);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);

      // Create preview URLs
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removePhoto = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select photos to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Gunakan fungsi uploadEventPhotos langsung
      await uploadEventPhotos(event._id, selectedFiles);

      // Clear selection and refresh album data
      setSelectedFiles([]);
      setPreviewUrls([]);
      await refetch();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Success",
        description: "Photos uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photos",
        variant: "destructive",
      });
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (eventLoading || albumLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Event Photos</h1>
            <p className="text-gray-600">{event.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                <div className="mb-4">
                  <Button
                    onClick={triggerFileInput}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Photos
                  </Button>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Selected {selectedFiles.length} photo(s)
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <AspectRatio ratio={1}>
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded"
                            />
                          </AspectRatio>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  variant="secondary"
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="w-full"
                >
                  {isUploading ? "Uploading..." : "Upload Photos"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Photo Gallery ({album?.photos?.length || 0})
                </h2>

                {album?.photos && album.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {album.photos.map((photoUrl: string, index: number) => (
                      <div key={index} className="relative group">
                        <AspectRatio ratio={1}>
                          <Image
                            src={photoUrl}
                            alt={`Event photo ${index + 1}`}
                            fill
                            className="object-cover rounded"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => window.open(photoUrl, "_blank")}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No photos yet</p>
                    <p className="text-sm text-gray-500">
                      Upload photos to share memories from your event
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
