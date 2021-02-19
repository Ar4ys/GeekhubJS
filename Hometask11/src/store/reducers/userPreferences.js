import { createReducer } from "../../utils"
import { TOGGLE_DARKTHEME } from "../actionTypes"

export default createReducer({
  [TOGGLE_DARKTHEME]: (state, darkTheme) =>
    state.darkTheme = darkTheme
})
