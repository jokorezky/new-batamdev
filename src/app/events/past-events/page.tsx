"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Reusable components
const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="space-y-0">
    <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
    {description && <p>{description}</p>}
  </div>
);

const EventCard = ({
  imgSrc,
  date,
  title,
  location,
  url,
}: {
  imgSrc: string;
  date: string;
  title: string;
  location: string;
  url: string;
}) => (
  <div className="group col-span-1 md:col-span-4">
    <Link
      href={`/events/${url}`}
      prefetch={false}
      className="cursor-pointer relative space-y-2"
    >
      <AspectRatio ratio={10 / 6} className="bg-muted">
        <img
          src={imgSrc}
          alt="event"
          className="h-full w-full object-cover bg-gray-200 transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </AspectRatio>
      <p className="text-xs text-gray-500 font-bold">{date}</p>
      <p className="font-bold text-xl leading-[1.1]">{title}</p>
      <Link
        href="/batamdev"
        prefetch={false}
        className="flex items-center gap-2 cursor-pointer"
      >
        <p className="text-xs font-bold cursor-pointer hover:underline">
          Hosted by: batamdev
        </p>
      </Link>
      <Badge variant="secondary">{location}</Badge>
    </Link>
  </div>
);

const CategoryCard = ({ title, count }: { title: string; count: string }) => (
  <div className="col-span-1 md:col-span-3 cursor-pointer relative">
    <Card className="rounded-2xl bg-gray-50 hover:bg-white">
      <CardHeader>
        <CardTitle className="pt-4 text-xl">{title}</CardTitle>
        <Separator className="my-4 mt-10 bg-gray-100" />
        <CardContent className="p-0 pt-3">
          <div className="flex flex-wrap gap-2">{count}</div>
        </CardContent>
      </CardHeader>
    </Card>
  </div>
);

export default function Jobs() {
  const upcomingEventsRef = useRef<HTMLDivElement>(null);

  const scrollToUpcomingEvents = () => {
    upcomingEventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const events = [
    {
      imgSrc:
        "https://cdn.techinasia.com/cloudinary/transformations/wp-content/uploads/2024/10/1730117343_48028056b596194f01758b3f1d5cd252_v1730117343_large.webp",
      date: "Thu, November 21 2025, 4:00pm",
      title: "Batam Founders Meetup – Batam",
      location: "Batam Center - Batam",
      url: "afsafdsfajj",
    },
    {
      imgSrc:
        "https://cdn.techinasia.com/cloudinary/transformations/wp-content/uploads/2024/11/1730705496_ae5e25cdc844feedc92395e75303909c_v1730705495_large.webp",
      date: "Thu, November 21 2025, 4:00pm",
      title: "Startup Spotlight with Tech in Asia and Airwallex",
      location: "Cubezone Meet Point - Batam",
      url: "erteiotuetjetjo",
    },
    {
      imgSrc:
        "https://cdn.techinasia.com/cloudinary/transformations/wp-content/uploads/2024/10/1729479708_dd0926ed61a6dafe64bdb85c95532c16_v1729479708_large.webp",
      date: "Thu, November 21 2025, 4:00pm",
      title: "Batam MarTech Day 2025: Fusion to Future",
      location: "Gedung Solnet - Batam",
      url: "oioiuergdfgd",
    },
  ];

  const categories = [
    { title: "AI", count: "1K Events" },
    { title: "Fitness", count: "536 Events" },
    { title: "Startup", count: "536 Events" },
    { title: "Cyber Security", count: "16K Events" },
    { title: "Cripto", count: "976 Events" },
    { title: "UI/UX", count: "234 Events" },
    { title: "Apple Dev", count: "24 Events" },
    { title: "Flutter", count: "31 Events" },
  ];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="px-32 py-3 bg-gradient-to-b from-green-700 to-orange-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="flex items-center justify-center py-10 md:py-5 px-4 md:px-0 relative z-10">
          <div className="w-full md:w-1/2 text-center pt-5">
            <div className="space-y-6">
              <div className="flex justify-center items-center">
                <p className="text-sm text-white uppercase relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px] after:border-green-500">
                  kinigo events
                </p>
              </div>
              <div className="space-y-0 capitalize">
                <h1 className="text-2xl text-white md:text-3xl font-semibold">
                  Build meaningful tech connections
                </h1>
                <p className="text-white">
                  Discover tech events and conferences in Batam, hosted by
                  companies from Batam, Singapore and Malaysia
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={scrollToUpcomingEvents}
                  className="bg-orange-400 hover:bg-orange-600 hover:text-white"
                >
                  SEE UPCOMING EVENTS
                </Button>
                <Button variant="outline">PARTNER WITH US</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Grid */}
      <div className="md:px-20 lg:px-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-5 py-14 bg-gray-100">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="col-span-1 md:col-span-3 cursor-pointer relative"
          >
            <AspectRatio ratio={9 / 10} className="bg-muted">
              <div className="h-full w-full object-cover bg-gray-200" />
            </AspectRatio>
          </div>
        ))}
      </div>

      {/* Events Section */}
      <div ref={upcomingEventsRef} className="px-32 pt-3 pb-14 relative">
        <div className="flex items-center py-10 md:py-5 px-4 md:px-0 relative z-10">
          <div className="w-full md:w-1/2 pt-5">
            <div className="space-y-6">
              <SectionHeader
                title="Popular Events"
                description="Get event updates. Share your email"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10 py-4 mb-6">
          {events.map((event, i) => (
            <EventCard key={i} {...event} />
          ))}
        </div>

        <div className="w-full">
          <Alert className="bg-gray-100">
            <AlertDescription>
              <div className="">
                <p className="text-center text-gray-600 text-xl">
                  Stay tuned for thrilling workshops and events—this is where
                  the action begins!
                </p>
                <p className="text-center text-gray-600 text-xl">
                  Stream our past sessions below and get inspired!
                </p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <Separator className="my-1 bg-gray-100" />

      {/* Categories Section */}
      <div className="px-32 pb-14 relative">
        <div className="flex items-center py-10 md:py-5 px-4 md:px-0 relative z-10">
          <div className="w-full md:w-1/2 pt-5">
            <div className="space-y-6">
              <SectionHeader title="Browse by Category" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-5 py-4 mb-6">
          {categories.map((category, i) => (
            <CategoryCard key={i} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}
