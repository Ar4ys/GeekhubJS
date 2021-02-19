export const loadState = (init) => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null)
      return init
    return JSON.parse(serializedState)
  } catch (err) {
    return init
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {}
}

