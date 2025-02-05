import { gql, useMutation } from "@apollo/client";
import { User } from "../interfaces/user";

interface CreateUserInput {
  createUserInput: {
    email: string;
    password: string;
  };
}
const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
    }
  }
`;
const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER);
};

export { useCreateUser };
