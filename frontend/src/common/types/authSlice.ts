import { UserType } from "./user";

export type loginUserProps = {
  email: string;
  password: string;
};
export type registerUserProps = {
  email: string;
  password: string;
  avatar: File | null;
};
export type initialStateProps = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType | null;
  error: string | null;
};
