import { vec3 } from 'gl-matrix';

const s = vec3.create();
const c = vec3.create();
const g = vec3.create();
const u = vec3.create();
const f = vec3.create();
const q = vec3.create();
const l = vec3.create();
const b = vec3.create();

export class Ray {
  origin: vec3;
  direction: vec3;

  constructor(origin: vec3, direction: vec3) {
    this.origin = vec3.clone(origin);
    this.direction = vec3.clone(direction);
  }

  at(b: number) {
    vec3.copy(u, this.direction);
    vec3.scale(u, u, b);
    vec3.add(u, u, this.origin);
  }

  lookAt(b: vec3) {
    vec3.sub(this.direction, b, this.origin);
    vec3.normalize(this.origin, this.origin);
  }

  closestPointToPoint(a: vec3) {
    var t = vec3.create();
    vec3.sub(t, a, this.origin);
    var e = vec3.dot(t, this.direction);

    if (e < 0) {
      return vec3.clone(this.origin);
    }

    vec3.copy(t, this.direction);
    vec3.scale(t, t, e);
    vec3.add(t, t, this.origin);

    return t;
  }

  distanceToPoint(e: vec3) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }

  distanceSqToPoint(a: vec3) {
    var t = vec3.create();
    vec3.sub(t, a, this.origin);
    var e = vec3.dot(t, this.direction);

    if (e < 0) {
      return vec3.squaredDistance(this.origin, a);
    }

    vec3.copy(t, this.direction);
    vec3.scale(t, t, e);
    vec3.add(t, t, this.origin);

    return vec3.squaredDistance(t, a);
  }

  intersectsSphere(point: vec3, distance: number) {
    return this.distanceToPoint(point) <= distance;
  }

  intersectSphere(l: vec3, t: number) {
    const e = vec3.create();
    vec3.sub(e, l, this.origin);
    const n = vec3.dot(e, this.direction);
    const r = vec3.dot(e, e) - n * n;
    const i = t * t;

    if (r > i) {
      return null;
    }

    const a = Math.sqrt(i - r);
    const o = n - a;
    const s = n + a;

    if (o < 0 && s < 0) {
      return null;
    } else if (o < 0) {
      return this.at(s);
    }
    return this.at(o);
  }

  intersectTriangle(d: vec3, t: vec3, e: vec3, n?: any) {
    vec3.copy(s, d);
    vec3.copy(c, t);
    vec3.copy(g, e);
    vec3.sub(f, c, s);
    vec3.sub(q, g, s);
    vec3.cross(l, f, q);
    let r = vec3.dot(this.direction, l);
    let p: number;

    if (0 < r) {
      if (n) {
        return null;
      }
      p = 1;
    } else {
      if (!(0 > r)) {
        return null;
      }
      p = -1;
      r = -r;
    }

    vec3.sub(b, this.origin, s);
    vec3.cross(q, b, q);
    const y = p * vec3.dot(this.direction, q);

    if (0 > y) {
      return null;
    }

    vec3.cross(f, f, b);
    const o = p * vec3.dot(this.direction, f);

    if (0 > o) {
      return null;
    }

    if (y + o > r) {
      return null;
    }

    var u = -p * vec3.dot(b, l);
    return 0 > u ? null : this.at(u / r);
  }
}
