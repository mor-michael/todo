'use client'

import Image from "next/image"
import { goBack, goForward, changeSelectedDate} from "@/redux/features/nav-slice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/redux/store"
import {Done, Delete, Edit} from '../_assets/todo-icons'
import { deleteTodo, checkTodo, TodoState, modifyTodo } from "@/redux/features/todo-slice"
import { useEffect, useState } from "react"
import TodoPopup from "./todo-popup"
import {togglePopup} from '@/redux/features/nav-slice'
import { setCurrentTodo } from "@/redux/features/user-slice"

const CreateTodo = () => {
  const dispatch = useDispatch()

  const handleTogglePopup = () => {
    dispatch(
      togglePopup({})
    )
  }

  const handleSetCurrentTodo = (todoId: string) => {
    dispatch(
      setCurrentTodo({
        currentTodo: todoId
      })
    )
  }
  return(
    <div className="w-[340px] h-[48px] xl:w-[440px] xl:h-[96px] bg-[#0C0B0B] text-white rounded-xl flex justify-between">
      <div className="ml-[20px] xl:ml-[32px] my-auto">
        <p className="xl:text-lg font-semibold">Create task</p>
        <p className="text-sm text-[#C7C7C7]">create a new task</p>
      </div>
      <button onClick={() => {handleSetCurrentTodo(""); handleTogglePopup()}} className="mr-[10px] xl:mr-[27px]">
        <Image className="w-[38px] h-[38px] xl:w-[52px] xl:h-[52px]" src="plus-icon.svg" alt="plus icon" width={0} height={0} />
      </button>
    </div>
  )
}

const getWeeks = (pivot: number) => {
  const week = Array.from(Array(14).keys()).map((idx) => {
    const d = new Date(pivot) 
    d.setDate(d.getDate() - d.getDay() + idx + 1)
    return d
  })
  return week
}

const Calendar = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const pivotDate = useAppSelector((state) => state.navReducer.pivotDate)
  const selectedDate = useAppSelector((state) => state.navReducer.selectedDate)

  const weeks = getWeeks(pivotDate)

  const dispatch = useDispatch()

  const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      goBack({})
    )
  }

  const handleGoFOrward = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      goForward({})
    )
  }

  const handleChangeSelectedDate = (event: React.MouseEvent<HTMLButtonElement>, date: number) => {
    dispatch(
      changeSelectedDate({selectedDate: date})
    )
  }

  const date = new Date(selectedDate)
  const month = date.toLocaleString('en-es', { month: 'long' });
  const day = date.getDate()
  const year = date.getFullYear()

  return(
    <div className="mt-3 xl:mt-20">
      <div className="flex justify-between">
        <p className="xl:text-2xl">{month} {day}, {year}</p>
        <div>
          <button className="mr-3 xl:mr-[24px]" onClick={handleGoBack}>
            <Image className="w-[28px] h-[28px] xl:w-[36px] xl:h-[36px]" src="left-arrow.svg" alt="left arrow icon" width={0} height={0} />
          </button>
          <button className="xl:mr-[8px]" onClick={handleGoFOrward}>
            <Image className="w-[28px] h-[28px] xl:w-[36px] xl:h-[36px]" src="right-arrow.svg" alt="right arrow icon" width={0} height={0} />
          </button>
        </div>
      </div>
      <div className="xl:mt-7 grid grid-cols-7 grid-flow-row justify-items-center gap-y-2 xl:gap-y-4">
        {days.map(day => <p key={day} className="xl:text-lg">{day}</p>)}
        {weeks.map((day: Date) => <button key={day.getTime()} className="xl:text-xl" onClick={(e) => handleChangeSelectedDate(e, day.getTime())}>{day.getDate()}</button>)}
      </div>
    </div>
  )
}

const TodoItem = ({title, body, deadline, done, id}: {title: string, body: string, deadline: string, done: boolean, id: string}) => {
  const dispatch = useDispatch()

  const handleDeleteTodo = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    dispatch(
      deleteTodo({id: id})
    )
  }

  const handleCheckTodo = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    dispatch(
      modifyTodo({
        id: id,
        done: !done
      })
    )
  }

  const handleTogglePopup = () => {
    dispatch(
      togglePopup({})
    )
  }

  const handleSetCurrentTodo = (todo: string) => {
    dispatch(
      setCurrentTodo({
        currentTodo: todo
      })
    )
  }

  return(
    <div className="bg-[#0C0B0B] xl:ml-auto text-white h-[100px] w-[330px] xl:h-[176px] xl:w-[400px] rounded-2xl flex justify-between">
      <div className="m-[10px] xl:m-[30px]">
        <p className="xl:text-lg font-semibold">{title.length > 15 ? title.slice(0, 15) + '...' : title}</p>
        <p className="mt-[5px] text-sm opacity-80">{body.length > 20 ? body.slice(0, 20) + '...' : body}</p>
      </div>
      <div className="m-[10px] xl:m-[30px] flex flex-col gap-y-6 xl:gap-y-16">
        <p className="ml-auto">{deadline.slice(0, 2) == '24' ? deadline.replace('24', '00') : deadline}</p>
        <div className="flex gap-x-2 xl:gap-x-3">
          <button onClick={(e) => handleDeleteTodo(e, id)}>
            <Delete />
          </button>
          <button onClick={() => {handleSetCurrentTodo(id); handleTogglePopup()}} className="w-[36px] h-[36px] bg-white rounded-[5.5px]">
            <Edit />
          </button>
          <button onClick={(e) => {handleCheckTodo(e, id)}}>
            <Done done={done} />
          </button>
        </div>
      </div>
    </div>
  )
}

const TodoSlider = () => {
  const allTodos = useAppSelector((state) => state.todoReducer)
  const selectedDate = useAppSelector((state) => state.navReducer.selectedDate)
  const date2 = new Date(selectedDate)
  const selectedDayTodos = allTodos.filter(todo => {
    const date = new Date(todo.deadlineTimestamp)
    return date.getFullYear() === date2.getFullYear() &&
    date.getMonth() === date2.getMonth() &&
    date.getDate() === date2.getDate()
  })

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return(
    <div className="mt-3 xl:mt-[30px] h-[350px] xl:h-[400px] overflow-auto scrollbar ">
      <ul className="space-y-4 xl:space-y-8 xl:mr-2">
        {isClient && selectedDayTodos.map(todo => <li key={todo.id} >
          <TodoItem 
            title={todo.title} 
            body={todo.body} 
            deadline={new Date(todo.deadlineTimestamp).toLocaleTimeString('en-US', {hour12: false}).slice(0,5)} 
            done={todo.done}
            id={todo.id}  
          />
        </li>)}
      </ul>
    </div>
  )
}

export default function Todo() {

  const popup = useAppSelector((state) => state.navReducer.popupToggle)

  return(
    <div className="mt-4 w-[340px] xl:w-auto xl:mt-14 xl:ml-11">
      <CreateTodo />
      <Calendar/>
      <TodoSlider />
      {popup &&
        <TodoPopup />
      }
    </div>
  )
}