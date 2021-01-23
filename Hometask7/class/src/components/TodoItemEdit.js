import { Component } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { allColors } from "../utils"

export class TodoItemEdit extends Component {
  constructor({ text, color }) {
    super(...arguments)
    this.state = {
      text,
      color,
      colorPickerOpened: false
    }
  }

  setColor(color) {
    this.setState({ color })
    this.hideColorPicker()
  }

  setText({ target }) {
    const text = target.value
    this.setState({  text })
  }

  onKeyPress({ key }) {
    console.log(key)
    switch(key) {
      case "Escape":
        this.props.onCancel()
        break

      case "Enter":
        const { text, color } = this.state 
        this.props.onAccept({ text, color })
        break
    }
  }

  openColorPicker() {
    this.setState({ colorPickerOpened: true })
  }

  hideColorPicker() {
    this.setState({ colorPickerOpened: false })
  }

  render() {
    const { text, color, colorPickerOpened } = this.state
    return <>
      <Item className={color}>
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
          autoFocus
        />
        <Button.Accept onClick={() => this.props.onAccept(this.state)}/>
        <Button.Cancel onClick={this.props.onCancel}/>
      </Item>
    </>
  }
}