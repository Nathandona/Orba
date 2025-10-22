'use client';

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    renderTime: 0
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef<number | undefined>(undefined);

  useEffect(() => {
    let fps = 60;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime.current;

      if (delta >= 1000) {
        fps = Math.round((frameCount.current * 1000) / delta);
        frameCount.current = 0;
        lastTime.current = currentTime;

        setMetrics(prev => ({
          ...prev,
          fps,
          renderTime: delta
        }));
      }

      animationId.current = requestAnimationFrame(measureFPS);
    };

    animationId.current = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  // Memory usage (if available)
  useEffect(() => {
    if ('memory' in performance) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: (performance as any).memory?.usedJSHeapSize / 1048576 // Convert to MB
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  return metrics;
}

export function PerformanceIndicator({ show = false }: { show?: boolean }) {
  const metrics = usePerformanceMonitor();

  if (!show || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getFPSColor = (fps: number) => {
    if (fps >= 50) return 'text-green-500';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className={getFPSColor(metrics.fps)}>
        FPS: {metrics.fps}
      </div>
      {metrics.memoryUsage && (
        <div className="text-blue-400">
          Memory: {metrics.memoryUsage.toFixed(1)} MB
        </div>
      )}
      <div className="text-gray-400">
        Render: {metrics.renderTime.toFixed(1)} ms
      </div>
    </div>
  );
}