'use client'

import Navbar from '../_components/navbar'
import Statistics from "../_components/statistics"

export default function Stats() {
  return (
    <div className="flex h-screen">
      <div className="w-[1440px] h-[900px] m-[10px] xl:mt-5 xl:mx-auto flex">
        <Navbar />
        <Statistics />
      </div>
    </div>
  )
}