import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Drop auth state first, then move user to login screen.
    logout();
    navigate('/login');
  };

  // Admin links are rendered only when user.role is admin.

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Paradise Hotel
          </Typography>
          
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>

            {user ? (
              <>
                <Button color="inherit" component={Link} to="/reservations">My Reservations</Button>

                {user.role === 'admin' && (
                  <>
                    <Button color="inherit" component={Link} to="/admin">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/admin/reservations">All Res.</Button>
                    <Button color="inherit" component={Link} to="/admin/locations">Locations</Button>
                  </>
                )}

                <Button color="inherit" onClick={handleLogout} sx={{ ml: 2, border: '1px solid rgba(255,255,255,0.5)' }}>
                  Logout ({user.name})
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register" sx={{ ml: 1, border: '1px solid rgba(255,255,255,0.5)' }}>Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ p: 4, flexGrow: 1 }}>
        <Outlet />
      </Box>
      
      <Footer />
    </Box>
  );
}

export default MainLayout;