export interface IAction {
  type: ActionType;
  payload?: any;
  error?: Error;
}

export type ActionType = string;

export interface IAsyncActionType {
  default: ActionType;
  success: ActionType;
  failure: ActionType;
}

export function createAction(
  type: string,
  payload?: any,
  error?: any
): IAction {
  return {
    type,
    payload,
    error
  };
}

export function createAsyncActionType(type: string): IAsyncActionType {
  return {
    default: type,
    success: `${type}_SUCCESS`,
    failure: `${type}_FAILURE`
  };
}
