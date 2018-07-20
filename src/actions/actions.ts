import { createAsyncActionType, IAction } from "../utils/action";

export type DispatchFn = (T: IAction) => any;

export enum TIMELINE_QUERY_MODE {
  INITIAL,
  PREPEND,
  APPEND
}

export const GET_REQUEST_TOKEN = createAsyncActionType("GET_REQUEST_TOKEN");
export const GET_ACCESS_TOKEN = createAsyncActionType("GET_ACCESS_TOKEN");
export const GET_TIMELINE = createAsyncActionType("GET_TIMELINE");
export const GET_LIKES = createAsyncActionType("GET_LIKES");
export const GET_LISTS = createAsyncActionType("GET_LISTS");
export const GET_LIST = createAsyncActionType("GET_LIST");
export const GET_TWEET = createAsyncActionType("GET_TWEET");
export const GET_REPLIES = createAsyncActionType("GET_REPLIES");
export const GET_USER = createAsyncActionType("GET_USER");

export const MARK_ALL_AS_READ = "MARK_ALL_AS_READ";
