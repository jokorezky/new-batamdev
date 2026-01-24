"use client";

import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "next/navigation";
import { usePodcastBySlugQuery } from "@/hooks/usePodcastMutation";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

interface PodcastClientProps {
  isMobile: boolean;
}

export default function PodcastClient({ isMobile }: PodcastClientProps) {
  const { detail } = useParams();
  const { podcast, loading } = usePodcastBySlugQuery(detail as string);

  const embedId = podcast?.embedId;
  return (
    <div className="w-full min-h-screen space-y-2 bg-[#03070d]">
      <div className="w-full max-w-[1440px] mx-auto relative px-4 sm:px-6 lg:px-32">
        <AspectRatio
          ratio={isMobile ? 1 : 16 / 10}
          className="rounded-2xl overflow-hidden"
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${embedId}?modestbranding=1&rel=0&autoplay=0&controls=0&showinfo=0&iv_load_policy=3&fs=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </div>
      <div className="w-full max-w-[1440px] mx-auto relative px-4 sm:px-6 lg:px-32">
        <p className="text-xs text-gray-300 font-bold pt-4">
          {podcast?.createdAt &&
            format(new Date(podcast?.createdAt), "EEEE, d MMMM yyyy, HH:mm", {
              locale: localeID,
            })}
        </p>
        <p className="text-white font-bold text-lg md:text-xl leading-[1.1]">
          {podcast?.title}
        </p>
        <div className="max-w-7xl w-full mx-auto"></div>
      </div>
    </div>
  );
}
