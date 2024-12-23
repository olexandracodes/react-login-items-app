import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import itemsReducer from "./itemsSlice.ts";

export const store = configureStore({
	reducer: {
		user: userReducer,
		items: itemsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
