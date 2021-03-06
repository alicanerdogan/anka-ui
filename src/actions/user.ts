import { DispatchFn, GET_USER } from "./actions";
import { createAction } from "../utils/action";
import * as API from "../utils/rest";

export const getUser = (screen_name: string, accessToken: string) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_USER.default));
  try {
    const payload = await API.getUser(screen_name, accessToken);
    dispatch(createAction(GET_USER.success, payload));
  } catch (error) {
    dispatch(createAction(GET_USER.failure, undefined, error));
  }
};
