type Listener = (...args: any[]) => void;
type Events = { [event: string]: Listener[] };

class EventEmitter<T extends string> {
  private readonly _events: Events = {};

  on(event: T, listener: Listener): () => void {
    if (typeof this._events[event] !== 'object') this._events[event] = [];

    this._events[event].push(listener);
    return () => this.removeListener(event, listener);
  }

  removeListener(event: T, listener: Listener): void {
    if (typeof this._events[event] !== 'object') return;

    const idx: number = this._events[event].indexOf(listener);
    if (idx > -1) this._events[event].splice(idx, 1);
  }

  removeAllListeners(): void {
    Object.keys(this._events).forEach((event: string) =>
      this._events[event].splice(0, this._events[event].length)
    );
  }

  emit(event: T, ...args: any[]): void {
    if (typeof this._events[event] !== 'object') {
      return;
    }

    [...this._events[event]].forEach(listener => listener.apply(this, args));
  }

  once(event: T, listener: Listener): void {
    const remove: () => void = this.on(event, (...args: any[]) => {
      remove();
      listener.apply(this, args);
    });
  }
}

export default EventEmitter;
