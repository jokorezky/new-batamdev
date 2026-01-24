import { IEvent } from "@/types/Events"

interface Host {
    full_name: string;
    picture: string;
    username: string;
}

interface Attendence {
    username : string;
    picture: string;
    full_name: string;
}

export interface GroupedEvent {
    title: string;
    imageUrl: string;
    description: string;
    address: string;
    date: string;
    time: string;
    location: string;
    host: string;
    slugname: string;
    startDate: string;
    hostDetails: Host[];
    attendeeDetails: Attendence[];
    totalAttendees: number
}

interface MonthGroup {
    date: string;
    title: string;
    events: GroupedEvent[];
}

export function groupEventsByMonthYear(events: IEvent[]): MonthGroup[] {
    const grouped: Record<string, MonthGroup> = {};

    events.forEach((event: IEvent) => {
        const date = new Date(event.startDate);
        const monthYear = date.toLocaleString('en-US', {
            month: 'short',
            year: 'numeric'
        });

        if (!grouped[monthYear]) {
            grouped[monthYear] = {
                date: monthYear,
                title: `Events in ${monthYear}`,
                events: []
            };
        }
        grouped[monthYear].events.push({
            title: event.title,
            imageUrl: event.image,
            description: event.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
            date: event.startDate,
            time: event.startTime,
            location: event.address,
            slugname: event.slugname,
            startDate: event.startDate,
            hostDetails: event.hostDetails,
            address: event.address,
            host: event.hostDetails.length > 0 ? event.hostDetails[0].full_name : 'No host specified',
            attendeeDetails: event.attendeeDetails,
            totalAttendees: event.totalAttendees
        });
    });

    const result = Object.values(grouped).sort((a, b) => {
        return new Date(b.events[0].date).getTime() - new Date(a.events[0].date).getTime();
    });

    return result;
}