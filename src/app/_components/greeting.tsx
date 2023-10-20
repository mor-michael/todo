'use client'
import Image from "next/image"
import { useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { calculateUserStats } from "@/redux/features/user-slice"
import { useEffect, useState } from "react"

const Stats = ({amount, activity}: {amount: number, activity: string}) => {
  return(
    <div className="w-[110px] gap-x-1 xl:gap-0 align-baseline items-center justify-center flex xl:block h-[40px] xl:w-[190px] xl:h-[96px] rounded-2xl bg-graybg">
      <p className="xl:ml-8 xl:mt-4 xl:text-3xl xl:font-semibold text-black">{amount}</p>
      <p className="text-[10px] xl:ml-8 xl:text-lg xl:leading-6">{activity}</p>
    </div>
  )
}


export default function Greeting() {
  const todoArr = useAppSelector((state) => state.todoReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      calculateUserStats({todos: todoArr}) 
    )
  }, [todoArr, dispatch])
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  const user = useAppSelector((state) => state.userReducer)
  return(
    <div className="flex flex-col">
      <div className=" bg-graybg mt-4 w-[340px] h-[80px] xl:w-[620px] xl:h-[160px] xl:mt-14 rounded-2xl flex">
        <div className="ml-[20px] xl:ml-[54px] my-auto">
          {isClient &&
            <p className=" text-blacktext text-base xl:text-3xl font-medium">Hello {user.name}!</p>
          }
          <p className="text-[#5A5A5A] text-xs xl:leading-6">it&apos;s good to see you again</p>
        </div>
        <div className="ml-[20px] xl:ml-[70px]">
          <Image className="w-[150px] my-[-15px] xl:w-[300px] xl:h-[150px] xl:my-[-35px]" src="pattern.svg" alt="pattern picture" width={0} height={0} priority/>
          <Image className="w-[150px] mt-[-35px] xl:w-[300px] xl:h-[150px] xl:mt-[-70px] " src="pattern.svg" alt="pattern picture" width={0} height={0} priority/>
        </div>
      </div>
      <div className="flex mt-2 gap-x-1 xl:mt-8 xl:gap-x-6">
        <Stats amount={user.hoursWorked} activity="Hours Worked" />
        <Stats amount={user.tasksDone} activity="Tasks Done" />
        <Stats amount={user.deadlinesMissed} activity="Deadlines Missed" />
      </div>
    </div>
  )
}