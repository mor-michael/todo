import {createSlice} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export type TodoState = {
  id: string,
  title: string,
  body: string,
  creationTimestamp: number,
  done: boolean,
  deadlineTimestamp: number,
  finishedTimestamp: number
}

const initialState = [] as TodoState[] 

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title ? action.payload.title : "todo title",
        body: action.payload.body ? action.payload.body : "todo item",
        creationTimestamp: Date.now(),
        done: false,
        deadlineTimestamp: action.payload.deadline,
        finishedTimestamp: 0 
      }
      state.push(newTodo)
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload.id)
    },
    modifyTodo: (state, action) => {
      const index = state.findIndex(
        todo => todo.id === action.payload.id
      )
      state[index].title = action.payload.title || state[index].title
      state[index].body = action.payload.body || state[index].body
      state[index].done = action.payload.done
      state[index].finishedTimestamp = action.payload.done ? Date.now() : 0
      state[index].deadlineTimestamp = action.payload.deadline || state[index].deadlineTimestamp
    },
    checkTodo: (state, action) => {
      const index = state.findIndex(
        todo => todo.id === action.payload.id
      )
      state[index].done = !state[index].done
    }
  }
})

export const {addTodo, deleteTodo, modifyTodo, checkTodo} = todo.actions
export default todo.reducer