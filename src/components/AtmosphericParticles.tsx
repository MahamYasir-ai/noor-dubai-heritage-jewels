import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  fadeDirection: number;
  color: string;
}

export const AtmosphericParticles: React.FC<{ density?: number }> = ({ density = 45 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const goldHues = [
      'rgba(212, 175, 55,', // rich gold
      'rgba(243, 229, 171,', // champagne light
      'rgba(255, 245, 230,', // diamond sparkle
      'rgba(180, 140, 60,'   // deep antique gold
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < density; i++) {
      const maxOpacity = Math.random() * 0.55 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1, // slow upward drift
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * maxOpacity,
        maxOpacity,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        color: goldHues[Math.floor(Math.random() * goldHues.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around boundaries
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Pulse opacity
        p.opacity += p.fadeDirection * 0.003;
        if (p.opacity > p.maxOpacity) {
          p.opacity = p.maxOpacity;
          p.fadeDirection = -1;
        } else if (p.opacity < 0.05) {
          p.opacity = 0.05;
          p.fadeDirection = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
};
