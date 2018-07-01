import { IAction } from "../utils/action";
import {
  GET_ACCESS_TOKEN,
  GET_REQUEST_TOKEN,
  GET_TIMELINE,
  GET_NEW_TIMELINE,
  GET_OLD_TIMELINE
} from "./../actions/actions";
import { drop } from "lodash-es";

export interface IRootState {
  accessToken?: string;
  requestToken?: string;
  timeline?: any[];
}
type Reducer = (T: IRootState, U: IAction) => IRootState;

const DEFAULT_STATE: IRootState = {};

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
      return { ...state, timeline: [...action.payload, ...state.timeline] };
    }
    case GET_OLD_TIMELINE.success: {
      return {
        ...state,
        timeline: [...state.timeline, ...drop(action.payload, 1)]
      };
    }
    default: {
      return state;
    }
  }
};

export default RootReducer;
