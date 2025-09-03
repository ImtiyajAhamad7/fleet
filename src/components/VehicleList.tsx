"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Vehicle {
  _id: string;
  vehicleName: string;
  capacity: number;
  tyres: number;
}

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleBook(vehicleId: string) {
    // try {
    //   setLoading(vehicleId);

    //   const res = await fetch("/api/bookings", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       vehicleId,
    //       customerId: "12345", // temporary
    //       fromPincode: "110001",
    //       toPincode: "560001",
    //       startTime: new Date().toISOString(),
    //     }),
    //   });

    //   const data = await res.json();
    //   if (!res.ok) throw new Error(data.message || "Booking failed");

    //   toast.success(`Booking Confirmed ✅ You booked ${data.vehicleName}`);
    // } catch (err: any) {
    //   toast.error(`Booking Failed ❌ ${err.message}`);
    // } finally {
    //   setLoading(null);
    // }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 p-4">
      {vehicles.map((v) => (
        <Card key={v._id}>
          <CardHeader>
            <CardTitle>{v.vehicleName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Capacity: {v.capacity}</p>
            <p>Tyres: {v.tyres}</p>
            <Button
              onClick={() => handleBook(v._id)}
              disabled={loading === v._id}
              className="mt-3 w-full"
            >
              {loading === v._id ? "Booking..." : "Book Vehicle"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
