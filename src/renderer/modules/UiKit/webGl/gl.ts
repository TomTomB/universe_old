import { GlConfig, GlOption, GlTextureParams } from './types';
import { mat3, mat4, vec4 } from 'gl-matrix';
import { Camera } from './camera/camera';
import { GlMesh } from './glMesh';
import { GlShader } from './glShader';
import { GlTexture } from './glTexture';

export class Gl {
  private _canvasElement: HTMLCanvasElement;

  private _viewport: vec4;
  private _normalMatrix: mat3;
  private _inverseModelViewMatrix: mat3;
  private _modelMatrix: mat4;
  private _matrix: mat4;
  private _aspectRatio?: number;

  private readonly _extensionList = [
    'EXT_shader_texture_lod',
    'EXT_sRGB',
    'EXT_frag_depth',
    'OES_texture_float',
    'OES_texture_half_float',
    'OES_texture_float_linear',
    'OES_texture_half_float_linear',
    'OES_standard_derivatives',
    'WEBGL_depth_texture',
    'EXT_texture_filter_anisotropic',
    'OES_vertex_array_object',
    'ANGLE_instanced_arrays',
    'WEBGL_draw_buffers',
  ];

  extensions: Record<string, any> = {};
  identityMatrix: mat4;
  context: WebGL2RenderingContext;
  shader?: GlShader;
  shaderProgram?: WebGLProgram | null;
  camera?: Camera;

  get width() {
    return this._canvasElement.width;
  }

  get height() {
    return this._canvasElement.height;
  }

  get canvas() {
    return this._canvasElement;
  }

  get aspectRatio() {
    return this._aspectRatio;
  }

  constructor(canvasElement: HTMLCanvasElement, config: GlConfig = {}) {
    this._canvasElement = canvasElement;

    this.setSize();

    this._viewport = [0, 0, this.width, this.height];
    this.identityMatrix = mat4.create();
    this._normalMatrix = mat3.create();
    this._inverseModelViewMatrix = mat3.create();
    this._modelMatrix = mat4.create();
    this._matrix = mat4.create();
    mat4.identity(this.identityMatrix);

    this.context = this._canvasElement.getContext(
      'webgl2',
      config
    ) as WebGL2RenderingContext;

    if (!this.context) {
      return;
    }

    for (const extensionName of this._extensionList) {
      this.extensions[extensionName] = this.context.getExtension(extensionName);
    }

    this.getAndApplyExtension('OES_vertex_array_object');
    this.getAndApplyExtension('ANGLE_instanced_arrays');
    this.getAndApplyExtension('WEBGL_draw_buffers');

    this.context.enable(GlOption.DEPTH_TEST);
    this.context.enable(GlOption.CULL_FACE);
    this.context.enable(GlOption.BLEND);
    this.context.blendFunc(GlOption.SRC_ALPHA, GlOption.ONE_MINUS_SRC_ALPHA);

    this.context.createVertexArray();
  }

  createShader(vertexSrc: string, fragmentSrc: string) {
    return new GlShader(this, vertexSrc, fragmentSrc);
  }

  createMesh(drawType = 4) {
    return new GlMesh(this, drawType);
  }

  createTexture(
    image: HTMLImageElement,
    options: GlTextureParams = {},
    width = 0,
    height = 0
  ) {
    return new GlTexture(this, image, options, width, height);
  }

  setMatrices(camera: Camera) {
    this.camera = camera;
    this.rotate(this.identityMatrix);
  }

  rotate(matrix: mat4) {
    if (!this.camera) {
      return;
    }

    mat4.copy(this._modelMatrix, matrix);
    mat4.multiply(this._matrix, this.camera.matrix, this._modelMatrix);
    mat3.fromMat4(this._normalMatrix, this._matrix);
    mat3.invert(this._normalMatrix, this._normalMatrix);
    mat3.transpose(this._normalMatrix, this._normalMatrix);
    mat3.fromMat4(this._inverseModelViewMatrix, this._matrix);
    mat3.invert(this._inverseModelViewMatrix, this._inverseModelViewMatrix);
  }

  useShader(shader: GlShader) {
    this.shader = shader;
    this.shaderProgram = shader.shaderProgram;
  }

  viewport(x: number, y: number, width: number, height: number) {
    let viewportChanged = false;

    if (x !== this._viewport[0]) {
      viewportChanged = true;
    }

    if (y !== this._viewport[1]) {
      viewportChanged = true;
    }

    if (width !== this._viewport[2]) {
      viewportChanged = true;
    }

    if (height !== this._viewport[3]) {
      viewportChanged = true;
    }

    if (viewportChanged) {
      this.context.viewport(x, y, width, height);
      this._viewport = [x, y, width, height];
    }
  }

  cullFace(mode: number) {
    this.context.cullFace(mode);
  }

  clear(red: number, green: number, blue: number, alpha: number) {
    this.context.clearColor(red, green, blue, alpha);
    this.context.clear(
      this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT
    );
  }

  draw(mesh: GlMesh | GlMesh[]) {
    if (!this.shaderProgram || !this.shader) {
      return;
    }

    if (Array.isArray(mesh)) {
      for (const m of mesh) {
        this.draw(m);
      }

      return;
    }

    mesh.bind(this.shaderProgram);

    if (this.camera) {
      this.shader.uniform('uProjectionMatrix', 'mat4', this.camera.projection);
      this.shader.uniform('uViewMatrix', 'mat4', this.camera.matrix);
    }

    this.shader.uniform('uModelMatrix', 'mat4', this._modelMatrix);
    this.shader.uniform('uNormalMatrix', 'mat3', this._normalMatrix);
    this.shader.uniform(
      'uModelViewMatrixInverse',
      'mat3',
      this._inverseModelViewMatrix
    );

    const drawType = mesh.drawType;

    if (mesh.isInstanced) {
      if (mesh.iBuffer?.numItems !== undefined) {
        this.context.drawElementsInstanced(
          drawType,
          mesh.iBuffer.numItems,
          GlOption.UNSIGNED_SHORT,
          0,
          mesh.numInstance
        );
      }
    } else if (drawType === GlOption.POINTS) {
      this.context.drawArrays(drawType, 0, mesh.vertexSize);
    } else {
      if (mesh.iBuffer?.numItems !== undefined) {
        this.context.drawElements(
          drawType,
          mesh.iBuffer.numItems,
          GlOption.UNSIGNED_SHORT,
          0
        );
      }
    }

    mesh.unbind();
  }

  enableAlphaBlending() {
    this.context.blendFunc(GlOption.SRC_ALPHA, GlOption.ONE_MINUS_SRC_ALPHA);
  }

  enableAdditiveBlending() {
    this.context.blendFunc(GlOption.ONE, GlOption.ONE);
  }

  enable(cap: GlOption) {
    this.context.enable(cap);
  }

  disable(cap: GlOption) {
    this.context.disable(cap);
  }

  setSize(width = window.innerWidth, height = window.innerHeight) {
    this.canvas.width = width;
    this.canvas.height = height;
    this._aspectRatio = width / height;

    if (this._viewport) {
      this.viewport(0, 0, width, height);
    }
  }

  checkExtension(name: string) {
    return !!this.extensions[name];
  }

  getExtension(name: string) {
    return this.extensions[name];
  }

  // TODO: This is kind of dirty. Remove it if not needed
  getAndApplyExtension(extensionName: string) {
    const extension = this.context.getExtension(extensionName);

    if (!extension) {
      return;
    }

    const extensionNameStart = extensionName.split('_')[0];
    const regex = new RegExp(`${extensionNameStart}$`);

    for (const key in extension) {
      const extensionProperty = extension[key];

      if (typeof extensionProperty === 'function') {
        const functionName = key.replace(regex, '');

        (this.context as any)[functionName] = extensionProperty.bind(extension);
      }
    }
  }
}
