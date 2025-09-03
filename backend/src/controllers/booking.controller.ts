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
