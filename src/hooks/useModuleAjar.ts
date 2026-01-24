import { gql, useQuery } from "@apollo/client";

const GET_ALL_MODULE_AJARS_QUERY = gql`
  query GetAllModuleAjars($page: Int!, $limit: Int!) {
    findAllModuleAjarsByRule(page: $page, limit: $limit) {
      _id
      title
      subModules {
        title
        content
      }
      program {
        title
        description
      }
      learningProgram {
        title
        description
      }
    }
  }
`;

export const useGetAllModuleAjarsQuery = (page: number, limit: number) => {
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_MODULE_AJARS_QUERY,
    {
      variables: { page, limit },
    }
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
};

const GET_MODULE_AJAR_QUERY = gql`
  query GetModuleAjar($id: String!) {
    findModuleAjar(id: $id) {
      _id
      title
      subModules {
        title
        content
      }
    }
  }
`;

export const useGetModuleAjarQuery = (id: string) => {
  const { data, loading, error } = useQuery(GET_MODULE_AJAR_QUERY, {
    variables: { id },
  });

  return {
    data,
    loading,
    error,
  };
};

const GET_ALL_MODULE_AJARS_QUERY_BY_ID = gql`
  query GetAllModuleAjars($id: String!, $page: Int!, $limit: Int!) {
    findAllModuleAjars(id: $id, page: $page, limit: $limit) {
      _id
      title
      subModules {
        title
        _id
      }
      program {
        title
      }
      learningProgram {
        title
      }
    }
  }
`;

export const useGetAllModuleAjarsQueryById = (
  id: string,
  page: number,
  limit: number
) => {
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_MODULE_AJARS_QUERY_BY_ID,
    {
      variables: { id, page, limit },
    }
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
};

const GET_MODULE_AJAR_BY_ID_QUERY = gql`
  query GetModuleAjarById($id: String!) {
    getModuleAjarById(id: $id) {
      _id
      title
      subModules {
        _id
        title
        content
      }
      prev {
        _id
        title
      }
      next {
        _id
        title
      }
    }
  }
`;


export const useGetModuleAjarByIdQuery = (id: string, skip?: boolean) => {
  const { data, loading, error, refetch } = useQuery(
    GET_MODULE_AJAR_BY_ID_QUERY,
    {
      variables: { id },
      skip: !id || skip,
    }
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
};
