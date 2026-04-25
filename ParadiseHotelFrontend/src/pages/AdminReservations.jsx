import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Alert 
} from '@mui/material';
import api from '../api/axiosConfig';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const response = await api.get('/admin/reservations');
        setReservations(response.data.reservations || []);
      } catch (err) {
        setError('Failed to load reservation list');
      }
    };
    fetchAllReservations();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>All System Reservations</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="reservations table">
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Guest Info</b></TableCell>
              <TableCell><b>Hotel & Room</b></TableCell>
              <TableCell><b>Dates</b></TableCell>
              <TableCell align="center"><b>Guests</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id} hover>
                <TableCell>{res.id}</TableCell>
                <TableCell>
                  {res.guestName}<br/>
                  <Typography variant="caption" color="text.secondary">{res.guestEmail}</Typography>
                </TableCell>
                <TableCell>
                  {res.locationName} ({res.locationCity})<br/>
                  <Typography variant="caption" color="text.secondary">{res.roomName}</Typography>
                </TableCell>
                <TableCell>
                  {res.checkIn} <br/> {res.checkOut}
                </TableCell>
                <TableCell align="center">{res.guests}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={res.status.toUpperCase()} 
                    color={res.status === 'active' ? 'success' : 'error'} 
                    size="small" 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminReservations;