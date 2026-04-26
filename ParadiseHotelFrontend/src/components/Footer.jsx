import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

function Footer() {
  // Footer stays at the bottom thanks to layout flex settings.
  return (
    <Box component="footer" sx={{ bgcolor: '#1976d2', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Paradise Hotel
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Experience luxury, comfort, and seamless booking across our world-class locations. Your perfect getaway starts here.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, opacity: 0.8 }}>Home</Link>
            <Link href="/about" color="inherit" underline="hover" sx={{ display: 'block', mb: 1, opacity: 0.8 }}>About Us</Link>
            <Link href="/login" color="inherit" underline="hover" sx={{ display: 'block', opacity: 0.8 }}>Login</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>Email: support@paradisehotel.com</Typography>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>Phone: +8 (800) 555-3535</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>Location: Varna, Bulgaria</Typography>
          </Grid>
        </Grid>
        <Box mt={4} pt={2} borderTop="1px solid rgba(255,255,255,0.2)" textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Paradise Hotel. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;