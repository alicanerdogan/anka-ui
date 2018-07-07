import {
  GET_LISTS,
  GET_LIST,
  DispatchFn,
  TIMELINE_QUERY_MODE
} from "./actions";
import { createAction } from "../utils/action";
import * as API from "../utils/rest";

export const getLists = (token: string) => async (dispatch: DispatchFn) => {
  dispatch(createAction(GET_LISTS.default));
  try {
    const payload = await API.getLists(token);
    dispatch(createAction(GET_LISTS.success, payload));
  } catch (error) {
    dispatch(createAction(GET_LISTS.failure, undefined, error));
  }
};

function getTimelineQueryMode(
  query: ITimelineExtendedQueryParams
): TIMELINE_QUERY_MODE {
  if (query.maxId) {
    return TIMELINE_QUERY_MODE.APPEND;
  }
  if (query.sinceId) {
    return TIMELINE_QUERY_MODE.PREPEND;
  }
  return TIMELINE_QUERY_MODE.INITIAL;
}

export const getList = (
  listId: string,
  query: ITimelineExtendedQueryParams
) => async (dispatch: DispatchFn) => {
  dispatch(createAction(GET_LIST.default));
  try {
    const tweets = await API.getList(listId, query);
    const payload = { mode: getTimelineQueryMode(query), tweets, listId };
    dispatch(createAction(GET_LIST.success, payload));
  } catch (error) {
    dispatch(createAction(GET_LIST.failure, undefined, error));
  }
};
