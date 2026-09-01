import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float } from '@react-three/drei';
import RobotPet from './RobotPet';

export default function RobotCanvas() {

  
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[420px] relative flex items-center justify-center border border-white/10 rounded-3xl bg-slate-950/10 backdrop-blur-md overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={45} />

        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} />

        <pointLight position={[-4, 3, -2]} intensity={5} color="#0088ff" />
        <pointLight position={[4, 2, -2]} intensity={5} color="#00ffff" />

        <Environment preset="city" />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.2}>
            <RobotPet />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}