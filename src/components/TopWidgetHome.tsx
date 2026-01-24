"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useStorylinesQuery } from "@/hooks/useStorylinesMutation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatCategory } from "@/lib/formatCategory";

const TopWidget = () => {
  const t = useTranslations();
  const [page] = useState(1);
  const [limit] = useState(4);

  const { storyline, loading } = useStorylinesQuery(page, limit, {
    search: { keyword: "" },
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto relative p-4 px-4 md:px-20 lg:px-32 bg-muted">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 w-full border border-gray-200 p-4 bg-white rounded-md"
              >
                <div className="w-28 h-20 bg-gray-200 rounded-sm" />
                <div className="flex flex-col justify-between flex-1 space-y-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))
          : storyline.map((item) => (
              <Link key={item._id} href={`/${item.url}`}>
                <div
                  className="
              group flex items-start gap-4 w-full border border-gray-200 p-4 bg-white 
              transition-all duration-300 hover:-translate-y-1 
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:bg-gray-50/50 rounded-md
            "
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-1">
                      {formatCategory(item.category)}
                    </p>

                    <h2 className="text-[14px] font-medium text-gray-900 leading-tight line-clamp-2 group-hover:text-black transition-colors">
                      {item.title}
                    </h2>

                    <span className="text-[11px] text-gray-500 mt-2">
                      {format(new Date(item.createdAt), "MMM d, yyyy", {
                        locale: id,
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default TopWidget;
