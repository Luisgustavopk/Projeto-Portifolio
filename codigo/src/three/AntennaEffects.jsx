import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayer } from '../context/PlayerContext';

export default function AntennaEffects({ emotion, customColor }) {
  const { isPlaying } = usePlayer();

  const soundWavesRef = useRef();
  const angryGroupRef = useRef();
  const cuteGroupRef = useRef();
  const startleGroupRef = useRef();
  const winkGroupRef = useRef();

  const activeColor = customColor || '#00f3ff';

  // 1. Formato do Coração (Cute / Carinho)
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.02);
    shape.bezierCurveTo(0, 0.05, -0.04, 0.08, -0.07, 0.05);
    shape.bezierCurveTo(-0.1, 0.02, -0.07, -0.04, 0, -0.08);
    shape.bezierCurveTo(0.07, -0.04, 0.1, 0.02, 0.07, 0.05);
    shape.bezierCurveTo(0.04, 0.08, 0, 0.05, 0, 0.02);
    return shape;
  }, []);

  // 2. Formato de Estrela (Wink / Piscadela)
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outer = 0.065, inner = 0.02;
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / 8) * Math.PI * 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    return shape;
  }, []);

  // 3. Formato do Símbolo de Raiva 
  const angerShape = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.07, t = 0.022;
    shape.moveTo(-w, -t); shape.lineTo(-t, -t); shape.lineTo(-t, -w); shape.lineTo(t, -w);
    shape.lineTo(t, -t); shape.lineTo(w, -t); shape.lineTo(w, t); shape.lineTo(t, t);
    shape.lineTo(t, w); shape.lineTo(-t, w); shape.lineTo(-t, t); shape.lineTo(-w, t);
    return shape;
  }, []);

  // 4. Formatos de Exclamação 
  const exclDotShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 0.02, 0, Math.PI * 2, false);
    return shape;
  }, []);

  const exclBarShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.02, 0.04);
    shape.lineTo(0.02, 0.04);
    shape.lineTo(0.01, -0.04);
    shape.lineTo(-0.01, -0.04);
    return shape;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Ondas Sonoras da Música
    if (soundWavesRef.current) {
      const isWaveActive = isPlaying && emotion === 'normal';
      soundWavesRef.current.visible = isWaveActive;

      if (isWaveActive) {
        soundWavesRef.current.children.forEach((ring, i) => {
          const speed = 1.8;
          const duration = 1.0;
          const progress = ((time * speed + i * 0.33) % duration) / duration;

          ring.scale.setScalar(0.4 + progress * 1.3);
          ring.position.y = 0.05 + progress * 0.28;
          ring.material.opacity = Math.sin(progress * Math.PI) * 0.85;
        });
      }
    }

    // Corações Voando
    if (cuteGroupRef.current) {
      const isCuteActive = emotion === 'cute';
      cuteGroupRef.current.visible = isCuteActive;

      if (isCuteActive) {
        cuteGroupRef.current.children.forEach((heart, i) => {
          const speed = 1.2;
          const duration = 1.2;
          const progress = ((time * speed + i * 0.5) % duration) / duration;

          heart.position.y = 0.08 + progress * 0.35;
          heart.position.x = Math.sin(time * 5 + i * 2) * 0.06 + (i === 0 ? -0.05 : 0.05);
          const scale = Math.sin(progress * Math.PI) * 0.8;
          heart.scale.set(scale, scale, scale);
          heart.material.opacity = Math.sin(progress * Math.PI);
        });
      }
    }

    // Símbolos de Raiva
    if (angryGroupRef.current) {
      const isAngryActive = emotion === 'angry';
      angryGroupRef.current.visible = isAngryActive;

      if (isAngryActive) {
        angryGroupRef.current.children.forEach((angerMark, i) => {
          const pulse = Math.abs(Math.sin(time * 12 + i * 1.5));
          angerMark.scale.setScalar(0.7 + pulse * 0.35);
          angerMark.rotation.z = Math.sin(time * 8) * 0.2;
          angerMark.position.y = 0.14 + Math.sin(time * 10 + i) * 0.03;
        });
      }
    }

    // Susto (!)
    if (startleGroupRef.current) {
      const isStartleActive = emotion === 'startle';
      startleGroupRef.current.visible = isStartleActive;

      if (isStartleActive) {
        const bounce = Math.sin(time * 15) * 0.03;
        startleGroupRef.current.position.y = 0.18 + bounce;
        startleGroupRef.current.scale.setScalar(1 + Math.sin(time * 20) * 0.15);
      }
    }

    // Brilho / Estrelas (Wink)
    if (winkGroupRef.current) {
      const isWinkActive = emotion === 'wink';
      winkGroupRef.current.visible = isWinkActive;

      if (isWinkActive) {
        winkGroupRef.current.children.forEach((star, i) => {
          star.rotation.z += delta * (i % 2 === 0 ? 4 : -4);
          const pulse = 0.6 + Math.sin(time * 10 + i * 2) * 0.4;
          star.scale.setScalar(pulse);
        });
      }
    }
  });

  return (
    <group position={[0, 0.28, 0]}>
      {/* ONDAS SONORAS (Música) */}
      <group ref={soundWavesRef}>
        {[0, 1, 2].map((idx) => (
          <mesh key={`wave-${idx}`} rotation={[-Math.PI / 2, 0, 0]} renderOrder={12}>
            <ringGeometry args={[0.08, 0.1, 32]} />
            <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* CORAÇÕES (Carinho / Cute) */}
      <group ref={cuteGroupRef}>
        {[0, 1].map((idx) => (
          <mesh key={`heart-${idx}`} renderOrder={12}>
            <shapeGeometry args={[heartShape]} />
            <meshBasicMaterial color="#ff66b2" transparent opacity={0} depthTest={false} />
          </mesh>
        ))}
      </group>

      {/* SÍMBOLO DE RAIVA (Angry) */}
      <group ref={angryGroupRef}>
        <mesh position={[-0.08, 0.12, 0]} renderOrder={12}>
          <shapeGeometry args={[angerShape]} />
          <meshBasicMaterial color="#ff0033" transparent depthTest={false} />
        </mesh>
        <mesh position={[0.08, 0.15, 0]} renderOrder={12}>
          <shapeGeometry args={[angerShape]} />
          <meshBasicMaterial color="#ff0033" transparent depthTest={false} />
        </mesh>
      </group>

      {/* EXCLAMAÇÃO (Susto) */}
      <group ref={startleGroupRef}>
        <mesh position={[0, 0.08, 0]} renderOrder={12}>
          <shapeGeometry args={[exclBarShape]} />
          <meshBasicMaterial color={activeColor} transparent depthTest={false} />
        </mesh>
        <mesh position={[0, 0.01, 0]} renderOrder={12}>
          <shapeGeometry args={[exclDotShape]} />
          <meshBasicMaterial color={activeColor} transparent depthTest={false} />
        </mesh>
      </group>

      {/* ESTRELAS / BRILHO (Wink) */}
      <group ref={winkGroupRef}>
        <mesh position={[-0.08, 0.12, 0]} renderOrder={12}>
          <shapeGeometry args={[starShape]} />
          <meshBasicMaterial color={activeColor} transparent depthTest={false} />
        </mesh>
        <mesh position={[0.08, 0.16, 0]} renderOrder={12}>
          <shapeGeometry args={[starShape]} />
          <meshBasicMaterial color="#ffffff" transparent depthTest={false} />
        </mesh>
      </group>
    </group>
  );
}