import { Component } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import "../styles/TodoItem.css"

export class TodoForm extends Component {
  render() {
    // const { darkTheme } = this.props.store
    const darkTheme = true

    return <>
      <Item>
        <Button.ColorPicker />
        <input type="text" placeholder="Type some todo..."/>
        <Button.Accept />
        {darkTheme ? <Button.LightTheme /> : <Button.DarkTheme />}
      </Item>
    </>
  }
}