"use client";
import React, { useState } from "react";
import HeadlineCard from "@/components/Headlines";
import Link from "next/link";
import LatestNewsCard from "@/components/LatestNews";
import { useTranslations } from "next-intl";
import { stripHtmlAndTruncate } from "@/lib/stripHtmlAndTruncate";
import { ArrowRight, ArrowUpRight, RocketIcon } from "lucide-react";
import { useGetLatestHomepageEvent } from "@/hooks/events";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNewsQuery } from "@/hooks/useNewsMutation";
import { CommunityLamp } from "@/components/CommunityLamp";

const HomeLayout: React.FC = () => {
  const [page, setPage] = useState(1);
  const {
    event,
    loading: eventLoading,
    error: eventError,
  } = useGetLatestHomepageEvent();
  const [limit] = useState(4);
  const { news, total, loading, error } = useNewsQuery(page, limit, {
    isHeadline: true,
  });
  const { news: latestNews, loading: isLoadingLatestNews } = useNewsQuery(
    page,
    4
  );
  const { news: mostPopularNews, loading: isLoadingPopularNews } = useNewsQuery(
    page,
    7,
    { isGetTrending: true }
  );
  const t = useTranslations();

  const firstNews = news?.[0];
  const processedContent = stripHtmlAndTruncate(firstNews?.content, 80);
  return (
    <div className="w-full bg-gray-100">
      <div className="w-full max-w-[1440px] mx-auto relative">
        <div className="block lg:hidden">
          <HeadlineCard
            title={firstNews?.title}
            content={processedContent}
            url={firstNews?.url}
            image={firstNews?.thumbnail_url}
            popularItems={news}
            isLoading={loading}
            category={firstNews?.category}
          />
        </div>
        <div className="relative w-full flex flex-col md:flex-row gap-6 p-4 lg:p-6 px-4 md:px-20 lg:px-32 !pt-0">
          <div className="w-full md:w-2/3 space-y-8">
            <div className="hidden lg:block">
              <HeadlineCard
                title={firstNews?.title}
                content={processedContent}
                url={firstNews?.url}
                image={firstNews?.thumbnail_url}
                popularItems={news}
                isLoading={loading}
                category={firstNews?.category}
              />
            </div>

            <div className="space-y-5 contents lg:block">
              <div className="flex justify-between items-center space-x-4 pt-4 lg:pt-0">
                <h2 className="text-xl lg:text-5xl font-bolder font-nexaHeavy text-green-700">
                  {t("latestNews")}
                </h2>
                <Link href="/latest">
                  <Button
                    variant="ghost"
                    className="border rounded-none border-green-700 text-gray-700 lg:hover:border-green-500 lg:hover:text-white lg:hover:bg-green-900 px-3 lg:px-4 py-2 lg:py-6 text-sm lg:text-xl"
                  >
                    {t("seeMore")}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative bg-white p-4 shadow-lg space-y-4 rounded-sm">
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
              <div>
                <Link href="/latest" className="mt-5">
                  <Button
                    variant="ghost"
                    className="border rounded-none border-green-700 text-gray-700 lg:hover:border-green-500 lg:hover:text-white lg:hover:bg-green-900 px-3 lg:px-4 py-2 lg:py-6 text-sm lg:text-xl"
                  >
                    {t("next")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 space-y-5">
            <CommunityLamp
              event={event}
              loading={eventLoading}
              error={!!eventError}
            />

            <div className="bg-white border border-gray-200 rounded-sm">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-sm uppercase tracking-widest text-gray-500">
                  Most Popular
                </h2>
              </div>

              <ol className="divide-y divide-gray-200">
                {mostPopularNews.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/${item?.url}`}
                      className="flex gap-4 px-6 py-5 hover:bg-gray-50 transition"
                    >
                      <span className="text-2xl font-serif font-bold text-gray-400 w-6 text-right">
                        {index + 1}
                      </span>
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 leading-snug hover:underline">
                        {item.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
