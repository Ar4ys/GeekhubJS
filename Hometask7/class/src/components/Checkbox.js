import { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import "../styles/Checkbox.css"

export class Checkbox extends Component {
  constructor({ checked }) {
    super(...arguments)
    this.state = { checked }
  }

  toggle(event) {
    const { checked } = event.target
    this.setState({ checked })
    this.props.onChange?.(event)
  }

  render() {
    const { checked: isChecked } = this.state
    const Checked = () => <FontAwesomeIcon icon={faCheckCircle}/>
    const Unchecked = () => <FontAwesomeIcon icon={faCircle}/>

    return <>
      <label className="checkbox">
        <input
          type="checkbox"
          name={this.props.name}
          checked={isChecked}
          onChange={this.toggle.bind(this)}
          hidden
        />
        {isChecked ? <Checked /> : <Unchecked />}
      </label>
    </>
  }
}