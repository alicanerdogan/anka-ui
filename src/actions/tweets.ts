import {
  GET_TIMELINE,
  GET_NEW_TIMELINE,
  GET_OLD_TIMELINE,
  DispatchFn
} from "./actions";
import { createAction, IAction } from "./../utils/action";
import * as API from "../utils/rest";

export const getTimeline = (accessToken: string) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_TIMELINE.default));
  try {
    const payload = await API.getTimeline({ accessToken });
    dispatch(createAction(GET_TIMELINE.success, payload));
  } catch (error) {
    dispatch(createAction(GET_TIMELINE.failure, undefined, error));
  }
};

export const getNewTimeline = (accessToken: string, since_id: string) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_NEW_TIMELINE.default));
  try {
    const payload = await API.getTimeline({ accessToken, since_id });
    dispatch(createAction(GET_NEW_TIMELINE.success, payload));
  } catch (error) {
    dispatch(createAction(GET_NEW_TIMELINE.failure, undefined, error));
  }
};

export const getOldTimeline = (accessToken: string, max_id: string) => async (
  dispatch: DispatchFn
) => {
  dispatch(createAction(GET_OLD_TIMELINE.default));
  try {
    const payload = await API.getTimeline({ accessToken, max_id });
    dispatch(createAction(GET_OLD_TIMELINE.success, payload));
  } catch (error) {
    dispatch(createAction(GET_OLD_TIMELINE.failure, undefined, error));
  }
};
