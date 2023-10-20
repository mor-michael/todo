import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, modifyTodo } from "./todo-slice";
import type { RootState } from "../store";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addTodo, deleteTodo, modifyTodo),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "todoList",
      JSON.stringify((listenerApi.getState() as RootState).todoReducer)
    )
});