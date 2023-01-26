import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./counter/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["member"],
};

const reducers = combineReducers({
	member: userSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
});
