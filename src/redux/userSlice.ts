import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	isLoggedIn: boolean;
	email: string | null;
}

const initialState: UserState = {
	isLoggedIn: false,
	email: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ email: string; password: string }>
		) => {
			state.isLoggedIn = true;
			state.email = action.payload.email;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.email = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
