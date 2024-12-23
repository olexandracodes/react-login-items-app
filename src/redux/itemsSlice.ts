import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
	id: number;
	name: string;
}

interface ItemsState {
	items: Item[];
}

const initialState: ItemsState = {
	items: [],
};

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Item>) => {
			state.items.push(action.payload);
		},
		editItem: (state, action: PayloadAction<Item>) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
	},
});

export const { addItem, editItem } = itemsSlice.actions;
export default itemsSlice.reducer;
