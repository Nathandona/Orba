'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function KanbanCard({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <RoundedBox
        ref={meshRef}
        args={[1.5 * scale, 2 * scale, 0.1]}
        position={position}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
    </Float>
  );
}

export default function FloatingCards3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="hsl(var(--chart-2))" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />

        {/* Kanban Cards - Arranged in a circle around the center text with randomness */}
        <KanbanCard position={[0, 5.5, -2.5]} color="hsl(262.1, 83.3%, 57.8%)" scale={0.8} />
        <KanbanCard position={[4.2, 3.8, -2.2]} color="hsl(210, 100%, 50%)" scale={1} />
        <KanbanCard position={[5.8, 1.5, -2.8]} color="hsl(142.1, 76.2%, 36.3%)" scale={0.9} />
        <KanbanCard position={[5.2, -1.8, -2.1]} color="hsl(341.1, 91.7%, 60.4%)" scale={0.7} />
        <KanbanCard position={[3.2, -4.5, -2.5]} color="hsl(23.1, 95.4%, 52.9%)" scale={0.75} />
        <KanbanCard position={[0.3, -5.8, -2.7]} color="hsl(48.7, 93.5%, 46.7%)" scale={0.85} />
        <KanbanCard position={[-3.8, -4.8, -2.3]} color="hsl(160, 84%, 39%)" scale={0.65} />
        <KanbanCard position={[-6.1, -2.2, -2.6]} color="hsl(331, 81%, 41%)" scale={0.72} />
        <KanbanCard position={[-6.8, 0.8, -2.4]} color="hsl(220, 90%, 56%)" scale={0.88} />
        <KanbanCard position={[-5.5, 3.2, -2.9]} color="hsl(15, 74%, 58%)" scale={0.76} />
        <KanbanCard position={[-2.8, 5.1, -2.1]} color="hsl(271, 76%, 53%)" scale={0.82} />
        <KanbanCard position={[2.1, 5.2, -2.8]} color="hsl(199, 89%, 48%)" scale={0.69} />
        <KanbanCard position={[6.8, 0.2, -2.2]} color="hsl(45, 92%, 47%)" scale={0.78} />
        <KanbanCard position={[-1.2, -4.1, -2.5]} color="hsl(311, 78%, 55%)" scale={0.84} />
        <KanbanCard position={[4.5, -2.8, -2.7]} color="hsl(173, 85%, 41%)" scale={0.71} />
        <KanbanCard position={[-4.2, 1.8, -2.4]} color="hsl(28, 94%, 61%)" scale={0.87} />
        <KanbanCard position={[1.5, -5.2, -2.6]} color="hsl(306, 77%, 49%)" scale={0.74} />
        <KanbanCard position={[-3.5, -1.5, -2.3]} color="hsl(134, 88%, 46%)" scale={0.91} />
        <KanbanCard position={[2.8, 0.8, -2.8]} color="hsl(92, 68%, 45%)" scale={0.66} />
        <KanbanCard position={[-0.5, 2.8, -2.1]} color="hsl(338, 82%, 58%)" scale={0.79} />
        <KanbanCard position={[3.8, -5.8, -2.9]} color="hsl(184, 76%, 42%)" scale={0.73} />
        <KanbanCard position={[-6.2, 4.2, -2.6]} color="hsl(348, 75%, 57%)" scale={0.77} />
        <KanbanCard position={[5.5, -5.1, -2.4]} color="hsl(106, 83%, 48%)" scale={0.81} />
      </Canvas>
    </div>
  );
}
