export interface CompanyOption {
  value: string;
  label: string;
}

export interface CompanyCategory {
  _id: string;
  name: string;
}

export interface CompanyAdmin {
  _id: string;
  username?: string;
  full_name?: string;
  picture?: string;
}

export interface Company {
  _id: string;
  name: string;
  url: string;
  logo?: string;
  // cover?: string;
  // about?: string;
  // website?: string;
  // linkedin?: string;
  // city?: string;
  // province?: string;
  // is_active?: boolean;
  // categories?: CompanyCategory[];
  // admins?: CompanyAdmin[];
}

export interface CompanyMemberSummary {
  _id: string;
  username: string;
  full_name: string;
  picture?: string;
  bio?: string;
  job_title?: string;
}

export interface CompanyMembersSummaryResponse {
  getCompanyMembersSummary: {
    totalMembers: number;
    sampleMembers: CompanyMemberSummary[];
  };
}

/**
 * ===== Update Company =====
 */
export interface UpdateCompanyInput {
  name?: string;
  cover?: string;
  logo?: string;
  about?: string;
  categoryId?: string;
  url?: string;
}

export interface UpdateCompanyResponse {
  updateCompany: {
    _id: string;
  };
}

export interface UpdateCompanyVariables {
  id: string;
  input: UpdateCompanyInput;
}

/**
 * ===== Search Companies =====
 */
export interface SearchCompaniesInput {
  keyword?: string;
  city?: string;
  categoryId?: string;
  limit?: number;
  page?: number;
}

export interface SearchCompaniesResponse {
  searchCompanies: {
    companies: Company[];
    count: number;
  };
}

export interface SearchCompaniesVariables {
  input: SearchCompaniesInput;
}

export interface CompaniesLiteInput {
  keyword?: string;
  limit?: number;
}

export interface CompaniesLiteResult {
  companiesLite: { id: string; name: string }[];
}
