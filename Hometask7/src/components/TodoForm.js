import { Component } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { store } from "../store/Store"
import { allColors } from "../utils"
import "../styles/TodoItem.css"

export class TodoForm extends Component {
  state = {
    text: "",
    color: "default",
    colorPickerOpened: false
  }

  setText({ target }) {
    const { value } = target
    this.setState({ text: value })
  }

  setColor(color) {
    this.setState({ color })
    this.hideColorPicker()
  }

  onKeyPress({ key }) {
    if (key === "Enter")
      this.addTodo()
  }

  addTodo() {
    const { text, color } = this.state
    store.addTodo({ text, color })
    this.setState({ text: "", color: "default" })
  }

  openColorPicker() {
    this.setState({ colorPickerOpened: true })
  }

  hideColorPicker() {
    this.setState({ colorPickerOpened: false })
  }

  render() {
    const { text, color, colorPickerOpened } = this.state
    const darkTheme = store.getDarkThemeState()

    return <>
      <Item className={`todo-form ${color}`}>
        <Button.ColorPicker onClick={this.openColorPicker.bind(this)} />
        {colorPickerOpened
          ? <ColorPicker
              colors={allColors}
              color={color}
              onSelect={this.setColor.bind(this)}
              onBlur={this.hideColorPicker.bind(this)}
            />
          : undefined}
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