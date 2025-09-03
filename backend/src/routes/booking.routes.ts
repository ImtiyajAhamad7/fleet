import { Router } from "express";
import {
  cancelBooking,
  createBooking,
  getMyBookings,
} from "../controllers/booking.controller";

const router = Router();
router.post("/createBooking", createBooking);
router.get("/myBookings", getMyBookings);
router.delete("/cancelBooking/:id", cancelBooking);
export default router;
