export default new (class LocalStorage {
  setValue(key, value) {
    localStorage.setItem(key, value)
  }

  getValue(key) {
    const value = localStorage.getItem(key)
    return value
  }

  removeValue(key) {
    localStorage.removeItem(key)
  }

  clearAllValues() {
    localStorage.clear()
  }
})()
