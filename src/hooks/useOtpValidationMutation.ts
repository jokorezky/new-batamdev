import { gql, useMutation } from "@apollo/client";

const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOtp($email: String!, $otp: String!) {
    verifyOtp(email: $email, otp: $otp)
  }
`;

export const useOtpValidationMutation = () => {
  const [verifyOtpMutation, { data, loading, error }] =
    useMutation(VERIFY_OTP_MUTATION);

  const validateOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await verifyOtpMutation({ variables: { email, otp } });
      return response.data.verifyOtp;
    } catch (err) {
      console.error("Error verifying OTP:", err);
      return false;
    }
  };

  return {
    validateOtp,
    data,
    loading,
    error,
  };
};
