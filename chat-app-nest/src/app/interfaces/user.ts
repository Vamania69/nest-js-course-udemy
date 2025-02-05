import { abstractUser } from "./abstract-user";

export interface User extends abstractUser {
  email: string;
}
