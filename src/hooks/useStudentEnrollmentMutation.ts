import { gql, useMutation } from "@apollo/client";
import { CreateStudentEnrollmentInput } from "../types/StudentEnrollment";

const CREATE_STUDENT_ENROLLMENT_MUTATION = gql`
  mutation CreateStudentEnrollment($input: CreateStudentEnrollmentInput!) {
    createStudentEnrollmentPublic(input: $input) {
      createdAt
    }
  }
`;

export const useCreateStudentEnrollment = () => {
  const [createEnrollment, { data, loading, error }] = useMutation(
    CREATE_STUDENT_ENROLLMENT_MUTATION
  );

  const createEnrollStudent = async (input: CreateStudentEnrollmentInput) => {
    try {
      const result = await createEnrollment({
        variables: { input },
      });
      return result?.data?.createStudentEnrollmentPublic;
    } catch (err) {
      console.error("Error during student enrollment", err);
      throw err;
    }
  };

  return {
    createEnrollStudent,
    data,
    loading,
    error,
  };
};
