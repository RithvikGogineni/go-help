'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const TRAIL_LENGTH = 12;

export const CursorFollower = () => {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for the bee's movement (slightly stiffer)
  const springConfig = { damping: 40, stiffness: 300 };
  const beeX = useSpring(mouseX, springConfig);
  const beeY = useSpring(mouseY, springConfig);

  // Use an array of springs for the trailing ribbon
  // Point 0 is cursor, Point N is bee
  /* eslint-disable react-hooks/rules-of-hooks */
  const trailPoints = Array.from({ length: TRAIL_LENGTH }).map((_, i) => ({
    x: useSpring(0, { damping: 25 + i, stiffness: 200 - i * 10 }),
    y: useSpring(0, { damping: 25 + i, stiffness: 200 - i * 10 }),
  }));
  /* eslint-enable react-hooks/rules-of-hooks */

  const [rotation, setRotation] = useState(0);
  const lastBeePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const update = () => {
      // Point 0 follows cursor
      trailPoints[0].x.set(mouseX.get());
      trailPoints[0].y.set(mouseY.get());

      // Each subsequent point follows the one before it
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trailPoints[i].x.set(trailPoints[i - 1].x.get());
        trailPoints[i].y.set(trailPoints[i - 1].y.get());
      }

      // Rotation logic for the bee
      const currentX = beeX.get();
      const currentY = beeY.get();
      const dx = mouseX.get() - currentX;
      const dy = mouseY.get() - currentY;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        setRotation(Math.atan2(dy, dx) * (180 / Math.PI));
      }

      lastBeePos.current = { x: currentX, y: currentY };
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY, beeX, beeY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* The Curvy Ribbon Trail */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFE167" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFE167" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C7E69E" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <RibbonPath points={trailPoints} />
      </svg>

      {/* The Bee */}
      <motion.div
        style={{
          x: beeX,
          y: beeY,
          rotate: rotation,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-12 h-12"
      >
        <img
          src="/bee.png"
          alt="Bee Cursor"
          className="w-full h-full object-contain"
          style={{ transform: 'scaleX(1)' }} // Flip if needed, assuming bee faces right
        />
      </motion.div>
    </div>
  );
};

const RibbonPath = ({ points }: { points: any[] }) => {
  const [d, setD] = useState("");

  useEffect(() => {
    const updatePath = () => {
      const p = points.map(pt => ({ x: pt.x.get(), y: pt.y.get() }));
      if (p[0].x === 0 && p[0].y === 0) return;

      // Create a smooth cubic bezier path
      let newD = `M ${p[0].x} ${p[0].y}`;
      for (let i = 1; i < p.length; i++) {
        const xc = (p[i].x + p[i - 1].x) / 2;
        const yc = (p[i].y + p[i - 1].y) / 2;
        newD += ` Q ${p[i - 1].x} ${p[i - 1].y}, ${xc} ${yc}`;
      }
      setD(newD);
    };

    const interval = setInterval(updatePath, 16);
    return () => clearInterval(interval);
  }, [points]);

  return (
    <path
      d={d}
      fill="none"
      stroke="url(#trailGradient)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="8 12"
      className="drop-shadow-[0_0_8px_rgba(245,200,66,0.3)]"
    />
  );
};
