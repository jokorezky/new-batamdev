import { gql, useQuery } from "@apollo/client";
import { INewsListResponse, INewsListPayload } from "@/types/news"
const GET_NEWS_BY_USER_SLUG = gql`
  query GetAllNewsByUserSlug(
    $userslug: String!
    $listNewsInput: ListNewsInput!
  ) {
    getAllNewsByUserSlug(userslug: $userslug, listNewsInput: $listNewsInput) {
      data {
        _id
        title
        content
        createdAt
        tags {
          value
          label
        }
        category
        thumbnail_url
        url
      }
      total
      totalPage
    }
  }
`;

export const useGetNewsByUserSlug = (
  userslug: string,
  page: number = 1,
  limit: number = 10
) => {

  const { data, loading, refetch } = useQuery<
    INewsListResponse,
    INewsListPayload
  >(GET_NEWS_BY_USER_SLUG, {
    variables: { userslug, listNewsInput: { page, limit } },
    skip: !userslug,
  });


  return {
    news: data?.getAllNewsByUserSlug?.data || [],
    total: data?.getAllNewsByUserSlug?.total || 0,
    totalPage: data?.getAllNewsByUserSlug?.totalPage || 0,
    loading,
    refetch,
  };
};

const GET_NEWS_QUERY = gql`
  query GetNews(
    $page: Int!
    $limit: Int!
    $search: SearchNewsInput
    $filter: FilterNewsInput
    $category: String
    $isHeadline: Boolean
    $isSorotan: Boolean
    $isGetTrending: Boolean
  ) {
    findAll(
      listNewsInput: {
        page: $page
        limit: $limit
        search: $search
        filter: $filter
        category: $category
        isHeadline: $isHeadline
        isSorotan: $isSorotan
        isGetTrending: $isGetTrending
      }
    ) {
      data {
        _id
        title
        content
        thumbnail_url
        titleThumbnail
        category
        tags {
          value
          label
        }
        user {
          full_name
        }
        url
        createdAt
        accessCount
        audio_url
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

interface News {
  _id: string;
  title: string;
  userId: string;
  content: string;
  thumbnail_url: string;
  titleThumbnail: string;
  category: string;
  showFor: string;
  tags: string[];
  createBy: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  user: UserPublic | null;
}

interface ListNewsResponse {
  data: News[];
  total: number;
  totalPage: number;
}

export const useNewsQuery = (
  page: number,
  limit: number,
  options?: {
    search?: {
      keyword?: string;
    };
    isHeadline?: boolean;
    isGetTrending?: boolean;
    category?: string;
  }
) => {
  const { data, loading, error } = useQuery<{
    findAll: ListNewsResponse;
  }>(GET_NEWS_QUERY, {
    variables: {
      page,
      limit,
      search: options?.search,
      isHeadline: options?.isHeadline,
      isGetTrending: options?.isGetTrending,
      category: options?.category,
    },
  });
  return {
    news: data?.findAll?.data || [],
    total: data?.findAll?.total || 0,
    totalPage: data?.findAll?.totalPage || 0,
    loading,
    error,
  };
};

const GET_NEWS_BY_SLUG_QUERY = gql`
  query GetNewsBySlug($slug: String!) {
    getNewsBySlug(slug: $slug) {
      title
      userId {
        full_name
      }
      content
      thumbnail_url
      titleThumbnail
      category
      showFor
      tags {
        label
      }
      createdAt
    }
  }
`;

export const useNewsBySlugQuery = (slug: string) => {
  const { data, loading, error, refetch } = useQuery(GET_NEWS_BY_SLUG_QUERY, {
    variables: { slug },
  });

  return {
    news: data?.getNewsBySlug || null,
    loading,
    error,
    refetch,
  };
};
