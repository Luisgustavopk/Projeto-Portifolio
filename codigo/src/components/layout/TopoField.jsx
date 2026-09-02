import React, { useEffect, useMemo, useRef } from "react";

const topoFieldSource = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TopoField Audio Reactive</title>
</head>
<body style="background-color: #000; margin: 0; overflow: hidden;">
    <div style="position: fixed; inset: 0; z-index: 0; pointer-events: none;">
        <canvas id="topo-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
    </div>
    <script>
        const canvas = document.getElementById('topo-canvas');
        const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false });

        if (gl) {
            const vsSource = \`
                attribute vec2 a_position;
                void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
            \`;

            const fsSource = \`
                precision highp float;
                uniform vec2 u_resolution;
                uniform float u_time;
                uniform float u_dpr;
                uniform float u_audio; // Valor do audio (0.0 a 1.0)

                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
                float snoise(vec2 v){
                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                    vec2 i  = floor(v + dot(v, C.yy) );
                    vec2 x0 = v -   i + dot(i, C.xx);
                    vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
                    i = mod(i, 289.0);
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m; m = m*m;
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                    vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }

                void main() {
                    vec2 st = gl_FragCoord.xy / u_resolution.xy;
                    st.x *= u_resolution.x / u_resolution.y;

                    float gridSize = 48.0 * u_dpr;
                    vec2 gridSt = gl_FragCoord.xy / gridSize;
                    vec2 gridFract = fract(gridSt);
                    float lineThickness = 1.0 / gridSize;
                    float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);
                    gridLines = clamp(gridLines, 0.0, 1.0) * (0.08 + u_audio * 0.04); 

                    // O áudio expande e deforma o ruído no ritmo da batida
                    float noiseScale = 1.4 + u_audio * 0.35;
                    vec2 noisePos = st * noiseScale + vec2(u_time * (0.015 + u_audio * 0.025), u_time * (0.025 + u_audio * 0.025));
                    float n = snoise(noisePos) * 0.5 + 0.5;
                    
                    // A batida aumenta o número de curvas e a densidade topográfica
                    float numBands = 10.0 + u_audio * 3.5;
                    float bandVal = n * numBands;
                    float triangleWave = abs(fract(bandVal) - 0.5) * 2.0; 
                    
                    float topoLines = smoothstep(0.025 + u_audio * 0.01, 0.00, triangleWave) * (0.45 + u_audio * 0.45);

                    // Brilho Azul Neon pulsante durante a música
                    vec3 lineBaseColor = vec3(1.0);
                    vec3 audioGlowColor = vec3(0.15, 0.5, 1.0) * u_audio * 0.9;

                    vec3 color = vec3(0.0);
                    color += vec3(1.0) * gridLines;
                    color += (lineBaseColor + audioGlowColor) * topoLines;

                    gl_FragColor = vec4(color, 1.0);
                }
            \`;

            function createShader(gl, type, source) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            }

            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

            const positionLocation = gl.getAttribLocation(program, "a_position");
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
            const timeLocation = gl.getUniformLocation(program, "u_time");
            const dprLocation = gl.getUniformLocation(program, "u_dpr");
            const audioLocation = gl.getUniformLocation(program, "u_audio");

            function resizeCanvas() {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
                gl.uniform1f(dprLocation, dpr);
            }

            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            let targetAudio = 0.0;
            let currentAudio = 0.0;

            window.addEventListener('message', (e) => {
                if (e.data && e.data.type === 'audio-data') {
                    targetAudio = e.data.audio || 0.0;
                }
            });

            let startTime = performance.now();
            function render(time) {
                // Suavização da transição do áudio (Lerp)
                currentAudio += (targetAudio - currentAudio) * 0.15;

                gl.uniform1f(timeLocation, (time - startTime) * 0.001);
                gl.uniform1f(audioLocation, currentAudio);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
        }
    </script>
</body>
</html>`;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export default function TopoField({
  isPlaying = false,  
  audioLevel,        
  speed = 1,
  density = 1,
  length = 1,
  className,
  style,
}) {
  const iframeRef = useRef(null);

 
  useEffect(() => {
    let animId;

    const updateAudioFrame = () => {
      let level = audioLevel;

      
      if (level === undefined || level === null) {
        if (isPlaying) {
          const t = Date.now() / 1000;
          
          const beat = Math.pow(Math.max(0, Math.sin(t * Math.PI * 2.2)), 4);
          const subBeat = Math.pow(Math.max(0, Math.sin(t * Math.PI * 4.4 + 0.5)), 6) * 0.4;
          level = Math.min(1.0, beat + subBeat);
        } else {
          level = 0.0;
        }
      }

      const frame = iframeRef.current?.contentWindow;
      if (frame) {
        frame.postMessage({ type: 'audio-data', audio: level }, '*');
      }

      if (isPlaying) {
        animId = requestAnimationFrame(updateAudioFrame);
      }
    };

    updateAudioFrame();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, audioLevel]);

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title="Topo Field Audio Reactive"
      srcDoc={topoFieldSource}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: "transparent",
        ...style,
      }}
    />
  );
}