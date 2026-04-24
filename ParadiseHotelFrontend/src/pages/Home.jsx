import React, { useState, useContext } from 'react';
import { 
  TextField, Button, Box, Typography, Checkbox, 
  FormControlLabel, Card, CardContent, Grid, Alert 
} from '@mui/material';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext); // Проверяем, залогинен ли юзер

  // Состояние для формы поиска
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    city: '',
    freeParking: false,
    wellnessCenter: false
  });

  // Состояние для результатов и ошибок
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Обработка изменений в полях ввода
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSearchParams({ ...searchParams, [e.target.name]: value });
  };

  // Отправка запроса на поиск
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // GET-запросы в Axios передают параметры через объект params
      const response = await api.get('/rooms/availability', { params: searchParams });
      setRooms(response.data.rooms || []);
      setHasSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при поиске номеров');
    }
  };

  // Функция для бронирования (пока просто заглушка)
  // Обновленная функция для бронирования
  const handleBookRoom = async (roomId) => {
    if (!user) {
      alert("Please log in to book a room!");
      return;
    }
    
    try {
      // Собираем данные для бэкенда согласно API документации
      const bookingData = {
        roomId: roomId,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: Number(searchParams.guests) // Убеждаемся, что это число
      };
      
      await api.post('/reservations', bookingData);
      alert("Успешно! Номер забронирован. Вы можете найти его во вкладке My Reservations.");
      
    } catch (err) {
      alert(err.response?.data?.message || "Ошибка при бронировании");
    }
  };

  return (
    <Box>
      
      <Box sx={{ p: 3, mb: 4, bgcolor: '#f0f7fb', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Find Your Paradise</Typography>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              {/* InputLabelProps={{ shrink: true }} нужен, чтобы текст-подсказка не наезжал на дату */}
              <TextField fullWidth type="date" label="Check-In" name="checkIn" required
                value={searchParams.checkIn} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth type="date" label="Check-Out" name="checkOut" required
                value={searchParams.checkOut} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField fullWidth type="number" label="Guests" name="guests" required
                inputProps={{ min: 1 }} value={searchParams.guests} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="text" label="City (Optional)" name="city"
                value={searchParams.city} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel 
                control={<Checkbox name="freeParking" checked={searchParams.freeParking} onChange={handleChange} />} 
                label="Free Parking" 
              />
              <FormControlLabel 
                control={<Checkbox name="wellnessCenter" checked={searchParams.wellnessCenter} onChange={handleChange} />} 
                label="Wellness Center" 
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" type="submit" size="large">
                Search Rooms
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* --- БЛОК 2: Результаты поиска --- */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {hasSearched && rooms.length === 0 && (
        <Typography variant="h6" color="text.secondary">No rooms found for these dates. Try changing your search.</Typography>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} md={6} lg={4} key={room.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{room.name}</Typography>
                <Typography color="text.secondary" gutterBottom>
                  Hotel: {room.location.name} ({room.location.city})
                </Typography>
                <Typography variant="body2" paragraph>{room.description}</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Price: ${room.pricePerNight} / night
                </Typography>
                <Typography variant="body2">
                  Capacity: {room.capacity} guests
                </Typography>
                <Typography variant="body2" color="success.main">
                  {room.location.hasFreeParking && '🚗 Free Parking '}&nbsp;
                  {room.location.hasWellnessCenter && '💆‍♀️ Wellness Center'}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" color="success" onClick={() => handleBookRoom(room.id)}>
                  Book Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;