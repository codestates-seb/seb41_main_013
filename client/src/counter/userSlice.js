import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: false,
	member_id: null,
	member_name: null,
	accessToken: null,
	refreshToken: null,
};

export const userSlice = createSlice({
	name: "member",
	initialState,
	reducers: {
		loginAccount: (state, action) => ({
			...state,
			isLogin: true,
			member_id: action.payload.member_id,
			member_name: action.payload.member_name,
			accessToken: action.payload.accessToken,
			refreshToken: action.payload.refreshToken,
		}),
		logoutAccount: (state) => {
			state.isLogin = false;
			state.member_name = null;
		},
	},
});

export const { loginAccount, logoutAccount } = userSlice.actions;

export default userSlice;
