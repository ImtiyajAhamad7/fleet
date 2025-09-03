import Vehicle from "../models/vehicle.model";
export class VehicleService {
  static async createVehicle(data: any) {
    const vehicle = new Vehicle({ ...data });
    return vehicle.save();
  }
  static async getAllVehicles() {
    return Vehicle.find();
  }
  static async getAvailableVehicles(filter: any) {
    return Vehicle.find({ isAvailable: true });
  }
  static async getVehicleById(id: string) {
    return Vehicle.find({ id: id });
  }
  static async getVehicleByFilter(filter: any) {
    const query: any = {};
    if (filter.capacity) {
      query.capacity = { $gte: Number(filter.capacity) };
    }
    query.isAvailable = true;
    return Vehicle.find(query).exec();
  }
}
