'use client'

import Navbar from '../_components/navbar'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/store'
import { useState } from 'react'
import { changeName } from '@/redux/features/user-slice'


const SettingsItem = () => {
  const username = useAppSelector((state) => state.userReducer.name)
  const [name, setName] = useState(username)
  const dispatch = useDispatch()
  const handleChangeUsername = () => {
    dispatch(
      changeName({
        name: name
      })
    )
  }
  return(
    <div className="mt-6 sm:ml-10 xl:mx-auto xl:space-y-6">
      <label className="bg-graybg flex p-2 gap-x-2 xl:gap-x-0 xl:p-5 rounded-xl ">username:
        <input className="xl:ml-4 w-[100px]" onChange={(e) => setName(e.target.value)} defaultValue={name} />
        <button className="xl:ml-4" onClick={handleChangeUsername}>apply changes</button>
      </label>
    </div>
  )
}

export default function Settings() {
  return (
    <div className="flex h-screen">
      <div className="w-[340px] sm:w-auto xl:w-[1440px] xl:h-[900px] m-[10px] xl:mt-5 xl:mx-auto sm:flex">
        <Navbar />
        <SettingsItem />
      </div>
    </div>
  )
}