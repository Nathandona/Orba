'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import { useRef, useEffect, useState, createContext, useContext, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// Global mouse context to track mouse position over entire page
const MouseContext = createContext({ x: 0, y: 0 });

function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (event: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        // Convert screen coordinates to normalized coordinates (-1 to 1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1; // Invert Y for 3D coords

        setMousePos({ x, y });
      });
    };

    // Track mouse over entire document
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  }, []);

  return (
    <MouseContext.Provider value={mousePos}>
      {children}
    </MouseContext.Provider>
  );
}

function useGlobalMouse() {
  return useContext(MouseContext);
}

function KanbanCard({ position, color, scale = 1, theme }: {
  position: [number, number, number],
  color: string,
  scale?: number,
  theme: string | undefined
}) {
  const groupRef = useRef<THREE.Group>(null);
  const globalMouse = useGlobalMouse();
  const previousMouse = useRef({ x: 0, y: 0 });

  // Memoize theme colors to avoid recalculation
  const colors = useMemo(() => {
    if (theme === 'dark') {
      return {
        cardBase: '#0f172a', // slate-900
        contentOverlay: '#1e293b', // slate-800
        textPrimary: '#f8fafc', // slate-50
        textSecondary: '#cbd5e1', // slate-300
        avatar: '#3b82f6' // blue-500
      };
    } else {
      return {
        cardBase: '#ffffff', // pure white
        contentOverlay: '#ffffff', // also white for clean look
        textPrimary: '#1e293b', // slate-800
        textSecondary: '#475569', // slate-600 (darker for better contrast)
        avatar: '#3b82f6' // blue-500
      };
    }
  }, [theme]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Throttle mouse updates with lerp for smoothness
    const lerpFactor = 0.1;
    const lerpedMouseX = previousMouse.current.x + (globalMouse.x - previousMouse.current.x) * lerpFactor;
    const lerpedMouseY = previousMouse.current.y + (globalMouse.y - previousMouse.current.y) * lerpFactor;

    previousMouse.current = { x: lerpedMouseX, y: lerpedMouseY };

    // Reduced floating animation frequency for better performance
    const floatRotationY = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    const floatRotationX = Math.cos(state.clock.elapsedTime * 0.15) * 0.03;

    // Optimized mouse influence
    const mouseInfluenceX = -lerpedMouseY * 0.4;
    const mouseInfluenceY = lerpedMouseX * 0.4;

    // Combine animations efficiently
    groupRef.current.rotation.y = floatRotationY + mouseInfluenceY;
    groupRef.current.rotation.x = floatRotationX + mouseInfluenceX;
    groupRef.current.rotation.z = (-lerpedMouseX * lerpedMouseY) * 0.08;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.2}
    >
      <group ref={groupRef} position={position}>
        {/* Main card base */}
        <RoundedBox
          args={[1.5 * scale, 2 * scale, 0.1]}
          position={[0, 0, 0]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial
            color={colors.cardBase}
            metalness={0.05}
            roughness={0.4}
            emissive={colors.cardBase}
            toneMapped={false}
            emissiveIntensity={theme === 'dark' ? 0.02 : 0}
          />
        </RoundedBox>

        {/* Card content overlay */}
        <RoundedBox
          args={[1.3 * scale, 1.8 * scale, 0.02]}
          position={[0, 0, 0.03]}
          radius={0.05}
          smoothness={4}
        >
          <meshStandardMaterial
            color={colors.contentOverlay}
            metalness={0}
            roughness={0.6}
          />
        </RoundedBox>

        {/* Priority indicator */}
        <RoundedBox
          args={[0.3 * scale, 0.15 * scale, 0.03]}
          position={[0.5 * scale, 0.7 * scale, 0.04]}
          radius={0.02}
          smoothness={2}
        >
          <meshStandardMaterial color={color} />
        </RoundedBox>

        {/* Small decorative elements */}
        <RoundedBox
          args={[0.4 * scale, 0.1 * scale, 0.03]}
          position={[0, 0.3 * scale, 0.04]}
          radius={0.02}
          smoothness={2}
        >
          <meshStandardMaterial color={colors.textPrimary} />
        </RoundedBox>

        <RoundedBox
          args={[0.6 * scale, 0.1 * scale, 0.03]}
          position={[0, 0, 0.04]}
          radius={0.02}
          smoothness={2}
        >
          <meshStandardMaterial color={colors.textSecondary} />
        </RoundedBox>

        <RoundedBox
          args={[0.5 * scale, 0.1 * scale, 0.03]}
          position={[0, -0.3 * scale, 0.04]}
          radius={0.02}
          smoothness={2}
        >
          <meshStandardMaterial color={colors.textSecondary} />
        </RoundedBox>
      </group>
    </Float>
  );
}

export default function FloatingCards3D() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the current theme (dark, light, or system default)
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Memoize card configurations for better performance
  const cardConfigs = useMemo(() => [
    { position: [0, 4, -2.5], color: "hsl(262.1, 83.3%, 57.8%)", scale: 0.8 },
    { position: [3.5, 2.5, -2.2], color: "hsl(210, 100%, 50%)", scale: 1 },
    { position: [4.5, 0, -2.8], color: "hsl(142.1, 76.2%, 36.3%)", scale: 0.9 },
    { position: [3.5, -2.5, -2.1], color: "hsl(341.1, 91.7%, 60.4%)", scale: 0.7 },
    { position: [0, -4, -2.5], color: "hsl(23.1, 95.4%, 52.9%)", scale: 0.75 },
    { position: [-3.5, -2.5, -2.7], color: "hsl(48.7, 93.5%, 46.7%)", scale: 0.85 },
    { position: [-4.5, 0, -2.3], color: "hsl(160, 84%, 39%)" , scale: 0.65 },
    { position: [-3.5, 2.5, -2.6], color: "hsl(331, 81%, 41%)" , scale: 0.72 },
    { position: [2, -3.5, -2.4], color: "hsl(15, 74%, 58%)" , scale: 0.76 },
    { position: [-2, 3.5, -2.1], color: "hsl(271, 76%, 53%)" , scale: 0.82 },
  ], []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-muted/50 rounded-2xl animate-pulse" />
    );
  }

  return (
    <MouseProvider>
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={window.devicePixelRatio > 1 ? [1, 1.5] : [1, 1]}
          performance={{ min: 0.5 }}
          frameloop="demand"
        >
          <ambientLight intensity={currentTheme === 'dark' ? 0.4 : 3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
          <spotLight
            position={[0, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.6}
            castShadow
          />

          {/* Optimized number of cards for better performance */}
          {cardConfigs.map((config, index) => (
            <KanbanCard
              key={index}
              position={config.position as [number, number, number]}
              color={config.color}
              scale={config.scale}
              theme={currentTheme}
            />
          ))}
        </Canvas>
      </div>
    </MouseProvider>
  );
}
