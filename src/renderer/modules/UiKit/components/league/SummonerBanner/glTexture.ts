import {
  GlOption,
  GlOptionReverse,
  GlTextureParams,
  GlTextureSource,
  GlTextureSourceType,
} from './types';
import Gl from './gl';

class GlTexture {
  private _gl: Gl;
  private _source: GlTextureSource;
  private _sourceType: GlTextureSourceType;
  private _texture: WebGLTexture;
  private _width?: number;
  private _height?: number;
  private _generateMipmap?: boolean;

  private _params: Required<GlTextureParams>;
  private _texelType?: GlOption.UNSIGNED_BYTE | GlOption.FLOAT;

  get minFilter() {
    return this._params.minFilter;
  }
  set minFilter(v: number) {
    this._params.minFilter = v;
    this._checkMipmap();

    const glContext = this._gl.context;

    glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_MIN_FILTER,
      this._params.minFilter
    );
    glContext.bindTexture(glContext.TEXTURE_2D, null);
    this.generateMipmap();
  }

  get magFilter() {
    return this._params.minFilter;
  }
  set magFilter(v: number) {
    this._params.magFilter = v;

    const glContext = this._gl.context;

    glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_MAG_FILTER,
      this._params.magFilter
    );
    glContext.bindTexture(glContext.TEXTURE_2D, null);
  }

  get wrapS() {
    return this._params.wrapS;
  }
  set wrapS(v: number) {
    this._params.wrapS = v;

    const glContext = this._gl.context;

    this._checkWrapping();
    glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_WRAP_S,
      this._params.wrapS
    );
    glContext.bindTexture(glContext.TEXTURE_2D, null);
  }

  get wrapT() {
    return this._params.wrapT;
  }
  set wrapT(v: number) {
    this._params.wrapT = v;

    const glContext = this._gl.context;

    this._checkWrapping();
    glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_WRAP_T,
      this._params.wrapT
    );
    glContext.bindTexture(glContext.TEXTURE_2D, null);
  }

  get texelType() {
    return this._texelType;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get texture() {
    return this._texture;
  }

  get doGenerateMipmap() {
    return this._generateMipmap;
  }

  constructor(
    gl: Gl,
    source: GlTextureSource,
    params: GlTextureParams,
    width: number,
    height: number
  ) {
    this._gl = gl;
    this._source = source;

    this._getDimension(source, width, height);
    this._sourceType = params.type || this._getSourceType(source);
    this._checkSource();
    this._texelType = this._getTexelType();

    this._params = this._getTextureParameters(params);
    this._checkMipmap();
    this._checkWrapping();
    this._texture = this._gl.context.createTexture()!;
    this._uploadTexture();
  }

  bind(textureSlot = 0) {
    const glContext = this._gl.context;

    if (this._gl.shader) {
      glContext.activeTexture(glContext.TEXTURE0 + textureSlot);
      glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
    }
  }

  updateTexture(source: GlTextureSource) {
    this._source = source;
    this._checkSource();
    this._uploadTexture();
  }

  generateMipmap() {
    const glContext = this._gl.context;

    if (this._generateMipmap) {
      glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
      glContext.generateMipmap(glContext.TEXTURE_2D);
      glContext.bindTexture(glContext.TEXTURE_2D, null);
    }
  }

  // TODO(TRB): remove any type casting
  private _getDimension(
    source: GlTextureSource,
    width: number,
    height: number
  ) {
    if (source) {
      this._width = (source as any).width;
      this._height = (source as any).height;
      this._width = this._width || width;
      this._height = this._height || height;

      if (!this._width || !this._height) {
        this._width = this._height = Math.sqrt((source as any).length / 4);
      }
    } else {
      this._width = width;
      this._height = height;
    }
  }

  // TODO(TRB): remove any type casting
  private _checkSource() {
    if (!this._source) {
      return;
    }

    if (this._sourceType === GlOption.UNSIGNED_BYTE) {
      if (!(this._source instanceof Uint8Array)) {
        this._source = new Uint8Array(this._source as any);
      }
    } else if (this._sourceType === GlOption.FLOAT) {
      if (!(this._source instanceof Float32Array)) {
        this._source = new Float32Array(this._source as any);
      }
    }
  }

  private _getTexelType() {
    switch (this._sourceType) {
      case 'canvas':
      case 'image':
        return GlOption.UNSIGNED_BYTE;

      default:
        return this._sourceType;
    }
  }

  private _checkMipmap() {
    if (!this._width || !this._height) {
      return;
    }

    this._generateMipmap = this._params.mipmap;

    if (!this._r(this._width) || !this._r(this._height)) {
      this._generateMipmap = false;
    }

    if (
      (GlOptionReverse as any)[this._params.minFilter].indexOf('MIPMAP') === -1
    ) {
      this._generateMipmap = false;
    }
  }

  private _checkWrapping() {
    if (this._generateMipmap) {
      return;
    }

    this._params.wrapS = GlOption.CLAMP_TO_EDGE;
    this._params.wrapT = GlOption.CLAMP_TO_EDGE;
  }

  private _isSourceHtmlElement() {
    return this._sourceType === 'image' || this._sourceType === 'canvas';
  }

  private _uploadTexture() {
    if (
      this._width === undefined ||
      this._height === undefined ||
      this._texelType === undefined
    ) {
      return;
    }

    const glContext = this._gl.context;

    glContext.bindTexture(glContext.TEXTURE_2D, this._texture);
    glContext.pixelStorei(glContext.UNPACK_FLIP_Y_WEBGL, true);

    if (this._isSourceHtmlElement()) {
      const srcAsHtml = this._source as HTMLImageElement | HTMLCanvasElement;
      glContext.texImage2D(
        glContext.TEXTURE_2D,
        0,
        this._params.internalFormat,
        this._params.format,
        this._texelType,
        srcAsHtml
      );
    } else {
      const srcAsBuffer = this._source as ArrayBufferView;

      glContext.texImage2D(
        glContext.TEXTURE_2D,
        0,
        this._params.internalFormat,
        this._width,
        this._height,
        0,
        this._params.format,
        this._texelType,

        srcAsBuffer
      );
    }

    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_MAG_FILTER,
      this._params.magFilter
    );

    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_MIN_FILTER,
      this._params.minFilter
    );

    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_WRAP_S,
      this._params.wrapS
    );

    glContext.texParameteri(
      glContext.TEXTURE_2D,
      glContext.TEXTURE_WRAP_T,
      this._params.wrapT
    );

    glContext.pixelStorei(
      glContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
      this._params.premultiplyAlpha
    );

    if (0 < this._params.anisotropy) {
      const extension = this._gl.getExtension('EXT_texture_filter_anisotropic');

      if (extension) {
        const maxAni = glContext.getParameter(
          extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT
        );
        const min = Math.min(maxAni, this._params.anisotropy);
        glContext.texParameterf(
          glContext.TEXTURE_2D,
          extension.TEXTURE_MAX_ANISOTROPY_EXT,
          min
        );
      }
    }

    if (this._generateMipmap) {
      glContext.generateMipmap(glContext.TEXTURE_2D);
      glContext.bindTexture(glContext.TEXTURE_2D, null);
    }
  }

  private _getSourceType(source: GlTextureSource): GlTextureSourceType {
    switch (true) {
      case source instanceof Array:
        return GlOption.UNSIGNED_BYTE;

      case source instanceof Uint8Array:
        return GlOption.UNSIGNED_BYTE;

      case source instanceof Float32Array:
        return GlOption.FLOAT;

      case source instanceof HTMLImageElement:
        return 'image';

      case source instanceof HTMLCanvasElement:
        return 'canvas';

      default:
        return GlOption.UNSIGNED_BYTE;
    }
  }

  private _r(e: number) {
    return 0 !== e && !(e & (e - 1));
  }

  private _getTextureParameters(
    params: GlTextureParams
  ): Required<GlTextureParams> {
    const determineMinFilter = () => {
      if (
        this._width &&
        this._height &&
        this._r(this._width) &&
        this._r(this._height)
      ) {
        return GlOption.NEAREST_MIPMAP_LINEAR;
      }

      return GlOption.LINEAR;
    };

    const fullParams: Required<GlTextureParams> = {
      anisotropy: params.anisotropy || 0,
      format: params.format || GlOption.RGBA,
      internalFormat: params.internalFormat || GlOption.RGBA,
      level: params.level || 0,
      magFilter: params.magFilter || GlOption.LINEAR,
      minFilter: params.minFilter || determineMinFilter(),
      mipmap: params.mipmap || true,
      premultiplyAlpha: params.premultiplyAlpha || false,
      type: params.type || this._getSourceType(this._source),
      wrapS: params.wrapS || GlOption.CLAMP_TO_EDGE,
      wrapT: params.wrapT || GlOption.CLAMP_TO_EDGE,
    };

    return fullParams;
  }
}

export default GlTexture;
