import { useEffect, useRef } from 'react'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform float uIntensity;

  #define NUM_OCTAVES 3

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
      u.y
    );
    return res * res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.3;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.4;
    }
    return v;
  }

  void main() {
    vec2 shake = vec2(sin(iTime * 0.6) * 0.002, cos(iTime * 0.9) * 0.002);
    vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(5.6, -3.8, 3.8, 5.6);
    vec2 v;
    vec4 o = vec4(0.0);

    float f = 1.8 + fbm(p + vec2(iTime * 1.2, 0.0)) * 0.45;

    for (float i = 0.0; i < 22.0; i++) {
      v = p + cos(i * i + (iTime + p.x * 0.08) * 0.035 + i * vec2(13.0, 11.0)) * 3.2;
      float tailNoise = fbm(v + vec2(iTime * 0.22, i)) * 0.24 * (1.0 - (i / 22.0));

      vec3 cyan = vec3(0.24, 0.90, 0.96);
      vec3 teal = vec3(0.25, 0.94, 0.74);
      vec3 amber = vec3(0.96, 0.72, 0.30);
      vec3 rose = vec3(1.00, 0.42, 0.54);
      vec3 colorA = mix(cyan, teal, 0.45 + 0.35 * sin(i * 0.18 + iTime * 0.18));
      vec3 colorB = mix(amber, rose, 0.35 + 0.25 * cos(i * 0.25 + iTime * 0.12));
      vec3 auroraColor = mix(colorA, colorB, smoothstep(0.58, 1.0, i / 22.0));

      vec4 currentContribution = vec4(auroraColor, 1.0) * exp(sin(i * i + iTime * 0.45)) / length(max(v, vec2(v.x * f * 0.018, v.y * 1.55)));
      float thinnessFactor = smoothstep(0.0, 1.0, i / 22.0) * 0.52;
      o += currentContribution * (1.0 + tailNoise * 0.7) * thinnessFactor;
    }

    o = tanh(pow(o / 120.0, vec4(1.65)));
    vec3 color = o.rgb * uIntensity;
    float vignette = smoothstep(1.15, 0.18, length((gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y));
    gl_FragColor = vec4(color * vignette, 1.0);
  }
`

export default function AnimatedShaderBackground({ className = '', intensity = 1.25, speed = 0.55 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let disposed = false
    let frameId = 0
    let teardown = () => {
      cancelAnimationFrame(frameId)
    }

    const setup = async () => {
      const THREE = await import('three')
      if (disposed || !container.isConnected) return

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      })

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 0.85))
      container.appendChild(renderer.domElement)

      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(1, 1) },
          uIntensity: { value: intensity },
        },
        vertexShader,
        fragmentShader,
        depthWrite: false,
        depthTest: false,
      })

      const geometry = new THREE.PlaneGeometry(2, 2)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      let active = true
      let start = performance.now()
      let lastRender = 0

      const resize = () => {
        const width = Math.max(1, container.clientWidth)
        const height = Math.max(1, container.clientHeight)
        renderer.setSize(width, height, false)
        material.uniforms.iResolution.value.set(width, height)
      }

      const animate = (now) => {
        if (!active || disposed) return
        if (now - lastRender > 32) {
          material.uniforms.iTime.value = ((now - start) / 1000) * speed
          renderer.render(scene, camera)
          lastRender = now
        }
        frameId = requestAnimationFrame(animate)
      }

      const startAnimation = () => {
        if (active || disposed) return
        active = true
        start = performance.now() - (material.uniforms.iTime.value / speed) * 1000
        frameId = requestAnimationFrame(animate)
      }

      const stopAnimation = () => {
        active = false
        cancelAnimationFrame(frameId)
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      resize()

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && document.visibilityState === 'visible') startAnimation()
        else stopAnimation()
      }, { threshold: 0.05 })
      intersectionObserver.observe(container)

      const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') startAnimation()
        else stopAnimation()
      }

      document.addEventListener('visibilitychange', onVisibilityChange)
      frameId = requestAnimationFrame(animate)

      teardown = () => {
        stopAnimation()
        document.removeEventListener('visibilitychange', onVisibilityChange)
        intersectionObserver.disconnect()
        resizeObserver.disconnect()
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    }

    setup()

    return () => {
      disposed = true
      teardown()
    }
  }, [intensity, speed])

  return <div ref={containerRef} className={`animated-shader-background ${className}`} aria-hidden="true" />
}
