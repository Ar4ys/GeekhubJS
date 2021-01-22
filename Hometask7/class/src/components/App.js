import { Component } from "react"
import "../styles/App.css"
import { Item } from "./Item"
import * as Button from "./IconButtons"

export class App extends Component {
  state = {
    darkTheme: true
  }

  toggleDarkTheme(state) {
    this.setState({
      darkTheme: state ?? !this.state.darkTheme
    })
  }

  render() {
    const className = this.state.darkTheme ? "dark-theme" : ""

    return <>
      <main className={className}>
        Hello world
        <Item>Hello there</Item>
        <Button.Accept />
      </main>
    </>
  }
}
