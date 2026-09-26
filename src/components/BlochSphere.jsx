import { useEffect, useRef, useState } from 'react';
import { getBlochCoordinates } from '../quantumEngine';

export default function BlochSphere({ state = [{ r: 1, i: 0 }, { r: 0, i: 0 }], size = 260 }) {
  const canvasRef = useRef(null);
  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(45);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const { x, y, z, theta, phi } = getBlochCoordinates(state);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = size * 0.38;

    ctx.clearRect(0, 0, width, height);

    // 3D rotation projection helper
    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;

    const project = (px, py, pz) => {
      // Rotate around Y axis
      let x1 = px * Math.cos(radY) + pz * Math.sin(radY);
      let y1 = py;
      let z1 = -px * Math.sin(radY) + pz * Math.cos(radY);

      // Rotate around X axis
      let x2 = x1;
      let y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
      let z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);

      // Invert Y for canvas coordinates (z is North / top in Bloch sphere)
      return {
        cx: cx + x2 * radius,
        cy: cy - z2 * radius, // z on Bloch corresponds to vertical
        depth: y2
      };
    };

    // Draw background sphere shadow & glow
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    grad.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
    grad.addColorStop(0.8, 'rgba(59, 130, 246, 0.08)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Outer wireframe circle
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Equatorial Ring (XY Plane)
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
      const px = Math.cos(angle);
      const py = Math.sin(angle);
      const pz = 0;
      const pt = project(px, py, pz);
      if (angle === 0) ctx.moveTo(pt.cx, pt.cy);
      else ctx.lineTo(pt.cx, pt.cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Meridians (XZ and YZ planes)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.beginPath();
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
      const px = Math.cos(angle);
      const py = 0;
      const pz = Math.sin(angle);
      const pt = project(px, py, pz);
      if (angle === 0) ctx.moveTo(pt.cx, pt.cy);
      else ctx.lineTo(pt.cx, pt.cy);
    }
    ctx.stroke();

    // Draw Axes (X, Y, Z)
    const drawAxis = (x1, y1, z1, label, color) => {
      const p = project(x1, y1, z1);
      const origin = project(0, 0, 0);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(origin.cx, origin.cy);
      ctx.lineTo(p.cx, p.cy);
      ctx.stroke();

      // Axis Label
      ctx.fillStyle = color;
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(label, p.cx + 5, p.cy + 4);
    };

    // Z axis (North = |0>, South = |1>)
    drawAxis(0, 0, 1.25, '|0⟩ (+Z)', '#a78bfa');
    drawAxis(0, 0, -1.25, '|1⟩ (-Z)', '#f472b6');
    // X axis (|+>, |->)
    drawAxis(1.25, 0, 0, '|+⟩ (X)', '#38bdf8');
    // Y axis (|i>, |-i>)
    drawAxis(0, 1.25, 0, '|i⟩ (Y)', '#34d399');

    // Draw State Vector Arrow (Bloch Vector)
    const vecPt = project(x, y, z);
    const centerPt = project(0, 0, 0);

    // Vector line with glow
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(centerPt.cx, centerPt.cy);
    ctx.lineTo(vecPt.cx, vecPt.cy);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Vector Head Glowing Point
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(vecPt.cx, vecPt.cy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.stroke();

    // State Vector Label
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('|ψ⟩', vecPt.cx + 8, vecPt.cy - 6);

  }, [x, y, z, rotX, rotY, size]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotY((prev) => (prev + dx * 0.8) % 360);
    setRotX((prev) => Math.max(-80, Math.min(80, prev - dy * 0.8)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div 
        className="relative cursor-grab active:cursor-grabbing rounded-2xl bg-slate-900/60 p-2 border border-slate-800 shadow-xl backdrop-blur-md"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        title="Click and drag to rotate the 3D Bloch Sphere"
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-xl"
        />
        <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-mono tracking-wide bg-slate-950/70 px-2 py-0.5 rounded-full">
          3D Interactive • Drag to rotate
        </span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs font-mono text-slate-300 w-full max-w-[260px]">
        <div className="bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
          <span className="text-purple-400 font-bold">x:</span> {x.toFixed(2)}
        </div>
        <div className="bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
          <span className="text-cyan-400 font-bold">y:</span> {y.toFixed(2)}
        </div>
        <div className="bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
          <span className="text-emerald-400 font-bold">z:</span> {z.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
