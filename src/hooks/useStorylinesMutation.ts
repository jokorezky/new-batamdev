import { gql, useQuery } from "@apollo/client";

const GET_STORYLINE_QUERY = gql`
  query FindAllStoryLines($page: Int!, $limit: Int!) {
    storyLines(listStoryLineInput: { page: $page, limit: $limit }) {
      data {
        _id
        title
        description
        thumbnail_url
        createdAt
        category
        url
        newsItems {
          title
        }
      }
      page
      total
    }
  }
`;

interface NewsItemsType {
  title: string;
  content: string;
  category: string;
  url: string;
  thumbnail_url?: string;
  titleThumbnail?: string;
  createdAt: string;
}
interface UserPublic {
  full_name: string;
  picture: string | null;
  job_title: string;
}

interface Storyline {
  _id: string;
  title: string;
  userId: string;
  description: string;
  thumbnail_url: string;
  createBy: string;
  createdAt: string;
  category: string;
  updatedAt: string;
  url: string;
  user: UserPublic | null;
  newsItems: NewsItemsType[];
}

interface ListStorylinesResponse {
  data: Storyline[];
  total: number;
  totalPage: number;
}

export const useStorylinesQuery = (
  page: number,
  limit: number,
  options?: {
    search?: {
      keyword?: string;
    };
  }
) => {
  const { data, loading, error } = useQuery<{
    storyLines: ListStorylinesResponse;
  }>(GET_STORYLINE_QUERY, {
    variables: {
      page,
      limit,
      search: options?.search,
    },
  });

  return {
    storyline: data?.storyLines?.data || [],
    total: data?.storyLines?.total || 0,
    totalPage: data?.storyLines?.totalPage || 0,
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
