"use client"

import { useEffect, useState } from "react"
import { qaxios } from "@/lib/axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
// import { toast } from "sonner"

type Booking = {
  _id: string
  vehicleId: string
  fromPincode: string
  toPincode: string
  startTime: string
  endTime: string
  customerId: string
  capacity: number
  distanceKm: number
  estimatedRideHours: number
  status: string
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  // ✅ Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const res = await qaxios.get("/booking/myBookings", {
          params: { customerId: "123" }, // replace with logged-in user id
        })
        setBookings(res.data)
      } catch (err) {
        toast.error("Failed to fetch bookings")
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  // ✅ Cancel booking handler
  const handleCancel = async (id: string) => {
    try {
      await qaxios.delete(`/booking/cancelBooking/${id}`)
      toast.success("Booking cancelled successfully")
      setBookings((prev) => prev.filter((b) => b._id !== id))
    } catch (err) {
      toast.error("Failed to cancel booking")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
         My Bookings
      </h2>

      {loading ? (
        <p className="text-gray-500">⏳ Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no active bookings.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((b) => (
            <Card
              key={b._id}
              className="rounded-2xl shadow-md border hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span> Vehicle #{b.vehicleId.slice(-4)}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      b.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>From:</strong> {b.fromPincode}
                </p>
                <p>
                  <strong>To:</strong> {b.toPincode}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(b.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {new Date(b.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Capacity:</strong> {b.capacity} kg
                </p>
                <p>
                  <strong>Distance:</strong> {b.distanceKm.toFixed(2)} km
                </p>
                <p>
                  <strong>Estimated Hours:</strong>{" "}
                  {b.estimatedRideHours.toFixed(1)} hrs
                </p>

                {b.status === "active" && (
                  <Button
                    variant="destructive"
                    className="mt-3 w-full rounded-xl"
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
  )
}
