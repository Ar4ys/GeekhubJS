import { createReducer } from "../../utils"
import { TOGGLE_DARKTHEME } from "../actionTypes"

export default createReducer({ darkTheme: false }, {
  [TOGGLE_DARKTHEME]: (state, darkTheme) => darkTheme ?? !state
})
