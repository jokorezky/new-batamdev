"use client";
import React, { useRef, useEffect, useState } from "react";
import { generateAvatarUrl } from "@/lib/generateAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useNewsQuery } from "@/hooks/useNewsMutation";
import { RocketIcon } from "lucide-react";
import { CommunityLamp } from "@/components/CommunityLamp";
import { useGetLatestHomepageEvent } from "@/hooks/events";
import Link from "next/link";

type userType = {
  full_name: string;
};
interface NewsItemsType {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  userId: userType;
  createdAt: string;
}
type CardProps = {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  userId: userType;
  createdAt: string;
  newsItems: NewsItemsType[];
};
type DataDetail = {
  data: CardProps;
};

const FuturisticTimeline: React.FC<DataDetail> = ({ data }) => {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations();
  const {
    event,
    loading: eventLoading,
    error: eventError,
  } = useGetLatestHomepageEvent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = timelineRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    timelineRefs.current.forEach((el) => el && observer.observe(el));
    return () => {
      timelineRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  const { news: mostPopularNews, loading: isLoadingPopularNews } = useNewsQuery(
    1,
    6,
    { isGetTrending: true }
  );

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="w-full max-w-[1440px] mx-auto relative flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* === LEFT: Timeline === */}
        <div className="flex-1 relative">
          <div className="absolute left-4 sm:left-7 top-0 h-full w-[1px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-indigo-500 rounded-full"></div>
          <AnimatePresence mode="wait">
            {data.newsItems[activeIndex] && (
              <motion.div
                key={`sticky-${activeIndex}`}
                className="block sticky top-2 sm:top-4 flex items-center gap-2 sm:gap-3 z-50 ml-8 sm:ml-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <motion.div
                  key={`dot-${activeIndex}`}
                  animate={{
                    scale: 1.3,
                    boxShadow: "0 0 20px 5px rgba(16,185,129,0.7)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-3 sm:w-4 h-3 sm:h-4 mt-1 ml-[1.2rem] rounded-full bg-emerald-500 border-2 sm:border-4 border-white"
                />
                <motion.time
                  key={`time-${activeIndex}`}
                  className="px-2 sm:px-4 py-1 text-xs font-bold uppercase text-white 
                bg-emerald-600 rounded-full shadow-lg whitespace-nowrap"
                >
                  {format(
                    new Date(data.newsItems[activeIndex].createdAt),
                    "h:mm a - MMM d, yyyy",
                    { locale: id }
                  )}
                </motion.time>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8 sm:space-y-14 relative ml-8 sm:ml-40">
            {data.newsItems.map((event, index) => (
              <div
                key={index}
                ref={(el) => {
                  timelineRefs.current[index] = el;
                }}
                className="relative pl-8 sm:pl-20"
              >
                <Card className="mt-4 sm:mt-6 backdrop-blur-md bg-white/70 border border-white/30 shadow-xl hover:shadow-emerald-300/40 transition duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="w-6 h-6 sm:w-8 sm:h-8 border border-emerald-500">
                        <AvatarImage
                          src={generateAvatarUrl(event.userId.full_name)}
                          alt={event.userId.full_name}
                        />
                        <AvatarFallback>
                          {event.userId.full_name}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-bold text-emerald-700 text-sm sm:text-base">
                        {event.userId.full_name}
                      </p>
                    </div>
                    <CardTitle className="text-lg sm:text-xl mt-1 sm:mt-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm sm:text-base">
                    <div
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: event.content }}
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* === RIGHT: Sidebar === */}
        <div className="w-full lg:w-1/3 space-y-4 sm:space-y-5">
          <CommunityLamp
            event={event}
            loading={eventLoading}
            error={!!eventError}
          />
          <div className="relative bg-gradient-to-br from-purple-900 to-indigo-800 text-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-all duration-300">
            <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-600 rounded-full filter blur-2xl sm:blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-600 rounded-full filter blur-2xl sm:blur-3xl opacity-20"></div>

            <div className="relative z-10 pt-4 sm:pt-6 px-4 sm:px-6 flex items-center justify-between">
              <div className="leading-none">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                  {t("most")}
                </h2>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                  {t("popular")}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 sm:p-5 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
                <RocketIcon className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-purple-900 animate-pulse" />
              </div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 space-y-3 sm:space-y-4">
              {mostPopularNews.map((item, index) => (
                <Link
                  href={`/${item?.url}`}
                  key={index}
                  className="flex space-x-3 sm:space-x-4 bg-purple-800/60 hover:bg-purple-700/80 p-3 sm:p-4 rounded-lg backdrop-blur-sm border border-purple-700/50 transition-all duration-200 hover:shadow-lg w-full min-w-0"
                >
                  <div className="flex-shrink-0 relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 origin-center shadow-sm"></div>
                    <span className="relative z-10 font-bold text-purple-900 text-xs sm:text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-lg font-bold text-white tracking-wide leading-snug hover:underline flex-grow">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticTimeline;
