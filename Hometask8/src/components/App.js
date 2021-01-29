import { useState, useEffect } from "react"
import { TodoForm } from "./TodoForm"
import { TodoItem } from "./TodoItem"
import { store } from "../store/Store"
import "../styles/App.css"
import "../styles/Colors.css"

export function App() {
  const [ state, setState ] = useState(store.init())
  useEffect(() => {
    const id = store.subscribe(newStore =>
      setState(previousStore => ({...previousStore, ...newStore}))
    )

    return () => store.unsubscribe(id)
  }, [])

  const toggleDarkTheme = state => {
    store.toggleDarkTheme(state ?? !this.state.darkTheme)
  }

  const className = state.darkTheme ? "dark-theme" : ""
  return <>
    <main className={className}>
      <TodoForm toggleDarkTheme={toggleDarkTheme}/>
      {state.todos.map(todo => <TodoItem key={todo.id} {...todo}/>)}
    </main>
  </>
}

