"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UserType {
  full_name: string;
}

interface NewsType {
  title: string;
  url: string;
  createdAt?: string;
  category?: string;
  thumbnail_url?: string;
  user: UserType | null;
}

interface ByCategoryType {
  title: string;
  data: NewsType[];
}

const safeImage = (url?: string) => {
  if (!url) return "/no-image.jpg";
  if (
    url.includes("coderjs.s3.ap-southeast-2.amazonaws.com") ||
    url.includes("properioid.s3.ap-southeast-1.amazonaws.com")
  ) {
    return "/no-image.jpg";
  }
  return url;
};

const slugify = (text: string) => text.replace(/\s+/g, "-").toLowerCase();

const ByCategory: FC<ByCategoryType> = ({ title, data }) => {
  const t = useTranslations();

  const first = data?.[0];
  const second = data?.[1];
  const third = data?.[2];

  return (
    <section className="w-full max-w-[1440px] mx-auto">
      {/* HEADER */}
      <div className="pt-6 lg:pt-12 px-4 md:px-20 lg:px-32">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-5xl font-extrabold font-nexaHeavy text-green-700 capitalize">
            {title}
          </h2>

          <Link href={`/category/${slugify(title)}`}>
            <Button
              variant="outline"
              className="rounded-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
            >
              {t("seeMore")}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="px-4 md:px-20 lg:px-32 mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* HERO */}
        {first && (
          <Link
            href={`/${first.url}`}
            className="hidden md:block md:col-span-7 group relative overflow-hidden"
          >
            <AspectRatio ratio={1} className="bg-muted">
              <img
                src={safeImage(first.thumbnail_url)}
                alt={first.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end text-white">
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  {first.title}
                </h1>
                <p className="mt-2 text-sm text-gray-200">
                  By {first.user?.full_name} ·{" "}
                  {first.createdAt &&
                    format(new Date(first.createdAt), "MMM d, yyyy", {
                      locale: id,
                    })}
                </p>
              </div>
            </AspectRatio>
          </Link>
        )}

        {/* RIGHT COLUMN */}
        <div className="md:col-span-5 space-y-10">
          {/* SECOND */}
          {second && (
            <Link href={`/${second.url}`} className="group block">
              <AspectRatio ratio={16 / 12} className="bg-muted overflow-hidden">
                <img
                  src={safeImage(second.thumbnail_url)}
                  alt={second.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </AspectRatio>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-green-700">
                  {second.category}
                </p>
                <h2 className="text-2xl font-bold leading-snug group-hover:opacity-80 transition">
                  {second.title}
                </h2>
                <p className="text-xs text-gray-500">
                  {second.user?.full_name} ·{" "}
                  {second.createdAt &&
                    format(new Date(second.createdAt), "MMM d, yyyy", {
                      locale: id,
                    })}
                </p>
              </div>
            </Link>
          )}

          <Separator />

          {/* THIRD */}
          {third && (
            <Link href={`/${third.url}`} className="block space-y-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-green-700">
                {third.category}
              </p>
              <h2 className="text-2xl font-bold leading-snug hover:opacity-80 transition">
                {third.title}
              </h2>
              <p className="text-xs text-gray-500">
                {third.user?.full_name} ·{" "}
                {third.createdAt &&
                  format(new Date(third.createdAt), "MMM d, yyyy", {
                    locale: id,
                  })}
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* LIST BOTTOM */}
      <div className="px-4 md:px-20 lg:px-32 mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
        {data.slice(3, 6).map((item) => (
          <Link
            key={item.title}
            href={`/${item.url}`}
            className="md:col-span-3 space-y-2"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700">
              {item.category}
            </p>
            <h3 className="text-lg font-semibold leading-snug hover:text-green-700 transition">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">
              {item.user?.full_name} ·{" "}
              {item.createdAt &&
                format(new Date(item.createdAt), "MMM d, yyyy", {
                  locale: id,
                })}
            </p>
            <Separator className="mt-4" />
          </Link>
        ))}

        {/* PLACEHOLDER */}
        <div className="hidden md:block md:col-span-3">
          <AspectRatio ratio={1} className="bg-muted" />
        </div>
      </div>

      {/* FOOT DECOR */}
      <div className="mt-10 mb-12 px-4 md:px-20 lg:px-32 space-y-2">
        <Separator className="h-10 w-3/5 bg-green-700" />
        <Separator className="h-6 w-1/3 bg-green-200" />
      </div>
    </section>
  );
};

export default ByCategory;
