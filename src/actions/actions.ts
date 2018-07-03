import { createAsyncActionType, IAction } from "../utils/action";

export type DispatchFn = (T: IAction) => any;

export const GET_REQUEST_TOKEN = createAsyncActionType("GET_REQUEST_TOKEN");
export const GET_ACCESS_TOKEN = createAsyncActionType("GET_ACCESS_TOKEN");
export const GET_TIMELINE = createAsyncActionType("GET_TIMELINE");
export const GET_NEW_TIMELINE = createAsyncActionType("GET_NEW_TIMELINE");
export const GET_OLD_TIMELINE = createAsyncActionType("GET_OLD_TIMELINE");

export const MARK_ALL_AS_READ = "MARK_ALL_AS_READ";
