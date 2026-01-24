import { gql, useQuery } from "@apollo/client";

export type CategoryCommunity = {
  _id: string;
  name: string;
  url: string;
  description?: string;
  iconUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export interface ListCategoriesResponse {
  items: CategoryCommunity[];
  total: number;
  hasNext?: boolean;
}

export const LIST_CATEGORIES_QUERY = gql`
  query ListCategory($input: ListCategoriesEventInput!) {
    listCategoryEvent(input: $input) {
      items {
        _id
        name
        url
        description
        iconUrl
        createdAt
        updatedAt
        deletedAt
      }
      total
      hasNext
    }
  }
`;

export interface ListCategoriesInput {
  page?: number;
  limit?: number;
  search?: string;
}

export const useListCategoriesEvent = (input: ListCategoriesInput) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<{
    listCategoryEvent: ListCategoriesResponse;
  }>(LIST_CATEGORIES_QUERY, {
    variables: { input },
    fetchPolicy: "cache-and-network",
  });

  const loadMore = async (newInput: Partial<ListCategoriesInput>) => {
    if (!data?.listCategoryEvent?.hasNext) return;

    await fetchMore({
      variables: {
        input: {
          ...input,
          ...newInput,
          page: (input.page || 1) + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          listCategoryEvent: {
            ...fetchMoreResult.listCategoryEvent,
            items: [
              ...prev.listCategoryEvent.items,
              ...fetchMoreResult.listCategoryEvent.items,
            ],
          },
        };
      },
    });
  };

  return {
    categories: data?.listCategoryEvent?.items || [],
    total: data?.listCategoryEvent?.total || 0,
    hasNext: data?.listCategoryEvent?.hasNext || false,
    loading,
    error,
    refetch: (newInput?: Partial<ListCategoriesInput>) =>
      refetch({ input: { ...input, ...newInput } }),
    loadMore,
  };
};

export interface Event {
  _id: string;
  title: string;
  slugname: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  format: string;
  address: string;
  location_map: string;
  image: string;
  hostDetails: {
    _id: string;
    username: string;
    full_name: string;
    picture: string;
  };
  community: {
    _id: string;
    name: string;
  };
  totalAttendees: number;
  attendeeDetails: Array<{
    _id: string;
    username: string;
    full_name: string;
    picture: string;
  }>;
}

interface CategoryInfoType {
  name: string;
  description: string;
}

export interface ListEventsResponse {
  total: number;
  totalPage: number;
  page: number;
  limit: number;
  data: Event[];
  categoryInfo: CategoryInfoType;
}

export interface ListEventsInput {
  page?: number;
  limit?: number;
  search?: string;
}

export const LIST_EVENTS_BY_CATEGORY_QUERY = gql`
  query ListEventsByCategory(
    $categoryUrl: String!
    $listEventsInput: ListEventsInput!
  ) {
    listEventsByCategory(
      categoryUrl: $categoryUrl
      listEventsInput: $listEventsInput
    ) {
      total
      totalPage
      page
      limit
      categoryInfo {
        name
        description
        iconUrl
      }
      data {
        _id
        title
        slugname
        category
        startDate
        endDate
        startTime
        endTime
        format
        address
        location_map
        image
        hostDetails {
          _id
          username
          full_name
          picture
        }
        community {
          _id
          name
        }
        totalAttendees
        attendeeDetails {
          _id
          username
          full_name
          picture
        }
      }
    }
  }
`;

export const useListEventsByCategory = (
  categoryUrl: string,
  input: ListEventsInput
) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<{
    listEventsByCategory: ListEventsResponse;
  }>(LIST_EVENTS_BY_CATEGORY_QUERY, {
    variables: {
      categoryUrl,
      listEventsInput: input,
    },
    fetchPolicy: "cache-and-network",
  });

  const loadMore = async (newInput: Partial<ListEventsInput>) => {
    if (
      !data?.listEventsByCategory ||
      data.listEventsByCategory.page >= data.listEventsByCategory.totalPage
    ) {
      return;
    }

    await fetchMore({
      variables: {
        categoryUrl,
        listEventsInput: {
          ...input,
          ...newInput,
          page: (input.page || 1) + 1,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          listEventsByCategory: {
            ...fetchMoreResult.listEventsByCategory,
            data: [
              ...prev.listEventsByCategory.data,
              ...fetchMoreResult.listEventsByCategory.data,
            ],
          },
        };
      },
    });
  };

  return {
    info: data?.listEventsByCategory?.categoryInfo ?? {
      name: "",
      description: "",
      iconUrl: "",
    },
    events: data?.listEventsByCategory?.data || [],
    total: data?.listEventsByCategory?.total || 0,
    totalPage: data?.listEventsByCategory?.totalPage || 0,
    page: data?.listEventsByCategory?.page || 0,
    limit: data?.listEventsByCategory?.limit || 0,
    loading,
    error,
    refetch: (newInput?: Partial<ListEventsInput>) =>
      refetch({
        categoryUrl,
        listEventsInput: { ...input, ...newInput },
      }),
    loadMore,
  };
};

export interface CategoryInfo {
  name: string;
  url: string;
}

export interface CategoryWithCount {
  category: CategoryInfo;
  total: number;
}

// GraphQL query
export const LIST_EVENT_CATEGORIES_WITH_COUNT_QUERY = gql`
  query ListEventCategoriesWithCount {
    listEventCategoriesWithCount {
      category {
        name
        url
      }
      total
    }
  }
`;

// React hook
export const useListEventCategoriesWithCount = () => {
  const { data, loading, error } = useQuery<{
    listEventCategoriesWithCount: CategoryWithCount[];
  }>(LIST_EVENT_CATEGORIES_WITH_COUNT_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const transformedCategories =
    data?.listEventCategoriesWithCount.map((category) => ({
      title: category.category.name,
      count: `${category.total}${category.total >= 1000 ? "K" : ""} Events`,
      url: category.category.url,
    })) || [];

  return {
    categories: transformedCategories,
    loading,
    error,
  };
};
