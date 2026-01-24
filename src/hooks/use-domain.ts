import { gql, useMutation, useQuery } from "@apollo/client";
import { Community } from "@/types/Community";

const REGISTER_COMMUNITY_DOMAIN = gql`
  mutation RegisterCommunityDomain($communityId: String!, $domain: String!) {
    registerCommunityDomain(communityId: $communityId, domain: $domain) {
      _id
      domain
      isDomainVerified
      domainVerificationCode
      domainVerifiedAt
    }
  }
`;

const UPDATE_COMMUNITY_DOMAIN = gql`
  mutation UpdateCommunityDomain($communityId: String!, $domain: String!) {
    updateCommunityDomain(communityId: $communityId, domain: $domain) {
      _id
      domain
      isDomainVerified
      domainVerificationCode
      domainVerifiedAt
    }
  }
`;

const VERIFY_COMMUNITY_DOMAIN = gql`
  mutation VerifyCommunityDomain(
    $communityId: String!
    $verificationCode: String!
  ) {
    verifyCommunityDomain(
      communityId: $communityId
      verificationCode: $verificationCode
    ) {
      _id
      domain
      isDomainVerified
      domainVerifiedAt
    }
  }
`;

export const useRegisterCommunityDomain = () => {
  const [mutate, { loading, error, data }] = useMutation<{
    registerCommunityDomain: Community;
  }>(REGISTER_COMMUNITY_DOMAIN);

  const registerDomain = async (communityId: string, domain: string) => {
    try {
      const result = await mutate({
        variables: {
          communityId,
          domain,
        },
      });
      return result.data?.registerCommunityDomain;
    } catch (err) {
      console.error("Error registering domain:", err);
      throw err;
    }
  };

  return {
    registerDomain,
    registeredCommunity: data?.registerCommunityDomain,
    loading,
    error,
  };
};

export const useUpdateCommunityDomain = () => {
  const [mutate, { loading, error, data }] = useMutation<{
    updateCommunityDomain: Community;
  }>(UPDATE_COMMUNITY_DOMAIN);

  const updateDomain = async (communityId: string, domain: string) => {
    try {
      const result = await mutate({
        variables: {
          communityId,
          domain,
        },
      });
      return result.data?.updateCommunityDomain;
    } catch (err) {
      console.error("Error updating domain:", err);
      throw err;
    }
  };

  return {
    updateDomain,
    updatedCommunity: data?.updateCommunityDomain,
    loading,
    error,
  };
};

export const useVerifyCommunityDomain = () => {
  const [mutate, { loading, error, data }] = useMutation<{
    verifyCommunityDomain: Community;
  }>(VERIFY_COMMUNITY_DOMAIN);

  const verifyDomain = async (
    communityId: string,
    verificationCode: string
  ) => {
    try {
      const result = await mutate({
        variables: {
          communityId,
          verificationCode,
        },
      });
      return result.data?.verifyCommunityDomain;
    } catch (err) {
      console.error("Error verifying domain:", err);
      throw err;
    }
  };

  return {
    verifyDomain,
    verifiedCommunity: data?.verifyCommunityDomain,
    loading,
    error,
  };
};

const GET_BATCH_DOMAIN_VERIFICATION_STATUS = gql`
  query GetBatchDomainVerificationStatus($communityIds: [String!]!) {
    batchDomainVerificationStatus: getBatchDomainVerificationStatus(
      communityIds: $communityIds
    ) {
      communityId
      isVerified
      domain
      verifiedAt
    }
  }
`;

export const useBatchDomainVerificationStatus = (communityIds: string[]) => {
  const { data, loading, error, refetch } = useQuery<{
    batchDomainVerificationStatus: Array<{
      communityId: string;
      isVerified: boolean;
      domain?: string;
      verifiedAt?: Date;
    }>;
  }>(GET_BATCH_DOMAIN_VERIFICATION_STATUS, {
    variables: { communityIds },
    skip: communityIds.length === 0,
  });

  return {
    statuses: data?.batchDomainVerificationStatus || [],
    loading,
    error,
    refetch,
  };
};
