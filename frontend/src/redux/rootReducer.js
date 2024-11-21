import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import postReducer from "./post/reducer";

const rootReducer = combineReducers({
    userReducer,
    postReducer
});

export default rootReducer;