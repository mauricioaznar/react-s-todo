import { ActionType } from "../action-types";
import { CurrentUserQuery, User } from "../../../services/schema";
import { GlobalMessage } from "../../../types/global-message";

interface Login {
  type: ActionType.LOGIN;
  payload: string;
}

interface Logout {
  type: ActionType.LOGOUT;
}

interface SetCurrentUser {
  type: ActionType.SET_CURRENT_USER;
  payload: CurrentUserQuery["currentUser"];
}

interface PushMessage {
  type: ActionType.PUSH_MESSAGE;
  payload: GlobalMessage;
}

export type Action = Login | Logout | SetCurrentUser | PushMessage;
