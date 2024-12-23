import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.ts";
import { addItem, editItem } from "../redux/itemsSlice.ts";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const ItemsPage: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({ id: 0, name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const generateRandomId = () => Math.floor(Math.random() * 10000);

  const handleOpen = (item?: { id: number; name: string }) => {
    if (item) {
      setItemData(item);
    } else {
      setItemData({ id: generateRandomId(), name: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (itemData.id && itemData.name.trim()) {
      dispatch(editItem(itemData));
    } else if (itemData.name.trim()) {
      dispatch(addItem({ id: generateRandomId(), name: itemData.name }));
    }
    handleClose();
  };

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = items
    .sort((a, b) => b.id - a.id) 
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button onClick={() => handleOpen()} variant="contained" color="primary">
        Add Item
      </Button>
      <Grid
        container
        spacing={4}
        sx={{
          marginTop: 2,
        }}
      >
        {currentItems.map((item) => (
          <Grid item xs={6} sm={3} key={item.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Button
                  onClick={() => handleOpen(item)}
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalItems > itemsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{itemData.id ? "Edit Item" : "Add Item"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            value={itemData.name}
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ItemsPage;
