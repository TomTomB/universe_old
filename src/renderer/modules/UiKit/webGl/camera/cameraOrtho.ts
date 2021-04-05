import { mat4, vec3 } from 'gl-matrix';
import { Camera } from './camera';

export class CameraOrtho extends Camera {
  left!: number;
  right!: number;
  top!: number;
  bottom!: number;

  constructor(
    left = 1,
    right = -1,
    top = 1,
    bottom = -1,
    near = 0.1,
    far = 100
  ) {
    super();

    const eye = vec3.clone([0, 0, 15]);
    const center = vec3.create();
    const up = vec3.clone([0, -1, 0]);

    this.lookAt(eye, center, up);
    this.ortho(left, right, top, bottom, near, far);
  }

  ortho(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near = 0.1,
    far = 100
  ) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;

    mat4.ortho(this.projection, left, right, bottom, top, near, far);
  }
}
