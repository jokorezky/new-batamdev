import { gql, useQuery } from "@apollo/client";

export const GET_LEARNING_PROGRAMS_QUERY = gql`
  query GetLearningPrograms($page: Float!, $limit: Float!) {
    getPrograms(page: $page, limit: $limit) {
      data {
        _id
        title
        slug
        description
        category
        link_button
        text_button
        why_title
        why_description
        why_image
        why_lists {
          text
          description
        }
        silabus
        populatedJadwalBiayas {
          _id
          name
          class_end
        }
        modules {
          _id
          subModules {
            _id
          }
        }
      }
      total
    }
  }
`;

export const useLearningProgramsQuery = (page: number, limit: number) => {
  const { data, loading, error, refetch } = useQuery(
    GET_LEARNING_PROGRAMS_QUERY,
    {
      variables: { page, limit },
    }
  );

  return {
    programs: data?.getPrograms?.data || [],
    total: data?.getPrograms?.total || 0,
    loading,
    error,
    refetch,
  };
};

export const GET_LEARNING_PROGRAM_BY_SLUG_QUERY = gql`
  query GetLearningProgramBySlug($slug: String!) {
    getLearningProgramBySlug(slug: $slug) {
      _id
      title
      description
      category
      link_button
      text_button
      why_title
      why_description
      why_image
      why_lists {
        text
        description
      }
      silabus
      populatedJadwalBiayas {
        _id
        name
        category
        class_start
        class_end
        isEarlyBirdDiscount
        earlyBirdPrice
        normalPrice
        isDeleted
      }
      populatedFasePembelajaran {
        _id
        title
        description
        kurikulum {
          text
          description
          images
        }
      }
      populatedFaq {
        _id
        question
        answered
      }
    }
  }
`;

export const useLearningProgramBySlugQuery = (slug: string) => {
  const { data, loading, error, refetch } = useQuery(
    GET_LEARNING_PROGRAM_BY_SLUG_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  );

  return {
    program: data?.getLearningProgramBySlug || null,
    loading,
    error,
    refetch,
  };
};
