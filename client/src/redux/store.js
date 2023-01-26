import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginStatusSlice, { loginUserInfoSlice } from "./userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["loginStatus", "loginUserInfo"],
};

const reducers = combineReducers({
	loginStatus: loginStatusSlice.reducer,
	loginUserInfo: loginUserInfoSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
});
