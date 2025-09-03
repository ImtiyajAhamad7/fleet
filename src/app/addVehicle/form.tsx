"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { qaxios } from "@/lib/axios"
import toast from "react-hot-toast"

// ✅ Yup validation schema
const schema = yup.object().shape({
  vehicleName: yup.string().required("Vehicle name is required"),
  capacity: yup.string().required("Capacity is required"),
  tyres: yup
    .number()
    .typeError("Tyres must be a number")
    .min(2, "At least 2 tyres required")
    .required("Tyres are required"),
})

type FormValues = yup.InferType<typeof schema>

const VehicleForm = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      vehicleName: "",
      capacity: "",
      tyres: 4,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const res = await qaxios.post("/vehicle/addVehicle", data)
    if(res){
      toast.success("Vehicle submitted successfully!")
    }
    form.reset()
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚚 Add New Vehicle
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Vehicle Name */}
            <FormField
              control={form.control}
              name="vehicleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Vehicle Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter vehicle name"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Capacity */}
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Capacity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter capacity"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Tyres */}
            <FormField
              control={form.control}
              name="tyres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Tyres</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of tyres"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 rounded-lg"
            >
              Add Vehicle
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default VehicleForm
