import { VehicleService } from "../services/vehicle.service";
import { Request, Response } from "express";
export const AddVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleService.getAllVehicles();
    res.status(200).json(vehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getAvailableVehicles = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleService.getAvailableVehicles();
    res.status(200).json(vehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleService.getVehicleById(id);
    res.status(200).json(vehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getVehicleByFilter = async (req: Request, res: Response) => {
  try {
    const { filter } = req.params;
    const vehicle = await VehicleService.getVehicleById(filter);
    res.status(200).json(vehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
