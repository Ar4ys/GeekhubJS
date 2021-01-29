import { LocalStorage } from "./LocalStorage"
import { EventEmiter } from "../utils"

class Store extends EventEmiter {
  constructor() {
    super(...arguments)
    const allTodos = this.getAllTodos()
    this.lastTodoId = allTodos?.[allTodos.length - 1]?.id ?? 0
  }

  init() {
    LocalStorage.getItem("darkTheme")
    ?? LocalStorage.setItem("darkTheme", false)

    LocalStorage.getItem("todos")
    ?? LocalStorage.setItem("todos", [])

    return LocalStorage.getStorage()
  }

  emit() {
    const newStore = LocalStorage.getStorage()
    for (const callback of this.listeners)
      callback(newStore)
  }

  addTodo(todo) {
    const todos = this.getAllTodos()
    const todoTemlate = {
      text: "",
      color: "default",
      done: false
    }

    todos.push({
      ...todoTemlate,
      ...todo,
      id: ++this.lastTodoId
    })
    
    LocalStorage.setItem("todos", todos)
    this.emit()
    return this.lastTodoId
  }

  updateTodo(id, value) {
    const todos = this.getAllTodos()
    const todoIndex = todos.findIndex(item => item.id === id)
    Object.assign(todos[todoIndex], value)
    LocalStorage.setItem("todos", todos)
    this.emit()
  }

  deleteTodo(id) {
    const todos = this.getAllTodos()
    const todoIndex = todos.findIndex(item => item.id === id)
    todos.splice(todoIndex, 1)
    LocalStorage.setItem("todos", todos)
    this.emit()
  }

  getTodo(id) {
    const itemsArr = this.getAllTodos()
    const itemIndex = itemsArr.findIndex(item => item.id === id)
    
    return itemsArr[itemIndex]
  }

  getAllTodos() {
    return LocalStorage.getItem("todos")
  }

  toggleDarkTheme(state) {
    const previousState = LocalStorage.getItem("darkTheme")
    LocalStorage.setItem("darkTheme", state ?? !previousState)
    this.emit()
  }

  getDarkThemeState() {
    return LocalStorage.getItem("darkTheme")
  }
}

export const store = new Store()
