"use client";

import React, { useRef, useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useListEventsByCategory } from "@/hooks/use-category";
import { EventCard } from "@/components/EventCard"

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

interface Community {
  name: string
}

export default function Events() {
  const upcomingEventsRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ 'event-category': string }>();
  const [page] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const listEventsInput = {
    page,
    limit: itemsPerPage
  };
  const categoryUrl = params['event-category'] ?? '';
  const { events, info, loading } = useListEventsByCategory(categoryUrl, listEventsInput);

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
                    kinigo Event
                  </p>
                </div>
                <div className="space-y-1 sm:space-y-2 capitalize">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                    {info.name}
                  </h1>
                  <p className="text-white text-sm sm:text-base">
                    {info.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Button
                    onClick={scrollToUpcomingEvents}
                    className="bg-orange-400 hover:bg-orange-600 hover:text-white text-xs sm:text-sm"
                  >
                    SEE UPCOMING EVENTS
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto relative">
        <div
          ref={upcomingEventsRef}
          className="px-4 lg:px-32 pt-3 pb-5 lg:pb-14 relative"
        >
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
            {!loading && events.map((event) => (
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
