"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Linkedin, Globe, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiTelegramLogo } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { EditableImage } from "./EditableImage";
import {
  useIsCommunityMember,
  useAddMemberToCommunity,
  useUpdateCommunity
} from "@/hooks/use-community";
import { RootState } from "@/redux/store";
import { AuthDialog } from "@/components/AuthDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { uploadFile } from "@/hooks/uploadFile";
import { MediaFolderType } from "@/types/MediaFolderType";

import { revalidateCommunityPage } from "@/actions/revalidate-community-page";

export type PageRoute =
  | "members"
  | "about"
  | "settings"
  | "events"
  | "event-gallery";

interface SampleMembers {
  _id: string;
  full_name: string;
  picture: string;
  username?: string;
}

interface SocialLinksProps {
  instagram?: string;
  linkedin?: string;
  website?: string;
}

interface ProfileHeaderProps {
  isAdmin: boolean;
  coverImageUrl: string;
  avatarUrl: string;
  name: string;
  location: string;
  time: string;
  currentPage?: PageRoute;
  slug: string;
  totalMembers: string;
  sampleMembers: SampleMembers[];
  telegram?: string;
  city?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  communityId: string;
  onNavigate?: (path: string) => void;
}

function useStickyObserver(ref: React.RefObject<HTMLDivElement>) {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const calendarRect = ref.current.getBoundingClientRect();
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const stickyStart = scrollPosition + calendarRect.top - 100;
      setIsSticky(scrollPosition > stickyStart);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return isSticky;
}

function useActiveDateObserver(
  timelineRefs: React.RefObject<(HTMLDivElement | null)[]>
) {
  const [activeDate, setActiveDate] = useState("May, 2020");

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

    timelineRefs.current?.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current?.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    };
  }, [timelineRefs]);

  return activeDate;
}

function SocialLinks({ instagram, linkedin, website }: SocialLinksProps) {
  const activeLinks = [
    { icon: Instagram, url: instagram },
    { icon: Linkedin, url: linkedin },
    { icon: Globe, url: website },
  ].filter((link): link is { icon: any; url: string } => !!link.url);

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex items-center gap-4 pt-2">
      {activeLinks.map(({ icon: Icon, url }) => (
        <Tooltip key={url}>
          <TooltipTrigger asChild>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <Icon className="w-4 h-4 cursor-pointer" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-100">
            <p>{url}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

function MembersList({
  members,
  total,
}: {
  readonly members: SampleMembers[];
  readonly total: string;
}) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {members?.map((member, idx) => (
          <Avatar
            key={`${member._id}-${idx}`}
            className="w-8 h-8 border-2 bg-background"
          >
            <AvatarImage
              src={
                member.picture ||
                `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                  member.full_name
                )}`
              }
            />
            <AvatarFallback>{member.full_name[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-xs font-bold whitespace-nowrap ml-2">
        +{total} members
      </p>
    </div>
  );
}

interface NavButtonsProps {
  readonly slug: string;
  readonly currentPage: string;
  readonly onNavigate?: (path: string) => void;
  readonly isAdmin: boolean;
}

function NavButtons({
  slug,
  currentPage,
  onNavigate,
  isAdmin,
}: NavButtonsProps) {
  const pages = [
    { name: "Events", path: "" },
    { name: "About", path: "about" },
    { name: "Member", path: "members" },
    { name: "Gallery", path: "event-gallery" },
  ];

  if (isAdmin) {
    pages.push({ name: "Settings", path: "settings" });
  }

  const handleClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      {pages.map(({ name, path }) => (
        <Button
          key={name}
          onClick={() => handleClick(path)}
          variant={
            currentPage === path || (path === "" && currentPage === "events")
              ? "outline"
              : "ghost"
          }
          className={
            currentPage === path || (path === "" && currentPage === "events")
              ? "text-gray-600"
              : ""
          }
        >
          {name}
        </Button>
      ))}
    </>
  );
}

export function ProfileHeader({
  isAdmin,
  coverImageUrl,
  communityId,
  avatarUrl,
  name,
  location,
  time,
  currentPage = "events",
  slug,
  totalMembers,
  sampleMembers,
  telegram,
  instagram,
  linkedin,
  website,
  city,
  onNavigate,
}: ProfileHeaderProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const { updateCommunity, loading, error } = useUpdateCommunity();
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<HTMLDivElement[]>([]);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const {
    isMember,
    loading: isMemberLoading,
    refetch,
  } = useIsCommunityMember(slug);
  const user = useSelector((state: RootState) => state.auth.user);

  const { addMember, loading: joinLoading } = useAddMemberToCommunity();
  useStickyObserver(calendarContainerRef);
  useActiveDateObserver(timelineRefs);

  const handleJoin = async () => {
    if (user) {
      try {
        await addMember({ variables: { communityId: communityId } });
        await refetch();
        await revalidateCommunityPage(slug);
      } catch (err) {
        console.error("Gagal join community:", err);
      }
    } else {
      setAuthOpen(true);
    }
  };

  const handleCoverChange = async (file: File) => {
    setIsCoverUploading(true);
    try {
      const result = await uploadFile(file, MediaFolderType.COMMUNITY);
      const cover = result.data;
      await updateCommunity(communityId, { cover });
    } finally {
      setIsCoverUploading(false);
    }
  };

  const handleAvatarChange = async (file: File) => {
    setIsAvatarUploading(true);
    try {
      const result = await uploadFile(file, MediaFolderType.COMMUNITY);
      const logo = result.data;
      await updateCommunity(communityId, { logo });
    } finally {
      setIsAvatarUploading(false);
    }
  };

  const buttonLabel = joinLoading
    ? "Joining..."
    : isMember
      ? "Joined ✓"
      : "Join Us";

  return (
    <>
      <div className="w-full md:w-4/5 mx-auto relative">
        <EditableImage
          src={coverImageUrl || "/default-cover.jpg"}
          alt="Cover Image"
          onChange={handleCoverChange}
          isCover
          isAdmin={isAdmin}
          loading={isCoverUploading}
          className="rounded-none md:rounded-3xl overflow-hidden"
        />

        <div className="absolute inset-0 bg-gradient-to-t 
    from-black/80 via-black/40 to-transparent rounded-3xl" />
      </div>
      <div className="w-[calc(66.666%+2rem)] mx-auto -mt-20 relative z-20">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

          <div className="relative">
            <EditableImage
              src={avatarUrl}
              alt={name}
              onChange={handleAvatarChange}
              isAdmin={isAdmin}
              loading={isAvatarUploading}
            />

          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              {name}
            </h1>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-red-500" />
              <span>{location} — {city}</span>
              <span className="text-red-500 font-mono">{time}</span>
            </div>

            <SocialLinks
              instagram={instagram}
              linkedin={linkedin}
              website={website}
            />
          </div>
          <div className="flex items-center gap-3">
            {telegram && (
              <Link href={telegram} target="_blank">
                <Button
                  size="icon"
                  className="bg-white/5 hover:bg-red-600/20 
               text-blue-500"
                >
                  <PiTelegramLogo />
                </Button>
              </Link>
            )}

            <Button
              onClick={!isMember ? handleJoin : undefined}
              disabled={joinLoading || isMember}
              className={
                isMember
                  ? "bg-white/10 text-gray-400 cursor-default"
                  : "bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-600/30"
              }
            >
              {buttonLabel}
            </Button>

            <MembersList members={sampleMembers} total={totalMembers} />
          </div>
        </div>
        <div className="items-center gap-1 mb-4 pt-10">
          <NavButtons
            slug={slug}
            currentPage={currentPage}
            onNavigate={onNavigate}
            isAdmin={isAdmin}
          />
        </div>
      </div>

      <AuthDialog
        open={authOpen}
        setOpen={setAuthOpen}
        trigger={null}
        alertMessage="Login dulu ya sebelum join komunitas ini 🚀"
      />
    </>
  );
}
