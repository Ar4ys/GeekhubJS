import { Component } from "react"
import "../styles/App.css"
import { TodoForm } from "./TodoForm"

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
        <TodoForm />
      </main>
    </>
  }
}
