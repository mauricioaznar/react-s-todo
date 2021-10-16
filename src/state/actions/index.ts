import {ActionType} from "../action-types";

interface Login {
    type: ActionType.LOGIN
    payload: string;
}

interface Logout {
    type: ActionType.LOGOUT
}

export type Action = Login | Logout
