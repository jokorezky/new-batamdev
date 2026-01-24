"use client";

import React, { useState, useRef, useEffect } from "react";
import { ProfileHeader, PageRoute } from "@/components/EventsProfileHeader";
import { CommunityResponse } from "@/types/Community";
import EventPage from "./EventPage";
import { CommunityMembers } from "./MembersPage";
import { CommunityGalleries } from "./GalleryPage";
import AboutPage from "./AboutPage";
import SettingsPage from "./SettingsPage";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface SampleMembers {
  _id: string;
  full_name: string;
  picture: string;
}

interface UserSlugContentProps {
  community: CommunityResponse;
  sampleMembers: SampleMembers[];
  totalMembers: string;
}

export default function CommunityPage({
  community,
  totalMembers,
  sampleMembers,
}: UserSlugContentProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeDate, setActiveDate] = useState("May, 2020");
  const [currentPage, setCurrentPage] = useState<PageRoute>("events");
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const admins = community?.admins;
  const isAdmin = admins?.some((admin) => admin._id === user?._id) || false;
  const [time, setTime] = useState("");
  const timeZone = "Asia/Jakarta";

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const zonedDate = toZonedTime(now, timeZone);
      const formattedTime = format(zonedDate, "hh:mm a");
      setTime(formattedTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleNavigate = (path: string) => {
    const validPaths: PageRoute[] = [
      "members",
      "about",
      "settings",
      "events",
      "event-gallery",
    ];
    const newPage = validPaths.includes(path as PageRoute)
      ? (path as PageRoute)
      : "events";

    setCurrentPage(newPage);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "members":
        return <CommunityMembers community={community} />;
      case "about":
        return <AboutPage community={community} />;
      case "settings":
        return <SettingsPage community={community} />;
      case "events":
        return <EventPage community={community} />;
      case "event-gallery":
      default:
        return <CommunityGalleries community={community} />;
    }
  };

  return (
    <div className="relative w-full pb-60 pt-0 md:pt-6 bg-gray-50">
      <ProfileHeader
        isAdmin={isAdmin}
        coverImageUrl={community?.cover}
        communityId={community?._id}
        avatarUrl={community?.logo}
        name={community.name}
        telegram={community.telegram}
        instagram={community.instagram}
        city={community.city}
        linkedin={community.linkedin}
        website={community.website}
        location="Indonesia"
        time={time}
        currentPage={currentPage}
        slug={community.url}
        totalMembers={totalMembers}
        sampleMembers={sampleMembers}
        onNavigate={handleNavigate}
      />
      {renderPage()}
    </div>
  );
}
