import { mat4, vec3 } from 'gl-matrix';
import { Camera } from './camera';
import { Ray } from '../ray';

export class CameraPerspective extends Camera {
  private _fov!: number;
  private _near!: number;
  private _far!: number;
  private _aspectRatio!: number;

  get fov() {
    return this._fov;
  }

  get near() {
    return this._near;
  }

  get far() {
    return this._far;
  }

  get aspectRatio() {
    return this._aspectRatio;
  }

  constructor(fov: number, aspectRatio: number, near: number, far: number) {
    super();
    this.setPerspective(fov, aspectRatio, near, far);
  }

  setPerspective(fov: number, aspectRatio: number, near: number, far: number) {
    this._fov = fov;
    this._aspectRatio = aspectRatio;
    this._far = far;
    this._near = near;
    mat4.perspective(this.projection, fov, aspectRatio, near, far);
  }

  setAspectRatio(aspectRatio: number) {
    this._aspectRatio = aspectRatio;

    mat4.perspective(
      this.projection,
      this._fov,
      aspectRatio,
      this._near,
      this._far
    );
  }

  generateRay(a: vec3, ray?: Ray) {
    const m4 = mat4.create();
    const direction = vec3.create();
    mat4.multiply(m4, this.projectionMatrix, this.viewMatrix);
    mat4.invert(m4, m4);
    vec3.transformMat4(direction, a, m4);
    vec3.sub(direction, direction, this.position);
    vec3.normalize(direction, direction);

    if (ray) {
      ray.origin = this.position;
      ray.direction = direction;
    } else {
      ray = new Ray(this.position, direction);
    }

    return ray;
  }
}
