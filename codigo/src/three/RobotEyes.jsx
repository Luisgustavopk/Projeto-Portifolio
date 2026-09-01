import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayer } from '../context/PlayerContext';

export default function RobotEyes({ isAwake, emotion = 'normal', customColor = null }) {
  // Refs Olho Esquerdo
  const leftNormalRef = useRef();
  const leftHappyRef = useRef();
  const leftSadRef = useRef();
  const leftCuteRef = useRef();
  const leftAngryRef = useRef();

  // Refs Olho Direito
  const rightNormalRef = useRef();
  const rightHappyRef = useRef();
  const rightSadRef = useRef();
  const rightCuteRef = useRef();
  const rightAngryRef = useRef();

  // Overlays (Bocas e Bochechas)
  const sadMouthRef = useRef();
  const cuteMouthRef = useRef();
  const angryMouthRef = useRef();
  const blushGroupRef = useRef();

  // Pesos de transição
  const happyWeight = useRef(0);
  const sadWeight = useRef(0);
  const cuteWeight = useRef(0);
  const angryWeight = useRef(0);
  const winkWeight = useRef(0);

  const { isPlaying } = usePlayer();
  const [isSadAfterMusic, setIsSadAfterMusic] = useState(false);
  const prevIsPlaying = useRef(isPlaying);


  useEffect(() => {
    if (prevIsPlaying.current && !isPlaying) {
      setIsSadAfterMusic(true);

      const timer = setTimeout(() => {
        setIsSadAfterMusic(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    if (isPlaying) {
      setIsSadAfterMusic(false);
    }

    prevIsPlaying.current = isPlaying;
  }, [isPlaying]);

  // 1. Olho Normal
  const normalEyeShape = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.21, h = 0.16, r = 0.045;
    shape.moveTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    shape.quadraticCurveTo(0, -h / 2 - 0.005, w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.bezierCurveTo(w / 2 + 0.015, h / 4, w / 3, h / 2 + 0.015, 0, h / 2 + 0.015);
    shape.bezierCurveTo(-w / 3, h / 2 + 0.015, -w / 2 - 0.015, h / 4, -w / 2, -h / 2 + r);
    return shape;
  }, []);

  // 2. Olho Feliz
  const happyEyeShape = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.22, h = 0.16;
    shape.moveTo(-w / 2, -0.03);
    shape.quadraticCurveTo(0, 0.045, w / 2, -0.03);
    shape.bezierCurveTo(w / 2 + 0.01, h / 3, w / 3, h / 2 + 0.02, 0, h / 2 + 0.02);
    shape.bezierCurveTo(-w / 3, h / 2 + 0.02, -w / 2 - 0.01, h / 3, -w / 2, -0.03);
    return shape;
  }, []);

  // 3. Olho Triste (Gota Inclinada)
  const sadEyeShapeLeft = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.06, 0.07);
    shape.bezierCurveTo(0.01, 0.06, -0.07, 0.01, -0.10, -0.04);
    shape.bezierCurveTo(-0.11, -0.08, -0.06, -0.09, 0.01, -0.06);
    shape.bezierCurveTo(0.05, -0.04, 0.08, 0.00, 0.08, 0.03);
    shape.bezierCurveTo(0.08, 0.05, 0.07, 0.065, 0.06, 0.07);
    return shape;
  }, []);

  const sadEyeShapeRight = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.06, 0.07);
    shape.bezierCurveTo(-0.01, 0.06, 0.07, 0.01, 0.10, -0.04);
    shape.bezierCurveTo(0.11, -0.08, 0.06, -0.09, -0.01, -0.06);
    shape.bezierCurveTo(-0.05, -0.04, -0.08, 0.00, -0.08, 0.03);
    shape.bezierCurveTo(-0.08, 0.05, -0.07, 0.065, -0.06, 0.07);
    return shape;
  }, []);

  // 4. Olho Fofo (Circular)
  const cuteEyeShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 0.085, 0, Math.PI * 2, false);
    return shape;
  }, []);

  // 5. Olho Bravo
  const angryEyeShapeLeft = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.11, 0.06);
    shape.lineTo(0.11, -0.03);
    shape.lineTo(0.08, -0.08);
    shape.lineTo(-0.10, -0.05);
    return shape;
  }, []);

  const angryEyeShapeRight = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.11, 0.06);
    shape.lineTo(-0.11, -0.03);
    shape.lineTo(-0.08, -0.08);
    shape.lineTo(0.10, -0.05);
    return shape;
  }, []);

  // 6. Formatos de Bocas
  const sadMouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.06, h = 0.025;
    shape.moveTo(-w, -h);
    shape.quadraticCurveTo(0, h, w, -h);
    shape.quadraticCurveTo(0, h * 0.3, -w, -h);
    return shape;
  }, []);

  const cuteMouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.05, 0);
    shape.quadraticCurveTo(-0.025, -0.035, 0, -0.005);
    shape.quadraticCurveTo(0.025, -0.035, 0.05, 0);
    shape.quadraticCurveTo(0.025, -0.02, 0, 0.008);
    shape.quadraticCurveTo(-0.025, -0.02, -0.05, 0);
    return shape;
  }, []);

  const angryMouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.06, -0.01);
    shape.lineTo(0.06, -0.03);
    shape.lineTo(0.05, -0.045);
    shape.lineTo(-0.05, -0.025);
    return shape;
  }, []);

  useFrame((state, delta) => {
    const { x, y } = state.pointer;
    const time = state.clock.getElapsedTime();

    const targetAngry = emotion === 'angry' ? 1 : 0;
    const targetCute = emotion === 'cute' ? 1 : 0;
    const targetWink = emotion === 'wink' ? 1 : 0;
    const targetHappy = (isPlaying || emotion === 'startle') && !targetAngry && !targetCute ? 1 : 0;
    
    // Triste APENAS se for acionado pela pausa da música
    const targetSad = isSadAfterMusic && emotion === 'normal' && !isPlaying ? 1 : 0;

    happyWeight.current = THREE.MathUtils.lerp(happyWeight.current, targetHappy, delta * 8);
    sadWeight.current = THREE.MathUtils.lerp(sadWeight.current, targetSad, delta * 8);
    cuteWeight.current = THREE.MathUtils.lerp(cuteWeight.current, targetCute, delta * 8);
    angryWeight.current = THREE.MathUtils.lerp(angryWeight.current, targetAngry, delta * 12);
    winkWeight.current = THREE.MathUtils.lerp(winkWeight.current, targetWink, delta * 10);

    const hW = happyWeight.current;
    const sW = sadWeight.current;
    const cW = cuteWeight.current;
    const aW = angryWeight.current;
    const wW = winkWeight.current;
    const nW = Math.max(0, 1 - hW - sW - cW - aW);

    // Opacidades Olho Esquerdo
    if (leftNormalRef.current) leftNormalRef.current.material.opacity = nW;
    if (leftHappyRef.current) leftHappyRef.current.material.opacity = hW;
    if (leftSadRef.current) leftSadRef.current.material.opacity = sW;
    if (leftCuteRef.current) leftCuteRef.current.material.opacity = cW;
    if (leftAngryRef.current) leftAngryRef.current.material.opacity = aW;

    // Opacidades Olho Direito
    const rightMult = 1 - wW;
    if (rightNormalRef.current) rightNormalRef.current.material.opacity = nW * rightMult;
    if (rightHappyRef.current) rightHappyRef.current.material.opacity = (hW + wW) * rightMult;
    if (rightSadRef.current) rightSadRef.current.material.opacity = sW * rightMult;
    if (rightCuteRef.current) rightCuteRef.current.material.opacity = cW * rightMult;
    if (rightAngryRef.current) rightAngryRef.current.material.opacity = aW * rightMult;

    // Bocas e Bochechas
    if (sadMouthRef.current) sadMouthRef.current.material.opacity = sW * (1 - cW) * (1 - aW);
    if (cuteMouthRef.current) cuteMouthRef.current.material.opacity = cW;
    if (angryMouthRef.current) angryMouthRef.current.material.opacity = aW;

    if (blushGroupRef.current) {
      blushGroupRef.current.children.forEach((child) => {
        if (child.material) child.material.opacity = cW;
      });
    }

    const eyeOffsetX = x * 0.02;
    const eyeOffsetY = y * 0.015;
    const bounce = isPlaying ? Math.sin(time * 6) * 0.008 : 0;

    const leftX = -0.18 + eyeOffsetX;
    const leftY = 0.04 + bounce + eyeOffsetY;
    const rightX = 0.18 + eyeOffsetX;
    const rightY = 0.04 + bounce + eyeOffsetY;

    [leftNormalRef, leftHappyRef, leftCuteRef].forEach((ref) => {
      if (ref.current) ref.current.position.set(leftX, leftY, 0.62);
    });

    [rightNormalRef, rightHappyRef, rightCuteRef].forEach((ref) => {
      if (ref.current) ref.current.position.set(rightX, rightY, 0.62);
    });

    if (leftSadRef.current) {
      leftSadRef.current.position.set(leftX + sW * 0.015, leftY - sW * 0.04, 0.62);
      leftSadRef.current.rotation.z = 0.22 * sW;
    }

    if (rightSadRef.current) {
      rightSadRef.current.position.set(rightX - sW * 0.015, rightY - sW * 0.04, 0.62);
      rightSadRef.current.rotation.z = -0.22 * sW;
    }

    if (leftAngryRef.current) leftAngryRef.current.position.set(leftX, leftY + 0.01, 0.62);
    if (rightAngryRef.current) rightAngryRef.current.position.set(rightX, rightY + 0.01, 0.62);

    if (sadMouthRef.current) sadMouthRef.current.position.set(eyeOffsetX * 0.5, -0.085 + eyeOffsetY * 0.5, 0.62);
    if (cuteMouthRef.current) cuteMouthRef.current.position.set(eyeOffsetX * 0.5, -0.07 + eyeOffsetY * 0.5, 0.62);
    if (angryMouthRef.current) angryMouthRef.current.position.set(eyeOffsetX * 0.5, -0.08 + eyeOffsetY * 0.5, 0.62);

    if (blushGroupRef.current) {
      blushGroupRef.current.position.set(eyeOffsetX * 0.8, eyeOffsetY * 0.8, 0.62);
    }
  });

  const activeColor = customColor || (isAwake ? '#00f3ff' : '#080d1a');

  return (
    <group>
      {/* OLHO ESQUERDO */}
      <mesh ref={leftNormalRef} renderOrder={10}>
        <shapeGeometry args={[normalEyeShape]} />
        <meshBasicMaterial color={activeColor} transparent depthTest={false} />
      </mesh>
      <mesh ref={leftHappyRef} renderOrder={10}>
        <shapeGeometry args={[happyEyeShape]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>
      <mesh ref={leftSadRef} renderOrder={10}>
        <shapeGeometry args={[sadEyeShapeLeft]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>
      <mesh ref={leftCuteRef} renderOrder={10}>
        <shapeGeometry args={[cuteEyeShape]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthTest={false} />
      </mesh>
      <mesh ref={leftAngryRef} renderOrder={10}>
        <shapeGeometry args={[angryEyeShapeLeft]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>

      {/* OLHO DIREITO */}
      <mesh ref={rightNormalRef} renderOrder={10}>
        <shapeGeometry args={[normalEyeShape]} />
        <meshBasicMaterial color={activeColor} transparent depthTest={false} />
      </mesh>
      <mesh ref={rightHappyRef} renderOrder={10}>
        <shapeGeometry args={[happyEyeShape]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>
      <mesh ref={rightSadRef} renderOrder={10}>
        <shapeGeometry args={[sadEyeShapeRight]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>
      <mesh ref={rightCuteRef} renderOrder={10}>
        <shapeGeometry args={[cuteEyeShape]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthTest={false} />
      </mesh>
      <mesh ref={rightAngryRef} renderOrder={10}>
        <shapeGeometry args={[angryEyeShapeRight]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>

      {/* OVERLAYS DE EXPRESSÃO */}
      <mesh ref={sadMouthRef} renderOrder={10}>
        <shapeGeometry args={[sadMouthShape]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>

      <mesh ref={cuteMouthRef} renderOrder={10}>
        <shapeGeometry args={[cuteMouthShape]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthTest={false} />
      </mesh>

      <mesh ref={angryMouthRef} renderOrder={10}>
        <shapeGeometry args={[angryMouthShape]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0} depthTest={false} />
      </mesh>

      <group ref={blushGroupRef}>
        {[-0.22, -0.19, -0.16, -0.13].map((xPos, idx) => (
          <mesh key={`blush-l-${idx}`} position={[xPos, -0.07, 0]} rotation={[0, 0, -0.2]} renderOrder={10}>
            <planeGeometry args={[0.012, 0.03]} />
            <meshBasicMaterial color="#ff6699" transparent opacity={0} depthTest={false} />
          </mesh>
        ))}
        {[0.13, 0.16, 0.19, 0.22].map((xPos, idx) => (
          <mesh key={`blush-r-${idx}`} position={[xPos, -0.07, 0]} rotation={[0, 0, -0.2]} renderOrder={10}>
            <planeGeometry args={[0.012, 0.03]} />
            <meshBasicMaterial color="#ff6699" transparent opacity={0} depthTest={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}