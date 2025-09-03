import Navbar from '@/components/Navbar'
import { qaxios } from '@/lib/axios'
import VehicleList from '@/components/VehicleList'

export default async function Page() {
  async function getVehicles() {
    try {
      const { data } = await qaxios.get('/vehicle/getVehicle')
      return data
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      return []
    }
  }

  const vehicles = await getVehicles()

  return (
    <div>
   
      <VehicleList vehicles={vehicles} />
    </div>
  )
}
