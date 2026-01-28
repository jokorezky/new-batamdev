"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGetCommunityEventsQuery } from "@/hooks/events";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CalendarSearchIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityResponse } from "@/types/Community";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { id } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { groupEventsByMonthYear, GroupedEvent } from "@/lib/groupByMonth";
import Link from "next/link";

interface TimelineEvent {
  date: string;
  events: GroupedEvent[];
}

interface UserSlugContentProps {
  community: CommunityResponse;
}

let pastEventsContent: React.ReactNode;
let upCommingEventsContent: React.ReactNode;

const eventTags = ["All", "Networking", "Meetup", "Workshop"];

export default function EventPage({ community }: UserSlugContentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.roles?.includes("ADMIN_COMMUNITY") || false;
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [activeFilter, setActiveFilter] = useState<string | null>("All");

  const queryUpcomingFilters = {
    ...(activeFilter && activeFilter !== "All" && { format: activeFilter }),
    ...(debouncedSearchText.length >= 3 && { title: debouncedSearchText }),
    timeStatus: "upcoming" as const,
  };

  const { data: eventsUpcoming } = useGetCommunityEventsQuery(
    community.url,
    1,
    50,
    "DESC",
    queryUpcomingFilters
  );

  const queryFilters = {
    ...(activeFilter && activeFilter !== "All" && { format: activeFilter }),
    ...(debouncedSearchText.length >= 3 && { title: debouncedSearchText }),
    timeStatus: "past" as const,
  };

  const { data: eventsPast, refetch: refetchPast } = useGetCommunityEventsQuery(
    community.url,
    1,
    50,
    "DESC",
    queryFilters
  );

  useEffect(() => {
    if (debouncedSearchText.length >= 3 || debouncedSearchText.length === 0) {
      refetchPast();
    }
  }, [debouncedSearchText, refetchPast]);

  const [isSticky, setIsSticky] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeDate, setActiveDate] = useState("May, 2020");
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!calendarContainerRef.current) return;

      const calendarRect = calendarContainerRef.current.getBoundingClientRect();
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const stickyStart = scrollPosition + calendarRect.top - 100;
      setIsSticky(scrollPosition > stickyStart);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dateElement = entry.target.querySelector("time");
            if (dateElement) {
              setActiveDate(dateElement.textContent || "May, 2020");
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -100px 0px" }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const eventsUpcomingData = eventsUpcoming?.data || [];
  const eventsPassData = eventsPast?.data || [];
  const groupEventUpcoming = groupEventsByMonthYear(eventsUpcomingData);
  const groupEventPass = groupEventsByMonthYear(eventsPassData);

  if (groupEventUpcoming.length === 0) {
    upCommingEventsContent = (
      <Alert className="bg-white">
        <div className="flex gap-4">
          <CalendarSearchIcon className="h-12 w-12 text-gray-600" />
          <AlertDescription className="w-full">
            <h4 className="text-xl font-bold">No Upcoming Events</h4>
            <p className="text-gray-600">
              Subscribe to the calendar to get notified when new events are
              posted.
            </p>
            <Separator className="my-4 bg-gray-100" />
            <p className="cursor-pointer text-green-700 hover:text-green-800 font-bold">
              Subscribe
            </p>
          </AlertDescription>
        </div>
      </Alert>
    );
  } else {
    upCommingEventsContent = (
      <div className="-my-6 space-y-2">
        {groupEventUpcoming.map((event: TimelineEvent, index) => {
          return (
            <div
              key={`${event.date}-${index}`}
              className="relative pl-8 py-1 group"
              ref={(el) => {
                timelineRefs.current[index] = el;
              }}
            >
              <div className="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 before:h-full before:px-px before:bg-gray-100 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 after:w-2 after:h-2 after:bg-gray-600 after:border-4 after:box-content after:border-gray-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                <time className="inline-flex items-center justify-center text-xs font-semibold uppercase w-max px-2 h-6 mb-3 text-emerald-600 bg-emerald-100 rounded-none">
                  {event.date}
                </time>
                <div className="space-y-4 w-full">
                  {event.events?.map((detailEvent, detailIndex) => {
                    const zonedDate = toZonedTime(
                      new Date(detailEvent.startDate),
                      "Asia/Jakarta"
                    );
                    const formattedDate = format(zonedDate, "d MMMM yyyy", {
                      locale: id,
                    });
                    return (
                      <Card
                        key={`${detailEvent.title}-${detailIndex}`}
                        className="rounded-none shadow-none bg-white border-0 hover:border hover:border-gray-200 cursor-pointer hover:shadow-sm transition-all duration-200"
                      >
                        <Link
                          href={`/events/${detailEvent.slugname}`}
                          prefetch={false}
                          className="cursor-pointer relative space-y-2"
                        >
                          <div className="flex justify-between items-center py-1 md:py-4 pr-4">
                            <div className="space-y-1 flex flex-col">
                              <CardHeader className="pb-2">
                                <p className="text-muted-foreground text-sm">
                                  {formattedDate}
                                </p>
                                <CardTitle className="text-lg">
                                  {detailEvent.title}
                                </CardTitle>
                                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale *:h-6 *:w-6 *:text-[10px]">
                                  {detailEvent?.attendeeDetails.map(
                                    (attendeence) => (
                                      <Avatar
                                        key={attendeence.username}
                                        className="h-6 w-6"
                                      >
                                        <AvatarImage
                                          src={
                                            attendeence.picture ||
                                            `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                                              attendeence.full_name ||
                                                attendeence.username
                                            )}`
                                          }
                                          alt={attendeence.full_name}
                                        />
                                        <AvatarFallback className="text-[10px]">
                                          {attendeence.full_name}
                                        </AvatarFallback>
                                      </Avatar>
                                    )
                                  )}
                                  {detailEvent.totalAttendees > 5 && (
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-[10px]">
                                        {detailEvent.totalAttendees > 5
                                          ? `+${detailEvent.totalAttendees - 5}`
                                          : null}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              </CardHeader>
                            </div>
                            <div className="w-1/4 shrink-0 bg-white">
                              <AspectRatio
                                ratio={1}
                                className="overflow-hidden"
                              >
                                <img
                                  src={
                                    detailEvent.imageUrl &&
                                    (detailEvent.imageUrl.includes(
                                      "coderjs.s3.ap-southeast-2.amazonaws.com"
                                    ) ||
                                      detailEvent.imageUrl.includes(
                                        "properioid.s3.ap-southeast-1.amazonaws.com"
                                      ))
                                      ? "/no-image.jpg"
                                      : detailEvent.imageUrl || "/no-image.jpg"
                                  }
                                  alt={`Event: ${detailEvent.title}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </AspectRatio>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (groupEventPass.length === 0) {
    if (activeFilter === "All") {
      pastEventsContent = (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 border text-center space-y-4">
          <CalendarSearchIcon className="h-16 w-16 text-gray-500" />
          <h3 className="text-xl font-bold text-gray-800">
            Belum Ada Event yang Pernah Diadakan
          </h3>
          <p className="text-gray-500 max-w-md">
            Saat ini belum ada riwayat event. Mulailah buat event agar ada jejak
            kegiatan di komunitas ini.
          </p>
          {isAdmin && (
            <Link href="/events/create">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                🚀 Buat Event Pertama
              </Button>
            </Link>
          )}
        </div>
      );
    } else {
      pastEventsContent = (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-8 border text-center space-y-3">
          <CalendarSearchIcon className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-700">
            Tidak ada event di kategori "{activeFilter}"
          </h3>
          <p className="text-gray-500">
            Coba lihat kategori lain atau semua event.
          </p>
          <Button variant="outline" onClick={() => setActiveFilter("All")}>
            Lihat Semua Event
          </Button>
        </div>
      );
    }
  } else {
    pastEventsContent = (
      <div className="-my-6 space-y-2">
        {groupEventPass.map((event: TimelineEvent, index) => {
          return (
            <div
              key={`${event.date}-${index}`}
              className="relative pl-8 py-1 group"
              ref={(el) => {
                timelineRefs.current[index] = el;
              }}
            >
              <div className="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 before:h-full before:px-px before:bg-gray-100 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 after:w-2 after:h-2 after:bg-gray-600 after:border-4 after:box-content after:border-gray-50 after:rounded-full after:-translate-x-1/2 after:translate-y-1.5">
                <time className="inline-flex items-center justify-center text-xs font-semibold uppercase w-max px-2 h-6 mb-3 text-emerald-600 bg-emerald-100 rounded-full">
                  {event.date}
                </time>
                <div className="space-y-4 w-full">
                  {event.events?.map((detailEvent, detailIndex) => {
                    const zonedDate = toZonedTime(
                      new Date(detailEvent.startDate),
                      "Asia/Jakarta"
                    );
                    const formattedDate = format(zonedDate, "d MMMM yyyy", {
                      locale: id,
                    });
                    return (
                      <Card
                        key={`${detailEvent.title}-${detailIndex}`}
                        className="shadow-none rounded-none bg-white border-0 hover:border hover:border-gray-200 cursor-pointer hover:shadow-sm transition-all duration-200"
                      >
                        <Link
                          href={`/events/${detailEvent.slugname}`}
                          prefetch={false}
                          className="cursor-pointer relative space-y-2"
                        >
                          <div className="flex justify-between items-center py-1 md:py-4 pr-4">
                            <div className="space-y-1 flex flex-col">
                              <CardHeader className="pb-2">
                                <p className="text-muted-foreground text-sm">
                                  {formattedDate}
                                </p>
                                <CardTitle className="text-lg">
                                  {detailEvent.title}
                                </CardTitle>
                                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale *:h-6 *:w-6 *:text-[10px]">
                                  {detailEvent?.attendeeDetails.map(
                                    (attendeence) => (
                                      <Avatar
                                        key={attendeence.username}
                                        className="h-6 w-6"
                                      >
                                        <AvatarImage
                                          src={
                                            attendeence.picture ||
                                            `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                                              attendeence.full_name ||
                                                attendeence.username
                                            )}`
                                          }
                                          alt={attendeence.full_name}
                                        />
                                        <AvatarFallback className="text-[10px]">
                                          {attendeence.full_name}
                                        </AvatarFallback>
                                      </Avatar>
                                    )
                                  )}
                                  {detailEvent.totalAttendees > 5 && (
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-[10px]">
                                        {detailEvent.totalAttendees > 5
                                          ? `+${detailEvent.totalAttendees - 5}`
                                          : null}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                </div>
                              </CardHeader>
                            </div>
                            <div className="w-1/4 shrink-0 bg-white">
                              <AspectRatio
                                ratio={1}
                                className="overflow-hidden"
                              >
                                <img
                                  src={
                                    detailEvent.imageUrl &&
                                    (detailEvent.imageUrl.includes(
                                      "coderjs.s3.ap-southeast-2.amazonaws.com"
                                    ) ||
                                      detailEvent.imageUrl.includes(
                                        "properioid.s3.ap-southeast-1.amazonaws.com"
                                      ))
                                      ? "/no-image.jpg"
                                      : detailEvent.imageUrl || "/no-image.jpg"
                                  }
                                  alt={`Event: ${detailEvent.title}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </AspectRatio>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="relative w-full pb-60 bg-gray-50">
      <div className="w-auto md:w-[calc(66.666%+2rem)] mx-4 md:mx-auto flex flex-col items-start">
        <div className="relative w-full flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/3 space-y-5">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-md md:text-2xl font-bold">Events</h1>
              <div className="relative flex items-center gap-2">
                <AnimatePresence>
                  {showSearch && (
                    <motion.input
                      key="search-bar"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                      }}
                      type="text"
                      placeholder="Search events..."
                      className="h-9 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  )}
                </AnimatePresence>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Search events"
                  onClick={() => {
                    setShowSearch((prev) => !prev);
                    if (showSearch) {
                      setSearchText("");
                    }
                  }}
                >
                  {showSearch ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {eventTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeFilter === tag ? "default" : "outline"}
                    className={`rounded-none font-bold ${
                      activeFilter === tag
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                    size="sm"
                    onClick={() => {
                      setActiveFilter(activeFilter === tag ? null : tag);
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full pt-3 space-y-4">
              {groupEventUpcoming.length > 0 && (
                <h2 className="text-2xl font-bold">Upcomming Events</h2>
              )}

              <div className="-my-6 space-y-2 pt-4">
                {upCommingEventsContent}
              </div>
            </div>

            <div className="w-full pt-3 space-y-4">
              <h2 className="text-2xl font-bold">Past Events</h2>
              <div className="-my-6 space-y-2 pt-4">{pastEventsContent}</div>
            </div>
          </div>

          <div className="hidden md:block" ref={calendarContainerRef}>
            <div
              className={`space-y-3 ${isSticky ? "fixed top-5" : "relative"}`}
              style={{
                top: isSticky ? "20px" : "auto",
              }}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-none bg-white border p-5 pb-2 shadow-sm w-full"
                captionLayout="dropdown"
              />
              {isAdmin && (
                <Link
                  href="/events/create"
                  className="text-green-700 text-xs cursor-pointer"
                >
                  Create Event
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
