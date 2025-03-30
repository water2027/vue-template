const eventNames = ['API:UN_AUTH', 'API:NOT_FOUND', 'API:LOGOUT', 'TOKEN:GET'] as const
type EventName = (typeof eventNames)[number]
type Listener = (req: any, resp: any) => void

class EventEmitter {
  listeners: Record<EventName, Set<Listener>> = {} as Record<EventName, Set<Listener>>

  on(eventName: EventName, listener: Listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Set<Listener>()
    }
    this.listeners[eventName].add(listener)
  }

  off(eventName: EventName, listener: Listener) {
    if (!this.listeners[eventName]) return
    this.listeners[eventName].delete(listener)
  }

  emit(eventName: EventName, req: any = {}, resp: any = {}) {
    this.listeners[eventName].forEach((listener) => listener(req, resp))
  }
}

export default new EventEmitter()
