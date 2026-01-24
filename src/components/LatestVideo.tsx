"use client";

import { PlayIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import LatestNewsCard from "@/components/LatestNews";
import { useNewsQuery } from "@/hooks/useNewsMutation";

declare global {
  interface Window {
    YT: {
      Player: new (
        id: string,
        options: {
          videoId: string;
          playerVars: {
            autoplay?: 0 | 1;
            mute?: 0 | 1;
            controls?: 0 | 1;
            modestbranding?: 0 | 1;
            rel?: 0 | 1;
            showinfo?: 0 | 1;
            iv_load_policy?: 1 | 3;
            fs?: 0 | 1;
            loop?: 0 | 1;
            playlist?: string;
          };
          events: {
            onReady: (event: { target: any }) => void;
            onStateChange: (event: { data: number }) => void;
          };
        }
      ) => any;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const LatestVideo = () => {
  const [page, setPage] = useState(1);
  const t = useTranslations();
  const embedId = "JMLsHI8aV0g";
  const [videoDuration] = useState(10);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const playerContainerRef = useRef<any>(null);

  const { news: latestNews, loading: isLoadingLatestNews } = useNewsQuery(
    page,
    3
  );

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = initializePlayer;
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!playerContainerRef.current) return;

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: embedId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        fs: 0,
        loop: 1,
        playlist: embedId,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady = (event: { target: any }) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: { data: number }) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.seekTo(0);
          playerRef.current.playVideo();
        }
      }, videoDuration * 1000);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto relative">
      <div className="mx-4 md:mx-20 lg:mx-32 space-y-4 pb-10 lg:pb-14">
        <div className="flex items-center">
          <div className="w-full md:w-2/3 justify-between lg:justify-normal flex items-center space-x-4">
            <h2 className="text-xl lg:text-5xl font-bolder font-nexaHeavy text-green-700 capitalize">
              Video
            </h2>
            <Button
              variant="ghost"
              className="border rounded-none border-green-700 text-gray-700 lg:hover:border-green-500 lg:hover:text-white lg:hover:bg-green-900 px-3 lg:px-4 py-2 lg:py-6 text-sm lg:text-xl"
            >
              {t("seeMore")}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className=" relative flex justify-center bg-black mb-12 lg:mb-20">
          <div className="w-full h-full z-[40]">
            <AspectRatio
              ratio={16 / 9}
              className="bg-muted relative overflow-hidden opacity-90"
            >
              <div
                ref={playerContainerRef}
                id="youtube-player"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/65 to-black/25 z-[10]" />
              <div className="absolute flex flex-col gap-3 justify-end bottom-5 lg:bottom-auto left-5 lg:left-auto lg:p-6 text-white z-[20] w-full">
                <div className="w-full lg:w-1/3 space-y-2 lg:space-y-5 relative sm:absolute sm:top-32 sm:left-40">
                  <p className="text-sm text-white uppercase relative w-fit text-center after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px] after:border-gray-300">
                    AI
                  </p>
                  <h2 className="text-2xl lg:text-5xl font-bold capitalize hover:underline cursor-pointer hover:text-[#68f176]">
                    How China Is Using Artificial Intelligence in Classrooms
                  </h2>
                  <div className="items-stretch gap-5 hidden sm:flex">
                    <Separator
                      orientation="vertical"
                      className="h-12 w-[1px] mr-2 bg-white"
                    />
                    <span className="text-sm">
                      Cody Corrall Alyssa Stringer Kate Park 8:17 AM PDT · March
                      19, 2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-5 absolute left-36 bottom-10 max-w-[calc(100%-theme(space.36))] z-[20] hidden sm:block">
                <div className="hidden md:flex md:gap-3 items-stretch">
                  {[...Array(4)].map((_, index) => (
                    <Fragment key={index}>
                      <div className="flex items-stretch gap-3">
                        <div className="cursor-pointer md:w-auto relative group overflow-hidden">
                          <div className="mt-5">
                            <div className="space-y-2">
                              <h2 className="text-md font-bold text-white hover:underline tracking-wide leading-tight">
                                Mortgage as an employee benefit? Kleiner Perkins
                                leads
                              </h2>
                              <p className="text-sm text-white">
                                Mary Ann Azevedo
                              </p>
                            </div>
                          </div>
                        </div>
                        {index < 3 && (
                          <Separator
                            orientation="vertical"
                            className="h-full w-[1px] mr-2 bg-white opacity-50"
                          />
                        )}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 left-0 z-[30]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-600 p-5 shadow-lg">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <PlayIcon className="h-4 w-4 lg:h-10 lg:w-10 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
          <div className="absolute bottom-[-30px] right-0 w-[90%] z-[39]">
            <Separator className="h-52 w-full bg-green-600" />
          </div>
        </div>
      </div>
      <div className="relative p-4 rounded-xl shadow-lg space-y-4 lg:hidden">
        {isLoadingLatestNews ? (
          <p>Loading...</p>
        ) : (
          latestNews?.map((newsItem, index) => (
            <React.Fragment key={newsItem._id}>
              <LatestNewsCard
                title={newsItem.title}
                image={newsItem.thumbnail_url}
                url={newsItem.url}
                fullName={newsItem?.user?.full_name}
                createdAt={newsItem?.createdAt}
                category={newsItem?.category}
              />
              {index < latestNews.length - 1 && <Separator />}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestVideo;
