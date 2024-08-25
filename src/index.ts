import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Routes
import organizationRoutes from '@/routes/organizationRoutes';
import restaurantRoutes from '@/routes/restaurantRoutes';
import userRoutes from '@/routes/userRoutes';
import bookingRoutes from '@/routes/bookingRoutes';
import adCampaignRoutes from '@/routes/adCampaignRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
}
  else {
    console.log('No DB URL provided');
  }

// Use routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/adcampaigns', adCampaignRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Zaki Table Booking API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});