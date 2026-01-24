import { gql, useMutation, ApolloError } from "@apollo/client";
import { useState } from "react";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      full_name
      email
      picture
      phone_number
      city
      province
      job_title
      bio
      website
      linkedin
      github
    }
  }
`;

export const useUpdateUserMutation = () => {
  const [updateUser, { data, loading }] = useMutation(UPDATE_USER_MUTATION);
  const [error, setError] = useState<string | null>(null);

  const updateUserProfile = async (updateUserInput: {
    picture?: string;
    full_name?: string;
    phone_number?: string;
    country?: string;
    city?: string;
    province?: string;
    address?: string;
    job_title?: string;
    bio?: string;
    headline?: string;
    website?: string;
    linkedin?: string;
    github?: string;
  }) => {
    try {
      const result = await updateUser({
        variables: { updateUserInput },
      });
      return result?.data?.updateUser;
    } catch (err) {
      setError(
        err instanceof ApolloError
          ? err.graphQLErrors[0]?.message || "Unknown error"
          : (err as Error).message
      );
      console.error("Error during profile update", err);
      throw err;
    }
  };

  return {
    updateUserProfile,
    updatedUser: data?.updateUser,
    loading,
    error,
  };
};
