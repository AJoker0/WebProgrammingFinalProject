import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Card, CardContent, Button, Grid, Alert, Chip } from '@mui/material';
import { Navigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

function Reservations() {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  // Функция для получения бронирований с бэкенда
  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservations/me');
      setReservations(response.data.reservations || []);
    } catch (err) {
      setError('Failed to load reservations');
    }
  };

  // Вызываем функцию один раз при загрузке страницы
  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  // Функция отмены
  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await api.delete(`/reservations/${id}`);
        fetchReservations(); // Сразу же перезапрашиваем список, чтобы обновить статус на экране
      } catch (err) {
        alert('Failed to cancel reservation');
      }
    }
  };

  // Базовая защита: если кто-то без логина попытается зайти по прямой ссылке, кидаем его на логин
  if (!user) return <Navigate to="/login" />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My Reservations</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {reservations.length === 0 ? (
        <Typography color="text.secondary">You have no reservations yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {reservations.map((res) => (
            <Grid item xs={12} md={6} key={res.id}>
              {/* Если статус активен - делаем зеленую полоску слева, если отменен - красную */}
              <Card sx={{ borderLeft: res.status === 'active' ? '5px solid #2e7d32' : '5px solid #d32f2f' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{res.roomName}</Typography>
                    <Chip 
                      label={res.status.toUpperCase()} 
                      color={res.status === 'active' ? 'success' : 'error'} 
                      size="small" 
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    Hotel: {res.locationName} ({res.locationCity})
                  </Typography>
                  <Typography variant="body1">
                    Dates: <b>{res.checkIn}</b> to <b>{res.checkOut}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Guests: {res.guests}
                  </Typography>
                  
                  {/* Кнопку отмены показываем только для активных броней */}
                  {res.status === 'active' && (
                    <Button variant="outlined" color="error" onClick={() => handleCancel(res.id)}>
                      Cancel Reservation
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Reservations;