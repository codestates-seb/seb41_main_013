import { createSlice } from "@reduxjs/toolkit";

export const loginStatusSlice = createSlice({
	name: "loginStatus",
	initialState: { status: false },
	reducers: {
		signin: (state) => {
			state.status = true;
		},
		signout: (state) => {
			state.status = false;
		},
	},
});

export const loginUserInfoSlice = createSlice({
	name: "loginUserInfo",
	initialState: {
		loginUserInfo: {},
	},
	reducers: {
		getLoginUser: (state, action) => {
			state.loginUserInfo = action.payload;
			// console.log("state.loginUserInfo :", state.loginUserInfo);
		},
	},
});

export const { signin, signout } = loginStatusSlice.actions;
export const { getLoginUser } = loginUserInfoSlice.actions;

export default loginStatusSlice;
