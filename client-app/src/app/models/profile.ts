import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
}

export class Profile implements IProfile {
  constructor(user: User) {
    this.username = user.userName;
    this.displayName = user.displayName;
    this.image = user.image;
    this.photos = user.photos;
  }
  following: boolean = false;
  followersCount: number = 0;
  followingCount: number = 0;
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}
export class ProfileFormValues {
  displayName: string = "";
  bio: string | undefined = "";
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UserActivity {
  id: string;
  title: string;
  category: string;
  date: Date;
}
