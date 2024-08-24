import mongoose, { Schema, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  phoneNumber: string;
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);