"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { qaxios } from "@/lib/axios"
import toast from "react-hot-toast"

type Vehicle = {
  _id: string
  vehicleName: string
  capacity: number
  tyres: number
  estimatedDuration: string
}

const schema = yup.object({
  capacity: yup
    .number()
    .required("Capacity is required")
    .min(1, "Capacity must be greater than 0"),
  fromPincode: yup.string().required("From Pincode is required"),
  toPincode: yup.string().required("To Pincode is required"),
  startTime: yup.string().required("Start time is required"),
})

export default function SearchAndBookVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState<string | null>(null) // track booking per vehicle

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      capacity: "",
      fromPincode: "",
      toPincode: "",
      startTime: "",
    },
  })

  type FormValues = yup.InferType<typeof schema>

  async function onSubmit(values: FormValues) {
    setMessage("")
    setLoading(true)
    try {
      const res = await qaxios.get(`/vehicle/getVehiclesByFilter`, {
        params: values,
      })
      setVehicles(res.data)
    } catch (err) {
      setMessage("Something went wrong while fetching vehicles")
    } finally {
      setLoading(false)
    }
  }

  // 📌 Book Now API
  async function handleBookNow(vehicleId: string) {
    const formValues = form.getValues() // get current form values
    setBookingLoading(vehicleId)
    try {
      const res = await qaxios.post(`/booking/createBooking`, {
        vehicleId,
        capacity: formValues.capacity,
        fromPincode: formValues.fromPincode,
        toPincode: formValues.toPincode,
        startTime: formValues.startTime,
        customerId:123
      })
      toast.success("Booking Confirmed")
    } catch (err: any) {
      toast.error("Booking Failed")
    } finally {
      setBookingLoading(null)
    }
  }

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Search Form */}
        <div className="p-6 border rounded-2xl shadow-md bg-white">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <span className="text-indigo-500">🔍</span>
            <h2 className="text-xl font-semibold text-gray-800">
              Search Vehicles
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Capacity */}
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity Required</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter capacity"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* From Pincode */}
              <FormField
                control={form.control}
                name="fromPincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Pincode</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter from pincode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* To Pincode */}
              <FormField
                control={form.control}
                name="toPincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Pincode</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter to pincode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full rounded-xl"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Availability"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Right: Available Vehicles */}
        <div className="p-6 border rounded-2xl shadow-md bg-white">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <span className="text-indigo-500">🚚</span>
            <h2 className="text-xl font-semibold text-gray-800">
              Available Vehicles
            </h2>
          </div>

          {message && <p className="text-red-500 mb-3">{message}</p>}

          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500">⏳ Searching vehicles...</p>
            ) : vehicles.length > 0 ? (
              vehicles.map((v) => (
                <div
                  key={v._id}
                  className="border rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-center bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {v.vehicleName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Capacity: {v.capacity}
                    </p>
                    <p className="text-sm text-gray-600">Tyres: {v.tyres}</p>
                    <p className="text-sm text-gray-600">
                      Estimated Duration: {v.estimatedDuration}
                    </p>
                  </div>
                  <Button
                    className="rounded-lg"
                    onClick={() => handleBookNow(v._id)}
                    disabled={bookingLoading === v._id}
                  >
                    {bookingLoading === v._id ? "Booking..." : "Book Now"}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No vehicles found. Try searching again.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
