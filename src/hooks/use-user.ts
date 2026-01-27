import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { User, IUserListResponse } from "@/types/User";

export const GET_USER_BY_SLUG_QUERY = gql`
  query GetUserBySlug($getUserBySlugInput: GetUserBySlugInput!) {
    getUserByslug(getUserBySlugInput: $getUserBySlugInput) {
      _id
      full_name
      username
      email
      picture
      bio
      jobType
      job_title
      city
      province
      linkedin
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      users {
        _id
        full_name
        email
        username
        picture
      }
      count
    }
  }
`;

export const useUserBySlugQuery = (username: string) => {
  const { data, loading, error, refetch } = useQuery<{
    getUserByslug: User;
  }>(GET_USER_BY_SLUG_QUERY, {
    variables: {
      getUserBySlugInput: { username },
    },
  });

  return {
    user: data?.getUserByslug || null,
    loading,
    error,
    refetch,
  };
};

export const useSearchUsers = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  const { data, loading, error, refetch } = useQuery<{
    searchUsers: { users: User[]; count: number };
  }>(SEARCH_USERS_QUERY, {
    variables: { keyword: trimmedKeyword },
    skip: !trimmedKeyword,
  });

  return {
    users: data?.searchUsers.users || [],
    count: data?.searchUsers.count || 0,
    loading: trimmedKeyword ? loading : false,
    error: trimmedKeyword ? error : null,
    refetch: (newKeyword: string) => {
      const kw = newKeyword.trim();
      return kw ? refetch({ keyword: kw }) : Promise.resolve({});
    },
  };
};

const GET_USERS = gql`
  query listUsers($listUsersInput: ListUsersInput!) {
    listUsers(listUsersInput: $listUsersInput) {
      page
      limit
      total
      totalPage
      data {
        _id
        full_name
        email
        username
        picture
        createdAt
        job_title
        is_active
        province
        city
        bio
        is_coreteam
      }
    }
  }
`;

export const useListUsers = (
  page: number,
  limit: number,
  search: string,
  order?: "ASC" | "DESC",
  isCoreTeam?: boolean
) => {
  const trimmedSearch = search.trim();

  const { data, loading, error, refetch } = useQuery<IUserListResponse>(GET_USERS, {
    variables: {
      listUsersInput: {
        page,
        limit,
        search: {
          keyword: trimmedSearch,
        },
        order: {
          orderBy: "CREATED_AT",
          sortBy: order || "DESC",
        },
        isCoreTeam,
      },
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    skip: trimmedSearch === "" && limit === 0,
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
};