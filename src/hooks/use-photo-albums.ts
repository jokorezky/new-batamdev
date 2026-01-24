import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const GET_COMMUNITY_ALBUMS = gql`
  query GetPhotoAlbumsByCommunity($communityId: String!) {
    getPhotoAlbumsByCommunity(communityId: $communityId) {
      _id
      title
      photos
      createdAt
      updatedAt
      community {
        _id
        name
      }
      event {
        _id
        title
        slugname
      }
    }
  }
`;

const GET_EVENT_ALBUMS = gql`
  query GetPhotoAlbumsByEvent($eventSlug: String!) {
    getPhotoAlbumsByEvent(eventSlug: $eventSlug) {
      _id
      title
      photos
      createdAt
      updatedAt

      community {
        _id
        name
      }
      event {
        _id
        title
      }
    }
  }
`;

export const useCommunityAlbums = (communityId?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMUNITY_ALBUMS, {
    variables: {
      communityId,
    },
    skip: !communityId,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  return {
    albums: data?.getPhotoAlbumsByCommunity || [],
    loading,
    error,
    refetch,
  };
};

export const useEventAlbums = (eventSlug?: string) => {
  const { data, loading, error, refetch } = useQuery(GET_EVENT_ALBUMS, {
    variables: {
      eventSlug,
    },
    skip: !eventSlug,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  return {
    albums: data?.getPhotoAlbumsByEvent || [],
    loading,
    error,
    refetch,
  };
};
