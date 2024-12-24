import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { addItem, editItem } from "../redux/itemsSlice.ts";
import {
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Pagination,
	TextField,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ItemsPage: React.FC = () => {
	const dispatch = useDispatch();
	const items = useSelector((state: RootState) => state.items.items);

	const [open, setOpen] = useState(false);
	const [itemData, setItemData] = useState({ id: 0, name: "" });
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;

	const toggleDialog = (
		item: { id: number; name: string } = { id: 0, name: "" }
	) => {
		setItemData(item.id ? item : { id: Date.now(), name: "" });
		setOpen((prev) => !prev);
	};

	const handleSave = () => {
		if (itemData.name.trim()) {
			dispatch(
				items.some((item) => item.id === itemData.id)
					? editItem(itemData)
					: addItem(itemData)
			);
			toggleDialog();
		}
	};

	const currentItems = items.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(items.length / itemsPerPage);

	return (
		<Box sx={{ padding: 2 }}>
			<Button variant="contained" onClick={() => toggleDialog()}>
				Add Item
			</Button>

			<Grid container spacing={4} sx={{ marginTop: 2 }}>
				{currentItems.map((item) => (
					<Grid size={{ xs: 6, sm: 6, md: 3 }} key={item.id}>
						<Card
							sx={{ display: "flex", flexDirection: "column", height: "100%" }}
						>
							<CardContent>
								<Typography variant="h6">{item.name}</Typography>
								<Button
									variant="outlined"
									sx={{ marginTop: 2 }}
									onClick={() => toggleDialog(item)}
								>
									Edit
								</Button>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{totalPages > 1 || currentPage === 1 ? (
				<Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={(_, page) => setCurrentPage(page)}
						color="primary"
					/>
				</Box>
			) : null}

			<Dialog open={open} onClose={() => toggleDialog()}>
				<DialogTitle>{itemData.id ? "Edit Item" : "Add Item"}</DialogTitle>
				<DialogContent>
					<TextField
						label="Item Name"
						fullWidth
						value={itemData.name}
						onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => toggleDialog()}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ItemsPage;
