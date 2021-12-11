import {ActionType} from "../action-types";
import {CurrentUserQuery, User} from "../../services/schema";

interface Login {
    type: ActionType.LOGIN
    payload: string;
}

interface Logout {
    type: ActionType.LOGOUT
}

interface SetCurrentUser {
    type: ActionType.SET_CURRENT_USER,
    payload: CurrentUserQuery["currentUser"]
}

export type Action = Login | Logout | SetCurrentUser
