import { mat4, vec3 } from 'gl-matrix';
import Camera from './camera';

class CameraOrtho extends Camera {
  left!: number;
  right!: number;
  top!: number;
  bottom!: number;

  constructor() {
    super();

    const eye = vec3.clone([0, 0, 15]);
    const center = vec3.create();
    const up = vec3.clone([0, -1, 0]);

    this.lookAt(eye, center, up);
    this.ortho(1, -1, 1, -1);
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

export default CameraOrtho;
