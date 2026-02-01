"use client";
import { useCommunityAlbums } from "@/hooks/use-photo-albums";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { id } from "date-fns/locale";

interface AlbumUser {
  _id: string;
  username: string;
  full_name: string;
  picture?: string;
}

interface Album {
  _id: string;
  title: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
  user: AlbumUser;
  community?: {
    _id: string;
    name: string;
  };
  event?: {
    _id: string;
    title: string;
    slugname: string;
  };
}

export function CommunityGalleries({
  community,
}: {
  community: { _id: string };
}) {
  const communityId = community._id;
  const { albums, loading, error } = useCommunityAlbums(communityId);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAlbumModal = (album: Album, index: number = 0) => {
    setSelectedAlbum(album);
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeAlbumModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedAlbum(null);
      setCurrentPhotoIndex(0);
    }, 300);
  };

  const nextPhoto = () => {
    if (selectedAlbum) {
      setCurrentPhotoIndex((prev) =>
        prev === selectedAlbum.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedAlbum) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? selectedAlbum.photos.length - 1 : prev - 1
      );
    }
  };

  const downloadPhoto = async () => {
    if (!selectedAlbum) return;

    const photoUrl = selectedAlbum.photos[currentPhotoIndex];
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `photo-${currentPhotoIndex + 1}-${
        selectedAlbum.title
      }.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-6">
        Error loading photo albums: {error.message}
      </div>
    );
  }

  return (
    <div className="relative w-full pb-60 bg-gray-50">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black border-none">
          {selectedAlbum && (
            <div className="relative h-full flex flex-col">
              <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={downloadPhoto}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={closeAlbumModal}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {selectedAlbum.photos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white h-12 w-12 rounded-full"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white h-12 w-12 rounded-full"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
              <div className="flex-1 flex items-center justify-center p-4">
                <img
                  src={selectedAlbum.photos[currentPhotoIndex]}
                  alt={`Photo ${currentPhotoIndex + 1} of ${
                    selectedAlbum.title
                  }`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/6.x/shapes/svg?seed=${selectedAlbum._id}-${currentPhotoIndex}`;
                  }}
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-50 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {selectedAlbum.title}
                    </h3>
                    <p className="text-sm text-gray-300 hidden sm:block">
                      Photo {currentPhotoIndex + 1} of{" "}
                      {selectedAlbum.photos.length}
                    </p>
                  </div>
                  <p className="text-sm text-gray-300 sm:hidden flex-shrink-0">
                    {currentPhotoIndex + 1}/{selectedAlbum.photos.length}
                  </p>
                </div>
              </div>

              {selectedAlbum.photos.length > 1 && (
                <div className="absolute bottom-20 left-4 right-4 z-50">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedAlbum.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentPhotoIndex
                            ? "border-blue-500 ring-2 ring-blue-300"
                            : "border-transparent hover:border-white/50"
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/6.x/shapes/svg?seed=${selectedAlbum._id}-thumb-${index}`;
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Konten utama */}
      <div className="w-auto md:w-[calc(66.666%+2rem)] mx-4 md:mx-auto flex flex-col items-start space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">
          Photo Albums <span className="text-gray-500">({albums.length})</span>
        </h3>

        {albums.length === 0 && !loading ? (
          <div className="text-center text-gray-500 py-12 w-full">
            No photo albums found for this community
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full">
            {albums.map((album: Album, idx: number) => (
              <div
                key={album._id}
                className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:shadow-xl md:hover:-translate-y-1 animate-fadeIn group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Album Cover - Click to open modal */}
                <div
                  onClick={() => openAlbumModal(album)}
                  className="cursor-pointer relative space-y-2"
                >
                  <div className="relative h-40 w-full mb-3 sm:mb-4 rounded-lg overflow-hidden">
                    {album.photos?.length > 0 ? (
                      <img
                        src={album.photos[0]}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = `https://api.dicebear.com/6.x/shapes/svg?seed=${album._id}`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No photos</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {album.photos?.length || 0} photos
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white font-medium">
                        View Photos
                      </span>
                    </div>
                  </div>

                  {/* Album Info */}
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                    {album.title}
                  </h4>

                  {/* Date */}
                  <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                    Created:{" "}
                    {format(new Date(album.createdAt), "h:mm a - MMM d, yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>

                <Link
                  href={`/events/${album.event?.slugname}`}
                  className="text-blue-500 text-sm mt-3 sm:mt-4 inline-block hover:underline font-medium"
                >
                  View event details →
                </Link>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-4 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-indigo-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
