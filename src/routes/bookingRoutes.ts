import express from 'express';
import Booking from '@/models/Booking';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('restaurant', 'name')
      .populate('user', 'fullName')
      .select('-__v');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Get booking by id
router.get('/:id', async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate('restaurant', 'name')
        .populate('user', 'fullName')
        .select('-__v');
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching booking', error });
    }
  });
  
  // Create new booking
  router.post('/', async (req, res) => {
    try {
      const newBooking = new Booking(req.body);
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      res.status(400).json({ message: 'Error creating booking', error });
    }
  });
  
  // Update booking
  router.put('/:id', async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate('restaurant', 'name')
        .populate('user', 'fullName')
        .select('-__v');
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(updatedBooking);
    } catch (error) {
      res.status(400).json({ message: 'Error updating booking', error });
    }
  });
  
  // Delete booking
  router.delete('/:id', async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting booking', error });
    }
  });
  
  export default router;