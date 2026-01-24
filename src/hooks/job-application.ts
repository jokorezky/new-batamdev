import { gql, useMutation, useQuery } from "@apollo/client";

export const CREATE_JOB_APPLICATION_MUTATION = gql`
  mutation CreateJobApplication($input: CreateJobApplicationInput!) {
    createJobApplication(input: $input) {
      _id

      createdAt
    }
  }
`;

interface CreateJobApplicationInputType {
  jobId: string;
  note?: string;
}

interface CreateJobApplicationResponse {
  createJobApplication: {
    _id: string;
    createdAt: string;
  };
}

interface CreateJobApplicationVariables {
  input: CreateJobApplicationInputType;
}

export const useCreateJobApplication = (): {
  createJobApplication: (
    input: CreateJobApplicationInputType
  ) => Promise<{ _id: string; createdAt: string } | undefined>;
  loading: boolean;
  error: Error | undefined;
  data: CreateJobApplicationResponse | null | undefined;
} => {
  const [mutate, { loading, error, data }] = useMutation<
    CreateJobApplicationResponse,
    CreateJobApplicationVariables
  >(CREATE_JOB_APPLICATION_MUTATION);

  const createJobApplication = async (input: CreateJobApplicationInputType) => {
    const result = await mutate({ variables: { input } });
    return result.data?.createJobApplication;
  };

  return { createJobApplication, loading, error, data };
};

export const MY_APPLICATIONS_QUERY = gql`
  query MyApplications {
    myApplications {
      _id
      createdAt
      jobId {
        _id
        title
        companyId {
          name
          logo
        }
      }
    }
  }
`;

export interface MyApplicationsResponse {
  myApplications: {
    _id: string;
    createdAt: string;
    jobId: {
      _id: string;
      title: string;
      companyId: { name: string; logo: string };
    };
  }[];
}

export const useMyApplications = () => {
  const { data, loading, error, refetch } = useQuery<MyApplicationsResponse>(
    MY_APPLICATIONS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    applications: data?.myApplications || [],
    loading,
    error,
    refetch,
  };
};

export const HAS_APPLIED_QUERY = gql`
  query HasApplied($jobId: String!) {
    hasApplied(jobId: $jobId)
  }
`;

export const useHasApplied = (jobId: string) => {
  const { data, loading, error } = useQuery(HAS_APPLIED_QUERY, {
    variables: { jobId },
    skip: !jobId,
    fetchPolicy: "network-only",
  });

  return {
    hasApplied: data?.hasApplied || false,
    loading,
    error,
  };
};

export const TOTAL_APPLICANTS_QUERY = gql`
  query GetTotalApplicants($jobId: String!) {
    getTotalApplicants(jobId: $jobId) {
      total
    }
  }
`;

export interface TotalApplicantsResponse {
  getTotalApplicants: {
    total: number;
  };
}

export const useTotalApplicants = (jobId: string) => {
  const { data, loading, error, refetch } = useQuery<TotalApplicantsResponse>(
    TOTAL_APPLICANTS_QUERY,
    {
      variables: { jobId },
      skip: !jobId,
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    total: data?.getTotalApplicants?.total || 0,
    loading,
    error,
    refetch,
  };
};


export const GET_APPLICANTS_QUERY = gql`
  query GetApplicants($jobId: String!, $listApplicantsInput: ListApplicantsInput!) {
    getApplicants(jobId: $jobId, listApplicantsInput: $listApplicantsInput) {
      data {
        _id
        userId {
          full_name
          email
          phone_number
          picture
          onboarding {
            _id
            userId
            portfolios{
              title
              description
              url
            }
            selectedSkills
            resumeUrl
            createdAt
            updatedAt
          }
        }
        createdAt
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export interface Onboarding {
  _id: string;
  userId: string;
  portfolios: {
    title: string;
    description?: string;
    url: string;
  }[];
  selectedSkills: string[];
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicantUser {
  full_name: string;
  email: string;
  phone_number?: string;
  picture?: string;
  onboarding?: Onboarding;
}

export interface Applicant {
  _id: string;
  userId: ApplicantUser;
  createdAt: string;
}

export interface GetApplicantsResponse {
  getApplicants: {
    data: Applicant[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const useApplicants = (jobId: string) => {
  const { data, loading, error, refetch } = useQuery<GetApplicantsResponse>(
    GET_APPLICANTS_QUERY,
    {
      variables: {
        jobId, listApplicantsInput: {
          page: 1,
          limit: 10,
        }
      },
      skip: !jobId,
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    applicants: data?.getApplicants.data || [],
    pagination: data?.getApplicants || null,
    loading,
    error,
    refetch,
  };
};

