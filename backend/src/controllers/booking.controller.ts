import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { BookingService } from "../services/booking.service";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await BookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const canceled = await BookingService.cancelBooking(id);
    res.status(200).json({ message: "Booking canceled", booking: canceled });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.query;

    if (!customerId || typeof customerId !== "string") {
      return res.status(400).json({ message: "customerId is required" });
    }

    const bookings = await BookingService.getBookingById(customerId);
    res.status(200).json(bookings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
