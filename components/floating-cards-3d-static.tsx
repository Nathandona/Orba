'use client';

import { Canvas } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function KanbanCard({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
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

export default function FloatingCards3DStatic() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="hsl(var(--chart-2))" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        
        {/* Kanban Cards - Well spaced throughout */}
        {/* Center area */}
        <KanbanCard position={[-3, 2, 0.5]} color="hsl(var(--chart-1))" scale={0.8} />
        <KanbanCard position={[0, 1.5, 1]} color="hsl(var(--chart-2))" scale={0.9} />
        <KanbanCard position={[3.5, 2.5, 0]} color="hsl(var(--chart-3))" scale={0.75} />
        
        <KanbanCard position={[-4, 0, 0.3]} color="hsl(var(--chart-4))" scale={0.7} />
        <KanbanCard position={[4.5, 0.5, -0.5]} color="hsl(var(--chart-5))" scale={0.8} />
        
        <KanbanCard position={[-2.5, -2, 0.8]} color="hsl(var(--chart-6))" scale={0.85} />
        <KanbanCard position={[1, -1.5, 0.2]} color="hsl(var(--chart-7))" scale={0.75} />
        <KanbanCard position={[3.5, -2.5, 0.5]} color="hsl(var(--chart-1))" scale={0.7} />
        
        {/* Outer ring */}
        <KanbanCard position={[-5.5, 3, -1]} color="hsl(var(--chart-2))" scale={0.6} />
        <KanbanCard position={[5.5, 3.5, -0.8]} color="hsl(var(--chart-3))" scale={0.65} />
        <KanbanCard position={[-5, -3, -1.2]} color="hsl(var(--chart-4))" scale={0.55} />
        <KanbanCard position={[5, -3.5, -1]} color="hsl(var(--chart-5))" scale={0.6} />
        
        {/* Far corners */}
        <KanbanCard position={[-6, 1, -1.5]} color="hsl(var(--chart-6))" scale={0.5} />
        <KanbanCard position={[6.5, -1, -1.3]} color="hsl(var(--chart-7))" scale={0.55} />
        <KanbanCard position={[-6.5, -1.5, -1.8]} color="hsl(var(--chart-1))" scale={0.48} />
        <KanbanCard position={[6, 1.5, -1.6]} color="hsl(var(--chart-2))" scale={0.52} />
        
        {/* Top and bottom far */}
        <KanbanCard position={[0, 4, -1]} color="hsl(var(--chart-3))" scale={0.6} />
        <KanbanCard position={[-2, 4.5, -1.5]} color="hsl(var(--chart-4))" scale={0.5} />
        <KanbanCard position={[2.5, -4, -1.2]} color="hsl(var(--chart-5))" scale={0.58} />
        <KanbanCard position={[0, -4.5, -1.4]} color="hsl(var(--chart-6))" scale={0.53} />
      </Canvas>
    </div>
  );
}
