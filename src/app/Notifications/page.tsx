'use client'

import Navbar from '../_components/navbar'
import { useAppSelector } from '@/redux/store'
import { useState, useEffect } from 'react'

const NotificationList = () => {
  const allTodos = useAppSelector((state) => state.todoReducer)
  const needsToBeDone = allTodos.filter(todo => (todo.deadlineTimestamp <= Date.now() + 3600000) && todo.deadlineTimestamp >= Date.now() && !todo.done) 
  return(
    <ul className="mt-6 mx-auto space-y-6">
      {needsToBeDone.length > 0 ? needsToBeDone.map(todo => 
      <div key={todo.id} className="bg-graybg p-5 rounded-xl">
        <p className="text-lg font-semibold">{todo.title}</p>
        <p>ends at - {new Date(todo.deadlineTimestamp).toLocaleTimeString().slice(0, 5)}</p>
      </div>)
      :
      <li className="text-blacktext">no notifications</li>
      }
    </ul>
  )
}

export default function Notifications() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div className="flex h-screen">
      <div className="w-[1440px] h-[900px] m-[10px] xl:mt-5 xl:mx-auto flex">
        <Navbar />
        {isClient &&
          <NotificationList />
        }
      </div>
    </div>
  )
}