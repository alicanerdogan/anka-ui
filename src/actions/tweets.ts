import { GET_TIMELINE, DispatchFn } from "./actions";
import { createAction, IAction } from "./../utils/action";
import * as API from "../utils/rest";

export const getTimeline = (accessToken: string) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_TIMELINE.default));
  try {
    const payload = await API.getTimeline(accessToken);
    dispatch(createAction(GET_TIMELINE.success, payload));
  } catch (error) {
    dispatch(createAction(GET_TIMELINE.failure, undefined, error));
  }
};
