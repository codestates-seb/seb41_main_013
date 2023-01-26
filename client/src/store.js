import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./counter/userSlice";

export const store = configureStore({
	reducer: { member: userSlice.reducer },
});
