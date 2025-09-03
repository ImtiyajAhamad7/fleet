import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { AddVehicle } from "../controllers/vehicle.controller";

const router = Router();

router.post("/addVehicle", AddVehicle);
router.post("/getVehicle", loginUser);

export default router;
