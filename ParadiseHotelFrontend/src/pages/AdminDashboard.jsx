import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, CircularProgress, Alert, Paper } from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import api from '../api/axiosConfig';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/api/admin/dashboard');
        setData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      }
    };
    fetchDashboardData();
  }, []);

  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  if (!data) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;

  const { summary, reservationsByMonth, reservationsByLocation, reservationsByStatus } = data;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Administrator Dashboard
      </Typography>

      {/* --- СЕКЦИЯ 1: СУММАРНЫЕ КАРТОЧКИ --- */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { label: 'Total Users', value: summary.totalUsers, color: '#2196f3' },
          { label: 'Total Locations', value: summary.totalLocations, color: '#9c27b0' },
          { label: 'Active Bookings', value: summary.activeReservations, color: '#4caf50' },
          { label: 'Cancelled', value: summary.cancelledReservations, color: '#f44336' }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" gutterBottom>
                  {item.label.toUpperCase()}
                </Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ color: item.color }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- СЕКЦИЯ 2: ГРАФИКИ --- */}
      <Grid container spacing={4}>
        
        {/* График тренда бронирований (Bar Chart) */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Reservations Trend (Monthly)</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={reservationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2196f3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Статистика по статусам (Pie Chart) */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Booking Status</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={reservationsByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%" cy="50%"
                  outerRadius={80}
                  label
                >
                  {reservationsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.status === 'active' ? '#4caf50' : '#f44336'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Бронирования по локациям (Pie Chart - Donut style) */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Bookings by Location</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={reservationsByLocation}
                  dataKey="count"
                  nameKey="name"
                  cx="50%" cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {reservationsByLocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

export default AdminDashboard;