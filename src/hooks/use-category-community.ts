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
  query ListCategoryCommunities($input: ListCategoriesInput!) {
    listCategoryCommunities(input: $input) {
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

export const useListCategories = (input: ListCategoriesInput) => {
    const { data, loading, error, refetch, fetchMore } = useQuery<{
        listCategoryCommunities: ListCategoriesResponse;
    }>(LIST_CATEGORIES_QUERY, {
        variables: { input },
        fetchPolicy: "cache-and-network",
    });

    const loadMore = async (newInput: Partial<ListCategoriesInput>) => {
        if (!data?.listCategoryCommunities?.hasNext) return;

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
                    listCategoryCommunities: {
                        ...fetchMoreResult.listCategoryCommunities,
                        items: [
                            ...prev.listCategoryCommunities.items,
                            ...fetchMoreResult.listCategoryCommunities.items,
                        ],
                    },
                };
            },
        });
    };

    return {
        categories: data?.listCategoryCommunities?.items || [],
        total: data?.listCategoryCommunities?.total || 0,
        hasNext: data?.listCategoryCommunities?.hasNext || false,
        loading,
        error,
        refetch: (newInput?: Partial<ListCategoriesInput>) =>
            refetch({ input: { ...input, ...newInput } }),
        loadMore,
    };
};