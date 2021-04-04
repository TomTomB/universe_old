#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;

varying vec3 vPosition;
varying vec3 vPositionFixed;
varying vec3 vDebug;
varying vec2 vTextureCoord;
varying float vFadeButtom;

uniform sampler2D textureBackground; // main banner background image
uniform sampler2D textureOverlay; // additional banner-sized overlay
uniform vec2 uSize; // banner width height

uniform sampler2D textureRank; // rank trim on bottom of banner
uniform vec2 uRankPosition; // position on banner, as a center point uv
uniform vec2 uRankRatioInv; // banner.wh / rank.wh

uniform vec2 uTopFade;
uniform vec2 uHighlightNoise;
uniform vec3 uGradientFade;
uniform vec3 uFadeOutColor;
uniform float uRatio;
uniform float uTime;
uniform float uDebug;
uniform float uBrightness;

uniform float uRippleCenter;
uniform float uRippleScaleX;
uniform float uDensity;
uniform float uRippleSpeed;
uniform float uRippleStart;
uniform float uRippleRange;
uniform float uRippleNoise;
uniform float uRippleNoiseStrength;
uniform float uSeed;
uniform float uBottomFadeAlpha;


// permutation polynomial: (34x^2 + x) mod 289
// see page 3 of http://webstaff.itn.liu.se/~stegu/jgt2011/article.pdf
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

// fast inverse square root
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

// Simplex noise
float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

// uvBanner = (u,v) test point in banner space
// decalCenter = (u,v) of the decal's center point in banner space
// ratioBannerToDecal = ratio of (w,h) banner divided by (w,h) decal
// returns the (u,v) in decal space (if the test point is outside of the decal,
//     then u and/or v will be <0 or >1)
vec2 getDecalUV(vec2 uvBanner, vec2 decalCenter, vec2 ratioBannerToDecal) {
    return (uvBanner - decalCenter) * ratioBannerToDecal + vec2(0.5, 0.5);
}

#define PI 3.141592653

float getRipple(vec2 uv) {
    vec2 center = vec2(0.5, uRippleCenter);
    vec2 dir    = uv - center;
    dir.x       *= uRippleScaleX;
    float noise = snoise(vec3(uv * uRippleNoise, uTime + uSeed));

    float dist  = length(dir) + noise * uRippleNoiseStrength;

    float f     = dist - uRippleStart;
    f           = smoothstep(0.0, uRippleRange, f);
    f           = sin(f * PI);

    float highlight = sin(dist * uDensity - uTime * uRippleSpeed) * .5 + .5;

    return highlight * f;
}

// https://en.wikipedia.org/wiki/Blend_modes#Overlay
vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, step(base, vec3(0.5)));
    // with conditionals, may be worth benchmarking
    // return vec3(
    //     base.r < 0.5 ? (2.0 * base.r * blend.r) : (1.0 - 2.0 * (1.0 - base.r) * (1.0 - blend.r)),
    //     base.g < 0.5 ? (2.0 * base.g * blend.g) : (1.0 - 2.0 * (1.0 - base.g) * (1.0 - blend.g)),
    //     base.b < 0.5 ? (2.0 * base.b * blend.b) : (1.0 - 2.0 * (1.0 - base.b) * (1.0 - blend.b))
    // );
}

vec3 premultMix(vec3 base, vec3 addition, float mix) {
    return addition + base * (1.0 - mix);
}

vec4 premultMix(vec4 base, vec4 addition, float mix) {
    return addition + base * (1.0 - mix);
}

void main(void) {
    // Calculate the uv based on the (vertex-buffer-modified) position.
    vec2 uv            = vPosition.xy / uSize;

    // Then use that uv to calculate the fade. The result is that the
    // fade does not sway with the banner.
    float fadeTop      = smoothstep(uTopFade.x, uTopFade.y, uv.y);
    vec2 center        = vec2(0.5, uGradientFade.x);
    float distToCenter = distance(center, uv);
    float fade         = smoothstep(uGradientFade.z, uGradientFade.y, distToCenter);

    // The "uv" values below are based on vTextureCoord so that they stretch and sway with the banner

    // Start with the banner background image
    gl_FragColor       = texture2D(textureBackground, vTextureCoord);

    // Adding the background pattern on to the banner with overlay blendmode
    vec4 colorBgPattern = texture2D(textureOverlay, vTextureCoord);
    vec3 colorOverlay   = blendOverlay(gl_FragColor.rgb, colorBgPattern.rgb);
    gl_FragColor.rgb    = premultMix(gl_FragColor.rgb, colorOverlay, colorBgPattern.a);


    // Then we fade
    float fadeBottom = vFadeButtom;
    vec3 colorFade   = uFadeOutColor;
    float alphaFade  = (1.0 - fadeBottom * fade) * uBottomFadeAlpha;
    colorFade        *= alphaFade; // premultiply the alpha
    gl_FragColor.rgb = premultMix(gl_FragColor.rgb, colorFade, alphaFade);


    // "Draw" the ripple
    float highlight    = getRipple(vec2(1.0, 1.0) - vTextureCoord); // TODO why is ripple upside down
    gl_FragColor.rgb   *= (1.0 + highlight * uBrightness) * gl_FragColor.a;

    gl_FragColor       *= fadeTop;

    // Mix in the rank according to its alpha
    vec2 uvRank        = getDecalUV(vTextureCoord, uRankPosition, uRankRatioInv);
    vec4 colorRank     = texture2D(textureRank, uvRank);
    gl_FragColor       = premultMix(gl_FragColor, colorRank, colorRank.a);

    // TODO remove this when done debugging
    //vec4 debug         = vec4(vec3(fadeBottom * fadeTop * fade), 1.0);
    //gl_FragColor       = mix(gl_FragColor, debug, uDebug);
    // gl_FragColor.rgb       = colorBgPattern.rgb * colorPattern.a;
}
