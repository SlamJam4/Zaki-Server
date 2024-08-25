import mongoose, { Schema, Document } from 'mongoose';
import { IRestaurant } from '@/models/Restaurant';

export interface IAdCampaign extends Document {
  restaurant: IRestaurant['_id'];
  startDate: Date;
  endDate: Date;
  type: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

const AdCampaignSchema: Schema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, required: true },
  budget: { type: Number, required: true },
  status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
  metrics: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
  },
});

export default mongoose.model<IAdCampaign>('AdCampaign', AdCampaignSchema);