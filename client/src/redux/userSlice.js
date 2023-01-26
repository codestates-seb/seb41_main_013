import { createSlice } from "@reduxjs/toolkit";

export const loginStatusSlice = createSlice({
	name: "loginStatus",
	initialState: { status: false },
	reducers: {
		signin: (state, action) => {
			state.status = true;
		},
		signout: (state) => {
			state.status = false;
		},
	},
});

export const loginUserInfoSlice = createSlice({
	name: "loginUserInfo",
	initialState: { loginUserInfo: {} },
	reducers: {
		getLoginUser: (state, action) => {
			state.loginUserInfo = action.payload;
		},
	},
});

export const { signin, signout } = loginStatusSlice.actions;

export default loginStatusSlice;
