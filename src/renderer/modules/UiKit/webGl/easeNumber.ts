export class EaseNumber {
  easing: number;

  private _value: number;

  get value() {
    return this._value;
  }

  private _targetValue: number;
  get targetValue(): number {
    return this._targetValue;
  }
  set targetValue(v: number) {
    this._targetValue = v;
  }

  constructor(value: number, easing = 0.1) {
    this.easing = easing;
    this._value = value;
    this._targetValue = value;
  }

  update() {
    this._value += (this._targetValue - this._value) * this.easing;

    if (1e-4 > Math.abs(this._targetValue - this._value)) {
      this._value = this._targetValue;
    }
  }

  setTo(value: number) {
    this._targetValue = this._value = value;
  }
}
