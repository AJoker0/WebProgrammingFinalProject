import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext'; // Импортируем контекст

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Достаем функцию login
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      // Бэкенд присылает token и объект user
      const { token, user } = response.data;
      
      // Сохраняем в контекст и LocalStorage
      login(user, token); 
      
      // Перенаправляем на главную
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Неверный email или пароль');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth margin="normal" label="Email" name="email" type="email"
          value={formData.email} onChange={handleChange} required
        />
        <TextField
          fullWidth margin="normal" label="Password" name="password" type="password"
          value={formData.password} onChange={handleChange} required
        />
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Sign In
        </Button>
      </form>
    </Box>
  );
}

export default Login;