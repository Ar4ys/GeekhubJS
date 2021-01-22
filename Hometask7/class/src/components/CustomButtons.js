import { classNameWrapper } from "../utils"
import "../styles/IconButton.css"
import "../styles/AcceptButton.css"

export const IconButton = classNameWrapper("button", "icon-button")
export const AcceptButton = classNameWrapper(IconButton, "accept-button")