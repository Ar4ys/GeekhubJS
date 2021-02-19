import { createStore } from "redux"
import rootReducer from "./reducers"
import { loadState, saveState } from "./localStorage"

const initialStore = {
  todos: [],
  darkTheme: false
}

const persistedState = loadState()
const store = createStore(
  rootReducer,
  persistedState
)

store.subscribe(() => saveState(store.getState()))

export default store
