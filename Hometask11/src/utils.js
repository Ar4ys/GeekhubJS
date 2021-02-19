export const copy = target => 
  JSON.parse(JSON.stringify(target))

export const createReducer = reducers => (state, action) => {
  const newState = copy(state)
  for (const [ type, reducer ] of Object.entries(reducers))
    if (action.type === type)
      return reducer(newState, action.payload)

  return state
}

export const allColors = [
  "default", "red", "orange",
  "yellow", "green", "blue-green",
  "blue", "dark-blue", "purple",
  "pink", "brown", "grey"

]
