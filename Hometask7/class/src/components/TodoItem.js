import { Component } from "react"
import { TodoItemView } from "./TodoItemView"
import { TodoItemEdit } from "./TodoItemEdit"

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
    const { store, id } = this.props
    store.update(id, todo)
  }

  deleteTodo() {
    const { store, id } = this.props
    store.delete(id)
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