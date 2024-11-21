import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import fetchPostSaga from './post/saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]

})

sagaMiddleware.run(fetchPostSaga)
export default store;