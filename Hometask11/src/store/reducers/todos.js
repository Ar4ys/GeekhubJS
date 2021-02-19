import { createReducer } from "../../utils"
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO
} from "../actionTypes"

const addTodo = (todos, { text, color }) => {
  todos.push({
    id: (todos[todos.length-1] ?? -1) + 1,
    text: text,
    color,
    done: false
  })
  return todos
}

const updateTodo = (todos, todo) =>
  Object.assign(findTodo(todos, todo.id), todo)

const deleteTodo = (todos, id) =>
  todos.filter(todo => todo.id !== id)

export default createReducer([], {
  [ADD_TODO]: addTodo,
  [UPDATE_TODO]: updateTodo,
  [DELETE_TODO]: deleteTodo
})

function findTodo(todos, id) {
  return todos.find(todo => todo.id === id)
}
