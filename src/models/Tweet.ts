import { ITweetEntities, ITweetExtendedEntities } from "./Entity";
import { IUser } from "./User";

export interface ITweet {
  created_at: string;
  id: number;
  id_str: string;
  text?: string;
  full_text: string;
  truncated: boolean;
  entities: ITweetEntities;
  extended_entities: ITweetExtendedEntities;
  source: string;
  in_reply_to_status_id: number;
  in_reply_to_status_id_str: string;
  in_reply_to_user_id: number;
  in_reply_to_user_id_str: string;
  in_reply_to_screen_name: string;
  user: IUser;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: null | any[];
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  possibly_sensitive_appealable: boolean;
  lang: string;
  retweeted_status?: ITweet;
}
