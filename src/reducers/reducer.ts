import { IAction } from "../utils/action";
import { GET_ACCESS_TOKEN, GET_REQUEST_TOKEN } from "./../actions/actions";

export interface IRootState {
  accessToken?: string;
  requestToken?: string;
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
    default: {
      return state;
    }
  }
};

export default RootReducer;
