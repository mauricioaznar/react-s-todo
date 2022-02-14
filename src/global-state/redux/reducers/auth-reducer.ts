import { ActionType } from "../action-types";
import { Action } from "../actions";
import { CurrentUserQuery } from "../../../services/schema";

interface AuthState {
  accessToken: string | null;
  currentUser: CurrentUserQuery["currentUser"] | null;
}

const initialState = {
  accessToken: window.localStorage.getItem("token") || null,
  currentUser: null,
};

const reducer = (
  state: AuthState = initialState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        accessToken: null,
      };
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
