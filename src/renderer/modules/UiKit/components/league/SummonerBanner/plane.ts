import Gl from './gl';
import { GlOption } from './types';

const createPlane = (gl: Gl, width: number, height: number, n = 1, r = 1) => {
  const vertexBuffer = [];
  const texCoordBuffer = [];
  const indexBuffer = [];
  let i = 0;

  const s = (o: number, t: number) => [
    (o / n) * width,
    (1 - t / r) * height,
    0,
  ];

  for (let c = 0; c < n; c++) {
    for (let p = 0; p < r; p++) {
      vertexBuffer.push(s(c, p));
      vertexBuffer.push(s(c + 1, p));
      vertexBuffer.push(s(c + 1, p + 1));
      vertexBuffer.push(s(c, p + 1));
      texCoordBuffer.push([c / n, p / r]);
      texCoordBuffer.push([(c + 1) / n, p / r]);
      texCoordBuffer.push([(c + 1) / n, (p + 1) / r]);
      texCoordBuffer.push([c / n, (p + 1) / r]);
      indexBuffer.push(4 * i + 0);
      indexBuffer.push(4 * i + 1);
      indexBuffer.push(4 * i + 2);
      indexBuffer.push(4 * i + 0);
      indexBuffer.push(4 * i + 2);
      indexBuffer.push(4 * i + 3);
      i++;
    }
  }

  const mesh = gl.createMesh();
  mesh.bufferVertex(vertexBuffer);
  mesh.bufferTexCoord(texCoordBuffer);
  mesh.bufferIndex(indexBuffer, GlOption.STATIC_DRAW);

  return mesh;
};

export default createPlane;
