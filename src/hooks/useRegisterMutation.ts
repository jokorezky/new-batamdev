import { gql, useMutation } from "@apollo/client";

const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($createUserInput: CreateUserInput!) {
    register(createUserInput: $createUserInput) {
      _id
    }
  }
`;

export const useRegisterMutation = () => {
  const [register, { data, loading, error }] = useMutation(
    REGISTER_USER_MUTATION
  );

  const registerUser = async (userData: {
    email: string;
    password: string;
    full_name: string;
  }) => {
    try {
      const result = await register({ 
        variables: { 
          createUserInput: userData 
        } 
      });
      return result?.data?.register;
    } catch (err) {
      console.error("Error during registration", err);
    }
  };

  return {
    registerUser,
    data,
    loading,
    error,
  };
};


const MUTATION_REGISTER_GOOGLE = gql`
  mutation registerGoogle($token: String!) {
    registerGoogle(registerGoogleInput: { token: $token }) {
      token
      refreshToken
      user {
        email
        full_name
        roles
        picture
        username
      }
      isNew
    }
  }
`;

interface RegisterGooglePayload {
  token: string;
}
interface RegisterResponse {
  token: string;
  refreshToken: string;
  user: {
    email: string;
    full_name: string;
    roles: string[];
    picture?: string;
    username?: string;
  };
  isNew: boolean;
}

interface ResponseRegisterGoogleMutation {
  registerGoogle: RegisterResponse;
}

export const useRegisterGoogleSubmit = () => {
  const [
    registerGoogleSubmit,
    { data: responseRegisterGoogle, error, loading },
  ] = useMutation<ResponseRegisterGoogleMutation, RegisterGooglePayload>(
    MUTATION_REGISTER_GOOGLE
  );

  return {
    registerGoogleSubmit,
    responseRegisterGoogle,
    error,
    loading,
  };
};