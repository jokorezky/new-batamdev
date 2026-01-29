"use client";

import { useCommunityAlbums } from "@/hooks/use-photo-albums";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  Images,
} from "lucide-react";
import { format } from "date-fns";
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
  user: AlbumUser;
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
  const { albums, loading, error } = useCommunityAlbums(community._id);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [index, setIndex] = useState(0);

  const close = () => {
    setSelectedAlbum(null);
    setIndex(0);
  };

  const next = () => {
    if (!selectedAlbum) return;
    setIndex((i) => (i + 1) % selectedAlbum.photos.length);
  };

  const prev = () => {
    if (!selectedAlbum) return;
    setIndex((i) =>
      i === 0 ? selectedAlbum.photos.length - 1 : i - 1
    );
  };

  const download = async () => {
    if (!selectedAlbum) return;
    const url = selectedAlbum.photos[index];
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedAlbum.title}-${index + 1}.jpg`;
    a.click();
  };

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Failed to load galleries
      </div>
    );
  }

  return (
    <section className="relative bg-black text-white px-6 pb-40">
      <div className="max-w-6xl mx-auto pt-24 pb-16">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          Community Galleries
        </h2>
        <p className="text-zinc-400 mt-3 text-sm">
          Moments, memories, and highlights from our events
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album: any) => (
          <div
            key={album._id}
            onClick={() => setSelectedAlbum(album)}
            className="group relative cursor-pointer rounded-3xl overflow-hidden
              border border-white/10
              bg-white/5 backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-2
              hover:border-red-500
              hover:shadow-[0_0_40px_rgba(255,0,0,0.35)]"
          >
            {/* COVER */}
            <div className="relative h-56 w-full">
              <Image
                src={
                  album.photos?.[0] ||
                  `https://api.dicebear.com/6.x/shapes/svg?seed=${album._id}`
                }
                alt={album.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* INFO */}
            <div className="absolute bottom-0 p-5 w-full">
              <h3 className="font-semibold text-lg truncate">
                {album.title}
              </h3>
              <div className="flex items-center justify-between mt-1 text-xs text-zinc-400">
                <span>
                  {format(new Date(album.createdAt), "MMM d, yyyy", {
                    locale: id,
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Images className="w-4 h-4" />
                  {album.photos.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && albums.length === 0 && (
        <div className="text-center text-zinc-500 py-32">
          No galleries yet
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-red-500 rounded-full" />
        </div>
      )}

      <Dialog open={!!selectedAlbum} onOpenChange={close}>
        <DialogContent className="max-w-7xl h-[90vh] bg-black border-none p-0">
          {selectedAlbum && (
            <div className="relative h-full flex flex-col">
              <div className="absolute top-4 right-4 z-50 flex gap-2">
                <Button size="icon" variant="ghost" onClick={download}>
                  <Download />
                </Button>
                <Button size="icon" variant="ghost" onClick={close}>
                  <X />
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <img
                  src={selectedAlbum.photos[index]}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {selectedAlbum.photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              <div className="p-6 border-t border-white/10">
                <h4 className="font-semibold">{selectedAlbum.title}</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Photo {index + 1} of {selectedAlbum.photos.length}
                </p>

                {selectedAlbum.event && (
                  <Link
                    href={`/events/${selectedAlbum.event.slugname}`}
                    className="text-red-500 text-sm mt-2 inline-block hover:underline"
                  >
                    View event →
                  </Link>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
