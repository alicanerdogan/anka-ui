import { IAction } from "../utils/action";
import {
  GET_ACCESS_TOKEN,
  GET_REQUEST_TOKEN,
  GET_TIMELINE,
  GET_LIKES,
  MARK_ALL_AS_READ,
  TIMELINE_QUERY_MODE
} from "./../actions/actions";
import { drop } from "lodash-es";
import { ITweet } from "../models/Tweet";

export interface IRootState {
  accessToken?: string;
  requestToken?: string;
  timeline?: ITweet[];
  likes?: ITweet[];
  unseenTweetCount: number;
}
type Reducer = (T: IRootState, U: IAction) => IRootState;

const DEFAULT_STATE: IRootState = { unseenTweetCount: 0 };

const RootReducer: Reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN.success: {
      return { ...state, accessToken: action.payload };
    }
    case GET_REQUEST_TOKEN.success: {
      return { ...state, requestToken: action.payload };
    }
    case GET_TIMELINE.success: {
      const payload: { tweets: ITweet[]; mode: TIMELINE_QUERY_MODE } =
        action.payload;
      switch (payload.mode) {
        case TIMELINE_QUERY_MODE.INITIAL: {
          return { ...state, timeline: payload.tweets };
        }
        case TIMELINE_QUERY_MODE.PREPEND: {
          return {
            ...state,
            timeline: [...action.payload.tweets, ...state.timeline],
            unseenTweetCount: state.unseenTweetCount + payload.tweets.length
          };
        }
        case TIMELINE_QUERY_MODE.APPEND: {
          return {
            ...state,
            timeline: [...state.timeline, ...drop(action.payload.tweets, 1)]
          };
        }
        default: {
          return state;
        }
      }
    }
    case GET_LIKES.success: {
      const payload: { tweets: ITweet[]; mode: TIMELINE_QUERY_MODE } =
        action.payload;
      switch (payload.mode) {
        case TIMELINE_QUERY_MODE.INITIAL: {
          return { ...state, likes: payload.tweets };
        }
        case TIMELINE_QUERY_MODE.PREPEND: {
          return {
            ...state,
            likes: [...action.payload.tweets, ...state.likes]
          };
        }
        case TIMELINE_QUERY_MODE.APPEND: {
          return {
            ...state,
            likes: [...state.likes, ...drop(action.payload.tweets, 1)]
          };
        }
        default: {
          return state;
        }
      }
    }
    case MARK_ALL_AS_READ: {
      return {
        ...state,
        unseenTweetCount: 0
      };
    }
    default: {
      return state;
    }
  }
};

export default RootReducer;
