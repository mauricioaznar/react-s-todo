import { ActionType } from "../action-types";
import { Action } from "../actions";
import { GlobalMessage } from "../../../types/global-message";

interface AuthState {
  globalMessages: GlobalMessage[];
}

const initialState = {
  globalMessages: [],
};

const reducer = (
  state: AuthState = initialState,
  action: Action,
): AuthState => {
  switch (action.type) {
    case ActionType.PUSH_MESSAGE:
      return {
        ...state,
        globalMessages: [...state.globalMessages, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
