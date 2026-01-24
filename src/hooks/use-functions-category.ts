import { gql, useQuery } from "@apollo/client";

export interface FunctionCategory {
  id: string;
  label: string;
  value: string;
}

export const GET_FUNCTION_CATEGORIES = gql`
  query GetFunctionCategories {
    getFunctionCategories {
      _id
      label
      value
    }
  }
`;

export const useFunctionCategories = () => {
  const { data, loading, error, refetch } = useQuery<{
    getFunctionCategories: FunctionCategory[];
  }>(GET_FUNCTION_CATEGORIES, {
    fetchPolicy: "cache-and-network",
  });

  const mapped =
    data?.getFunctionCategories?.map((cat) => ({
      label: cat.label,
      value: cat.value,
    })) ?? [];

  return {
    categories: mapped,
    raw: data?.getFunctionCategories ?? [],
    loading,
    error,
    refetch,
  };
};
