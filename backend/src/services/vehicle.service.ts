import Vehicle from "../models/vehicle.model";
export class VehicleService {
  static async createVehicle(data: any) {
    const vehicle = new Vehicle({ ...data });
    return vehicle.save();
  }
  static async getAllVehicles() {
    return Vehicle.find();
  }
  static async getAvailableVehicles() {
    return Vehicle.find({ isAvailable: true });
  }
  static async getVehicleById(id: string) {
    return Vehicle.find({ id: id });
  }
  static async getVehicleByFilter(filter: any) {
    return Vehicle.find(filter);
  }
}
