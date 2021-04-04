import { mat4, quat, vec3 } from 'gl-matrix';

export class Camera {
  private _matrix = mat4.create();
  private _quat = quat.create();
  private _orientation = mat4.create();
  private _projection = mat4.create();
  private _eye?: vec3;
  private _center?: vec3;

  position = vec3.create();
  positionOffset = vec3.create();

  get matrix() {
    return this._matrix;
  }

  get viewMatrix() {
    return this._matrix;
  }

  get projection() {
    return this._projection;
  }

  get projectionMatrix() {
    return this._projection;
  }

  get eye() {
    return this._eye;
  }

  get center() {
    return this._center;
  }

  lookAt(eye: vec3, center: vec3, up: vec3 = [0, 1, 0]) {
    this._eye = vec3.clone(eye);
    this._center = vec3.clone(center);
    vec3.copy(this.position, eye);
    mat4.identity(this._matrix);
    mat4.lookAt(this._matrix, eye, center, up);
  }

  setFromOrientation(x: number, y: number, z: number, w: number) {
    quat.set(this._quat, x, y, z, w);
    mat4.fromQuat(this._orientation, this._quat);
    mat4.translate(this._matrix, this._orientation, this.positionOffset);
  }

  setProjection(v: mat4) {
    this._projection = mat4.clone(v);
  }

  setView(v: mat4) {
    this._matrix = mat4.clone(v);
  }

  setFromViewProj(view: mat4, proj: mat4) {
    this.setProjection(proj);
    this.setView(view);
  }
}
