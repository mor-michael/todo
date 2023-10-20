import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, modifyTodo } from "./todo-slice";
import type { RootState } from "../store";
import { changeName } from "./user-slice";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addTodo, deleteTodo, modifyTodo),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "todoList",
      JSON.stringify((listenerApi.getState() as RootState).todoReducer)
    ),
});

export const userlistenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(changeName),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "user",
      JSON.stringify((listenerApi.getState() as RootState).userReducer)
    ),
});