import { Photo } from "./profile";

export interface User {
  userName: string;
  displayName: string;
  token: string;
  image?: string;
  photos?: Photo[];
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
