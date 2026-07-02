import mongoose, { Schema, Document } from "mongoose";

export interface IAddress {
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  addresses: IAddress[];
}

const addressSchema = new Schema<IAddress>({
  label: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
