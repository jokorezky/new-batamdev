"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CalendarDays,
  MapPin,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  QrCode,
} from "lucide-react";
import { format, isAfter } from "date-fns";
import { AttendedEventsData } from "@/types/Attend";
import ReusablePagination from "@/components/blocks/reusable-pagination";
import { useGetMyAttendedEvents } from "@/hooks/use-attend";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MyAttendedEvents() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, loading, error, refetch } = useGetMyAttendedEvents(page, limit);

  useEffect(() => {
    refetch();
  }, [page, limit, refetch]);

  const getAttendanceStatus = (attendance: any, event: any) => {
    const now = new Date();
    const eventEndDate = new Date(event.endDate || event.startDate);

    if (attendance.attendedAt) {
      return {
        status: "hadir",
        text: "Telah Hadir",
        color: "text-green-600",
        bgColor: "bg-green-100 text-green-800",
        icon: CheckCircle,
      };
    }

    if (isAfter(now, eventEndDate)) {
      return {
        status: "berakhir",
        text: "Event Berakhir",
        color: "text-gray-500",
        bgColor: "bg-gray-100 text-gray-800",
        icon: XCircle,
      };
    }

    return {
      status: "akan_hadir",
      text: "Akan Hadir",
      color: "text-blue-600",
      bgColor: "bg-blue-100 text-blue-800",
      icon: Clock,
    };
  };

  if (loading) return <div className="text-center py-8">Loading events...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  const eventsData = data as AttendedEventsData | undefined;
  const attendances = eventsData?.data || [];
  const events = attendances.map((attendance) => attendance.event);
  const total = eventsData?.total || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Event yang saya ikuti</h1>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => {
          const attendance = attendances[index];
          const status = getAttendanceStatus(attendance, event);
          const StatusIcon = status.icon;

          return (
            <Card key={event._id || index} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img
                    src={event.image || "/placeholder-event.jpg"}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>

                <div className="md:w-2/4 space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{event.title}</h2>

                    <div
                      className={`flex items-center gap-1 text-sm ${status.color}`}
                    >
                      <StatusIcon className="h-4 w-4" />
                      <span>{status.text}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {event.description && event.description.length > 150
                      ? `${event.description.substring(0, 150)}...`
                      : event.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {format(new Date(event.startDate), "dd MMMM yyyy")}
                      {event.endDate &&
                        event.endDate !== event.startDate &&
                        ` - ${format(new Date(event.endDate), "dd MMMM yyyy")}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.address || "Lokasi tidak tersedia"}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs capitalize">
                      {event.format}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${status.bgColor}`}
                    >
                      {status.text}
                    </span>
                  </div>

                  {attendance?.attendedAt && (
                    <div className="text-xs text-muted-foreground">
                      Waktu kehadiran:{" "}
                      {format(
                        new Date(attendance.attendedAt),
                        "dd MMMM yyyy HH:mm"
                      )}
                    </div>
                  )}

                  {status.status === "berakhir" && (
                    <div className="text-xs text-orange-600 mt-2">
                      Event telah berakhir namun QR code belum di-scan
                    </div>
                  )}
                </div>

                <div className="md:w-1/4 flex flex-col gap-2 justify-center">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/events/${event.slugname}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Detail
                    </Link>
                  </Button>

                  {attendance?.qrCode && status.status !== "berakhir" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary" className="w-full">
                          <QrCode className="h-4 w-4 mr-2" />
                          Lihat QR Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>QR Code Kehadiran</DialogTitle>
                          <DialogDescription>
                            Tunjukkan QR code ini saat check-in di event
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4">
                          <img
                            src={attendance.qrCode}
                            alt="QR Code Kehadiran"
                            className="w-64 h-64 object-contain border rounded-lg"
                          />
                          <div className="text-sm text-muted-foreground text-center">
                            QR code untuk: {event.title}
                          </div>

                          <Button
                            variant="outline"
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = attendance.qrCode;
                              link.download = `qr-code-${event.title}.png`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            Download QR Code
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {status.status === "berakhir" && (
                    <Button variant="outline" className="w-full" disabled>
                      QR Code Tidak Tersedia
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {events.length > 0 && (
        <ReusablePagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
        />
      )}

      {events.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Anda belum menghadiri event apapun.
          </p>
          <Button asChild className="mt-4 text-white">
            <Link href="/events">Jelajahi Event</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
