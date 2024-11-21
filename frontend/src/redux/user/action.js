import { GET_USER_FROM_SESSION_STORAGE, LOGIN, LOGOUT, SET_USER } from "./constant";


export const login = (user) => ({
    type: LOGIN,
    payload: user,
});

export const set_user = (user) => ({
    type: SET_USER,
    payload: user
})

export const logout = () => ({
    type: LOGOUT,
});

export const getUserFromSessionStorage = () => ({
    type: GET_USER_FROM_SESSION_STORAGE
})