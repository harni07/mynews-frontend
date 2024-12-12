import { UserData } from "../models/userData";

export const prepareHeaders = (headers: Headers) => {
  const userDataString = localStorage.getItem("token");
  const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null;
  const token = userData?.access_token;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};
