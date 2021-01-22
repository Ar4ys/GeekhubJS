export class EventEmiter {
  constructor(listeners = []) {
    if (!Array.isArray(listeners))
      throw new TypeError("First argument must be an array of functions")

    this.listeners = listeners
  }

  subscribe(callback) {
    return this.listeners.push(callback) - 1
  }

  unsubscribe(id) {
    delete this.listeners[id]
  }

  emit() {
    for (const callback of this.listeners)
      callback()
  }
}
