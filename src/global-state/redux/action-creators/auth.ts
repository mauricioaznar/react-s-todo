import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";
import { CurrentUserQuery } from "../../../services/schema";

export const login = (accessToken: string) => {
  return async (dispatch: Dispatch<Action>) => {
    window.localStorage.setItem("token", accessToken);
    dispatch({
      type: ActionType.LOGIN,
      payload: accessToken,
    });
  };
};

export const setCurrentUser = (user: CurrentUserQuery["currentUser"]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CURRENT_USER,
      payload: user,
    });
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<Action>) => {
    window.localStorage.removeItem("token");
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};
