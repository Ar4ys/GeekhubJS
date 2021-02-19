import { useState } from "react"
import { Item } from "./Item"
import * as Button from "./IconButtons"
import { ColorPicker } from "./ColorPicker"
import { store } from "../store/Store"
import { allColors } from "../utils"
import "../styles/TodoItem.css"

export function TodoForm({ toggleDarkTheme }) {
  const [ text, setText ] = useState("")
  const [ color, setColor ] = useState("default")
  const [
    isColorPickerOpened,
    setColorPickerState
  ] = useState(false)

  const addTodo = () => {
    store.addTodo({ text, color })
    setText("")
    setColor("default")
  }

  const onKeyPress = ({ key }) =>
    key === "Enter" && addTodo()

  const darkTheme = store.getDarkThemeState()
  return <>
    <Item className={`todo-form ${color}`}>
      <Button.ColorPicker onClick={() => setColorPickerState(true)} />
      {isColorPickerOpened
        ? <ColorPicker
            colors={allColors}
            color={color}
            onSelect={setColor}
            onBlur={() => setColorPickerState(false)}
            blurOnSelect
          />
        : undefined}
      <input
        type="text"
        value={text}
        onChange={({ target }) => setText(target.value)}
        onKeyDown={onKeyPress}
        placeholder="Type some todo..."
      />
      <Button.Accept onClick={addTodo}/>
      {darkTheme
        ? <Button.LightTheme onClick={() => toggleDarkTheme(false)}/>
        : <Button.DarkTheme onClick={() => toggleDarkTheme(true)}/>}
    </Item>
  </>
}
