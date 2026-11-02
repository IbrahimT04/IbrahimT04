import { useEffect, useRef } from 'react';

// A tubular (2, 3) torus knot, projected and shaded on a lightweight 2D canvas.
// No image assets or WebGL context are needed for the decorative hero scene.
const RINGS = 112;
const SIDES = 12;

type Vector3 = [number, number, number];
type ProjectedPoint = { x: number; y: number; z: number };
type Segment = { a: ProjectedPoint; b: ProjectedPoint; depth: number; cross: boolean };
type SignalSceneProps = { paused?: boolean };

function makeKnot(): Vector3[] {
  const vertices: Vector3[] = [];
  for (let i = 0; i < RINGS; i += 1) {
    const t = (i / RINGS) * Math.PI * 2;
    const radius = 1 + 0.34 * Math.cos(3 * t);
    const center: Vector3 = [radius * Math.cos(2 * t), radius * Math.sin(2 * t), 0.34 * Math.sin(3 * t)];
    const tangent: Vector3 = [
      -1.02 * Math.sin(3 * t) * Math.cos(2 * t) - 2 * radius * Math.sin(2 * t),
      -1.02 * Math.sin(3 * t) * Math.sin(2 * t) + 2 * radius * Math.cos(2 * t),
      1.02 * Math.cos(3 * t),
    ];
    const length = Math.hypot(...tangent);
    const tx = tangent[0] / length;
    const ty = tangent[1] / length;
    const tz = tangent[2] / length;
    const planarLength = Math.hypot(tx, ty);
    const nx = ty / planarLength;
    const ny = -tx / planarLength;
    const binormal: Vector3 = [-tz * ny, tz * nx, tx * ny - ty * nx];
    for (let j = 0; j < SIDES; j += 1) {
      const angle = (j / SIDES) * Math.PI * 2;
      const c = 0.145 * Math.cos(angle);
      const s = 0.145 * Math.sin(angle);
      vertices.push([
        center[0] + nx * c + binormal[0] * s,
        center[1] + ny * c + binormal[1] * s,
        center[2] + binormal[2] * s,
      ]);
    }
  }
  return vertices;
}

const KNOT = makeKnot();

export default function SignalScene({ paused = false }: SignalSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return undefined;
    const context = element.getContext('2d');
    if (!context) return undefined;
    const canvas: HTMLCanvasElement = element;
    const ctx: CanvasRenderingContext2D = context;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let visible = true;
    let frame = 0;
    let previousTime = 0;
    let disposed = false;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const canAnimate = () => !paused && !reducedMotion.matches && visible && !document.hidden;

    function render(time = 0) {
      if (disposed) return;
      frame = 0;
      const moving = canAnimate();
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      if (moving) {
        elapsedRef.current += delta;
        const ease = 1 - Math.exp(-delta * 4);
        pointer.x += (pointer.targetX - pointer.x) * ease;
        pointer.y += (pointer.targetY - pointer.y) * ease;
      }

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const size = Math.min(width, height);
      const scale = size * 0.268;
      const cx = width / 2;
      const cy = height / 2;
      const angleX = 0.92 + pointer.y * 0.16;
      const angleY = 0.32 + elapsedRef.current * 0.105 + pointer.x * 0.22;
      const angleZ = -0.23;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      function project([x, y, z]: Vector3): ProjectedPoint {
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;
        const perspective = 5 / (5 - z2);
        return {
          x: cx + (x2 * cosZ - y1 * sinZ) * scale * perspective,
          y: cy + (x2 * sinZ + y1 * cosZ) * scale * perspective,
          z: z2,
        };
      }

      // Quiet orbital guides make the object feel like a graphics viewport.
      ctx.strokeStyle = 'rgba(214, 255, 98, 0.075)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.ellipse(cx, cy, size * 0.445, size * 0.445, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, size * 0.474, size * 0.474, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.43);
      glow.addColorStop(0, 'rgba(157, 191, 63, 0.065)');
      glow.addColorStop(1, 'rgba(157, 191, 63, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const projected = KNOT.map(project);
      const segments: Segment[] = [];
      for (let i = 0; i < RINGS; i += 1) {
        for (let j = 0; j < SIDES; j += 1) {
          const a = projected[i * SIDES + j];
          const b = projected[((i + 1) % RINGS) * SIDES + j];
          segments.push({ a, b, depth: (a.z + b.z) / 2, cross: false });
          if (i % 2 === 0) {
            const c = projected[i * SIDES + ((j + 1) % SIDES)];
            segments.push({ a, b: c, depth: (a.z + c.z) / 2, cross: true });
          }
        }
      }
      segments.sort((a, b) => a.depth - b.depth);
      ctx.lineCap = 'round';
      for (const segment of segments) {
        const depth = Math.min(1, Math.max(0, (segment.depth + 1.6) / 3.2));
        const alpha = (0.11 + depth ** 2 * 0.68) * (segment.cross ? 0.68 : 1);
        ctx.strokeStyle = `rgba(214, 255, 98, ${alpha})`;
        ctx.lineWidth = segment.cross ? 0.55 : 0.7 + depth * 0.3;
        ctx.beginPath();
        ctx.moveTo(segment.a.x, segment.a.y);
        ctx.lineTo(segment.b.x, segment.b.y);
        ctx.stroke();
      }

      // A few tracked vertices and registration marks, without dense UI labels.
      for (const i of [0, 31, 60, 91]) {
        const point = projected[i * SIDES];
        if (point.z < -0.15) continue;
        ctx.fillStyle = 'rgba(236, 255, 178, 0.94)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(214, 255, 98, 0.22)';
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(227, 231, 216, 0.36)';
      ctx.lineWidth = 0.75;
      for (const [x, y] of [[cx - size * 0.445, cy], [cx + size * 0.445, cy], [cx, cy - size * 0.445], [cx, cy + size * 0.445]]) {
        ctx.beginPath();
        ctx.moveTo(x - 4, y);
        ctx.lineTo(x + 4, y);
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x, y + 4);
        ctx.stroke();
      }

      if (moving) frame = requestAnimationFrame(render);
    }

    function restart() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      render();
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      restart();
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function onPointerLeave() {
      pointer.targetX = 0;
      pointer.targetY = 0;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    }, { rootMargin: '80px' });
    visibilityObserver.observe(canvas);
    reducedMotion.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reducedMotion.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [paused]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%' }} />;
}
