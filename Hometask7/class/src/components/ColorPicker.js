import { Component, createRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import "../styles/ColorPicker.css"

export class ColorPicker extends Component {
  constructor() {
    super(...arguments)
    this.formRef = createRef()
  }

  componentDidMount() {
    this.formRef.current.focus()
  }

  setColor({ target }) {
    const { value: color } = target
    this.props.onSelect?.(color)
  }

  render() {
    const { colors, color: currentColor } = this.props
    return <>
      <form 
        className="color-picker default"
        ref={this.formRef}
        onChange={this.setColor.bind(this)}
        onBlur={this.props.onBlur}
        tabIndex="0"
      >
        {colors.map(color =>
          <label key={color} className={color}>
            <input type="radio" name="color" value={color} hidden />
            {currentColor === color
              ? <FontAwesomeIcon icon={faCheck} />
              : undefined
            }
          </label>
        )}
      </form>
    </>
  }
}