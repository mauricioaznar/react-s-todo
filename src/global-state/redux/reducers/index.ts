import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import globalMessagesReducer from "./global-messages-reducer";

const reducers = combineReducers({
  auth: authReducer,
  globalMessages: globalMessagesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
