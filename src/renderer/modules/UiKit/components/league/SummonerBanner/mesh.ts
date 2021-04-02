import Gl from './gl';

class Mesh {
  private _gl: Gl;
  private _attributes = [];
  private _numInstance = -1;
  private _enabledVertexAttribute = [];
  private _indices = [];
  private _faces = [];
  private _bufferChanged = [];
  private _hasIndexBufferChanged = [];
  private _hasVAO = false;
  private _isInstanced = false;
  private _extVAO: boolean;
  private _useVAO: boolean;

  drawType: number;

  constructor(gl: Gl, drawType: number, useVAO = true) {
    this._gl = gl;
    this.drawType = drawType;

    this._extVAO = !!this._gl.context.createVertexArray;
    this._useVAO = !!this._extVAO && useVAO;
  }
}

export default Mesh;
