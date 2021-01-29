import { useState } from "react"
import { TodoItemView } from "./TodoItemView"
import { TodoItemEdit } from "./TodoItemEdit"
import { store } from "../store/Store"

export function TodoItem({ id, editing, text, color, done }) {
  const [ isEditing, setEditing ] = useState(editing)
  const updateTodo = todo => {
    store.updateTodo(id, todo)
    setEditing(false)
  }
  
  return isEditing
    ? <TodoItemEdit
        onCancel={() => setEditing(false)}
        onAccept={updateTodo}
        {...{ text, color }}
      /> 
    : <TodoItemView
        onEdit={() => setEditing(true)}
        onDelete={() => store.deleteTodo(id)}
        onDone={state => updateTodo({ done: state })}
        {...{ text, color, done }}
      />
}
