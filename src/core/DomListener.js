import { capitalize } from "./utils"

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Not root provided id domlistener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      if(!this[method]) {
        throw new Error(`Method ${method} not defined`)
      }

      this.method = this[method].bind(this)
      this.$root.on(listener, this.method)
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)

      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}