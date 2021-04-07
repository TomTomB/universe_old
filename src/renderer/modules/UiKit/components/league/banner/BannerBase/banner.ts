import {
  BannerAnimationConfig,
  BannerAssets,
  BannerTextureMap,
  CameraOrtho,
  FpsCounter,
  Gl,
  GlOption,
  GlTextureSource,
  Scheduler,
  Size,
  loadImages,
} from '@uikit/webGl';
import { EventEmitter } from '@uikit/util';
import VBanner from './vBanner';

class Banner extends EventEmitter<'loaded' | 'error'> {
  private _fpsCounter: FpsCounter;
  private _gl: Gl;
  private _camera?: CameraOrtho;
  private _vBanner?: VBanner;
  private _scheduler: Scheduler;

  private _canvasEl: HTMLCanvasElement;
  private _config: BannerAnimationConfig;
  private _assets: BannerAssets;

  private _isLoading?: boolean;
  private _destroyed?: boolean;
  private _canvasSize?: Size | null;
  private _efIndex?: number;

  get canvas() {
    return this._canvasEl;
  }

  constructor(
    assets: BannerAssets,
    canvasEl: HTMLCanvasElement,
    config: BannerAnimationConfig
  ) {
    super();

    this._canvasEl = canvasEl;
    this._assets = assets;
    this._config = config;

    this._fpsCounter = new FpsCounter();
    this._scheduler = new Scheduler();
    this._gl = new Gl(canvasEl, { premultipliedAlpha: true });

    if (!this._gl.context) {
      return;
    }

    this._gl.context.blendFunc(GlOption.ONE, GlOption.ONE_MINUS_SRC_ALPHA);
    this._gl.setSize(1, 1);

    this._camera = new CameraOrtho(
      -this._config.viewportWidth / 2,
      this._config.viewportWidth / 2,
      -this._config.viewportHeight / 2,
      this._config.viewportHeight / 2
    );

    this._camera.lookAt([0, 0, 3], [0, 0, 0]);

    this._generateTextures();
    this._isLoading = true;
    this._destroyed = false;
  }

  setBackgroundTexture(e: GlTextureSource) {
    if (!this._vBanner) {
      return;
    }
    this._vBanner.textureBackground.updateTexture(e);
  }
  setOverlayTexture(e: GlTextureSource) {
    if (!this._vBanner) {
      return;
    }
    this._vBanner.textureOverlay.updateTexture(e);
  }
  setRankTexture(e: GlTextureSource) {
    if (!this._vBanner) {
      return;
    }
    this._vBanner.textureRank.updateTexture(e);
  }

  play() {
    if (!this._gl || this._destroyed) {
      this.emit('error');
    }

    if (this._isLoading) {
      this._scheduler.next(() => this.play());
    } else {
      this.pause();
      this._efIndex = this._scheduler.addEF(() => this._loop());
    }
  }

  pause() {
    if (this._efIndex !== undefined) {
      this._scheduler.removeEF(this._efIndex);
      this._efIndex = undefined;
    }
  }

  destroy() {
    if (this._destroyed || !this._gl.context) {
      return;
    }

    this._destroyed = true;
    this.pause();

    const loseContextExtension = this._gl.context.getExtension(
      'WEBGL_lose_context'
    );

    if (loseContextExtension) {
      loseContextExtension.loseContext();
    }
  }

  private async _generateTextures() {
    const images = await Promise.all(
      loadImages((this._assets as any) as Record<string, string>)
    );

    const textureMap: BannerTextureMap = {
      background: this._gl.createTexture(
        images.find(i => i.id === 'background')!.image,
        { premultiplyAlpha: true }
      ),
      overlay: this._gl.createTexture(
        images.find(i => i.id === 'overlay')!.image,
        { premultiplyAlpha: true }
      ),
      rank: this._gl.createTexture(images.find(i => i.id === 'rank')!.image, {
        premultiplyAlpha: true,
      }),
    };

    this._vBanner = new VBanner(this._gl, this._config, textureMap);

    this.emit('loaded');
    this._isLoading = false;
  }

  private _getCanvasSize() {
    const parent = this._canvasEl.parentNode as HTMLDivElement | null;

    if (!parent || parent.clientWidth <= 0) {
      return null;
    }

    const clientWidth = parent.clientWidth;
    const aspect = this._config.viewportWidth / this._config.viewportHeight;

    return {
      width: Math.round(clientWidth),
      height: Math.round(clientWidth / aspect),
    };
  }

  private _loop() {
    if (!this._canvasSize) {
      this._canvasSize = this._getCanvasSize();
    }

    if (!this._canvasSize || !this._camera) {
      return;
    }

    this._canvasEl.style.width = `${this._canvasSize.width}px`;
    this._canvasEl.style.height = `${this._canvasSize.height}px`;

    this._gl.clear(0, 0, 0, 0);

    this._gl.setSize(
      this._canvasSize.width * window.devicePixelRatio,
      this._canvasSize.height * window.devicePixelRatio
    );

    this._fpsCounter.frame();
    this._gl.setMatrices(this._camera);
    this._vBanner && this._vBanner.render();
  }
}

export default Banner;
