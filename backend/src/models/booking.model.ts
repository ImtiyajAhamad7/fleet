import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  vehicleId: mongoose.Types.ObjectId;
  fromPincode: string;
  toPincode: string;
  startTime: Date;
  endTime: Date;
  customerId: string;
  capacity: number;
  distanceKm: number;
  estimatedRideHours: number;
  status: "active" | "canceled";
}

const bookingSchema = new Schema<IBooking>(
  {
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    fromPincode: { type: String, required: true },
    toPincode: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    customerId: { type: String, required: true },
    capacity: { type: Number, required: true },
    distanceKm: { type: Number },
    estimatedRideHours: { type: Number },
    status: { type: String, enum: ["active", "canceled"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
