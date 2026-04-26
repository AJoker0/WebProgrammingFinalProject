import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

function About() {
  // Static page: no API calls here, just project intro content.
  return (
    <Box sx={{ mt: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        About Paradise Hotel
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center">
        Experience luxury, comfort, and seamless booking across our world-class locations.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: '#f8f9fa' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">Our Mission</Typography>
              <Typography variant="body1" paragraph>
                At Paradise Hotel, our mission is to provide unforgettable experiences. 
                Whether you are looking for a relaxing spa retreat in Velingrad, a sunny beach vacation in Varna, 
                or a business trip to Sofia, we have the perfect room tailored just for you.
              </Typography>
              <Typography variant="body1">
                We believe that a great journey starts with a flawless booking experience. That is why we built 
                this modern platform for our guests.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: '#f8f9fa' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">Why Choose Us?</Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li><Typography variant="body1" paragraph>Premium locations with top-tier ratings.</Typography></li>
                <li><Typography variant="body1" paragraph>Exclusive amenities like Wellness Centers and Free Parking.</Typography></li>
                <li><Typography variant="body1" paragraph>Instant room availability search and instant booking.</Typography></li>
                <li><Typography variant="body1" paragraph>Secure user accounts to manage your reservations.</Typography></li>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;