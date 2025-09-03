import { Router } from "express";
import {
  cancelBooking,
  createBooking,
} from "../controllers/booking.controller";

const router = Router();
router.post("/createBooking", createBooking);
router.delete("/cancelBooking/:id", cancelBooking);
export default router;
