import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, 
  FormControlLabel, Checkbox, Grid, Alert
} from '@mui/material';
import api from '../api/axiosConfig';

function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', city: '', address: '', description: '', 
    rating: 5, hasFreeParking: false, hasWellnessCenter: false, imageUrl: ''
  });

  const fetchLocations = async () => {
    try {
      const response = await api.get('/admin/locations');
      setLocations(response.data.locations || []);
    } catch (err) {
      setError('Failed to load locations');
    }
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ name: '', city: '', address: '', description: '', rating: 5, hasFreeParking: false, hasWellnessCenter: false, imageUrl: '' });
    setOpen(true);
  };

  const handleOpenEdit = (loc) => {
    setEditingId(loc.id);
    setFormData({
      name: loc.name, city: loc.city, address: loc.address, description: loc.description,
      rating: loc.rating, hasFreeParking: loc.hasFreeParking, hasWellnessCenter: loc.hasWellnessCenter, imageUrl: loc.imageUrl || ''
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    try {
      const dataToSend = { ...formData, rating: Number(formData.rating) };

      if (editingId) {
        await api.put(`/admin/locations/${editingId}`, dataToSend);
      } else {
        await api.post('/admin/locations', dataToSend);
      }
      setOpen(false);
      fetchLocations();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save location');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await api.delete(`/admin/locations/${id}`);
        fetchLocations();
      } catch (err) {
        alert(err.response?.data?.message || 'Unable to delete hotel (it may have linked rooms/reservations)');
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Manage Locations</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          + Add Location
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Hotel Name</b></TableCell>
              <TableCell><b>City</b></TableCell>
              <TableCell><b>Rating</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((loc) => (
              <TableRow key={loc.id} hover>
                <TableCell>{loc.id}</TableCell>
                <TableCell>{loc.name}</TableCell>
                <TableCell>{loc.city}</TableCell>
                <TableCell>{loc.rating} ⭐️</TableCell>
                <TableCell align="right">
                  <Button size="small" color="primary" onClick={() => handleOpenEdit(loc)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(loc.id)} sx={{ ml: 1 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Location' : 'Add New Location'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Hotel Name" name="name" value={formData.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" multiline rows={3} value={formData.description} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Rating" name="rating" inputProps={{ min: 1, max: 5, step: 0.1 }} value={formData.rating} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox name="hasFreeParking" checked={formData.hasFreeParking} onChange={handleChange} />} label="Free Parking" />
              <FormControlLabel control={<Checkbox name="hasWellnessCenter" checked={formData.hasWellnessCenter} onChange={handleChange} />} label="Wellness Center" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{editingId ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminLocations;