export interface CreateJobInput {
  company: string;
  title: string;
  function: string;
  jobType: string;
  experience: string;
  location: string;
  remoteAllowed: boolean;
  salaryCurrency: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  skills: string[];
  billingHourly: boolean;
}

export interface UpdateJobInput {
  _id: string;
  company: string;
  title: string;
  function: string;
  jobType: string;
  experience: string;
  location: string;
  remoteAllowed: boolean;
  salaryCurrency: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  skills: string[];
  billingHourly: boolean;
  isActive: boolean;
}

export interface CompanyData {
  _id: string;
  logo: string;
  name: string;
}
export interface Job {
  _id: string;
  companyId: CompanyData;
  title: string;
  function: string;
  jobType: string;
  experience: string;
  location: string;
  remoteAllowed: boolean;
  salaryCurrency: string;
  salaryMin: string;
  salaryMax: string;
  description: string;
  skills: string[];
  createdAt: string;
  billingHourly: boolean;
}

export interface CreateJobResponse {
  createJob: Job;
}

export interface SearchJobsInput {
  keyword?: string;
}

export interface FilterJobsInput {
  location?: string;
  jobType?: string;
  experience?: string;
}

export interface OrderJobsInput {
  sortBy?: "ASC" | "DESC";
}

export interface ListJobsInput {
  page?: number;
  limit?: number;
  search?: SearchJobsInput;
  filter?: FilterJobsInput;
  order?: OrderJobsInput;
}

export interface ListJobsResponse {
  total: number;
  totalPage: number;
  page: number;
  limit: number;
  data: Job[];
}
