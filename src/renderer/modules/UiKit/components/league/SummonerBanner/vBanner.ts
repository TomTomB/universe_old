import { BannerAnimationConfig, BannerTextureMap, GlOption } from './types';
import EaseNumber from './easeNumber';
import Gl from './gl';
import GlMesh from './glMesh';
import GlShader from './glShader';
import GlTexture from './glTexture';
import bannerFragmentShader from './shaders/banner.frag';
import bannerVertexShader from './shaders/banner.vert';
import createPlane from './plane';

class VBanner {
  private _gl: Gl;
  private _config: BannerAnimationConfig;
  private _seed: number;
  private _time: number;
  private _count: number;
  private _speed?: number;
  private _speedOffset: EaseNumber;

  shader: GlShader;
  mesh: GlMesh;
  textureBackground: GlTexture;
  textureOverlay: GlTexture;
  textureRank: GlTexture;

  ratio: number;
  size: [number, number];
  position: [number, number, number];

  get width() {
    return this.size[0];
  }

  get height() {
    return this.size[1];
  }

  constructor(
    gl: Gl,
    config: BannerAnimationConfig,
    textures: BannerTextureMap
  ) {
    this._gl = gl;
    this.shader = this._gl.createShader(
      bannerVertexShader,
      bannerFragmentShader
    );
    this._config = config;
    this.textureBackground = textures.background;
    this.textureOverlay = textures.overlay;
    this.textureRank = textures.rank;

    this.textureRank.minFilter = this.textureRank.doGenerateMipmap
      ? GlOption.LINEAR_MIPMAP_LINEAR
      : GlOption.LINEAR;

    this.mesh = createPlane(
      this._gl,
      this._config.bannerWidth,
      this._config.bannerHeight,
      10,
      50
    );
    this.ratio = this._config.bannerWidth / this._config.bannerHeight;
    this.size = [this._config.bannerWidth, this._config.bannerHeight];
    this.position = [
      -this._config.bannerWidth / 2,
      -this._config.bannerHeight / 2,
      0,
    ];
    this._seed = 255 * Math.random();
    this._time = 255 * Math.random();
    this._count = 0;
    this._speedOffset = new EaseNumber(0, 0.02);
    this._setupUniforms();
  }

  render() {
    if (0 >= this._count--) {
      this._resetSpeed();
    }

    if (!this._speed) {
      return;
    }

    this._time += 0.005 * this._speed;
    this._updateUniforms();
    this._gl.draw(this.mesh);
  }

  private _setupUniforms() {
    if (
      !this.textureBackground.width ||
      !this.textureRank.width ||
      !this.textureRank.height ||
      !this.textureBackground.height
    ) {
      return;
    }

    this.shader.bind();
    this.shader.uniform('textureBackground', 'uniform1i', 0);
    this.textureBackground.bind(0);
    this.shader.uniform('textureOverlay', 'uniform1i', 1);
    this.textureOverlay.bind(1);
    this.shader.uniform('textureRank', 'uniform1i', 2);
    this.textureRank.bind(2);

    const backgroundRankRatio =
      this.textureBackground.width / this.textureRank.width;
    const backgroundRankHeight = backgroundRankRatio * this.textureRank.height;
    const rankRatioInv = [
      1,
      this.textureBackground.height / backgroundRankHeight,
    ];

    this.shader.uniform('uRankRatioInv', 'vec2', rankRatioInv);
    this.shader.uniform('uRankPosition', 'vec2', [
      0.5,
      backgroundRankHeight / this.textureBackground.height / 2,
    ]);

    const o = [this._config.topFadeStart, this._config.topFadeEnd],
      r = [this._config.bottomFadeStart, this._config.bottomFadeEnd],
      i = [
        this._config.circleGradientCenter,
        this._config.circleGradientStart,
        this._config.circleGradientEnd,
      ],
      l = this._config.fadeOutColor.map(e => e / 255);

    this.shader.uniform('uSize', 'vec2', this.size);
    this.shader.uniform('uTopFade', 'vec2', o);
    this.shader.uniform('uBottomFade', 'vec2', r);
    this.shader.uniform(
      'uBottomFadeAlpha',
      'float',
      this._config.bottomFadeAlpha
    );
    this.shader.uniform('uGradientFade', 'vec3', i);
    this.shader.uniform('uRatio', 'float', this.ratio);
    this.shader.uniform('uPosition', 'vec3', this.position);
    this.shader.uniform('uDebug', 'float', this._config.debugFade ? 1 : 0);
    this.shader.uniform('uNoiseScale', 'float', this._config.noiseScale);
    this.shader.uniform('uMovingRange', 'float', this._config.movingRange);
    this.shader.uniform('uHighlightNoise', 'vec2', [
      this._config.highlightNoiseX,
      this._config.highlightNoiseY,
    ]);
    this.shader.uniform('uFadeOutColor', 'vec3', l);
    this.shader.uniform('uSeed', 'float', this._seed);
    this.shader.uniform(this._config.ripple);
  }

  private _updateUniforms() {
    this.shader.bind();
    this._speedOffset.update();
    const t = this._config.brightness * this._speedOffset.value;
    this.shader.uniform('uBrightness', 'float', t);
    this.shader.uniform('uTime', 'float', this._config.speed * this._time);
  }

  private _resetSpeed() {
    this._count = Math.floor(this._o(50, 200));
    this._speed = this._o(1, 4);
    const e = 0.75;
    this._speedOffset.targetValue = 1 - e + ((this._speed - 1) / 3) * e;
  }

  private _o(e: number, t: number) {
    return e + Math.random() * (t - e);
  }
}

export default VBanner;
