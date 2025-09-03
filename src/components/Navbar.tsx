"use client"

import React from "react"
import Link from "next/link"
import { Car } from "lucide-react" // icon for FleetLink
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-blue-600" />
          <Link href="/" className="text-xl font-bold text-blue-600">
            FleetLink
          </Link>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/addVehicle"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Add Vehicle
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/searchAndBookVehicle"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Search &amp; Book
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/booking"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  My Bookings
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Section */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
