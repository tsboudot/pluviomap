import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mapReducer from './slices/mapSlice';
import userReducer from './slices/userSlice';
import rainFallReducer from './slices/rainSlice';

const rootReducer = combineReducers({
    map: mapReducer,
    user: userReducer,
    rain: rainFallReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
