import React, { useState, useContext } from 'react';
import { 
  TextField, Button, Box, Typography, Checkbox, 
  FormControlLabel, Card, CardContent, Grid, Alert, CardMedia
} from '@mui/material';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    search: '',
    city: '',
    rating: '',
    freeParking: false,
    wellnessCenter: false
  });

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // One handler for all inputs (text, number, checkbox) keeps form code tidy.
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSearchParams({ ...searchParams, [e.target.name]: value });
  };

  // Search endpoint accepts the same shape as searchParams, so we pass it directly.
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.get('/rooms/availability', { params: searchParams });
      setRooms(response.data.rooms || []);
      setHasSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search rooms');
    }
  };

  // Booking is blocked for guests without login.
  const handleBookRoom = async (roomId) => {
    if (!user) {
      alert("Please log in to book a room!");
      return;
    }
    
    try {
      const bookingData = {
        roomId: roomId,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: Number(searchParams.guests)
      };
      
      await api.post('/reservations', bookingData);
      alert('Success! Room booked. You can find it in My Reservations.');
      
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <Box sx={{ mt: -4, mx: -4 }}>
      <Box 
        sx={{ 
          height: { xs: '300px', md: '500px' },
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          px: 2,
          mb: 5
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
          Welcome to Paradise
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, maxWidth: '800px', fontWeight: 300 }}>
          Experience luxury, comfort, and world-class facilities across the most beautiful locations. Your perfect getaway starts here.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Box sx={{ p: { xs: 2, md: 4 }, mb: 6, bgcolor: 'background.paper', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', mt: { md: -12 }, position: 'relative', zIndex: 10 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>Find Your Perfect Room</Typography>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2} alignItems="center">
              
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Check-In" name="checkIn" required value={searchParams.checkIn} onChange={handleChange} 
                  type="date"
                  sx={{
                    '& input[type="date"]::-webkit-datetime-edit': {
                      color: searchParams.checkIn ? 'inherit' : 'transparent'
                    },
                    '& input[type="date"]:focus::-webkit-datetime-edit': {
                      color: 'inherit'
                    }
                  }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Check-Out" name="checkOut" required value={searchParams.checkOut} onChange={handleChange} 
                  type="date"
                  sx={{
                    '& input[type="date"]::-webkit-datetime-edit': {
                      color: searchParams.checkOut ? 'inherit' : 'transparent'
                    },
                    '& input[type="date"]:focus::-webkit-datetime-edit': {
                      color: 'inherit'
                    }
                  }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth type="number" label="Guests" name="guests" required inputProps={{ min: 1 }} value={searchParams.guests} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField fullWidth type="text" label="Hotel Name (Optional)" name="search" value={searchParams.search} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth type="text" label="City (Optional)" name="city" value={searchParams.city} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth type="number" label="Min Rating (1-5)" name="rating" inputProps={{ min: 1, max: 5, step: 0.1 }} value={searchParams.rating} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={8}>
                <FormControlLabel control={<Checkbox name="freeParking" checked={searchParams.freeParking} onChange={handleChange} />} label="Free Parking" />
                <FormControlLabel control={<Checkbox name="wellnessCenter" checked={searchParams.wellnessCenter} onChange={handleChange} />} label="Wellness Center" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button fullWidth variant="contained" type="submit" size="large" sx={{ py: 1.5, fontWeight: 'bold' }}>
                  SEARCH ROOMS
                </Button>
              </Grid>

            </Grid>
          </form>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        {hasSearched && rooms.length === 0 && (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>No rooms found for these dates. Try changing your search.</Typography>
        )}

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {rooms.map((room) => (
            <Grid item xs={12} md={6} lg={4} key={room.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' } }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={`https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80&random=${room.id}`}
                  alt={room.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>{room.name}</Typography>
                  <Typography color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    📍 {room.location.name} ({room.location.city})
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ mt: 2, color: 'text.secondary' }}>{room.description}</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Price per night</Typography>
                      <Typography variant="h6" fontWeight="bold" color="primary">${room.pricePerNight}</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="caption" color="text.secondary">Capacity</Typography>
                      <Typography variant="subtitle2" fontWeight="bold">{room.capacity} Guests</Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 2, fontWeight: 'bold' }}>
                    {room.location.hasFreeParking && '🚗 Free Parking  '} 
                    {room.location.hasWellnessCenter && '💆‍♀️ Wellness Center'}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="contained" size="large" onClick={() => handleBookRoom(room.id)} sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                    Book Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;