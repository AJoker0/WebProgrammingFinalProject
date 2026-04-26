import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';



function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

                <Button color="inherit" onClick={handleLogout}>
                  Logout ({user.name})
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;