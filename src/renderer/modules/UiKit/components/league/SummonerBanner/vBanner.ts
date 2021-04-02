import { BannerAnimationConfig, BannerTextureMap } from './types';
import Gl from './gl';

class VBanner {
  constructor(
    private _gl: Gl,
    private _config: BannerAnimationConfig,
    private _textures: BannerTextureMap
  ) {}
}

export default VBanner;
