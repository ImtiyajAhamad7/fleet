import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
  vehicleName: string;
  tyres: number;
  capacity: number;
  isAvailable: boolean;
}

const vehicleSchema: Schema<IVehicle> = new Schema(
  {
    vehicleName: { type: String, required: true },
    tyres: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVehicle>("Vehicle", vehicleSchema);
