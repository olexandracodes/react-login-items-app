import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { addItem, editItem } from "../redux/itemsSlice.ts";
import { logout } from "../redux/userSlice.ts";
import {
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../components/Pagination.tsx";

const ItemsPage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const currentItems = items.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(items.length / itemsPerPage);

	return (
		<Box sx={{ padding: 2, paddingBottom: "70px" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: 2,
				}}
			>
				<Button
					variant="contained"
					onClick={() => toggleDialog()}
					startIcon={<AddIcon />}
				>
					Add Item
				</Button>
				<Button
					variant="contained"
					onClick={handleLogout}
					sx={{
						backgroundColor: "background.default",
						color: "black ",
					}}
					endIcon={<LogoutIcon />}
				>
					Logout
				</Button>
			</Box>

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

			<PaginationComponent 
				totalPages={totalPages} 
				currentPage={currentPage} 
				onPageChange={(_, page) => setCurrentPage(page)} 
			/>

			<Dialog open={open} onClose={() => toggleDialog()}>
				<DialogTitle>{itemData.id ? "Edit Item" : "Add Item"}</DialogTitle>
				<DialogContent>
					<TextField
						sx={{ marginTop: 1 }}
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
