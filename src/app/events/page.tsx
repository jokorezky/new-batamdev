"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { EventCard } from "@/components/EventCard";
import Link from "next/link";
import { CalendarSearchIcon } from "lucide-react";
import { useGetEventsQuery } from "@/hooks/events";
import { useListEventCategoriesWithCount } from "@/hooks/use-category";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityBuildersSection } from "@/components/CommunityBuildersSection";

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

const CategoryCard = ({
  title,
  count,
  url,
}: {
  title: string;
  count: string;
  url: string;
}) => (
  <Link
    href={`/events/category/${url}`}
    prefetch={false}
    className="col-span-1 md:col-span-3 cursor-pointer relative"
  >
    <Card className="rounded-none bg-gray-50 hover:bg-white">
      <CardHeader>
        <CardTitle className="pt-4 text-sm lg:text-xl">{title}</CardTitle>
        <Separator className="my-4 mt-10 bg-gray-100" />
        <CardContent className="p-0 pt-3">
          <div className="flex flex-wrap gap-2 text-xs lg:text-sm">{count}</div>
        </CardContent>
      </CardHeader>
    </Card>
  </Link>
);

export default function Events() {
  const upcomingEventsRef = useRef<HTMLDivElement>(null);
  const { categories } = useListEventCategoriesWithCount();
  const [page] = useState(1);
  const { data: eventsUpcoming, loading: loadingEventsUpcoming } =
    useGetEventsQuery(page, 10, "DESC", "upcoming");
  const { data: eventsPast, loading: loadingEventsPast } = useGetEventsQuery(
    page,
    9,
    "DESC",
    "past"
  );
  const scrollToUpcomingEvents = () => {
    upcomingEventsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <div className="px-4 sm:px-8 md:px-32 py-3 bg-gradient-to-b from-green-700 to-orange-700 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto relative">
          <div className="flex items-center justify-center py-8 md:py-5 relative z-10">
            <div className="w-full md:w-1/2 text-center pt-3 md:pt-5">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-center items-center">
                  <p className="text-xs sm:text-sm text-white uppercase relative w-fit after:content-[''] after:absolute after:-top-1 after:left-1/2 after:-translate-x-1/2 after:w-[100%] after:border-t-[1px] after:border-green-500">
                    kinigo events
                  </p>
                </div>
                <div className="space-y-1 sm:space-y-2 capitalize">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                    Build meaningful tech connections
                  </h1>
                  <p className="text-white text-sm sm:text-base">
                    Discover tech events and conferences in Batam, hosted by
                    communities & companies tech
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Button
                    onClick={scrollToUpcomingEvents}
                    className="bg-orange-400 hover:bg-orange-600 hover:text-white text-xs sm:text-sm"
                  >
                    SEE UPCOMING EVENTS
                  </Button>
                  {/* <Button variant="outline" className="text-xs sm:text-sm">
                    PARTNER WITH US
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommunityBuildersSection />

      <div
        ref={upcomingEventsRef}
        className="w-full max-w-[1440px] mx-auto relative"
      >
        <div className="px-4 lg:px-32 pt-3 pb-5 lg:pb-5 relative">
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
            {!loadingEventsUpcoming &&
            eventsUpcoming?.data &&
            eventsUpcoming?.data.length > 0 ? (
              eventsUpcoming.data.map((event) => (
                <EventCard key={event.startDate} {...event} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-10 space-y-4">
                <CalendarSearchIcon className="h-12 w-12 text-gray-400" />
                <p className="text-lg font-medium text-gray-600">
                  No Upcoming Events
                </p>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  Subscribe to our calendar to get notified when new events are
                  posted.
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-0 lg:my-1 bg-gray-100" />

        <div className="px-4 lg:px-32 relative">
          <div className="flex items-center py-5 px-4 md:px-0 relative z-10">
            <div className="w-full md:w-1/2 pt-0 lg:pt-5">
              <SectionHeader title="Browse by Category" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5 py-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1440px] mx-auto relative">
        <div className="px-4 lg:px-32 pt-3 pb-5 lg:pb-14 relative">
          <div className="flex items-center py-10 md:py-5 px-4 md:px-0 relative z-10">
            <div className="w-full md:w-1/2 pt-5">
              <div className="space-y-6">
                <SectionHeader
                  title="Past Events"
                  description="Get event updates. Share your email"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10 py-4 mb-6">
            {!loadingEventsPast &&
              eventsPast?.data.map((event) => (
                <EventCard key={event.startDate} {...event} />
              ))}
          </div>

          <div className="w-full">
            <Alert className="bg-gray-100">
              <AlertDescription>
                <div className="">
                  <p className="text-center text-gray-600 text-sm lg:text-xl">
                    Stay tuned for thrilling workshops and events—this is where
                    the action begins!
                  </p>
                  <p className="text-center text-gray-600 text-sm lg:text-xl">
                    Stream our past sessions below and get inspired!
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
