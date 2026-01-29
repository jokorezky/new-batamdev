import { gql, useQuery } from "@apollo/client";
import { Roadmap } from "@/types/Roadmap";

export const GET_ROADMAP_BY_YEAR = gql`
  query GetRoadmapByYear($year: Float!) {
    getRoadmapByYear(year: $year) {
      _id
      year
      quarters {
        _id
        quarter
        focus
        kpi
        progress
        items {
          _id
          title
          desc
          status
          votes {
            up
            down
          }
        }
      }
    }
  }
`;

export const useRoadmap = (year: number) => {
  const { data, loading, error, refetch } = useQuery<{ getRoadmapByYear: Roadmap }>(
    GET_ROADMAP_BY_YEAR,
    {
      variables: { year },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    roadmap: data?.getRoadmapByYear,
    loading,
    error,
    refetch,
  };
};
