import { MARK_ALL_AS_READ } from "./actions";
import { createAction } from "../utils/action";

export const markAllAsRead = () => createAction(MARK_ALL_AS_READ);
