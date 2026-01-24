import { gql, useQuery, useMutation } from "@apollo/client";
import { CreateAttendInput } from "@/types/Attend";
export const HAS_ATTENDED_QUERY = gql`
  query HasAttended($eventId: String!) {
    hasAttended(eventId: $eventId)
  }
`;

export const useHasAttended = (eventId: string) => {
  const { data, loading, error, refetch } = useQuery<{
    hasAttended: boolean;
  }>(HAS_ATTENDED_QUERY, {
    variables: { eventId },
    fetchPolicy: "cache-and-network",
  });

  return {
    hasAttended: data?.hasAttended || false,
    loading,
    error,
    refetch,
  };
};

export const ATTEND_EVENT_MUTATION = gql`
  mutation AttendEvent($input: CreateAttendInput!) {
    attendEvent(input: $input)
  }
`;

export const useEventAttendance = () => {
  const [
    attendEventMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ATTEND_EVENT_MUTATION);

  const attendEvent = async (input: CreateAttendInput) => {
    try {
      const result = await attendEventMutation({
        variables: { input },
      });
      return result.data?.attendEvent;
    } catch (error) {
      console.error("Attendance error:", error);
      throw error;
    }
  };

  return {
    attendEvent,
    loading: mutationLoading,
    error: mutationError,
  };
};

export const GET_MY_ATTENDED_EVENTS_QUERY = gql`
  query GetMyAttendedEvents($input: ListAttendsInput!) {
    getMyAttendedEventsWithFilters(input: $input) {
      total
      totalPage
      page
      limit
      data {
        _id
        qrCode
        attendedAt
        createdAt
        event {
          _id
          title
          description
          slugname
          startDate
          endDate
          address
          format
          cover
          image
          community {
            _id
            name
            url
            logo
          }
        }
        attendedAt
        createdAt
      }
    }
  }
`;

export const useGetMyAttendedEvents = (page: number, limit: number) => {
  const { data, loading, error, refetch } = useQuery(
    GET_MY_ATTENDED_EVENTS_QUERY,
    {
      variables: {
        input: {
          page,
          limit,
        },
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    data: data?.getMyAttendedEventsWithFilters,
    loading,
    error,
    refetch,
  };
};

export const GET_EVENT_ATTENDEES_QUERY = gql`
  query GetEventAttendees($eventId: String!, $page: Float!, $limit: Float!) {
    getEventAttendees(eventId: $eventId, page: $page, limit: $limit) {
      total
      totalPage
      page
      limit
      data {
        _id
        attendedAt
        createdAt
        fullName
        user {
          _id
          full_name
          email
          username
          picture
          phone_number
          profession
          institution
        }
      }
    }
  }
`;

interface User {
  _id: string;
  full_name: string;
  email: string;
  username: string;
  picture?: string;
  phone_number?: string;
  profession?: string;
  institution?: string;
}

export interface Attendee {
  _id: string;
  attendedAt?: string;
  createdAt: string;
  fullName: string;
  user: User;
}

export interface EventAttendeesResponse {
  getEventAttendees: {
    total: number;
    totalPage: number;
    page: number;
    limit: number;
    data: Attendee[];
  };
}

interface UseEventAttendeesProps {
  eventId: string;
  page: number;
  limit: number;
}

export const useEventAttendees = ({
  eventId,
  page,
  limit,
}: UseEventAttendeesProps) => {
  const { data, loading, error, refetch } = useQuery<EventAttendeesResponse>(
    GET_EVENT_ATTENDEES_QUERY,
    {
      variables: {
        eventId,
        page,
        limit,
      },
      fetchPolicy: "cache-and-network",
      skip: !eventId, // Skip query jika eventId belum tersedia
    }
  );

  return {
    attendees: data?.getEventAttendees.data || [],
    pagination: {
      total: data?.getEventAttendees.total || 0,
      totalPage: data?.getEventAttendees.totalPage || 0,
      page: data?.getEventAttendees.page || page,
      limit: data?.getEventAttendees.limit || limit,
    },
    loading,
    error,
    refetch,
  };
};
