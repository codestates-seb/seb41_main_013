import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginStatusSlice from "./redux/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["loginStatus"],
};

const reducers = combineReducers({
	loginStatus: loginStatusSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
});
