import React from 'react';
import { FETCH_POST, FETCH_POST_ERROR, FETCH_POST_PENDING, SET_FETCH_POST_ERROR, SET_FETCH_POST_PENDING, SET_POST } from './constant';


const initialState = {
    [FETCH_POST]: [],
    [FETCH_POST_PENDING]: false,
};

const postReducer = (state = initialState, action) => {
    switch (action?.type) {
        case SET_POST:
            return { ...state, [FETCH_POST]: action?.payload };
        case SET_FETCH_POST_PENDING:
            return { ...state, [FETCH_POST_PENDING]: action?.payload }
        case SET_FETCH_POST_ERROR:
            return { ...state, [FETCH_POST_ERROR]: action?.payload };
        default:
            return state;
    }
}

export default postReducer;