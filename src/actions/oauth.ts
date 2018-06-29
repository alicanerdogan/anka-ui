import { GET_ACCESS_TOKEN, GET_REQUEST_TOKEN } from "./actions";
import { createAction, IAction } from "./../utils/action";
import * as API from "../utils/rest";

type DispatchFn = (T: IAction) => any;

export const getAccessToken = (
  oauth_token: string,
  oauth_verifier: string
) => async (dispatch: DispatchFn) => {
  dispatch(createAction(GET_ACCESS_TOKEN.default));
  try {
    const payload = await API.getAccessToken(oauth_token, oauth_verifier);
    dispatch(createAction(GET_ACCESS_TOKEN.success, payload));
  } catch (error) {
    dispatch(createAction(GET_ACCESS_TOKEN.failure, undefined, error));
  }
};

export const getRequestToken = () => async (dispatch: DispatchFn) => {
  dispatch(createAction(GET_REQUEST_TOKEN.default));
  try {
    const payload = await API.getRequestToken();
    dispatch(createAction(GET_REQUEST_TOKEN.success, payload));
  } catch (error) {
    dispatch(createAction(GET_REQUEST_TOKEN.failure, undefined, error));
  }
};
