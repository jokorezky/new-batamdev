"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { usePodcastQuery } from "@/hooks/usePodcastMutation";

export default function Podcast() {
  const upcomingEventsRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { podcast, total, loading } = usePodcastQuery(page, limit, {
    search: { keyword: "" },
  });
  const scrollToUpcomingEvents = () => {
    upcomingEventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <div
        className=" py-10 md:py-20 bg-gradient-to-b from-gray-800 to-black relative h-auto md:h-96 bg-cover bg-top"
        style={{
          backgroundImage: "url('/podcast.webp')",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0" />
        <div className="w-full max-w-[1440px] mx-auto relative px-4 sm:px-8 md:px-16 lg:px-32">
          <div className="absolute -top-2 md:top-0 left-4 lg:left-32 md:left-30 flex gap-1">
            <span className="w-1 h-4 bg-white rounded-sm animate-soundwave"></span>
            <span className="w-1 h-6 bg-white rounded-sm animate-soundwave delay-75"></span>
            <span className="w-1 h-5 bg-white rounded-sm animate-soundwave delay-150"></span>
            <span className="w-1 h-8 bg-white rounded-sm animate-soundwave delay-225"></span>
            <span className="w-1 h-3 bg-white rounded-sm animate-soundwave delay-300"></span>
          </div>
          <div className="flex items-center py-5 md:py-10 px-0 relative z-10">
            <div className="w-full md:w-1/2 pt-5">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center">
                  <p className="text-xs md:text-sm text-white uppercase relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px] after:border-green-500">
                    kiniGOTALK
                  </p>
                </div>
                <div className="space-y-2 md:space-y-0 capitalize">
                  <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">
                    Batam&#39;s Tech Voice
                  </h1>
                  <p className="text-white text-sm md:text-base">
                    Dive into discussions about technology, entrepreneurship,
                    and community growth in Batam. Through insightful
                    conversations, GOTALK highlights the people and ideas
                    driving the local tech ecosystem forward
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  <Button
                    onClick={scrollToUpcomingEvents}
                    className="bg-orange-400 hover:bg-orange-600 hover:text-white text-xs md:text-sm"
                  >
                    SEE GOTALK
                  </Button>
                  <Button variant="outline" className="text-xs md:text-sm">
                    PARTNER WITH US
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#070e19] w-full">
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div
            ref={upcomingEventsRef}
            className="px-4 sm:px-8 md:px-16 lg:px-32 pt-3 pb-10 md:pb-14 relative text-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-4 mb-6">
              {podcast.map((item, index) => {
                return (
                  <div
                    className="group col-span-1 md:col-span-4 relative space-y-2"
                    key={index}
                  >
                    <Link
                      href={`/podcast/${item.url}`}
                      prefetch={false}
                      className="cursor-pointer relative space-y-2"
                    >
                      <AspectRatio ratio={10 / 6} className="bg-muted">
                        <img
                          src={
                            item?.thumbnail_url &&
                            (item?.thumbnail_url.includes(
                              "coderjs.s3.ap-southeast-2.amazonaws.com"
                            ) ||
                              item?.thumbnail_url.includes(
                                "properioid.s3.ap-southeast-1.amazonaws.com"
                              ))
                              ? "/no-image.jpg"
                              : item?.thumbnail_url || "/no-image.jpg"
                          }
                          alt={item.title}
                          className="h-full w-full object-cover bg-gray-200 transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      </AspectRatio>
                      <p className="text-xs text-gray-500 font-bold">
                        {format(
                          new Date(item.createdAt),
                          "h:mm a - MMMM d, yyyy",
                          {
                            locale: id,
                          }
                        )}
                      </p>
                      <p className="font-bold text-lg md:text-xl leading-[1.1]">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Alert Section */}
            <div className="w-full">
              <Alert className="bg-gray-900 border-none">
                <AlertDescription>
                  <div className="">
                    <p className="text-center text-gray-600 text-sm md:text-xl">
                      Stay tuned for thrilling workshops and events—this is
                      where the action begins!
                    </p>
                    <p className="text-center text-gray-600 text-sm md:text-xl">
                      Stream our past sessions below and get inspired!
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

            {/* Newsletter Section */}
            <div className="flex items-center justify-center py-6 md:py-10 px-4 md:px-0 relative z-10">
              <div className="w-full md:w-1/2 text-center pt-3 md:pt-5">
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-0">
                    <p className="text-sm md:text-base">
                      Get kinigotalk updates.{" "}
                      <span className="underline cursor-pointer">
                        Share your email.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
