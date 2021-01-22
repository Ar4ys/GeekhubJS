import { Component } from "react"
import { TodoItemView } from "./TodoItemView"
import { TodoItemEdit } from "./TodoItemEdit"
import { store } from "../store/Store"

export class TodoItem extends Component {
  constructor({ editing }) {
    super(...arguments)
    this.state = { editing }
  }

  toggleEditing(state) {
    const { editing } = this.state
    this.setState({ editing: state ?? !editing})
  }

  updateTodo(todo) {
    const { id } = this.props
    store.updateTodo(id, todo)
    this.toggleEditing(false)
  }

  deleteTodo() {
    const { id } = this.props
    store.deleteTodo(id)
  }

  toggleIsDone(state) {
    this.updateTodo({ done: state })
  }

  render() {
    const { text, color, done } = this.props
    return this.state.editing
      ? <TodoItemEdit
          onCancel={this.toggleEditing.bind(this, false)}
          onAccept={this.updateTodo.bind(this)}
          {...{ text, color }}
        /> 
      : <TodoItemView
          onEdit={this.toggleEditing.bind(this, true)}
          onDelete={this.deleteTodo.bind(this)}
          onDone={this.toggleIsDone.bind(this)}
          {...{ text, color, done }}
        /> 
  }
}