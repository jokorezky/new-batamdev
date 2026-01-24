"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import JoinButton from "@/components/JoinButton";
import { EditButton } from "../components/EditButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ImagePreviewClient from "@/components/ImagePreviewClient";
import { THosts } from "@/types/Events";
import { formatMemberCount } from "@/lib/formatMemberCount";
import { ArrowUpRight } from "lucide-react";
import { CollaboratingCommunityDetails } from "@/types/Events";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { id } from "date-fns/locale";
import SocialLinks from "./SocialLinks";
import EventContentRenderer from "./EventContentRenderer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface EventPageProps {
  event: any;
  eventSlug: string;
}

export default function EventPage({ event, eventSlug }: EventPageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const zonedDate = toZonedTime(new Date(event.startDate), "Asia/Jakarta");
  const formattedDate = format(zonedDate, "d MMMM yyyy", { locale: id });

  if (!event.is_active) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="bg-background rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Event Tidak Tersedia
            </h2>
            <p className="text-gray-600 mb-6">
              Event ini saat ini tidak tersedia atau telah dihapus oleh
              penyelenggara.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Lihat Event Lainnya
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen space-y-5 py-4 bg-gray-50">
      <div className="w-full max-w-[1440px] mx-auto relative px-4 sm:px-6 lg:px-32">
        <AspectRatio ratio={isMobile ? 1 : 16 / 7}>
          <Image
            src={
              event.image &&
              (event.image.includes(
                "coderjs.s3.ap-southeast-2.amazonaws.com"
              ) ||
                event.image.includes(
                  "properioid.s3.ap-southeast-1.amazonaws.com"
                ))
                ? "/no-image.jpg"
                : event.image || "/no-image.jpg"
            }
            alt="Cover Image"
            fill
            className="object-cover object-top"
          />
          <ImagePreviewClient imageUrl={event.image} />
        </AspectRatio>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="order-1 md:order-2 md:col-span-4 md:sticky top-[6rem] h-fit max-h-[calc(100vh-7rem)] overflow-y-auto rounded-none scrollbar-thin scrollbar-thumb-neutral-400 hover:scrollbar-thumb-neutral-500 scrollbar-track-transparent">
            <Card className="h-full shadow-none border-none rounded-none">
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <Link href={`/${event.community.url}`} className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12 rounded-none">
                        <AvatarImage
                          src={event.community?.logo}
                          alt={event.community?.name}
                        />
                        <AvatarFallback>{event.community?.name}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-medium text-muted-foreground leading-none">
                          Presented by
                        </p>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <p className="text-md font-bold">
                            {event.community?.name}
                          </p>
                          <ArrowUpRight className="h-3 w-3 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <p className="flex items-center gap-1 text-sm text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-none">
                    {formatMemberCount(event.community.countMembers)}
                  </p>
                </div>
                <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800 w-full py-4">
                  <p>
                    {formattedDate} - {event.startTime}
                  </p>
                  <p className="font-bold">{event.title}</p>
                </div>
                <SocialLinks
                  instagram={event.community.instagram}
                  linkedin={event.community.linkedin}
                  website={event.community.website}
                  telegram={event.community.telegram}
                  whatsapp={event.community.whatsapp}
                />
                <p className="font-bold text-sm text-gray-600 pt-4">
                  Guided By
                </p>
                <Separator className="my-2 bg-gray-100" />
                <div className="space-y-1 pt-2 pb-5">
                  {event.hostDetails?.map((host: any) => (
                    <div key={host._id}>
                      <Link
                        href={`/p/${host.username}`}
                        prefetch={false}
                        className="cursor-pointer flex items-center gap-3"
                      >
                        <Avatar className="w-7 h-7">
                          <AvatarImage
                            src={
                              host.picture ||
                              `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                                host.full_name
                              )}`
                            }
                            alt={host.full_name}
                          />
                          <AvatarFallback>
                            {host.full_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-sm">{host.full_name}</p>
                      </Link>
                    </div>
                  ))}
                </div>
                {event.totalAttendees !== 0 && (
                  <p className="font-bold mt-6 text-sm text-gray-600">
                    {event.totalAttendees} Going
                  </p>
                )}
                <Separator className="my-2 bg-gray-100" />
                {event.collaboratingCommunityDetails.length > 0 && (
                  <p className="font-bold text-sm text-gray-600 pt-2">
                    Collaboration With
                  </p>
                )}

                {event.collaboratingCommunityDetails.map(
                  (colWith: CollaboratingCommunityDetails) => (
                    <div
                      key={colWith.name}
                      className="flex justify-between items-center"
                    >
                      <Link href={`/${colWith.url}`} className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12 rounded-none">
                            <AvatarImage
                              src={colWith?.logo}
                              alt={colWith?.name}
                            />
                            <AvatarFallback>{colWith?.name}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-1 cursor-pointer">
                              <p className="text-md font-bold">
                                {colWith?.name}
                              </p>
                              <ArrowUpRight className="h-3 w-3 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <p className="flex items-center gap-1 text-sm text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-none">
                        {formatMemberCount(colWith.countMembers)}
                      </p>
                    </div>
                  )
                )}
                <Separator className="my-2 bg-gray-100" />
                <div className="flex -space-x-3 pt-1">
                  {event?.attendeeDetails.map((attendeence: THosts) => (
                    <Avatar key={attendeence.username}>
                      <AvatarImage
                        src={
                          attendeence.picture ||
                          `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                            attendeence.full_name || attendeence.username
                          )}`
                        }
                        alt={attendeence.full_name}
                      />
                      <AvatarFallback>{attendeence.full_name}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.totalAttendees > 5 && (
                    <Avatar>
                      <AvatarFallback>
                        {event.totalAttendees > 5
                          ? `+${event.totalAttendees - 5}`
                          : null}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                {!event?.useRegistrationLink && (
                  <p className="text-xs text-gray-700">
                    {(() => {
                      const attendees = event?.attendeeDetails || [];
                      if (attendees.length === 0) return "Wait attendees";
                      if (attendees.length === 1) return attendees[0].full_name;
                      if (attendees.length === 2)
                        return `${attendees[0].full_name} and ${attendees[1].full_name}`;
                      return `${attendees[0].full_name}, ${
                        attendees[1].full_name
                      } and ${event.totalAttendees - 2} others`;
                    })()}
                  </p>
                )}
              </CardContent>
              {!event?.useRegistrationLink && (
                <CardFooter className="flex flex-col p-4 border-t border-gray-100 space-y-4">
                  <JoinButton {...event} eventSlug={eventSlug} />
                  <Link
                    href={`/${event.community.url}`}
                    className="w-full py-3 font-semibold hover:scale-[1.02] transition-all duration-300 text-center cursor-pointer hover:underline"
                  >
                    Lihat Semua Events
                  </Link>
                </CardFooter>
              )}
            </Card>
          </div>

          <div className="order-2 md:order-1 md:col-span-8 bg-white p-6 shadow-sm">
            <EditButton
              userId={event?.community.admins}
              className="mb-4"
              href={`/events/${eventSlug}/edit`}
            />
            <div className="min-h-[200px] border-2 border-dashed border-gray-300 p-4 flex md:items-center md:justify-center">
              <div className="w-full overflow-hidden break-words">
                <EventContentRenderer content={event.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
