import { IAction } from "../utils/action";
import {
  GET_ACCESS_TOKEN,
  GET_REQUEST_TOKEN,
  GET_TIMELINE,
  GET_NEW_TIMELINE,
  GET_OLD_TIMELINE,
  MARK_ALL_AS_READ
} from "./../actions/actions";
import { drop } from "lodash-es";

export interface IRootState {
  accessToken?: string;
  requestToken?: string;
  timeline?: any[];
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
      return { ...state, timeline: action.payload };
    }
    case GET_NEW_TIMELINE.success: {
      return {
        ...state,
        timeline: [...action.payload, ...state.timeline],
        unseenTweetCount: state.unseenTweetCount + action.payload.length
      };
    }
    case GET_OLD_TIMELINE.success: {
      return {
        ...state,
        timeline: [...state.timeline, ...drop(action.payload, 1)]
      };
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
