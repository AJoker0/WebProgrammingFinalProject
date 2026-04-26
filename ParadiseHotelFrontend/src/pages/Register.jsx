import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import api from '../api/axiosConfig';

function Register() {
    const navigate = useNavigate();
    // Keep user input in one object so submit is easy.
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    // Show backend validation message near the form.
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // Stop default reload on form submit.
        try {
        // Create account and redirect to login on success.
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
        // Fall back to a generic message if backend response is missing.
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth margin="normal" label="Full Name" name="name"
          value={formData.name} onChange={handleChange} required
        />
        <TextField
          fullWidth margin="normal" label="Email" name="email" type="email"
          value={formData.email} onChange={handleChange} required
        />
        <TextField
          fullWidth margin="normal" label="Password" name="password" type="password"
          value={formData.password} onChange={handleChange} required
          helperText="Minimum 6 characters"
          inputProps={{ minLength: 6 }} 
        />
        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Create Account
        </Button>
      </form>
    </Box>
  );
  
}

export default Register;