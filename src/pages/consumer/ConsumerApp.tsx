import { Route, Routes } from 'react-router-dom'
import { PhoneFrame } from '@/components/PhoneFrame'
import { Discovery } from './Discovery'
import { ChefDetail } from './ChefDetail'
import { Customize } from './Customize'
import { Checkout } from './Checkout'
import { Tracking } from './Tracking'

export function ConsumerApp() {
  return (
    <PhoneFrame>
      <Routes>
        <Route index element={<Discovery />} />
        <Route path="chef/:id" element={<ChefDetail />} />
        <Route path="customize" element={<Customize />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="tracking" element={<Tracking />} />
      </Routes>
    </PhoneFrame>
  )
}
