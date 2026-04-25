import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import api from '../api/axiosConfig';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data.summary);
      } catch (err) {
        setError('Failed to load statistics. Please check your access rights.');
      }
    };
    fetchStats();
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!stats) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Total Users</Typography>
              <Typography variant="h3" color="primary">{stats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f3e5f5' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Total Locations</Typography>
              <Typography variant="h3" color="secondary">{stats.totalLocations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Active Reservations</Typography>
              <Typography variant="h3" color="success.main">{stats.activeReservations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ffebee' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>Cancelled</Typography>
              <Typography variant="h3" color="error.main">{stats.cancelledReservations}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;