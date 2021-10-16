import {ActionType} from "../action-types";
import {Action} from "../actions";

interface AuthState {
    accessToken: string | null;
}

const initialState = {
    accessToken: null
}

const reducer = (
    state: AuthState = initialState,
    action: Action
): AuthState => {
    switch (action.type) {
        case ActionType.LOGIN:
            return {
                accessToken: action.payload
            }
        case ActionType.LOGOUT:
            return {
                accessToken: null
            }
        default:
            return state;
    }
}

export default reducer
