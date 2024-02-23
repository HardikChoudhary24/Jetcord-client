import { GraphQLClient } from "graphql-request";
import Cookies from "universal-cookie";

const isClient = typeof window !== "undefined";

// graphql client to make request to the backend
export const gqlClient = new GraphQLClient("http://localhost:8000/graphql", {
  headers: () => {
    const cookies = new Cookies();
    return {
      authorization: isClient
        ? `Bearer ${cookies.get("auth_token")}`
        : "",
    };
  },
});

