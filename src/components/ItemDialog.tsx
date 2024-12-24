import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
} from "@mui/material";
import { Field, Form, Formik } from "formik";

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
				<Formik
					initialValues={{ name: itemData.name }}
					onSubmit={() => {
						onSave();
					}}
					enableReinitialize
				>
					{({ handleSubmit, values }) => (
						<Form onSubmit={handleSubmit}>
							<Field
								as={TextField}
								sx={{ marginTop: 1 }}
								name="name"
								label="Item Name"
								fullWidth
								value={values.name}
								onChange={onChange}
							/>
							<DialogActions>
								<Button onClick={onClose}>Cancel</Button>
								<Button type="submit">Save</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};

export default ItemDialog;
