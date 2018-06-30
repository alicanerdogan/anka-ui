import { createAsyncActionType, IAction } from "../utils/action";

export type DispatchFn = (T: IAction) => any;

export const GET_REQUEST_TOKEN = createAsyncActionType("GET_REQUEST_TOKEN");
export const GET_ACCESS_TOKEN = createAsyncActionType("GET_ACCESS_TOKEN");
export const GET_TIMELINE = createAsyncActionType("GET_TIMELINE");
