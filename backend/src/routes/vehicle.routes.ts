import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import {
  AddVehicle,
  getAvailableVehicles,
  getVehicleByFilter,
} from "../controllers/vehicle.controller";

const router = Router();

router.post("/addVehicle", AddVehicle);
router.get("/getVehicle", getAvailableVehicles);
router.get("/getVehiclesByFilter", getVehicleByFilter);

export default router;
