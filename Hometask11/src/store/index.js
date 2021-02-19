import { createStore } from "redux"
import rootReducer from "./reducers"
import { loadState } from "./localStorage"

const initialStore = {
  todos: [],
  darkTheme: false
}

const persistedState = loadState(initialStore)
const store = createStore(
  rootReducer,
  persistedState
)

store.subscribe(() => saveState(store.getState()))

export default store
