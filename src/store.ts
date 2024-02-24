import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import siteReducer from './slices/siteSlice';

const rootReducer = combineReducers({
    user: userReducer,
    site: siteReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
