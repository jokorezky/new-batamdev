"use client";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { useState } from "react";

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const useLoginMutation = () => {
  const [login, { data, loading }] = useMutation(LOGIN_USER_MUTATION);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    try {
      const result = await login({ variables: { email, password } });
      return result?.data?.login;
    } catch (err) {
      setError(
        err instanceof ApolloError
          ? err.graphQLErrors[0]?.message || "Unknown error"
          : (err as Error).message
      );
      console.error("Error during login", err);
    }
  };

  return {
    loginUser,
    data,
    loading,
    error,
  };
};

const SEND_OTP_MUTATION = gql`
  mutation SendOtp($email: String!) {
    sendOtp(email: $email)
  }
`;

export const useSendOtpMutation = () => {
  const [sendOtp, { data, loading }] = useMutation(SEND_OTP_MUTATION);
  const [error, setError] = useState<string | null>(null);

  const sendOtpRequest = async (email: string) => {
    try {
      const result = await sendOtp({ variables: { email } });
      return result?.data?.sendOtp;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error during OTP request", err);
    }
  };

  return {
    sendOtpRequest,
    data,
    loading,
    error,
  };
};

const MUTATION_LOGIN_GOOGLE = gql`
  mutation loginGoogle($token: String!) {
    loginGoogle(loginGoogleInput: { token: $token }) {
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

interface LoginGooglePayload {
  token: string;
}

interface LoginResponse {
  accessToken: string;
  _id: string;
  token: string;
  name: string;
  email: string;
  roles: string;
  profesional_type: string;
  picture: string;
  isNew: boolean;
  refreshToken: string;
}

interface ResponseLoginGoogleMutation {
  loginGoogle: LoginResponse;
}

export const useLoginGoogleSubmit = () => {
  const [loginGoogleSubmit, { data: responseLoginGoogle, error, loading }] =
    useMutation<ResponseLoginGoogleMutation, LoginGooglePayload>(
      MUTATION_LOGIN_GOOGLE
    );
  // useErrorMessage(error);
  return {
    loginGoogleSubmit,
    responseLoginGoogle,
    loading,
    error,
  };
};
