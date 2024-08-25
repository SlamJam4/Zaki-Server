import express from 'express';
import AdCampaign from '@/models/AdCampaign';
import Restaurant from '@/models/Restaurant';

const router = express.Router();

// Get all ad campaigns
router.get('/', async (req, res) => {
  try {
    const adCampaigns = await AdCampaign.find().populate('restaurant');
    res.json(adCampaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ad campaigns', error });
  }
});

// Get ad campaign by id
router.get('/:id', async (req, res) => {
  try {
    const adCampaign = await AdCampaign.findById(req.params.id).populate('restaurant');
    if (!adCampaign) {
      return res.status(404).json({ message: 'Ad campaign not found' });
    }
    res.json(adCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ad campaign', error });
  }
});

// Create new ad campaign
router.post('/', async (req, res) => {
  try {
    const newAdCampaign = new AdCampaign(req.body);
    const savedAdCampaign = await newAdCampaign.save();
    
    // Update the restaurant's activeAdCampaign field
    await Restaurant.findByIdAndUpdate(savedAdCampaign.restaurant, {
      activeAdCampaign: savedAdCampaign._id
    });
    
    res.status(201).json(savedAdCampaign);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ad campaign', error });
  }
});

// Update ad campaign
router.put('/:id', async (req, res) => {
  try {
    const updatedAdCampaign = await AdCampaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdCampaign) {
      return res.status(404).json({ message: 'Ad campaign not found' });
    }
    res.json(updatedAdCampaign);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ad campaign', error });
  }
});

// Delete ad campaign
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdCampaign = await AdCampaign.findByIdAndDelete(req.params.id);
    if (!deletedAdCampaign) {
      return res.status(404).json({ message: 'Ad campaign not found' });
    }
    
    // Remove the reference from the restaurant
    await Restaurant.findByIdAndUpdate(deletedAdCampaign.restaurant, {
      $unset: { activeAdCampaign: 1 }
    });
    
    res.json({ message: 'Ad campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ad campaign', error });
  }
});

// Get active ad campaign for a specific restaurant
router.get('/restaurant/:restaurantId/active', async (req, res) => {
  try {
    const activeAdCampaign = await AdCampaign.findOne({
      restaurant: req.params.restaurantId,
      status: 'active',
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    });
    
    if (!activeAdCampaign) {
      return res.status(404).json({ message: 'No active ad campaign found for this restaurant' });
    }
    
    res.json(activeAdCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active ad campaign', error });
  }
});

export default router;