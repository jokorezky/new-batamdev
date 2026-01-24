import { gql, useQuery } from "@apollo/client";

const GET_PODCAST_QUERY = gql`
  query GetPodcast($page: Int!, $limit: Int!) {
    podcast(listPodcastInput: { page: $page, limit: $limit }) {
      data {
        _id
        title
        content
        thumbnail_url
        createdAt
        embedId
        url
      }
      total
      totalPage
    }
  }
`;

interface UserPublic {
  full_name: string;
  picture: string | null;
  job_title: string;
}

interface Podcast {
  _id: string;
  title: string;
  userId: string;
  content: string;
  thumbnail_url: string;
  createBy: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  user: UserPublic | null;
}

interface ListPodcastResponse {
  data: Podcast[];
  total: number;
  totalPage: number;
}

export const usePodcastQuery = (
  page: number,
  limit: number,
  options?: {
    search?: {
      keyword?: string;
    };
  }
) => {
  const { data, loading, error } = useQuery<{
    podcast: ListPodcastResponse;
  }>(GET_PODCAST_QUERY, {
    variables: {
      page,
      limit,
      search: options?.search,
    },
  });

  const processedPodcast = data?.podcast?.data || [];

  return {
    podcast: processedPodcast,
    total: data?.podcast?.total || 0,
    totalPage: data?.podcast?.totalPage || 0,
    loading,
    error,
  };
};

const GET_PODCAST_BY_SLUG_QUERY = gql`
  query GetPodcastBySlug($slug: String!) {
    getPodcastBySlug(slug: $slug) {
      title
      content
      thumbnail_url
      createdAt
      embedId
    }
  }
`;

export const usePodcastBySlugQuery = (slug: string) => {
  const { data, loading, error } = useQuery(GET_PODCAST_BY_SLUG_QUERY, {
    variables: { slug },
  });

  return {
    podcast: data?.getPodcastBySlug || null,
    loading,
    error,
  };
};
