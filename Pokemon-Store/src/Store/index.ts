import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga);
export default store;