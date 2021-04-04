import Gl from './gl';
import { GlOption } from './types';
import basicFragmentShader from './shaders/basic.frag.glsl';
import basicVertexShader from './shaders/basic.vert.glsl';

export interface GlShaderParameter {
  name: string;
  type: string;
  value: number | Array<any> | Float32Array;
  uniformLoc: string;
  isNumber: boolean;
}

class GlShader {
  private _gl: Gl;
  private _varyings: string[];

  private readonly _glShaderType = {
    float: 'uniform1f',
    vec2: 'uniform2fv',
    vec3: 'uniform3fv',
    vec4: 'uniform4fv',
    int: 'uniform1i',
    mat3: 'uniformMatrix3fv',
    mat4: 'uniformMatrix4fv',
  };

  parameters: GlShaderParameter[] = [];
  uniformTextures: any[] = [];
  shaderProgram?: WebGLProgram | null;

  constructor(
    gl: Gl,
    vertexSrc?: string,
    fragmentSrc?: string,
    varyings?: any
  ) {
    this._gl = gl;
    this._varyings = varyings;

    console.log(vertexSrc, fragmentSrc);

    if (!vertexSrc) {
      vertexSrc = basicVertexShader;
    }

    if (!fragmentSrc) {
      fragmentSrc = basicFragmentShader;
    }

    const vertexShaderProgram = this._createShaderProgram(
      vertexSrc,
      GlOption.VERTEX_SHADER
    );
    const fragmentShaderProgram = this._createShaderProgram(
      fragmentSrc,
      GlOption.FRAGMENT_SHADER
    );

    if (vertexShaderProgram && fragmentShaderProgram) {
      this._attachShaderProgram(vertexShaderProgram, fragmentShaderProgram);
    }
  }

  bind() {
    if (this._gl.shader === this || !this.shaderProgram) {
      return;
    }

    this._gl.context.useProgram(this.shaderProgram);
    this._gl.useShader(this);
    this.uniformTextures = [];
  }

  uniform(shaderProperty: string | object, type?: string, value?: any) {
    if (!this.shaderProgram) {
      return;
    }

    if (typeof shaderProperty === 'object' && shaderProperty !== null) {
      this.uniformObject(shaderProperty);
      return;
    }

    if (!type || !value) {
      return;
    }

    const program = this.shaderProgram as any;
    const glContext = this._gl.context;
    const glType = (this._glShaderType as any)[type] || type;
    let foundShaderProperty = false;
    let currentShaderProperty = undefined;
    let foundShaderPropertyIndex = -1;

    for (let i = 0; i < this.parameters.length; i++) {
      currentShaderProperty = this.parameters[i];
      if (currentShaderProperty.name === shaderProperty) {
        foundShaderProperty = true;
        foundShaderPropertyIndex = i;
        break;
      }
    }

    let currentShaderPropertyIsNumber = false;

    if (foundShaderProperty && currentShaderProperty) {
      program[shaderProperty] = currentShaderProperty.uniformLoc;
      currentShaderPropertyIsNumber = currentShaderProperty.isNumber;
    } else {
      currentShaderPropertyIsNumber =
        'uniform1i' === glType || 'uniform1f' === glType;
      program[shaderProperty] = glContext.getUniformLocation(
        program,
        shaderProperty
      );

      if (currentShaderPropertyIsNumber) {
        this.parameters.push({
          name: shaderProperty,
          type: glType,
          value: value,
          uniformLoc: program[shaderProperty],
          isNumber: currentShaderPropertyIsNumber,
        });
      } else {
        this.parameters.push({
          name: shaderProperty,
          type: glType,
          value: this._copyOrCreateArray(value),
          uniformLoc: program[shaderProperty],
          isNumber: currentShaderPropertyIsNumber,
        });
      }

      foundShaderPropertyIndex = this.parameters.length - 1;
    }

    const newShaderParam = this.parameters[foundShaderPropertyIndex];

    if (newShaderParam.uniformLoc) {
      if (glType.indexOf('Matrix') !== -1) {
        if (
          !this._arraysAreEqual(newShaderParam.value, value) ||
          !foundShaderProperty
        ) {
          (glContext as any)[glType](program[shaderProperty], false, value);
          newShaderParam.value = this._copyOrCreateArray(value);
        }
      } else if (currentShaderPropertyIsNumber) {
        var y = newShaderParam.value !== value || !foundShaderProperty;

        if (y) {
          (glContext as any)[glType](program[shaderProperty], value);
          newShaderParam.value = value;
        }
      } else if (
        !this._arraysAreEqual(newShaderParam.value, value) ||
        !foundShaderProperty
      ) {
        (glContext as any)[glType](program[shaderProperty], value);
        newShaderParam.value = this._copyOrCreateArray(value);
      }
    }
  }

  uniformObject(obj: object) {
    for (var key in obj) {
      let value: Array<any> | number = (obj as any)[key];
      const type = this._getUniformType(value);

      if (Array.isArray(value) && Array.isArray(value[0])) {
        let i: any[] = [];

        for (let a = 0; a < value.length; a++) {
          i = i.concat(value[a]);
        }

        value = i;
      }

      this.uniform(key, type, value);
    }
  }

  private _createShaderProgram(
    shaderSrc: string,
    type: GlOption.VERTEX_SHADER | GlOption.FRAGMENT_SHADER
  ) {
    const shader = this._gl.context.createShader(type);

    if (!shader) {
      return null;
    }

    this._gl.context.shaderSource(shader, shaderSrc);
    this._gl.context.compileShader(shader);

    return this._gl.context.getShaderParameter(shader, GlOption.COMPILE_STATUS)
      ? shader
      : null;
  }

  private _attachShaderProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ) {
    this.shaderProgram = this._gl.context.createProgram();

    if (this.shaderProgram) {
      this._gl.context.attachShader(this.shaderProgram, vertexShader);
      this._gl.context.attachShader(this.shaderProgram, fragmentShader);
      this._gl.context.deleteShader(vertexShader);
      this._gl.context.deleteShader(fragmentShader);

      if (this._varyings) {
        this._gl.context.transformFeedbackVaryings(
          this.shaderProgram,
          this._varyings,
          this._gl.context.SEPARATE_ATTRIBS
        );
      }

      this._gl.context.linkProgram(this.shaderProgram);
    }
  }

  private _getUniformType(val: any) {
    const isArray = Array.isArray(val);

    if (!isArray) {
      return 'float';
    }

    const length: number = Array.isArray(val[0]) ? val[0].length : val.length;

    if (length === 9) {
      return 'uniformMatrix3fv';
    }

    if (length === 16) {
      return 'uniformMatrix4fv';
    }

    return `vec${length}`;
  }

  private _arraysAreEqual(a: any, t: any) {
    if (a.length !== t.length) {
      return false;
    }
    for (var e = 0; e < a.length; e++) {
      if (a[e] !== t[e]) {
        return false;
      }
    }
    return true;
  }

  private _copyOrCreateArray(e: Array<any> | number) {
    return Array.isArray(e) ? e.slice(0) : new Float32Array(e);
  }
}

export default GlShader;
