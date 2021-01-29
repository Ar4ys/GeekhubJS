export class LocalStorage {  
  static get length() {
    return localStorage.length
  }

  static key(id) {
    return localStorage.key(id)
  }

  static getItem(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  static getStorage() {
    const { length } = this
    const storage = {}
    for (let i = 0; i < length; i++) {
      const key = this.key(i)
      storage[key] = this.getItem(key)
    }

    return storage
  }

  static setItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  static removeItem(key) {
    return localStorage.removeItem(key)
  }

  static clear() {
    return localStorage.clear()
  }
}
