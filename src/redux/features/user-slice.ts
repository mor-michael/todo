import {createSlice} from '@reduxjs/toolkit'
import { TodoState } from './todo-slice'

type UserState = {
  name: string,
  hoursWorked: number,
  tasksDone: number,
  deadlinesMissed: number,
  hoursPerDayThisWeek: number[],
  hoursPerDayLastWeek: number[],
  currentTodo: string
}

export const initialState = {
  name: 'Mikhail',
  hoursWorked: 0,
  tasksDone: 0,
  deadlinesMissed: 0,
  hoursPerDayThisWeek: [0, 0, 0, 0, 0, 0, 0],
  hoursPerDayLastWeek: [0, 0, 0, 0, 0, 0, 0],
  currentTodo: ''
} as UserState

const isCurrentWeek = (timestamp: number) => {
  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() + 6) % 7)
  lastMonday.setHours(0, 0, 0, 0)
  return lastMonday.getTime() <= timestamp && timestamp <= lastMonday.getTime() + 604800000
}

const isLastWeek = (timestamp: number) => {
  const lastWeekMonday = new Date()
  lastWeekMonday.setDate(lastWeekMonday.getDate() - (lastWeekMonday.getDay() + 6) % 14)
  lastWeekMonday.setHours(0, 0, 0, 0)
  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() + 6) % 7)
  lastMonday.setHours(0, 0, 0, 0)
  return lastWeekMonday.getTime() <= timestamp && lastMonday.getTime() > timestamp
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    calculateUserStats: (state, action) => {
      state.tasksDone = 0
      state.hoursWorked = 0
      state.deadlinesMissed = 0
      state.hoursPerDayLastWeek = [0, 0, 0, 0, 0, 0, 0]
      state.hoursPerDayThisWeek = [0, 0, 0, 0, 0, 0, 0]

      const allTodos = action.payload.todos
      const thisWeekTodos = allTodos.filter((todo: TodoState) => isCurrentWeek(todo.finishedTimestamp))
      const thisWeekTodosDone = thisWeekTodos.filter((todo: TodoState) => todo.done)
      let prevStart = thisWeekTodosDone.length > 0 ? thisWeekTodosDone[0].creationTimestamp : 0
      let prevFinish = thisWeekTodosDone.length > 0 ? thisWeekTodosDone[0].finishedTimestamp : 0
      state.hoursWorked += Math.round((prevFinish - prevStart) / 3600000)
      thisWeekTodosDone.map((todo: TodoState) => {
        const started = todo.creationTimestamp
        const finished = todo.finishedTimestamp
        if (started > prevFinish) {
          state.hoursWorked += Math.round((finished - started) / 3600000)
        } 
        if (started < prevFinish && finished > prevFinish){
          state.hoursWorked += Math.round((finished - prevFinish) / 3600000)
        }
        prevFinish = finished
        prevStart = started
      })
      thisWeekTodos.map((todo: TodoState) => {
        if (todo.done) {
          state.tasksDone += 1
          state.deadlinesMissed += todo.finishedTimestamp > todo.deadlineTimestamp ? 1 : 0
          const day = new Date(todo.finishedTimestamp).getDay() - 1
          //state.hoursPerDayThisWeek[day] += Math.round((todo.finishedTimestamp - todo.creationTimestamp) / 3600000)
          state.hoursPerDayThisWeek[day] += 1
        }
      })
      const lastWeekTodos = allTodos.filter((todo: TodoState) => isLastWeek(todo.finishedTimestamp))
      lastWeekTodos.map((todo: TodoState) => {
        if (todo.done) {
          const day = new Date(todo.finishedTimestamp).getDay() - 1
          //state.hoursPerDayLastWeek[day] += Math.round((todo.finishedTimestamp - todo.creationTimestamp) / 3600000)
          state.hoursPerDayLastWeek[day] += 1 
        }
      })
    },
    setCurrentTodo: (state, action) => {
      state.currentTodo = action.payload.currentTodo
    },
    changeName: (state, action) => {
      state.name = action.payload.name
    }
  }
})

export const {calculateUserStats, setCurrentTodo, changeName} = user.actions
export default user.reducer