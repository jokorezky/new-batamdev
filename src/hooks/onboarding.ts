import { gql, useMutation, useQuery } from "@apollo/client";
import {
  CreateOnboardingInput,
  UpdateOnboardingInput,
  OnboardingStatusResponse,
} from "@/types/Onboarding";

const CREATE_ONBOARDING_MUTATION = gql`
  mutation CreateOnboarding($input: CreateOnboardingInput!) {
    createOnboarding(createOnboardingInput: $input) {
      _id
      userId
      province
      city
      socialLinks {
        platform
        url
      }
      portfolios {
        title
        description
        url
        image
      }
      selectedSkills
      resumeUrl
      bio
      isCompleted
      createdAt
      updatedAt
      userDetails {
        _id
        picture
        full_name
        username
      }
    }
  }
`;

const UPDATE_ONBOARDING_MUTATION = gql`
  mutation UpdateOnboarding($input: UpdateOnboardingInput!) {
    updateOnboarding(updateOnboardingInput: $input) {
      _id
      userId
      province
      city
      socialLinks {
        platform
        url
      }
      portfolios {
        title
        description
        url
        image
      }
      selectedSkills
      resumeUrl
      bio
      isCompleted
      createdAt
      updatedAt
      userDetails {
        _id
        picture
        full_name
        username
      }
    }
  }
`;

export const GET_MY_ONBOARDING_QUERY = gql`
  query GetMyOnboarding {
    getMyOnboarding {
      _id
      userId
      province
      city
      socialLinks {
        platform
        url
      }
      portfolios {
        title
        description
        url
        image
      }
      selectedSkills
      resumeUrl
      bio
      isCompleted
      createdAt
      updatedAt
    }
  }
`;

const CHECK_ONBOARDING_STATUS_QUERY = gql`
  query CheckOnboardingStatus {
    checkOnboardingStatus {
      hasOnboarding
      isCompleted
    }
  }
`;

const COMPLETE_ONBOARDING_MUTATION = gql`
  mutation CompleteOnboarding {
    completeOnboarding {
      _id
      isCompleted
      updatedAt
    }
  }
`;

export const useCreateOnboarding = () => {
  const [mutate, { loading, error, data }] = useMutation<
    { createOnboarding: any },
    { input: CreateOnboardingInput }
  >(CREATE_ONBOARDING_MUTATION);

  const createOnboarding = async (input: CreateOnboardingInput) => {
    try {
      const result = await mutate({ variables: { input } });
      return result.data?.createOnboarding;
    } catch (err) {
      console.error("Error creating onboarding:", err);
      throw err;
    }
  };

  return {
    createOnboarding,
    createdOnboarding: data?.createOnboarding,
    loading,
    error,
  };
};

export const useUpdateOnboarding = () => {
  const [mutate, { loading, error, data }] = useMutation<
    { updateOnboarding: any },
    { input: UpdateOnboardingInput }
  >(UPDATE_ONBOARDING_MUTATION);

  const updateOnboarding = async (input: UpdateOnboardingInput) => {
    try {
      const result = await mutate({ variables: { input } });
      return result.data?.updateOnboarding;
    } catch (err) {
      console.error("Error updating onboarding:", err);
      throw err;
    }
  };

  return {
    updateOnboarding,
    updatedOnboarding: data?.updateOnboarding,
    loading,
    error,
  };
};

export const useGetMyOnboarding = () => {
  const { data, loading, error, refetch } = useQuery<{
    getMyOnboarding: any;
  }>(GET_MY_ONBOARDING_QUERY, {
    fetchPolicy: "network-only",
  });

  return {
    onboarding: data?.getMyOnboarding,
    loading,
    error,
    refetch,
  };
};

export const useCheckOnboardingStatus = () => {
  const { data, loading, error, refetch } = useQuery<{
    checkOnboardingStatus: OnboardingStatusResponse;
  }>(CHECK_ONBOARDING_STATUS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return {
    status: data?.checkOnboardingStatus,
    loading,
    error,
    refetch,
  };
};

export const useCompleteOnboarding = () => {
  const [mutate, { loading, error, data }] = useMutation<{
    completeOnboarding: any;
  }>(COMPLETE_ONBOARDING_MUTATION);

  const completeOnboarding = async () => {
    try {
      const result = await mutate();
      return result.data?.completeOnboarding;
    } catch (err) {
      console.error("Error completing onboarding:", err);
      throw err;
    }
  };

  return {
    completeOnboarding,
    completedOnboarding: data?.completeOnboarding,
    loading,
    error,
  };
};

export const useOnboardingForm = () => {
  const { createOnboarding, loading: creating } = useCreateOnboarding();
  const { updateOnboarding, loading: updating } = useUpdateOnboarding();
  const { completeOnboarding, loading: completing } = useCompleteOnboarding();
  const { onboarding, refetch } = useGetMyOnboarding();

  const submitStep1 = async (step1Data: {
    province: string;
    city: string;
    socialLinks: Array<{ platform: string; url: string }>;
    portfolios: Array<{ platform: string; url: string }>;
    profileImage?: string;
  }) => {
    try {
      if (onboarding) {
        return await updateOnboarding({
          province: step1Data.province,
          city: step1Data.city,
          socialLinks: step1Data.socialLinks,
          portfolios: step1Data.portfolios.map((p) => ({
            title: p.platform,
            url: p.url,
          })),
          profileImage: step1Data.profileImage,
        });
      } else {
        return await createOnboarding({
          province: step1Data.province,
          city: step1Data.city,
          socialLinks: step1Data.socialLinks,
          portfolios: step1Data.portfolios.map((p) => ({
            title: p.platform,
            url: p.url,
          })),
          selectedSkills: [],
          bio: "",
          profileImage: step1Data.profileImage,
        });
      }
    } catch (error) {
      console.error("Error submitting step 1:", error);
      throw error;
    }
  };

  const submitStep2 = async (selectedSkills: string[]) => {
    try {
      return await updateOnboarding({
        selectedSkills,
      });
    } catch (error) {
      console.error("Error submitting step 2:", error);
      throw error;
    }
  };

  const submitStep3 = async (resumeUrl: string, bio: string) => {
    try {
      const result = await updateOnboarding({
        resumeUrl,
        bio,
      });

      // Auto complete setelah step 3
      if (result) {
        await completeOnboarding();
      }

      return result;
    } catch (error) {
      console.error("Error submitting step 3:", error);
      throw error;
    }
  };

  return {
    // Data
    onboarding,

    // Actions
    submitStep1,
    submitStep2,
    submitStep3,
    completeOnboarding,

    // Loading states
    loading: creating || updating || completing,
    creating,
    updating,
    completing,

    // Refresh
    refetch,
  };
};

export const useOnboardingUpdate = () => {
  const [update, { loading }] = useMutation(UPDATE_ONBOARDING_MUTATION);

  const saveAll = async (input: UpdateOnboardingInput) => {
    return await update({ variables: { input } });
  };

  return { saveAll, loading };
};
