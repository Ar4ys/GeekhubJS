import { Component } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"

export class TodoItemEdit extends Component {
  constructor({ text, color }) {
    super(...arguments)
    this.state = { text, color }
  }

  setColor(color) {
    this.setState({ color })
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

  render() {
    const { text, color } = this.state
    return <>
      <Item>
        <Button.ColorPicker />
        <input
          type="text"
          value={text}
          onChange={this.setText.bind(this)}
          onKeyDown={this.onKeyPress.bind(this)}
          placeholder="Type some todo..."
          autoFocus
        />
        <Button.Accept onClick={() => this.props.onAccept({ text, color })}/>
        <Button.Cancel onClick={this.props.onCancel}/>
      </Item>
    </>
  }
}