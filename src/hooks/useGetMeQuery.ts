import { gql, useQuery } from "@apollo/client";

const GET_ME_QUERY = gql`
  query {
    getMe {
      _id
      email
      full_name
      username
      picture
      phone_number
      bio
      roles
      province
      city
      communities {
        url
        name
      }
      companies {
        name
        url
      }
    }
  }
`;

export const useGetMeQuery = () => {
  const { data, loading, error, refetch } = useQuery(GET_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
};
