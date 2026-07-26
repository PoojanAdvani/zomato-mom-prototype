import { Route, Routes } from 'react-router-dom'
import { PhoneFrame } from '@/components/PhoneFrame'
import { ChefDashboard } from './ChefDashboard'
import { BlinkitOrder } from './BlinkitOrder'
import { ChefVerification } from './ChefVerification'

export function ChefApp() {
  return (
    <PhoneFrame>
      <Routes>
        <Route index element={<ChefDashboard />} />
        <Route path="blinkit" element={<BlinkitOrder />} />
        <Route path="verification" element={<ChefVerification />} />
      </Routes>
    </PhoneFrame>
  )
}
