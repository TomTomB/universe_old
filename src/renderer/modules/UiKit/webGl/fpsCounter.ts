export class FpsCounter {
  private _totalElapsedTime = 0;
  private _totalSamples = 0;

  private _lastFrameTime?: number;

  get totalSamples() {
    return this._totalSamples;
  }

  get averageFps() {
    return this._totalElapsedTime
      ? this._totalSamples / (this._totalElapsedTime / 1000)
      : 0;
  }

  frame() {
    const now = this._now();

    if (this._lastFrameTime === undefined) {
      this._lastFrameTime = now;
      return;
    }

    const delta = now - this._lastFrameTime;

    if (delta < 1000) {
      this._totalElapsedTime += delta;
      this._totalSamples += 1;
      this._lastFrameTime = now;
    }
  }

  private _now() {
    return performance.now();
  }
}
