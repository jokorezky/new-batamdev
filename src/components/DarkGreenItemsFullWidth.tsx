"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Link from "next/link";
import { Layers, Dot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCategory } from "@/lib/formatCategory";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useStorylinesQuery } from "@/hooks/useStorylinesMutation";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

const DarkGreenItemsFullWidth = () => {
  const t = useTranslations();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { storyline, total, loading } = useStorylinesQuery(page, limit, {
    search: { keyword: "" },
  });

  return (
    <div className="relative w-full min-h-[18rem] bg-green-700 flex items-center justify-center overflow-hidden">
      <div className="relative z-8 w-full px-4 md:hidden mt-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        <Carousel
          ref={carouselRef}
          className="w-full max-w-md mx-auto relative"
        >
          <div className={`absolute ${loading ? "-top-10" : "-top-10"} w-full`}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl lg:text-3xl font-bolder font-nexaHeavy text-white">
                  {t("topStory")}
                </h2>
              </div>
              <div className="absolute right-12">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>
          <CarouselContent>
            {loading
              ? Array.from({ length: 1 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 shadow-none p-0">
                      <CardContent className="flex flex-col items-center justify-center space-y-4 p-0">
                        <AspectRatio
                          ratio={16 / 9}
                          className="rounded-xl bg-green-700"
                        >
                          <Skeleton className="bg-green-900 h-full w-full rounded-xl opacity-25" />
                        </AspectRatio>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              : storyline.map((item, index) => {
                  const relativeTime = formatDistanceToNow(
                    new Date(item.createdAt),
                    {
                      locale: id,
                      addSuffix: true,
                    }
                  );
                  return (
                    <CarouselItem key={index}>
                      <Link href={`/${item.url}`}>
                        <Card className="border-0">
                          <CardContent className="flex flex-col items-center justify-center space-y-4 p-0">
                            <AspectRatio
                              ratio={16 / 9}
                              className="bg-muted overflow-hidden rounded-xl"
                            >
                              <img
                                src={item.thumbnail_url}
                                alt={item.title}
                                className="h-full w-full object-cover rounded-xl object-top"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-black/25 flex flex-col gap-1 justify-end p-4 text-white z-1 rounded-xl">
                                <p className="text-sm text-white uppercase relative w-fit text-center after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%]">
                                  {formatCategory(item.category)}
                                </p>
                                <h2 className="text-xl font-bold">
                                  {" "}
                                  {item.title}
                                </h2>
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center space-x-2">
                                    <Layers className="h-3 w-3 text-white" />
                                    <p className="text-white text-xs capitalize lg:text-sm">
                                      {item.newsItems.length} stories
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Dot className="h-3 w-3 text-white" />
                                    <p className="text-white text-xs capitalize lg:text-sm">
                                      {relativeTime}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </AspectRatio>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default DarkGreenItemsFullWidth;
