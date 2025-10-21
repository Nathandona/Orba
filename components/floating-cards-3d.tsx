'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import { useRef, useEffect, useState, createContext, useContext } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

// Global mouse context to track mouse position over entire page
const MouseContext = createContext({ x: 0, y: 0 });

function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert screen coordinates to normalized coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1; // Invert Y for 3D coords

      setMousePos({ x, y });
    };

    // Track mouse over entire document
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
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

  useFrame((state) => {
    if (groupRef.current) {
      // Reduced floating animation to let mouse tracking dominate
      const floatRotationY = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      const floatRotationX = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;

      // AGGRESSIVE mouse influence using global mouse position - works across entire screen
      const mouseInfluenceX = -globalMouse.y * 0.6; // Y mouse affects X rotation (up/down tilt) - stronger effect
      const mouseInfluenceY = globalMouse.x * 0.6;  // X mouse affects Y rotation (left/right turn) - stronger effect

      // Add some easing for more natural movement - always active, no center neutral zone
      const easedMouseX = mouseInfluenceX * 1.5; // Extra responsiveness across entire screen
      const easedMouseY = mouseInfluenceY * 1.5;

      // Combine animations with mouse tracking taking priority
      groupRef.current.rotation.y = floatRotationY + easedMouseY;
      groupRef.current.rotation.x = floatRotationX + easedMouseX;

      // Fixed Z-axis rotation - more intuitive twisting
      groupRef.current.rotation.z = (-globalMouse.x * globalMouse.y) * 0.1;
    }
  });

  // Theme-aware colors
  const getThemeColors = () => {
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
  };

  const colors = getThemeColors();

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
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
          dpr={[1, 2]}
        >
            {currentTheme === 'dark' ? (
            <ambientLight intensity={0.4} />
            ) : (
            <ambientLight intensity={2.5} />
            )}
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ffffff" />
          <spotLight
            position={[0, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
          />

          {/* Realistic Kanban Cards - Arranged in a circle with card-like structure */}
          <KanbanCard position={[0, 5.5, -2.5]} color="hsl(262.1, 83.3%, 57.8%)" scale={0.8} theme={currentTheme} />
          <KanbanCard position={[4.2, 3.8, -2.2]} color="hsl(210, 100%, 50%)" scale={1} theme={currentTheme} />
          <KanbanCard position={[5.8, 1.5, -2.8]} color="hsl(142.1, 76.2%, 36.3%)" scale={0.9} theme={currentTheme} />
          <KanbanCard position={[5.2, -1.8, -2.1]} color="hsl(341.1, 91.7%, 60.4%)" scale={0.7} theme={currentTheme} />
          <KanbanCard position={[3.2, -4.5, -2.5]} color="hsl(23.1, 95.4%, 52.9%)" scale={0.75} theme={currentTheme} />
          <KanbanCard position={[0.3, -5.8, -2.7]} color="hsl(48.7, 93.5%, 46.7%)" scale={0.85} theme={currentTheme} />
          <KanbanCard position={[-3.8, -4.8, -2.3]} color="hsl(160, 84%, 39%)" scale={0.65} theme={currentTheme} />
          <KanbanCard position={[-6.1, -2.2, -2.6]} color="hsl(331, 81%, 41%)" scale={0.72} theme={currentTheme} />
          <KanbanCard position={[-6.8, 0.8, -2.4]} color="hsl(220, 90%, 56%)" scale={0.88} theme={currentTheme} />
          <KanbanCard position={[-5.5, 3.2, -2.9]} color="hsl(15, 74%, 58%)" scale={0.76} theme={currentTheme} />
          <KanbanCard position={[-2.8, 5.1, -2.1]} color="hsl(271, 76%, 53%)" scale={0.82} theme={currentTheme} />
          <KanbanCard position={[2.1, 5.2, -2.8]} color="hsl(199, 89%, 48%)" scale={0.69} theme={currentTheme} />
          <KanbanCard position={[6.8, 0.2, -2.2]} color="hsl(45, 92%, 47%)" scale={0.78} theme={currentTheme} />
          <KanbanCard position={[-1.2, -4.1, -2.5]} color="hsl(311, 78%, 55%)" scale={0.84} theme={currentTheme} />
          <KanbanCard position={[4.5, -2.8, -2.7]} color="hsl(173, 85%, 41%)" scale={0.71} theme={currentTheme} />
          <KanbanCard position={[-4.2, 1.8, -2.4]} color="hsl(28, 94%, 61%)" scale={0.87} theme={currentTheme} />
          <KanbanCard position={[1.5, -5.2, -2.6]} color="hsl(306, 77%, 49%)" scale={0.74} theme={currentTheme} />
          <KanbanCard position={[-3.5, -1.5, -2.3]} color="hsl(134, 88%, 46%)" scale={0.91} theme={currentTheme} />
          <KanbanCard position={[2.8, 0.8, -2.8]} color="hsl(92, 68%, 45%)" scale={0.66} theme={currentTheme} />
          <KanbanCard position={[-0.5, 2.8, -2.1]} color="hsl(338, 82%, 58%)" scale={0.79} theme={currentTheme} />
          <KanbanCard position={[3.8, -5.8, -2.9]} color="hsl(184, 76%, 42%)" scale={0.73} theme={currentTheme} />
          <KanbanCard position={[-6.2, 4.2, -2.6]} color="hsl(348, 75%, 57%)" scale={0.77} theme={currentTheme} />
          <KanbanCard position={[5.5, -5.1, -2.4]} color="hsl(106, 83%, 48%)" scale={0.81} theme={currentTheme} />
        </Canvas>
      </div>
    </MouseProvider>
  );
}
