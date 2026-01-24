"use client";

import React, { useState, useEffect } from "react";
import { useNewsQuery } from "@/hooks/useNewsMutation";
import LatestNewsCard from "@/components/LatestNews";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCategory } from "@/lib/formatCategory";

export default function CategoryDetail() {
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const pathname = usePathname();
  const category = pathname.split("/").pop() || "";
  const displayCategory = formatCategory(category);

  // Category descriptions mapping
  const categoryDescriptions: Record<string, string> = {
    startup:
      "Berita terkini seputar startup teknologi, mencakup pendanaan, pertumbuhan, dan inovasi di berbagai bidang seperti energi hijau, kripto, fintech, SaaS, transportasi, dan teknologi.",
    technology:
      "Berita terbaru tentang perkembangan teknologi terbaru, inovasi digital, dan tren industri tech dunia.",
    business:
      "Informasi terkini seputar bisnis, ekonomi, dan keuangan baik dalam negeri maupun internasional.",
  };

  const {
    news: latestByCategory,
    total,
    loading,
    error,
  } = useNewsQuery(page, 10);

  if (loading) {
    return (
      <div className="relative w-full bg-gray-50">
        <header className="px-4 sm:px-8 md:px-16 lg:px-32 py-3 bg-gradient-to-r from-green-700 to-red-700 relative">
          <div className="flex items-center py-6 md:py-8 lg:py-10 px-0 relative z-10">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-32 items-center">
                <Skeleton className="h-16 w-64 bg-green-700 opacity-30" />
                <Skeleton className="h-24 w-full max-w-2xl bg-green-700 opacity-30" />
              </div>
            </div>
          </div>
        </header>
        <main className="w-full px-4 sm:px-8 md:px-16 lg:px-32 space-y-6 py-6 md:py-8 lg:py-10 mt-5 lg:mt-10">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4 bg-gray-200 opacity-30" />
                <Skeleton className="h-4 w-1/2 bg-gray-200 opacity-30" />
                <Skeleton className="h-48 w-full bg-gray-200 opacity-30" />
              </div>
              {i < 2 && <Separator />}
            </React.Fragment>
          ))}
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative w-full bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-700 mb-6">
            Maaf, kami mengalami masalah saat memuat data. Silakan coba lagi
            nanti.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!latestByCategory || latestByCategory.length === 0) {
    return (
      <div className="relative w-full bg-gray-50 min-h-screen">
        <header className="px-4 sm:px-8 md:px-16 lg:px-32 py-3 bg-gradient-to-r from-green-700 to-red-700 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
          <div className="flex items-center py-6 md:py-8 lg:py-10 px-0 relative z-10">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-32 items-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white capitalize text-center lg:text-left">
                  Latest
                </h1>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 md:w-[45vw] h-12 md:bg-green-700 md:opacity-80 md:-z-10 md:-bottom-10" />
          </div>
        </header>

        <main className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-6 md:py-8 lg:py-10 mt-10 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Belum Ada Berita Tersedia
            </h2>
            <p className="text-gray-600 mb-6">
              Maaf, saat ini belum ada berita dalam kategori {displayCategory}.
              Silakan cek kembali nanti.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="px-4 sm:px-8 md:px-16 lg:px-32 py-3 bg-gradient-to-r from-green-700 to-red-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="flex items-center py-6 md:py-8 lg:py-10 px-0 relative z-10">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-12 lg:gap-32 items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white capitalize text-center lg:text-left">
                {displayCategory}
              </h1>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 md:w-[45vw] h-12 md:bg-green-700 md:opacity-80 md:-z-10 md:-bottom-10" />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="w-full px-4 sm:px-8 md:px-16 lg:px-32 space-y-6 py-6 md:py-8 lg:py-10 mt-5 lg:mt-10">
        {latestByCategory?.map((newsItem, index) => {
          return (
            <React.Fragment key={newsItem._id}>
              <LatestNewsCard
                title={newsItem.title}
                image={newsItem.thumbnail_url}
                url={`/${newsItem.url}`}
                fullName={newsItem?.user?.full_name}
                createdAt={newsItem?.createdAt}
                category={newsItem?.category}
              />
              {index < latestByCategory.length - 1 && <Separator />}
            </React.Fragment>
          );
        })}
      </main>
    </div>
  );
}
