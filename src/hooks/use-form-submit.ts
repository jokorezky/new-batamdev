import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export enum FormType {
  SPONSOR = "SPONSOR",
  SPEAKER = "SPEAKER",
  PARTNER = "PARTNER",
}

const SUBMIT_FORM = gql`
  mutation SubmitForm($input: CreateFormInput!) {
    submitForm(createFormInput: $input) {
      _id
      formType
      name
      email
      company
      companyWebsite
      eventObjectives
      createdAt
    }
  }
`;

interface SubmitFormInput {
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  jobFunction?: string;
  budget?: string;
  eventObjectives?: string[];
  otherObjective?: string;
  agreeToMarketing?: boolean;
  company?: string;
  companyWebsite?: string;
}

interface SubmitFormResponse {
  _id: string;
  formType: FormType;
  name: string;
  email: string;
  company?: string;
  companyWebsite?: string;
  eventObjectives?: string[];
  createdAt: string;
}

export const useFormSubmit = () => {
  const [mutate, { loading, error }] = useMutation<
    { submitForm: SubmitFormResponse },
    { input: SubmitFormInput }
  >(SUBMIT_FORM);

  const submitForm = async (
    input: SubmitFormInput
  ): Promise<{ data: SubmitFormResponse | null; error?: string }> => {
    try {
      if (!input.name || !input.email || !input.phone) {
        throw new Error("Name, email, and phone are required.");
      }

      if (
        (input.formType === FormType.SPONSOR ||
          input.formType === FormType.SPEAKER) &&
        !input.company
      ) {
        throw new Error("Must include company name.");
      }

      const { data } = await mutate({ variables: { input } });
      return { data: data?.submitForm ?? null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  };

  return { submitForm, loading, error };
};
