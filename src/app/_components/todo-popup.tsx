import { useDispatch } from "react-redux"
import { addTodo, modifyTodo, TodoState } from "@/redux/features/todo-slice"
import {togglePopup} from '@/redux/features/nav-slice'
import { useState } from "react"
import { useAppSelector } from "@/redux/store"

export default function TodoPopup() {

  const currentTodoId = useAppSelector((state) => state.userReducer.currentTodo)
  const allTodos = useAppSelector((state) => state.todoReducer)
  const selectedDate = useAppSelector((state) => state.navReducer.selectedDate)
  const todo = allTodos.filter(todo => todo.id === currentTodoId)[0]

  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [done, setDone] = useState(false)
  const [deadline, setDeadline] = useState("")

  const deadlineStr = deadline
  const hours = Number(deadlineStr.slice(0, 2))
  const minutes = Number(deadlineStr.slice(3, 5))
  const date = new Date(selectedDate).setHours(0, 0, 0, 0)
  const deadlineTimestamp = date + hours * 3600000 + minutes * 60000
  const handleCreateTodo = () => {
    dispatch(
      addTodo({
        title: title,
        body: body,
        deadline: deadlineTimestamp
      })
    )
  }

  const handleTodoModify = () => {
    dispatch(
      modifyTodo({
        id: currentTodoId,
        title: title || todo.title,
        body: body || todo.body,
        done: done,
        deadline: deadlineTimestamp
      })
    )
  }

  const handleTogglePopup = (event: React.MouseEvent<HTMLDivElement|HTMLButtonElement>) => {
    if (event.target === event.currentTarget) {
      dispatch(
        togglePopup({})
      )
    }
  }

  return(
    <div onClick={handleTogglePopup} className="z-50 flex left-0 top-0 h-screen w-full fixed backdrop-blur-sm">
      <div className="m-auto flex flex-col w-[340px] xl:w-[800px] xl:h-[600px] bg-white rounded-xl gap-y-7">
        <label className="mt-4 w-[70%] h-[5%] mx-auto flex flex-col">Title: 
          <input onChange={e => setTitle(e.target.value)} className="border-2 rounded-lg" type="text" defaultValue={todo ? todo.title : ""}></input>
        </label>
        <label className="w-[70%] mx-auto flex flex-col">Description:
          <textarea onChange={e => setBody(e.target.value)} cols={40} rows={5} className="max-h-[300px] min-h-[100px] border-2 rounded-lg" defaultValue={todo ? todo.body : ""}></textarea>
        </label>
        {todo &&
        <label className="w-[70%] h-[5%] mx-auto"> is done:
          <input defaultChecked={todo ? todo.done : false} onChange={e => e.target.checked ? setDone(true) : setDone(false)} className="border-2 rounded-lg align-baseline" type="checkbox"></input>
        </label>
        }
        <label className="w-[70%] h-[5%] mx-auto">
          <input onChange={e => setDeadline(e.target.value)} type="time"></input>
        </label>
        <div className="ml-auto mr-5 gap-x-5 flex mt-auto mb-5">
          <button onClick={handleTogglePopup} className="p-2 rounded-lg">Cancel</button>
          <button onClick={todo ? (e) => {handleTodoModify(); handleTogglePopup(e)} : (e) => {handleCreateTodo() ; handleTogglePopup(e)}} className="bg-blacktext text-white p-2 rounded-lg">{todo ? 'Modify' : 'Create'}</button>
        </div>
      </div>
    </div>
  )
}