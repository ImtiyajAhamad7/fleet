import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
  vehicleName: string;
  tyres: string;
  capacity: string;
  isAvailable: boolean;
}

const vehicleSchema: Schema<IVehicle> = new Schema(
  {
    vehicleName: { type: String, required: true },
    tyres: { type: String, required: true, unique: true },
    capacity: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVehicle>("Vehicle", vehicleSchema);
