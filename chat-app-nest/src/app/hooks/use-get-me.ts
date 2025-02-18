import { gql, useQuery } from "@apollo/client";
import { User } from "../interfaces/user";

const GET_ME = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

const useGetMe = () => {
  const { data, loading, error } = useQuery<{ me: User }>(GET_ME, {
    fetchPolicy: "network-only",
    context: {
      headers: {},
      credentials: "include",
    },
  });

  return {
    user: data?.me,
    loading,
    error,
  };
};

export { useGetMe };

