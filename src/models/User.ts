import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);