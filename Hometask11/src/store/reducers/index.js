import { combineReducers } from "redux"
import userPreferences from "./userPreferences"
import todos from "./todos"

export default combineReducers({ todos, userPreferences })
