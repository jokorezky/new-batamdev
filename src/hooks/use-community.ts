import { gql, useQuery, useMutation } from "@apollo/client";
import {
  AdminCommunityOption,
  CommunityMembersSummaryResponse,
  UpdateCommunityResponse,
  UpdateCommunityVariables,
  SearchCommunitiesResponse,
  SearchCommunitiesVariables,
} from "@/types/Community";

export const GET_MY_ADMIN_COMMUNITIES_QUERY = gql`
  query GetMyAdminCommunities {
    getMyAdminCommunities {
      communities {
        value
        label
      }
    }
  }
`;

export const useAdminCommunities = () => {
  const { data, loading, error, refetch } = useQuery<{
    getMyAdminCommunities: {
      communities: AdminCommunityOption[];
    };
  }>(GET_MY_ADMIN_COMMUNITIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return {
    communities: data?.getMyAdminCommunities?.communities || [],
    loading,
    error,
    refetch,
  };
};

interface CreateCommunityInput {
  name: string;
  cover: string;
  logo: string;
  about: string;
  categoryId?: string;
  url?: string;
}

interface CreateCommunityResponse {
  createCommunity: CreateCommunityInput;
}

interface CreateCommunityPayload {
  input: CreateCommunityInput;
}

const CREATE_COMMUNITY_MUTATION = gql`
  mutation CreateCommunity($input: CreateCommunityInput!) {
    createCommunity(input: $input) {
      _id
      url
    }
  }
`;

export const useCreateCommunity = () => {
  const [mutate, { loading, error, data }] = useMutation<
    CreateCommunityResponse,
    CreateCommunityPayload
  >(CREATE_COMMUNITY_MUTATION);

  const createCommunity = async (input: CreateCommunityInput) => {
    try {
      const result = await mutate({
        variables: {
          input,
        },
      });
      return result.data?.createCommunity;
    } catch (err) {
      console.error("Error creating community:", err);
      throw err;
    }
  };

  return {
    createCommunity,
    createdCommunity: data?.createCommunity,
    loading,
    error,
  };
};

export const GET_COMMUNITY_BY_URL_QUERY = gql`
  query GetCommunityByUrl($url: String!) {
    getCommunityByUrl(url: $url) {
      _id
      name
      url
      cover
      logo
      about
      telegram
      instagram
      linkedin
      website
      whatsapp
      city
      province
      is_active
      categories {
        name
        _id
      }
      admins {
        _id
      }
    }
  }
`;

export const GET_COMMUNITY_MEMBERS_SUMMARY_QUERY = gql`
  query GetCommunityMembersSummary($communityId: String!) {
    getCommunityMembersSummary(communityId: $communityId) {
      totalMembers
      sampleMembers {
        _id
        username
        full_name
        picture
        bio
        job_title
      }
    }
  }
`;

export const useCommunityMembersSummary = (communityId: string) => {
  const { data, loading, error, refetch } =
    useQuery<CommunityMembersSummaryResponse>(
      GET_COMMUNITY_MEMBERS_SUMMARY_QUERY,
      {
        variables: { communityId },
        fetchPolicy: "cache-and-network",
        skip: !communityId,
      }
    );

  return {
    totalMembers: data?.getCommunityMembersSummary?.totalMembers || "0",
    sampleMembers: data?.getCommunityMembersSummary?.sampleMembers || [],
    loading,
    error,
    refetch,
  };
};

export const GET_COMMUNITY_MEMBERS_QUERY = gql`
  query GetCommunityMembers(
    $communityId: String!
    $page: Float
    $limit: Float
  ) {
    getCommunityMembers(communityId: $communityId, page: $page, limit: $limit) {
      total
      totalPage
      page
      limit
      hasNextPage
      data {
        _id
        username
        full_name
        picture
      }
    }
  }
`;

export const useCommunityMembers = (
  communityId: string,
  page = 1,
  limit = 10
) => {
  const { data, loading, error, refetch } = useQuery(
    GET_COMMUNITY_MEMBERS_QUERY,
    {
      variables: { communityId, page, limit },
      skip: !communityId,
    }
  );

  return {
    members: data?.getCommunityMembers?.data || [],
    pagination: data?.getCommunityMembers || {},
    loading,
    error,
    refetch,
  };
};

export const UPDATE_COMMUNITY_MUTATION = gql`
  mutation UpdateCommunity($id: String!, $input: UpdateCommunityInput!) {
    updateCommunity(id: $id, input: $input) {
      _id
    }
  }
`;

export const useUpdateCommunity = () => {
  const [mutate, { loading, error, data }] = useMutation<
    UpdateCommunityResponse,
    UpdateCommunityVariables
  >(UPDATE_COMMUNITY_MUTATION);

  const updateCommunity = async (
    id: string,
    input: UpdateCommunityVariables["input"]
  ) => {
    try {
      const result = await mutate({
        variables: {
          id,
          input,
        },
      });
      return result.data?.updateCommunity;
    } catch (err) {
      console.error("Error updating community:", err);
      throw err;
    }
  };

  return {
    updateCommunity,
    updatedCommunity: data?.updateCommunity,
    loading,
    error,
  };
};

export const IS_COMMUNITY_MEMBER_QUERY = gql`
  query IsCommunityMember($communityUrl: String!) {
    isCommunityMember(communityUrl: $communityUrl)
  }
`;

export const useIsCommunityMember = (communityUrl: string) => {
  const { data, loading, error, refetch } = useQuery<{
    isCommunityMember: boolean;
  }>(IS_COMMUNITY_MEMBER_QUERY, {
    variables: { communityUrl },
    skip: !communityUrl,
    fetchPolicy: "cache-and-network",
  });

  return {
    isMember: data?.isCommunityMember ?? false,
    loading,
    error,
    refetch,
  };
};

const ADD_MEMBER_TO_COMMUNITY = gql`
  mutation AddMemberToCommunity($communityId: String!) {
    addMemberToCommunity(communityId: $communityId) {
      communityId
      role
    }
  }
`;

export function useAddMemberToCommunity() {
  const [addMember, { loading, error, data }] = useMutation(
    ADD_MEMBER_TO_COMMUNITY
  );

  return {
    addMember,
    loading,
    error,
    data,
  };
}

export const GET_TOP_COMMUNITY_BUILDERS_QUERY = gql`
  query GetTopCommunityBuilders {
    getTopCommunityBuilders {
      communityId
      communityName
      communityUrl
      communityLogo
      founderId
      founderName
      founderUsername
      founderPicture
      totalEvents
      totalMembers
    }
  }
`;

interface TopCommunityBuilder {
  communityId: string;
  communityName: string;
  communityUrl: string;
  communityLogo: string;
  founderId: string;
  founderName: string;
  founderUsername: string;
  founderPicture: string;
  totalEvents: number;
  totalMembers: number;
}

interface TopCommunityBuildersResponse {
  getTopCommunityBuilders: TopCommunityBuilder[];
}

export const useTopCommunityBuilders = () => {
  const { data, loading, error, refetch } =
    useQuery<TopCommunityBuildersResponse>(GET_TOP_COMMUNITY_BUILDERS_QUERY, {
      fetchPolicy: "cache-and-network",
    });

  return {
    topBuilders: data?.getTopCommunityBuilders || [],
    loading,
    error,
    refetch,
  };
};

export const SEARCH_COMMUNITIES_QUERY = gql`
  query SearchCommunities($input: SearchCommunitiesInput!) {
    searchCommunities(input: $input) {
      communities {
        _id
        name
        city
      }
      count
    }
  }
`;

export const useSearchCommunities = (
  input: SearchCommunitiesVariables["input"]
) => {
  const { data, loading, error, refetch } = useQuery<
    SearchCommunitiesResponse,
    SearchCommunitiesVariables
  >(SEARCH_COMMUNITIES_QUERY, {
    variables: { input },
    skip: !input?.keyword,
    fetchPolicy: "cache-and-network",
  });

  return {
    communities: data?.searchCommunities?.communities || [],
    total: data?.searchCommunities?.count || 0,
    loading,
    error,
    refetch,
  };
};
