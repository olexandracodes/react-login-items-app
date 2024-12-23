import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { addItem, editItem } from '../redux/itemsSlice.ts';
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ItemsPage: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({ id: 0, name: '' });

  const handleOpen = (item?: { id: number; name: string }) => {
    if (item) {
      setItemData(item);
    } else {
      setItemData({ id: Date.now(), name: '' });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (itemData.id) {
      dispatch(editItem(itemData));
    } else {
      dispatch(addItem(itemData));
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={() => handleOpen()}>Add Item</Button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <Button onClick={() => handleOpen(item)}>Edit</Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{itemData.id ? 'Edit Item' : 'Add Item'}</DialogTitle>
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
    </div>
  );
};

export default ItemsPage;
