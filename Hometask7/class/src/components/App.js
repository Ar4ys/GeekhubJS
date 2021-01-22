import { Component } from "react"
import { TodoForm } from "./TodoForm"
import { TodoItem } from "./TodoItem"
import { store } from "../store/Store"
import "../styles/App.css"

export class App extends Component {
  constructor() {
    super(...arguments)
    this.state = store.init()
  }

  componentDidMount() {
    store.subscribe(newStore => this.setState(newStore))
  }

  toggleDarkTheme(state) {
    store.toggleDarkTheme(state ?? !this.state.darkTheme)
  }

  render() {
    const className = this.state.darkTheme ? "dark-theme" : ""
    return <>
      <main className={className}>
        <TodoForm toggleDarkTheme={this.toggleDarkTheme.bind(this)}/>
        {this.state.todos.map(todo => <TodoItem key={todo.id} {...todo}/>)}
      </main>
    </>
  }
}
