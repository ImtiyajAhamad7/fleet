"use client";

import { useEffect, useState } from "react";
import { qaxios } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  FaCar,
  FaMapMarkerAlt,
  FaClock,
  FaWeightHanging,
  FaRoad,
} from "react-icons/fa";

type Booking = {
  _id: string;
  vehicleId: string;
  fromPincode: string;
  toPincode: string;
  startTime: string;
  endTime: string;
  customerId: string;
  capacity: number;
  distanceKm: number;
  estimatedRideHours: number;
  status: string;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await qaxios.get("/booking/myBookings", {
        params: { customerId: "123" },
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await qaxios.delete(`/booking/cancelBooking/${id}`);
      toast.success("Booking cancelled successfully");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Bookings</h2>

      {loading ? (
        <p className="text-gray-500">⏳ Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no active bookings.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {bookings.map((b) => (
            <Card
              key={b._id}
              className="w-full max-w-sm rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 bg-white overflow-hidden"
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    <span className="font-semibold text-gray-800">
                      Vehicle #{b.vehicleId.slice(-4)}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      b.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-700 p-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>
                    <strong>From:</strong> {b.fromPincode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400 rotate-180" />
                  <span>
                    <strong>To:</strong> {b.toPincode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>
                    <strong>Start:</strong>{" "}
                    {new Date(b.startTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>
                    <strong>End:</strong> {new Date(b.endTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaWeightHanging className="text-gray-400" />
                  <span>
                    <strong>Capacity:</strong> {b.capacity} kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRoad className="text-gray-400" />
                  <span>
                    <strong>Distance:</strong> {b.distanceKm.toFixed(2)} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>
                    <strong>Est. Hours:</strong>{" "}
                    {b.estimatedRideHours.toFixed(1)} hrs
                  </span>
                </div>

                {b.status === "active" && (
                  <Button
                    variant="destructive"
                    className="mt-4 w-full rounded-2xl hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => handleCancel(b._id)}
                  >
                    Cancel Booking
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
