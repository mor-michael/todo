import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './features/todo-slice'
import navReducer from './features/nav-slice'
import userReducer from './features/user-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { listenerMiddleware } from './features/middleware'

let todoListState;
if (typeof window !== 'undefined') {
  todoListState = JSON.parse(localStorage.getItem("todoList") || "null")
}

export const store = configureStore({
  preloadedState: {
    todoReducer: todoListState === null ? [] : todoListState 
  },
  reducer: {
    todoReducer,
    navReducer,
    userReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware
  ],
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector