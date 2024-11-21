import { GET_USER_FROM_SESSION_STORAGE, LOGIN, LOGOUT, SET_USER } from "./constant";


const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user:action?.payload}
        case LOGIN:
            return {...state, user:action?.payload};
        case LOGOUT:
            return {...state, user:null};
        case GET_USER_FROM_SESSION_STORAGE: {
            {
                const getUserFromSessionStorage = sessionStorage.getItem("user")
                return {...state, user: JSON.parse(getUserFromSessionStorage)}
            }
        }
        default:
            return state;
    }
};

export default userReducer;