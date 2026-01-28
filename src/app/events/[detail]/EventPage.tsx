"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import JoinButton from "@/components/JoinButton";
import { EditButton } from "../components/EditButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ImagePreviewClient from "@/components/ImagePreviewClient";
import { formatMemberCount } from "@/lib/formatMemberCount";
import { ArrowUpRight, Flame } from "lucide-react";
import { CollaboratingCommunityDetails, THosts } from "@/types/Events";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { id } from "date-fns/locale";
import SocialLinks from "./SocialLinks";
import EventContentRenderer from "./EventContentRenderer";

interface EventPageProps {
  event: any;
  eventSlug: string;
}

export default function EventPage({ event, eventSlug }: EventPageProps) {

  const zonedDate = toZonedTime(new Date(event.startDate), "Asia/Jakarta");
  const formattedDate = format(zonedDate, "d MMMM yyyy", { locale: id });

  if (!event.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="bg-neutral-950 border border-red-500/20 rounded-2xl p-8 max-w-md w-full">
          <CardContent className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Event Tidak Tersedia
            </h2>
            <p className="text-neutral-400">
              Event ini tidak tersedia atau telah dihapus.
            </p>
            <Link
              href="/events"
              className="block w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-semibold"
            >
              Lihat Event Lainnya
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  const getFirstName = (fullName?: string) => {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
  };
  const names = event.attendeeDetails
    ?.map((a: THosts) => getFirstName(a.full_name))
    .filter(Boolean) as string[];

  const MAX_VISIBLE = 5;
  const visibleAttendees = event.attendeeDetails.slice(0, MAX_VISIBLE);
  const visibleNames = names.slice(0, 2);
  const remainingNamesCount =
    (event.totalAttendees ?? names.length) - visibleNames.length;
  const remainingCount =
    (event.totalAttendees ?? 0) - visibleAttendees.length;
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="relative w-full h-[70vh] min-h-[420px]">
        <Image
          src={
            event.image &&
              (event.image.includes("coderjs.s3") ||
                event.image.includes("properioid.s3"))
              ? "/no-image.jpg"
              : event.image || "/no-image.jpg"
          }
          alt="Event Cover"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        <ImagePreviewClient imageUrl={event.image} />

        <div className="absolute bottom-10 left-0 right-0 max-w-[1600px] mx-auto px-6 lg:px-28">
          <p className="text-sm text-red-400 tracking-widest uppercase">
            {formattedDate} • {event.startTime}
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-28 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          <main className="md:col-span-8">
            <EditButton
              userId={event.community.admins}
              href={`/events/${eventSlug}/edit`}
              className="mb-6"
            />

            <Card className="bg-neutral-950 border border-white/10 rounded-3xl">
              <CardContent className="p-8 md:p-10">
                <EventContentRenderer content={event.content} />
              </CardContent>
            </Card>
          </main>

          <aside className="md:col-span-4 md:sticky md:top-36 h-fit">
            <Card className="relative bg-neutral-950 border border-red-500/20 rounded-3xl overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent pointer-events-none" />

              <CardContent className="relative p-6 space-y-3">

                <Link
                  href={`/${event.community.url}`}
                  className="flex items-center gap-4"
                >
                  <Avatar className="w-14 h-14 ring-2 ring-red-500/40">
                    <AvatarImage src={event.community?.logo} />
                    <AvatarFallback>{event.community?.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-neutral-400">Presented by</p>
                    <p className="font-bold flex items-center gap-1">
                      {event.community?.name}
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    </p>
                  </div>
                </Link>

                <Separator className="bg-white/10" />

                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Members</span>
                  <span className="text-white font-medium">
                    {formatMemberCount(event.community.countMembers)}
                  </span>
                </div>

                <SocialLinks {...event.community} />

                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-red-400">
                    <Flame className="w-4 h-4 flex-shrink-0 translate-y-[0.5px]" />
                    <span className="leading-none tracking-wide mt-1">Guided By</span>
                  </p>
                  <Separator className="my-3 bg-white/10" />
                  <div className="space-y-3">
                    {event.hostDetails?.map((host: any) => (
                      <Link
                        key={host._id}
                        href={`/p/${host.username}`}
                        className="flex items-center gap-3 hover:translate-x-1 transition"
                      >
                        <Avatar className="w-8 h-8 ring-1 ring-white/20">
                          <AvatarImage src={host.picture} />
                          <AvatarFallback>{host.full_name?.[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium">{host.full_name}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {event.totalAttendees !== 0 && (
                  <p className="text-sm text-neutral-300">
                    {event.totalAttendees} People Going
                  </p>
                )}

                {event.collaboratingCommunityDetails.length > 0 && (
                  <>
                    <Separator className="bg-white/10" />
                    <p className="text-sm font-semibold text-red-400">
                      Collaboration With
                    </p>
                    <div className="space-y-3">
                      {event.collaboratingCommunityDetails.map(
                        (col: CollaboratingCommunityDetails) => (
                          <Link
                            key={col.name}
                            href={`/${col.url}`}
                            className="flex items-center justify-between rounded-xl p-2 hover:bg-white/5 transition"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="w-9 h-9 ring-1 ring-red-500/30">
                                <AvatarImage src={col.logo} />
                                <AvatarFallback>{col.name}</AvatarFallback>
                              </Avatar>
                              <p className="text-sm font-medium">{col.name}</p>
                            </div>
                            <span className="text-xs text-neutral-400">
                              {formatMemberCount(col.countMembers)}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </>
                )}

                <div className="pt-3">
                  <div className="flex items-center -space-x-3">
                    {event.attendeeDetails.map((a: THosts) => (
                      <Avatar
                        key={a.username}
                        className="ring-2 ring-red-600 bg-black"
                      >
                        <AvatarImage src={a.picture} />
                        <AvatarFallback className="bg-black text-red-500">
                          {a.full_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}

                    {remainingCount > 0 && (
                      <div
                        className="
                          flex h-10 w-10 items-center justify-center rounded-full
                          bg-black border border-red-600
                          text-xs font-bold text-red-500
                          shadow-[0_0_12px_rgba(239,68,68,0.6)]
                        "
                      >
                        +{remainingCount}
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 tracking-wide">
                    <span className="capitalize">{visibleNames.join(", ")}</span>
                    {remainingNamesCount > 0 && (
                      <>
                        {" "}
                        <span className="text-red-500 font-medium">
                          and {remainingNamesCount} others
                        </span>
                      </>
                    )}{" "}
                    are attending
                  </p>
                </div>


              </CardContent>

              {!event.useRegistrationLink && (
                <CardFooter className="w-full flex flex-col gap-3 p-6 pt-0">
                  <JoinButton {...event} eventSlug={eventSlug} />
                  <Link
                    href="/events"
                    className="block text-center text-sm text-neutral-400 hover:text-red-400 transition"
                  >
                    Lihat Semua Events
                  </Link>
                </CardFooter>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
