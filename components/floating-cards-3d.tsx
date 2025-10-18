'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Float, MeshDistortMaterial } from '@react-three/drei';
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

function BackgroundSphere() {
  return (
    <mesh position={[0, 0, -5]}>
      <sphereGeometry args={[3, 32, 32]} />
      <MeshDistortMaterial
        color="hsl(var(--primary))"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.4}
        metalness={0.8}
        opacity={0.1}
        transparent
      />
    </mesh>
  );
}

export default function FloatingCards3D() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden bg-muted/30 border-2 border-border">
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

        <BackgroundSphere />
        
        {/* Kanban Cards - Using design system colors */}
        <KanbanCard position={[-2.5, 1, 0]} color="hsl(var(--chart-1))" scale={0.8} />
        <KanbanCard position={[0, 0.5, 0.5]} color="hsl(var(--chart-2))" scale={1} />
        <KanbanCard position={[2.5, -0.5, 0]} color="hsl(var(--chart-3))" scale={0.9} />
        <KanbanCard position={[-1.2, -1.5, -0.5]} color="hsl(var(--chart-4))" scale={0.7} />
        <KanbanCard position={[1.5, 1.8, -0.3]} color="hsl(var(--chart-5))" scale={0.75} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
