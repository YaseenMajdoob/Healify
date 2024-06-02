import { persistCombineReducers } from "redux-persist";
import { UPDATE_UID } from "../actions/user";

const user  = (user = { uid: ''}, action) => {
    switch (action.type) {
        case UPDATE_UID:
            return { uid: action.uid }
        default:
            return user;
    }
}

export default persistCombineReducers({ user });
