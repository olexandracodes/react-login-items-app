import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
	id: number;
	name: string;
}

interface ItemsState {
	items: Item[];
}

const initialState: ItemsState = {
	items: [
		{ id: 1, name: "Item 1" },
		{ id: 2, name: "Item 2" },
		{ id: 3, name: "Item 3" },
		{ id: 4, name: "Item 4" },
		{ id: 5, name: "Item 5" },
		{ id: 6, name: "Item 6" },
		{ id: 7, name: "Item 7" },
		{ id: 8, name: "Item 8" },
	],
};

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<{ id: number; name: string }>) => {
			state.items.unshift(action.payload); 
		},
		editItem: (state, action: PayloadAction<{ id: number; name: string }>) => {
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
