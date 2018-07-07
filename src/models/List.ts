import { IUser } from "./User";

export enum LIST_MODE {
  PUBLIC = "public",
  PRIVATE = "private"
}

export interface IList {
  slug: string;
  name: string;
  created_at: string;
  user: IUser;
  uri: string;
  subscriber_count: number;
  id_str: string;
  member_count: number;
  mode: LIST_MODE;
  id: number;
  full_name: string;
  description: string;
  following: boolean;
}
