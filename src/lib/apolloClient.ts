import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from 'cookies-next';
import { onError } from "@apollo/client/link/error";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
if (!endpoint) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set.");
}

export function getClient() {
  const httpLink = new HttpLink({
    uri: endpoint,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        if (message === "You must provide token!") {
          // Handle token expiration or missing token
          // Maybe redirect to login page
        }
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const authLink = setContext((_, { headers }) => {
    // For client-side, get token from cookies
    let token = '';
    
    // Only try to access cookies if we're on the client side
    if (typeof window !== 'undefined') {
      token = getCookie('token') as string;
    } else {
      // Server-side token (if needed)
      token = process.env.SERVER_GRAPHQL_TOKEN || '';
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}

export const apolloClient = getClient();