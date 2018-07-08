import {
  GET_TIMELINE,
  DispatchFn,
  GET_LIKES,
  GET_TWEET,
  GET_REPLIES,
  TIMELINE_QUERY_MODE
} from "./actions";
import { createAction, IAction } from "../utils/action";
import * as API from "../utils/rest";

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

export const getTimeline = (query: ITimelineExtendedQueryParams) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_TIMELINE.default));
  try {
    const tweets = await API.getTimeline(query);
    const payload = { mode: getTimelineQueryMode(query), tweets };
    dispatch(createAction(GET_TIMELINE.success, payload));
  } catch (error) {
    dispatch(createAction(GET_TIMELINE.failure, undefined, error));
  }
};

export const getLikes = (query: ITimelineExtendedQueryParams) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_LIKES.default));
  try {
    const tweets = await API.getLikes(query);
    const payload = { mode: getTimelineQueryMode(query), tweets };
    dispatch(createAction(GET_LIKES.success, payload));
  } catch (error) {
    dispatch(createAction(GET_LIKES.failure, undefined, error));
  }
};

export const getTweet = (tweetId: string, accessToken: string) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_TWEET.default));
  try {
    const payload = await API.getTweet(tweetId, accessToken);
    dispatch(createAction(GET_TWEET.success, payload));
  } catch (error) {
    dispatch(createAction(GET_TWEET.failure, undefined, error));
  }
};

export const getReplies = (
  screenName: string,
  tweetId: string,
  accessToken: string
) => async (dispatch: DispatchFn) => {
  dispatch(createAction(GET_REPLIES.default));
  try {
    const payload = await API.getReplies(screenName, tweetId, accessToken);
    dispatch(createAction(GET_REPLIES.success, payload));
  } catch (error) {
    dispatch(createAction(GET_REPLIES.failure, undefined, error));
  }
};
