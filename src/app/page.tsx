'use client'

import Navbar from './_components/navbar'
import Greeting from "./_components/greeting"
import Statistics from "./_components/statistics"
import Todo from "./_components/todo"

export default function Home() {

  return (
    <div className="flex h-screen">
      <div className="m-[10px] ph:mx-auto xl:w-[1440px] h-[900px] xl:mt-5 xl:mx-auto sm:flex">
        <Navbar />
        <div className="sm:flex sm:space-x-20 xl:space-x-0 flex-col  xl:flex-row">
          <div className="sm:ml-20 xl:ml-0 xl:mr-[50px] ">
            <Greeting />
            <Statistics />
          </div>
          <Todo />
        </div>
      </div>
    </div>
  )
}
