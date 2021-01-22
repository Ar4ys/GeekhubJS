import { Component } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { store } from "../store/Store"
import "../styles/TodoItem.css"

export class TodoForm extends Component {
  state = {
    text: "",
    color: "default"
  }

  setText({ target }) {
    const { value } = target
    this.setState({ text: value })
  }

  onKeyPress({ key }) {
    if (key === "Enter")
      this.addTodo()
  }

  addTodo() {
    store.addTodo(this.state)
    this.setState({ text: "", color: "default" })
  }

  render() {
    const { text, color } = this.state
    const darkTheme = store.getDarkThemeState()

    return <>
      <Item>
        <Button.ColorPicker />
        <input
          type="text"
          value={text}
          onChange={this.setText.bind(this)}
          onKeyDown={this.onKeyPress.bind(this)}
          placeholder="Type some todo..."
        />
        <Button.Accept onClick={this.addTodo.bind(this)}/>
        {darkTheme
          ? <Button.LightTheme onClick={() => this.props.toggleDarkTheme(false)}/>
          : <Button.DarkTheme onClick={() => this.props.toggleDarkTheme(true)}/>}
      </Item>
    </>
  }
}