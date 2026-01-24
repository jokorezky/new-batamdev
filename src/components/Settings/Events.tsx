"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CalendarDays,
  MapPin,
  Edit,
  Eye,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import ReusablePagination from "@/components/blocks/reusable-pagination";
import Link from "next/link";
import { useGetEventsByCurrentUser } from "@/hooks/events";

export default function MyEvents() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");

  const { data, loading, error, refetch } = useGetEventsByCurrentUser(
    page,
    limit,
    "DESC"
  );

  useEffect(() => {
    refetch({
      listEventsInput: {
        page,
        limit,
        order: {
          orderBy: "CREATED_AT",
          sortBy: "DESC",
        },
      },
    });
  }, [page, limit, refetch]);

  if (loading) return <div className="text-center py-8">Loading events...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  const eventsData = data;
  const events = eventsData?.data || [];
  const total = eventsData?.total || 0;

  const userCommunities =
    events.length > 0 && events[0].userCommunities
      ? events[0].userCommunities
      : [];

  const filteredEvents =
    selectedCommunity === "all"
      ? events
      : events.filter((event) => event.community._id === selectedCommunity);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Event Saya</h1>
        <Button asChild className="text-white">
          <Link href="/events/create">Buat Event Baru</Link>
        </Button>
      </div>

      {userCommunities.length > 0 && (
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Komunitas Saya
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCommunity("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCommunity === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border"
              }`}
            >
              Semua Komunitas
            </button>
            {userCommunities.map((community) => (
              <button
                key={community._id}
                onClick={() => setSelectedCommunity(community._id)}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                  selectedCommunity === community._id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border"
                }`}
              >
                {community.logo && (
                  <img
                    src={community.logo}
                    alt={community.name}
                    className="w-4 h-4 rounded-full"
                  />
                )}
                {community.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event._id} className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              <div className="md:w-2/4 space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  {/* Status Indicator */}
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      event.is_active ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {event.is_active ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span>{event.is_active ? "Aktif" : "Tidak Aktif"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {format(new Date(event.startDate), "dd MMMM yyyy")}
                    {event.endDate &&
                      ` - ${format(new Date(event.endDate), "dd MMMM yyyy")}`}
                  </span>
                  <span>•</span>
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.address}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs capitalize">
                    {event.category}
                  </span>
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs capitalize">
                    {event.format}
                  </span>
                  {/* Status Badge */}
                  <span
                    className={`px-2 py-1 rounded-md text-xs capitalize ${
                      event.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
              </div>

              <div className="md:w-1/4 flex flex-col gap-2 justify-center">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/events/${event.slugname}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/events/${event.slugname}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/events/${event.slugname}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Upload Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredEvents.length > 0 && (
        <ReusablePagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
        />
      )}

      {filteredEvents.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {selectedCommunity === "all"
              ? "Anda belum membuat event apapun."
              : "Tidak ada event untuk komunitas yang dipilih."}
          </p>
          <Button asChild className="mt-4 text-white">
            <Link href="/events/create">Buat Event Pertama</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
