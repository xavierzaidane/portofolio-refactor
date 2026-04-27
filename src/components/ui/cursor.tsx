'use client';

import React, { useEffect } from 'react';

interface FollowCursorProps {
  color?: string;
  lightColor?: string;
  darkColor?: string;
  size?: number;
  zIndex?: number;
}

const FollowCursor: React.FC<FollowCursorProps> = ({
  color,
  lightColor = '#0b0b0b',
  darkColor = '#e7e9ea',
  size = 10,
  zIndex,
}) => {
  useEffect(() => {
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;
    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: height / 2 };
    let activeColor = lightColor;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const resolveColor = () => {
      if (color) {
        return color;
      }
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? darkColor : lightColor;
    };

    const updateThemeColor = () => {
      activeColor = resolveColor();
    };

    class Dot {
      position: { x: number; y: number };
      width: number;
      lag: number;

      constructor(x: number, y: number, width: number, lag: number) {
        this.position = { x, y };
        this.width = width;
        this.lag = lag;
      }

      moveTowards(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.position.x += (x - this.position.x) / this.lag;
        this.position.y += (y - this.position.y) / this.lag;
        ctx.fillStyle = activeColor;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    const dot = new Dot(width / 2, height / 2, size, 10);

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const updateDot = () => {
      if (context) {
        context.clearRect(0, 0, width, height);
        dot.moveTowards(cursor.x, cursor.y, context);
      }
    };

    const loop = () => {
      updateDot();
      animationFrame = requestAnimationFrame(loop);
    };

    const init = () => {
      if (prefersReducedMotion.matches || canvas) {
        return;
      }

      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.width = width;
      canvas.height = height;
      canvas.style.zIndex = zIndex ? zIndex.toString() : '';
      document.body.appendChild(canvas);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      loop();
    };

    const destroy = () => {
      if (canvas) {
        canvas.remove();
      }
      canvas = null;
      context = null;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };

    const onReducedMotionChange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    const onThemeChange = () => {
      updateThemeColor();
    };

    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    prefersReducedMotion.addEventListener('change', onReducedMotionChange);
    prefersDarkScheme.addEventListener('change', onThemeChange);

    updateThemeColor();

    init();

    return () => {
      observer.disconnect();
      prefersReducedMotion.removeEventListener('change', onReducedMotionChange);
      prefersDarkScheme.removeEventListener('change', onThemeChange);
      destroy();
    };
  }, [color, lightColor, darkColor, size, zIndex]);

  return null;
};

export default FollowCursor;
