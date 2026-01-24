export interface AdminCommunityOption {
  value: string;
  label: string;
}

export interface AdminCommunitiesResponse {
  communities: AdminCommunityOption[];
}

interface Admins {
  _id: string;
}

export interface CommunityResponse {
  _id: string;
  name: string;
  url: string;
  cover: string;
  logo: string;
  about: string;
  instagram: string;
  linkedin: string;
  telegram: string;
  website: string;
  city: string;
  province: string;
  category: {
    _id: string;
    name: string;
  };
  admins: Admins[];
}

export interface CommunityMembersSummaryResponse {
  getCommunityMembersSummary: {
    totalMembers: string;
    sampleMembers: Array<{
      _id: string;
      username: string;
      full_name: string;
      picture: string;
      bio?: string;
      job_title?: string;
    }>;
  };
}

export interface CommunityMembersSummary {
  totalMembers: string;
  sampleMembers: Array<{
    _id: string;
    username: string;
    full_name: string;
    picture: string;
    bio?: string;
    job_title?: string;
  }>;
}

export interface CommunityMember {
  _id: string;
  username: string;
  full_name: string;
  picture: string;
  bio?: string;
  job_title?: string;
  city?: string;
  joinedAt?: string;
}

export interface PaginatedMembersResponse {
  getCommunityMembers: {
    total: number;
    totalPage: number;
    page: number;
    limit: number;
    data: CommunityMember[];
  };
}

export interface ListMembersInput {
  communityId: string;
  page?: number;
  limit?: number;
}

export interface UpdateCommunityResponse {
  updateCommunity: {
    _id: string;
    name: string;
    url: string;
    about: string;
    instagram: string;
    linkedin: string;
    telegram: string;
    website: string;
    city: string;
    province: string;
    categories: {
      _id: string;
      name: string;
    }[];
  };
}

export interface UpdateCommunityVariables {
  id: string;
  input: {
    cover?: string;
    logo?: string;
    name?: string;
    about?: string;
    instagram?: string;
    linkedin?: string;
    telegram?: string;
    website?: string;
    city?: string;
    province?: string;
    categories?: string[];
  };
}

export type Community = {
  _id: string;
  name: string;
  domain: string;
  isDomainVerified: boolean;
  domainVerificationCode: string | null;
  domainVerifiedAt: Date | null;
};

export interface SearchCommunitiesResponse {
  searchCommunities: {
    communities: Community[];
    count: number;
  };
}

export interface SearchCommunitiesVariables {
  input: {
    keyword: string;
    limit?: number;
    skip?: number;
  };
}
