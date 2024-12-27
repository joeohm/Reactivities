import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  // following: boolean;
  // followersCount: number;
  // followingCount: number;
  // photos: Photo[];
}

export class Profile implements IProfile {
  constructor(user: User) {
    this.username = user.userName;
    this.displayName = user.displayName;
    this.image = user.image;
  }

  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}
