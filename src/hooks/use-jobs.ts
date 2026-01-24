import { gql, useMutation, useQuery } from "@apollo/client";
import {
  CreateJobInput,
  CreateJobResponse,
  ListJobsInput,
  ListJobsResponse,
} from "@/types/jobs";

export const CREATE_JOB_MUTATION = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(createJobInput: $input) {
      _id
      title
      function
      jobType
      experience
      location
      remoteAllowed
      salaryCurrency
      salaryMin
      salaryMax
      description
      skills
      createdAt
    }
  }
`;

export const useCreateJob = () => {
  const [mutate, { loading, error, data }] = useMutation<
    CreateJobResponse,
    { input: CreateJobInput }
  >(CREATE_JOB_MUTATION);

  const createJob = async (input: CreateJobInput) => {
    try {
      const result = await mutate({ variables: { input } });
      return result.data?.createJob;
    } catch (err) {
      console.error("Error creating job:", err);
      throw err;
    }
  };

  return {
    createJob,
    createdJob: data?.createJob,
    loading,
    error,
  };
};

export const LIST_JOBS_QUERY = gql`
  query ListJobs($input: ListJobsInput!) {
    listJobs(listJobsInput: $input) {
      total
      totalPage
      page
      limit
      data {
        _id
        title
        companyId {
          _id
          name
          logo
        }
        location
        jobType
        function
        remoteAllowed
        salaryCurrency
        salaryMin
        salaryMax
        skills
        experience
        description
        billingHourly
        createdAt
      }
    }
  }
`;

export const useListJobs = (params: ListJobsInput) => {
  const { data, loading, error, refetch } = useQuery<
    { listJobs: ListJobsResponse },
    { input: ListJobsInput }
  >(LIST_JOBS_QUERY, {
    variables: { input: params },
    fetchPolicy: "cache-and-network",
  });

  return {
    jobs: data?.listJobs.data ?? [],
    total: data?.listJobs.total ?? 0,
    totalPage: data?.listJobs.totalPage ?? 1,
    page: data?.listJobs.page ?? 1,
    limit: data?.listJobs.limit ?? 10,
    loading,
    error,
    refetch,
  };
};

export const GET_JOB_BY_ID = `
  query GetJobById($id: String!) {
    getJobById(id: $id) {
      _id
      title
      companyId {
        _id
        name
        logo
        url
        country
        description
        culture
        country
        industry
        employeeRange
      }
      location
      jobType
      function
      remoteAllowed
      salaryCurrency
      salaryMin
      salaryMax
      skills
      experience
      description
      billingHourly
      createdAt
    }
  }
`;

export const GET_JOB_BY_ID_QUERY = gql`
  query GetJobById($id: String!) {
    getJobById(id: $id) {
      _id
      title
      companyId {
        _id
        name
        logo
      }
      location
      jobType
      function
      remoteAllowed
      salaryCurrency
      salaryMin
      salaryMax
      experience
      skills
      description
      billingHourly
      isActive
      createdAt
    }
  }
`;

export const useGetJobById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<
    { getJobById: any },
    { id: string }
  >(GET_JOB_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
  });

  return {
    job: data?.getJobById,
    loading,
    error,
    refetch,
  };
};

const LIST_MY_JOBS_QUERY = gql`
  query ListMyJobs($input: ListJobsInput!) {
    listMyJobs(listJobsInput: $input) {
      total
      totalPage
      page
      limit
      data {
        _id
        title
        companyId {
          _id
          name
          logo
        }
        location
        jobType
        function
        remoteAllowed
        salaryCurrency
        salaryMin
        salaryMax
        skills
        experience
        description
        createdAt
      }
    }
  }
`;

export const useListMyJobs = (params: ListJobsInput) => {
  const { data, loading, error, refetch } = useQuery<
    { listMyJobs: ListJobsResponse },
    { input: ListJobsInput }
  >(LIST_MY_JOBS_QUERY, {
    variables: { input: params },
    fetchPolicy: "cache-and-network",
  });

  return {
    jobs: data?.listMyJobs.data ?? [],
    total: data?.listMyJobs.total ?? 0,
    totalPage: data?.listMyJobs.totalPage ?? 1,
    page: data?.listMyJobs.page ?? 1,
    limit: data?.listMyJobs.limit ?? 10,
    loading,
    error,
    refetch,
  };
};

export const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJob($input: UpdateJobInput!) {
    updateJob(updateJobInput: $input) {
      _id
      title
      function
      jobType
      experience
      location
      remoteAllowed
      salaryCurrency
      salaryMin
      salaryMax
      description
      skills
      billingHourly
      createdAt
    }
  }
`;

export const useUpdateJob = () => {
  const [mutate, { loading, error, data }] = useMutation<
    { updateJob: any },
    { input: any }
  >(UPDATE_JOB_MUTATION);

  const updateJob = async (input: any) => {
    try {
      const result = await mutate({ variables: { input } });
      return result.data?.updateJob;
    } catch (err) {
      console.error("Error updating job:", err);
      throw err;
    }
  };

  return {
    updateJob,
    updatedJob: data?.updateJob,
    loading,
    error,
  };
};

