import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
} from "@mui/material";

interface ItemDialogProps {
	open: boolean;
	itemData: { id: number; name: string };
	onClose: () => void;
	onSave: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemDialog: React.FC<ItemDialogProps> = ({
	open,
	itemData,
	onClose,
	onSave,
	onChange,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{itemData.id ? "Edit Item" : "Add Item"}</DialogTitle>
			<DialogContent>
				<TextField
					sx={{ marginTop: 1 }}
					label="Item Name"
					fullWidth
					value={itemData.name}
					onChange={onChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onSave}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ItemDialog;
