import { gql, useMutation, useQuery } from "@apollo/client";

// ----------------- MUTATION: Save Job -----------------
export const SAVE_JOB_MUTATION = gql`
  mutation SaveJob($input: CreateSavedJobInput!) {
    saveJob(input: $input) {
      _id
      createdAt
    }
  }
`;

// ----------------- QUERY: My Saved Jobs -----------------
export const MY_SAVED_JOBS_QUERY = gql`
  query MySavedJobs {
    mySavedJobs {
      _id
    }
  }
`;

// ----------------- MUTATION: Delete Saved Job -----------------
export const DELETE_SAVED_JOB_MUTATION = gql`
  mutation DeleteSavedJob($input: DeleteSavedJobInput!) {
    deleteSavedJob(input: $input)
  }
`;

// ----------------- QUERY: Has Saved -----------------
export const HAS_SAVED_QUERY = gql`
  query HasSaved($jobId: String!) {
    hasSaved(jobId: $jobId)
  }
`;

interface CreateSavedJobInputType {
  jobId: string;
}

interface SaveJobResponse {
  saveJob: {
    _id: string;
    createdAt: string;
    jobId: {
      _id: string;
      title: string;
      companyId: { name: string; logo: string };
    };
  };
}

export const useSaveJob = () => {
  const [mutate, { loading, error, data }] = useMutation(SAVE_JOB_MUTATION);

  const saveJob = async ({
    jobId,
    refetchHasSaved,
  }: {
    jobId: string;
    refetchHasSaved?: () => void;
  }) => {
    const result = await mutate({ variables: { input: { jobId } } });
    if (refetchHasSaved) {
      refetchHasSaved();
    }
    return result.data?.saveJob;
  };

  return { saveJob, loading, error, data };
};

export interface MySavedJobsResponse {
  mySavedJobs: {
    _id: string;
    createdAt: string;
    jobId: {
      _id: string;
      title: string;
      companyId: { name: string; logo: string };
    };
  }[];
}

export const useMySavedJobs = () => {
  const { data, loading, error, refetch } = useQuery<MySavedJobsResponse>(
    MY_SAVED_JOBS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    savedJobs: data?.mySavedJobs || [],
    loading,
    error,
    refetch,
  };
};

interface DeleteSavedJobInputType {
  savedJobId: string;
}

interface DeleteSavedJobResponse {
  deleteSavedJob: boolean;
}

export const useDeleteSavedJob = () => {
  const [mutate, { loading, error, data }] = useMutation<
    DeleteSavedJobResponse,
    { input: DeleteSavedJobInputType }
  >(DELETE_SAVED_JOB_MUTATION);

  const deleteSavedJob = async (input: DeleteSavedJobInputType) => {
    const result = await mutate({ variables: { input } });
    return result.data?.deleteSavedJob;
  };

  return { deleteSavedJob, loading, error, data };
};

export const useHasSaved = (jobId: string) => {
  const { data, loading, error, refetch } = useQuery(HAS_SAVED_QUERY, {
    variables: { jobId },
    skip: !jobId,
    fetchPolicy: "network-only",
  });

  return {
    hasSaved: data?.hasSaved || false,
    loading,
    error,
    refetch,
  };
};
