import { gql, useQuery, useMutation } from "@apollo/client";
import {
  CompanyOption,
  UpdateCompanyResponse,
  UpdateCompanyVariables,
  SearchCompaniesResponse,
  SearchCompaniesVariables,
  CompaniesLiteInput,
} from "@/types/Company";

/**
 * =====================
 * QUERIES
 * =====================
 */

export const GET_MY_ADMIN_COMPANIES_QUERY = gql`
  query GetMyAdminCompanies {
    getMyAdminCompanies {
      companies {
        value
        label
      }
    }
  }
`;

export const useAdminCompanies = () => {
  const { data, loading, error, refetch } = useQuery<{
    getMyAdminCompanies: { companies: CompanyOption[] };
  }>(GET_MY_ADMIN_COMPANIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return {
    companies: data?.getMyAdminCompanies?.companies || [],
    loading,
    error,
    refetch,
  };
};

export const GET_COMPANY_BY_URL_QUERY = gql`
  query GetCompanyByUrl($url: String!) {
    getCompanyByUrl(url: $url) {
      _id
      name
      url
      logo
      cover
      about
      website
      linkedin
      city
      province
      is_active
      categories {
        _id
        name
      }
      admins {
        _id
      }
    }
  }
`;

export interface Company {
  _id: string;
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  culture?: string;
  employeeRange?: string;
  country?: string;
  industry?: string;
  createdAt?: string;
}

export interface ListCompanyResponse {
  total: number;
  totalPage: number;
  data: Company[];
  page: number;
  limit: number;
}

export interface CompanySearchInput {
  name?: string;
}

export interface CompanyFilterInput {
  industry?: string;
  country?: string;
}

export interface CompanyOrderInput {
  orderBy: string;
  sortBy: string;
}

export interface ListCompanyInput {
  page?: number;
  limit?: number;
  search?: CompanySearchInput;
  filter?: CompanyFilterInput;
  order?: CompanyOrderInput;
}

export interface GetCompaniesResponse {
  getCompanies: ListCompanyResponse;
}

export interface GetCompaniesVariables {
  input: ListCompanyInput;
}

export const GET_COMPANIES_QUERY = gql`
  query GetCompanies($input: ListCompanyInput!) {
    getCompanies(input: $input) {
      total
      totalPage
      page
      limit
      data {
        _id
        name
        url
        logo
        industry
        description
        culture
        employeeRange
        country
      }
    }
  }
`;

export const useGetCompanies = (input: ListCompanyInput) => {
  const { data, loading, error, refetch } = useQuery<
    GetCompaniesResponse,
    GetCompaniesVariables
  >(GET_COMPANIES_QUERY, {
    variables: { input },
    fetchPolicy: "cache-and-network",
  });

  return {
    companies: data?.getCompanies?.data || [],
    total: data?.getCompanies?.total || 0,
    totalPage: data?.getCompanies?.totalPage || 0,
    page: data?.getCompanies?.page || 1,
    limit: data?.getCompanies?.limit || 10,
    loading,
    error,
    refetch,
  };
};

/**
 * =====================
 * MY COMPANIES QUERY
 * =====================
 */

export interface MyCompany {
  _id: string;
  name: string;
  url: string;
  industry?: string;
  country?: string;
  createdAt: string;
  admin: {
    _id: string;
    username: string;
    email: string;
  };
}

export interface ListMyCompaniesResponse {
  listMyCompanies: ListCompanyResponse;
}

export interface ListMyCompaniesVariables {
  input: ListCompanyInput;
}

export const LIST_MY_COMPANIES_QUERY = gql`
  query ListMyCompanies($input: ListCompanyInput!) {
    listMyCompanies(input: $input) {
      total
      totalPage
      page
      limit
      data {
        _id
        name
        url
        industry
        country
        logo
        createdAt
        admin {
          _id
          username
          email
        }
      }
    }
  }
`;

export const useListMyCompanies = (input: ListCompanyInput) => {
  const { data, loading, error, refetch } = useQuery<
    ListMyCompaniesResponse,
    ListMyCompaniesVariables
  >(LIST_MY_COMPANIES_QUERY, {
    variables: { input },
    fetchPolicy: "cache-and-network",
  });

  return {
    companies: data?.listMyCompanies?.data || [],
    total: data?.listMyCompanies?.total || 0,
    totalPage: data?.listMyCompanies?.totalPage || 0,
    page: data?.listMyCompanies?.page || 1,
    limit: data?.listMyCompanies?.limit || 10,
    loading,
    error,
    refetch,
  };
};

/**
 * =====================
 * MUTATIONS
 * =====================
 */

interface CreateCompanyInput {
  name: string;
  cover?: string;
  logo?: string;
  about?: string;
  categoryId?: string;
  url?: string;
}

interface CreateCompanyResponse {
  createCompany: {
    _id: string;
    url: string;
  };
}

interface CreateCompanyPayload {
  input: CreateCompanyInput;
}

const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      _id
      url
    }
  }
`;

export const useCreateCompany = () => {
  const [mutate, { loading, error, data }] = useMutation<
    CreateCompanyResponse,
    CreateCompanyPayload
  >(CREATE_COMPANY_MUTATION);

  const createCompany = async (input: CreateCompanyInput) => {
    try {
      const result = await mutate({ variables: { input } });
      return result.data?.createCompany;
    } catch (err) {
      console.error("Error creating company:", err);
      throw err;
    }
  };

  return {
    createCompany,
    createdCompany: data?.createCompany,
    loading,
    error,
  };
};

export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany($id: String!, $input: UpdateCompanyInput!) {
    updateCompany(id: $id, input: $input) {
      _id
    }
  }
`;

export const useUpdateCompany = () => {
  const [mutate, { loading, error, data }] = useMutation<
    UpdateCompanyResponse,
    UpdateCompanyVariables
  >(UPDATE_COMPANY_MUTATION);

  const updateCompany = async (
    id: string,
    input: UpdateCompanyVariables["input"]
  ) => {
    try {
      const result = await mutate({ variables: { id, input } });
      return result.data?.updateCompany;
    } catch (err) {
      console.error("Error updating company:", err);
      throw err;
    }
  };

  return {
    updateCompany,
    updatedCompany: data?.updateCompany,
    loading,
    error,
  };
};

/**
 * =====================
 * SEARCH
 * =====================
 */

export const SEARCH_COMPANIES_QUERY = gql`
  query SearchCompanies($input: SearchCompaniesInput!) {
    searchCompanies(input: $input) {
      companies {
        _id
        name
        city
      }
      count
    }
  }
`;

export const useSearchCompanies = (
  input: SearchCompaniesVariables["input"]
) => {
  const { data, loading, error, refetch } = useQuery<
    SearchCompaniesResponse,
    SearchCompaniesVariables
  >(SEARCH_COMPANIES_QUERY, {
    variables: { input },
    skip: !input?.keyword,
    fetchPolicy: "cache-and-network",
  });

  return {
    companies: data?.searchCompanies?.companies || [],
    total: data?.searchCompanies?.count || 0,
    loading,
    error,
    refetch,
  };
};

export const COMPANIES_LITE_QUERY = gql`
  query CompaniesLite($input: CompaniesLiteInput!) {
    companiesLite(input: $input) {
      companiesLite {
        id
        name
      }
    }
  }
`;

export interface CompaniesLiteResult {
  companiesLite: {
    companiesLite: { id: string; name: string }[];
  };
}

export interface CompaniesLiteVariables {
  input: {
    keyword?: string;
    limit?: number;
  };
}

export const useCompaniesLite = (keyword?: string) => {
  const { data, loading, error, refetch } = useQuery<
    CompaniesLiteResult,
    { input: CompaniesLiteInput }
  >(COMPANIES_LITE_QUERY, {
    variables: {
      input: { keyword, limit: 15 },
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    companies: data?.companiesLite?.companiesLite || [],
    loading,
    error,
    refetch,
  };
};
