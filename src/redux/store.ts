import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './features/todo-slice'
import navReducer from './features/nav-slice'
import userReducer from './features/user-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { listenerMiddleware, userlistenerMiddleware } from './features/middleware'
import { initialState } from './features/user-slice'

let todoListState;
let userState;
if (typeof window !== 'undefined') {
  todoListState = JSON.parse(localStorage.getItem("todoList") || "null")
  userState = JSON.parse(localStorage.getItem("user") || "null")
}

export const store = configureStore({
  preloadedState: {
    todoReducer: todoListState === null ? [] : todoListState,
    userReducer: userState === null ? initialState : userState
  },
  reducer: {
    todoReducer,
    navReducer,
    userReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware,
    userlistenerMiddleware.middleware
  ],
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector