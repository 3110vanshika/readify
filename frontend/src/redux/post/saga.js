import { put, takeLatest } from 'redux-saga/effects'
import { FETCH_POST, SET_FETCH_POST_ERROR, SET_FETCH_POST_PENDING, SET_POST } from './constant'
import axios from 'axios'

function* fetchPost(params){
    try {
        yield put({ type:SET_FETCH_POST_PENDING, payload:true })
        const response = yield axios.get("http://localhost:8000/api/post/");
        if(response?.data?.data?.length){
            yield put({ type:SET_POST, payload: response?.data?.data })
        }
        yield put ({ type:SET_FETCH_POST_PENDING, payload: false })
    } catch (error) {
        yield put({ type:SET_FETCH_POST_ERROR, payload:error?.message })
        yield put({ type:SET_FETCH_POST_PENDING, payload:false })
    }
}

export default function* fetchPostSaga() {
    yield takeLatest(FETCH_POST, fetchPost);
}