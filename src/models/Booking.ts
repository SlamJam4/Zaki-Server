import mongoose, { Schema, Document } from 'mongoose';
import { IRestaurant } from '@/models/Restaurant';
import { IUser } from '@/models/User';

export interface IBooking extends Document {
  restaurant: IRestaurant['_id'];
  user: IUser['_id'];
  date: Date;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'refused' | 'canceled';
}

const BookingSchema: Schema = new Schema({
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'refused', 'canceled'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

export default mongoose.model<IBooking>('Booking', BookingSchema);