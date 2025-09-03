import Booking from "../models/booking.model";
import Vehicle from "../models/vehicle.model";
import { estimateRideHours, haversine } from "../utils/distanc.util";
import { getLatLongFromPincode } from "../utils/geoapify.util";
// import { haversine, estimateRideHours } from "../utils/distance.util";

export class BookingService {
  static async createBooking(data: any) {
    const {
      vehicleId,
      fromPincode,
      toPincode,
      startTime,
      customerId,
      capacity,
    } = data;

    if (
      !vehicleId ||
      !fromPincode ||
      !toPincode ||
      !startTime ||
      !customerId ||
      !capacity
    ) {
      throw new Error("Some fields are missing");
    }

    // 1. Validate vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");
    if (vehicle.capacity < capacity)
      throw new Error("Vehicle capacity too low");

    // 2. Get lat/long for from & to
    const fromCoords = await getLatLongFromPincode(fromPincode);
    const toCoords = await getLatLongFromPincode(toPincode);
    console.log("first", fromCoords, toCoords);
    if (!fromCoords || !toCoords)
      throw new Error("Could not fetch lat/long for pincodes");

    // 3. Calculate distance and estimated ride duration
    const distanceKm = haversine(
      fromCoords.lat,
      fromCoords.lon,
      toCoords.lat,
      toCoords.lon
    );
    const rideHours = estimateRideHours(distanceKm, 40);
    const rideMs = rideHours * 60 * 60 * 1000;

    const start = new Date(startTime);
    const end = new Date(start.getTime() + rideMs);

    const conflict = await Booking.exists({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (conflict) {
      throw new Error("Vehicle already booked in this slot");
    }

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
      distanceKm,
      estimatedRideHours: rideHours,
      capacity,
    });

    return booking;
  }

  static async cancelBooking(id: string) {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status === "canceled") {
      throw new Error("Booking already canceled");
    }

    booking.status = "canceled";
    await booking.save();
    return booking;
  }
}
