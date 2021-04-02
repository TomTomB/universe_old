import { GlConfig, GlOption } from './types';
import { mat3, mat4, vec4 } from 'gl-matrix';
import GlShader from './glShader';
import Mesh from './mesh';

class Gl {
  private _canvasElement: HTMLCanvasElement;
  private _config: GlConfig;

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
    this._config = config;

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

    for (const extensionName of this._extensionList) {
      this.extensions[extensionName] = this.context.getExtension(extensionName);
    }

    // this.getAndApplyExtension('OES_vertex_array_object');
    // this.getAndApplyExtension('ANGLE_instanced_arrays');
    // this.getAndApplyExtension('WEBGL_draw_buffers');

    this.context.enable(GlOption.DEPTH_TEST);
    this.context.enable(GlOption.CULL_FACE);
    this.context.enable(GlOption.BLEND);
    this.context.blendFunc(GlOption.SRC_ALPHA, GlOption.ONE_MINUS_SRC_ALPHA);

    this.context.createVertexArray();
    console.log(this.context);
  }

  createShader(vertexSrc: string, fragmentSrc: string) {
    return new GlShader(this, vertexSrc, fragmentSrc);
  }

  createMesh(drawType = 4) {
    return new Mesh(this, drawType);
  }

  createTexture() {}

  setMatrices() {}

  rotate() {}

  useShader(shader: GlShader) {
    this.shader = shader;
    this.shaderProgram = shader.shaderProgram;
  }

  viewport() {}

  cullFace() {}

  clear() {}

  draw() {}

  setSize() {}

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

export default Gl;
