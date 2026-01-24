import { gql, useQuery, useMutation } from "@apollo/client";

import {
  IEventListResponse,
  IEventCreatePayload,
  IEventCreateResponse,
  IEventInput,
  ICommunityEventListResponse,
  IEventsByCurrentUserResponse,
} from "@/types/Events";

// Existing queries
export const GET_EVENTS_QUERY = gql`
  query ListEvents($listEventsInput: ListEventsInput!) {
    listEvents(listEventsInput: $listEventsInput) {
      total
      totalPage
      data {
        _id
        title
        slugname
        image
        is_active
        category
        startDate
        endDate
        startTime
        timezone
        endTime
        format
        type_actifity
        address
        location_map
        startTime
        createdAt
        updatedAt
        content
        hostDetails {
          _id
          username
          picture
          full_name
        }
        community {
          name
        }
      }
      page
      limit
    }
  }
`;

export const GET_COMMUNITY_EVENTS_QUERY = gql`
  query ListEventsByCommunitySlug(
    $communitySlug: String!
    $listEventsInput: ListEventsInput!
  ) {
    listEventsByCommunitySlug(
      communitySlug: $communitySlug
      listEventsInput: $listEventsInput
    ) {
      total
      totalPage
      page
      limit
      data {
        _id
        title
        slugname
        image
        is_active
        category
        startDate
        endDate
        startTime
        timezone
        endTime
        format
        type_actifity
        address
        location_map
        content
        hostDetails {
          _id
          username
          picture
          full_name
        }
        community {
          name
          _id
        }
        totalAttendees
        attendeeDetails {
          _id
          username
          picture
          full_name
        }
      }
    }
  }
`;

export const GET_EVENT_DETAIL = gql`
  query GetEventBySlug($slugname: String!) {
    getEventByslug(getEventBySlugInput: { slugname: $slugname }) {
      _id
      title
      slugname
      image
      category
      startDate
      endDate
      is_active
      startTime
      timezone
      endTime
      type_actifity
      format
      address
      location_map
      content
      capacity
      isFree
      bank_account
      account_number
      account_name
      ticket_price
      collaboratingCommunityDetails {
        _id
        name
        logo
        url
        countMembers
      }
      hostDetails {
        _id
        username
        picture
        full_name
      }

      community {
        _id
        name
        logo
        categories {
          _id
          name
        }
        admins {
          _id
          username
          picture
          full_name
        }
        countMembers
        about
        telegram
        instagram
        linkedin
        website
        whatsapp
        url
      }

      collaboratingCommunityDetails {
        _id
        name
        logo
        url
        countMembers
      }

      totalAttendees
      attendeeDetails {
        _id
        username
        picture
        full_name
      }
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      _id
    }
  }
`;

// Query hooks
export const useGetEventsQuery = (
  page: number,
  limit: number,
  order: string = "DESC",
  timeStatus?: "upcoming" | "past"
) => {
  const { data, loading, error, refetch } = useQuery<IEventListResponse>(
    GET_EVENTS_QUERY,
    {
      variables: {
        listEventsInput: {
          page,
          limit,
          order: {
            orderBy: "CREATED_AT",
            sortBy: order,
          },
          filter: timeStatus ? { timeStatus } : undefined,
        },
      },
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    data: data?.listEvents,
    loading,
    error,
    refetch,
  };
};

export const useGetCommunityEventsQuery = (
  communitySlug: string,
  page: number,
  limit: number,
  order: string = "DESC",
  filter?: { format?: string; title?: string; timeStatus?: "upcoming" | "past" }
) => {
  const { data, loading, error, refetch } =
    useQuery<ICommunityEventListResponse>(GET_COMMUNITY_EVENTS_QUERY, {
      variables: {
        communitySlug,
        listEventsInput: {
          page,
          limit,
          order: {
            orderBy: "CREATED_AT",
            sortBy: order,
          },
          filter: filter
            ? {
                format: filter.format,
                title: filter.title,
                timeStatus: filter.timeStatus,
              }
            : undefined,
        },
      },
      skip: !communitySlug,
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    });

  return {
    data: data?.listEventsByCommunitySlug,
    loading,
    error,
    refetch,
  };
};

export const useGetEventDetail = (slugname: string) => {
  const { data, loading, error, refetch } = useQuery(GET_EVENT_DETAIL, {
    variables: { slugname },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });

  return {
    event: data?.getEventByslug,
    loading,
    error,
    refetch,
  };
};

// Mutation hooks
export const useAddEvent = () => {
  const [mutate, { loading, error, data }] = useMutation<
    IEventCreateResponse,
    IEventCreatePayload
  >(CREATE_EVENT_MUTATION);

  const addEvent = async (input: IEventInput) => {
    try {
      const result = await mutate({
        variables: {
          createEventInput: input,
        },
      });
      return result.data?.createEvent;
    } catch (err) {
      console.error("Error creating event:", err);
      throw err;
    }
  };

  return {
    addEvent,
    createdEvent: data?.createEvent,
    loading,
    error,
  };
};

export const GET_LATEST_HOMEPAGE_EVENT = gql`
  query GetLatestHomepageEvent {
    getLatestHomepageEvent {
      _id
      title
      image
      startDate
      endDate
      slugname
      community {
        _id
        name
        logo
      }
      totalAttendees
    }
  }
`;

export const useGetLatestHomepageEvent = () => {
  const { data, loading, error, refetch } = useQuery(
    GET_LATEST_HOMEPAGE_EVENT,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    event: data?.getLatestHomepageEvent,
    loading,
    error,
    refetch,
  };
};

const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($updateEventInput: UpdateEventInput!) {
    updateEvent(updateEventInput: $updateEventInput) {
      _id
    }
  }
`;

export const useUpdateEvent = () => {
  const [mutate, { loading, error, data }] = useMutation<
    { updateEvent: IEventInput },
    { updateEventInput: IEventInput }
  >(UPDATE_EVENT_MUTATION);

  const updateEvent = async (input: IEventInput) => {
    try {
      const result = await mutate({
        variables: {
          updateEventInput: input,
        },
      });
      return result.data?.updateEvent;
    } catch (err) {
      console.error("Error updating event:", err);
      throw err;
    }
  };

  return {
    updateEvent,
    updatedEvent: data?.updateEvent,
    loading,
    error,
  };
};

const INVITE_COMMUNITY_TO_COLLABORATE = gql`
  mutation InviteCommunityToCollaborate(
    $eventId: String!
    $communityId: String!
  ) {
    inviteCommunityToCollaborate(eventId: $eventId, communityId: $communityId)
  }
`;

const ACCEPT_COLLABORATION = gql`
  mutation AcceptCollaboration($eventId: String!, $communityId: String!) {
    acceptCollaboration(eventId: $eventId, communityId: $communityId) {
      message
      event {
        _id
        collaboratingCommunityDetails {
          _id
          name
          logo
          admins {
            _id
            username
            picture
            full_name
          }
          countMembers
        }
      }
    }
  }
`;

export const useInviteCommunityToCollaborate = () => {
  const [mutate, { loading, error, data }] = useMutation(
    INVITE_COMMUNITY_TO_COLLABORATE
  );

  const inviteCommunity = async (eventId: string, communityId: string) => {
    try {
      const result = await mutate({
        variables: { eventId, communityId },
      });
      return result.data?.inviteCommunityToCollaborate;
    } catch (err) {
      console.error("Error inviting community to collaborate:", err);
      throw err;
    }
  };

  return {
    inviteCommunity,
    loading,
    error,
    success: data?.inviteCommunityToCollaborate,
  };
};

export const useAcceptCollaboration = () => {
  const [mutate, { loading, error, data }] = useMutation(ACCEPT_COLLABORATION, {
    errorPolicy: "all",
  });

  const acceptCollaboration = async (eventId: string, communityId: string) => {
    const result = await mutate({
      variables: { eventId, communityId },
    });

    if (result.errors?.length) {
      throw new Error(result.errors[0].message);
    }

    const response = result.data?.acceptCollaboration;

    if (response?.message) {
      return {
        message: response.message,
        alreadyAccepted: true,
      };
    }

    return {
      event: response?.event,
      alreadyAccepted: false,
    };
  };

  return {
    acceptCollaboration,
    loading,
    error,
    data: data?.acceptCollaboration,
  };
};

export const GET_EVENTS_BY_CURRENT_USER_QUERY = gql`
  query ListEventsByCurrentUser($listEventsInput: ListEventsInput!) {
    listEventsByCurrentUser(listEventsInput: $listEventsInput) {
      total
      totalPage
      page
      limit
      data {
        _id
        slugname
        title
        content
        image
        category
        startDate
        endDate
        startTime
        endTime
        timezone
        format
        address
        location_map
        capacity
        is_active
        isFree
        ticket_price
        totalAttendees
        hostDetails {
          _id
          username
          picture
          full_name
        }
        community {
          _id
          name
          url
          logo
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const useGetEventsByCurrentUser = (
  page: number,
  limit: number,
  order: string = "DESC",
  filter?: { format?: string; title?: string; timeStatus?: "upcoming" | "past" }
) => {
  const { data, loading, error, refetch } =
    useQuery<IEventsByCurrentUserResponse>(GET_EVENTS_BY_CURRENT_USER_QUERY, {
      variables: {
        listEventsInput: {
          page,
          limit,
          order: {
            orderBy: "CREATED_AT",
            sortBy: order,
          },
          filter: filter
            ? {
                format: filter.format,
                title: filter.title,
                timeStatus: filter.timeStatus,
              }
            : undefined,
        },
      },
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    });

  return {
    data: data?.listEventsByCurrentUser,
    loading,
    error,
    refetch,
  };
};
