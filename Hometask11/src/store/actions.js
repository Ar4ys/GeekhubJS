import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_DARKTHEME
} from "./actionTypes"

export const toggleDarkTheme = state => ({
  type: TOGGLE_DARKTHEME,
  payload: state
})

export const addTodo = (text, color) => ({
  type: ADD_TODO,
  payload: { text, color }
})

export const updateTodo = (id, todo) => ({
  type: UPDATE_TODO,
  payload: { ...todo, id }
})

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id }
})
