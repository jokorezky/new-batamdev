import { gql, useQuery } from "@apollo/client";
import { ProgramsResponse } from "@/types/Program";

export const GET_PROGRAMS_QUERY = gql`
  query GetProgramPublics($page: Float!, $limit: Float!) {
    getProgramPublics(page: $page, limit: $limit) {
      data {
        _id
        title
        slug
        description
        partner
        link
        image
      }
      total
    }
  }
`;

export const useProgramsQuery = (page: number, limit: number) => {
  const { data, loading, error, refetch } = useQuery<ProgramsResponse>(
    GET_PROGRAMS_QUERY,
    {
      variables: { page, limit },
    }
  );

  return {
    programs: data?.getProgramPublics?.data || [],
    total: data?.getProgramPublics?.total || 0,
    loading,
    error,
    refetch,
  };
};

export const GET_PROGRAM_BY_SLUG_QUERY = gql`
  query GetProgramBySlug($slug: String!) {
    getProgramBySlug(slug: $slug) {
      _id
      title
      slug
      description
      partner
      link
      image
    }
  }
`;

export const useProgramBySlugQuery = (slug: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_PROGRAM_BY_SLUG_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  );

  return {
    program: data?.getProgramBySlug || null,
    loading,
    error,
    refetch,
  };
};
