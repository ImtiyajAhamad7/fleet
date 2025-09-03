// src/app.ts
import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import bookingRoutes from "./routes/booking.routes";
import { errorHandler } from "./middlewares/errorHandlers";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/booking", bookingRoutes);
app.use(errorHandler);

export default app;
