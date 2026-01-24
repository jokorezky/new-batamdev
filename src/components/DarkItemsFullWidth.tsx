"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePodcastQuery } from "@/hooks/usePodcastMutation";

const TopWidget = () => {
  const t = useTranslations();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { podcast, total, loading } = usePodcastQuery(page, limit, {
    search: { keyword: "" },
  });
  return (
    <div className="relative w-full min-h-72 bg-[#03070d] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      <div className="w-full max-w-[1440px] mx-auto relative">
        <div className="absolute hidden lg:block top-0 left-0 w-full">
          <div className="flex items-center justify-between md:px-32">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bolder font-nexaHeavy text-white">
                Podcast Video
              </h2>
              <Link href="/podcast" prefetch={false}>
                <Button
                  variant="ghost"
                  className="border rounded-none border-green-700 text-white lg:hover:border-green-500 lg:hover:text-white lg:hover:bg-green-900 px-3 lg:px-4 py-2 lg:py-6 text-sm lg:text-xl"
                >
                  {t("seeMore")}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-8 w-full mt-20 px-6 md:hidden">
          <Carousel
            ref={carouselRef}
            className="w-full max-w-md mx-auto relative"
          >
            <div
              className={`block lg:hidden absolute ${
                loading ? "-top-10" : "-top-10"
              } w-full`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <h2 className="text-3xl lg:text-3xl font-bolder font-nexaHeavy text-white">
                    Podcast Video
                  </h2>
                </div>
                <div className="absolute right-12">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>
            </div>

            <CarouselContent className="mt-3">
              {podcast.map((item, index) => {
                return (
                  <CarouselItem
                    className="group col-span-1 md:col-span-4 relative space-y-2"
                    key={index}
                  >
                    <Link
                      href={`/podcast/${item.url}`}
                      prefetch={false}
                      className="cursor-pointer relative space-y-2"
                    >
                      <AspectRatio ratio={10 / 6}>
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="h-full w-full object-cover bg-gray-200"
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="hidden md:grid relative z-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center mt-20 md:px-32 w-full">
          {podcast.map((item, index) => (
            <Link
              href={`/podcast/${item.url}`}
              key={index}
              className="relative bg-white/10 backdrop-blur-lg shadow-none w-64 mr-auto"
            >
              <div className="cursor-pointer col-span-1 md:col-span-7 relative group overflow-hidden">
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-black/25 flex flex-col gap-1 justify-end p-4 text-white z-1">
                    <p className="text-sm text-white uppercase relative w-fit text-center after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px]">
                      {format(
                        new Date(item.createdAt),
                        "h:mm a - MMMM d, yyyy",
                        {
                          locale: id,
                        }
                      )}
                    </p>
                    <h2 className="text-md font-bold">{item.title}</h2>
                  </div>
                </AspectRatio>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopWidget;
