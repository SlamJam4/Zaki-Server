import mongoose, { Schema, Document } from 'mongoose';
import { IOrganization } from '@/models/Organization';

export interface IRestaurant extends Document {
  organization: IOrganization['_id'];
  name: string;
  description: string;
  cuisines: string[];
  occasions: string[];
  facilities: string[];
  contact: {
    phoneNumbers: string[];
    fullAddress: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  details: {
    priceForTwo: number;
    rating: number;
  };
  features: {
    delivers: boolean;
  };
  operatingHours: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
}

const RestaurantSchema: Schema = new Schema({
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  cuisines: [{ type: String }],
  occasions: [{ type: String }],
  facilities: [{ type: String }],
  contact: {
    phoneNumbers: [{ type: String }],
    fullAddress: { type: String, required: true },
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  details: {
    priceForTwo: { type: Number, required: true },
    rating: { type: Number, default: 0 },
  },
  features: {
    delivers: { type: Boolean, default: false },
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
