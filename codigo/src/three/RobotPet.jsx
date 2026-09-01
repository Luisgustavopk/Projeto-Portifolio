import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RobotEyes from './RobotEyes';
import AntennaEffects from './AntennaEffects';

export default function RobotPet() {
  const groupRef = useRef();
  const headRef = useRef();
  const antennaRef = useRef();
  const bodyRef = useRef();

  const [isAwake, setIsAwake] = useState(false);
  const [emotion, setEmotion] = useState('normal');
  const [customColor, setCustomColor] = useState(null);

  const springHead = useRef({ z: 0, vz: 0, y: 0, vy: 0 });
  const springBody = useRef({ scaleY: 1, rotZ: 0, rotX: 0 });
  const tickleWobble = useRef(0);

  const headRubDistance = useRef(0);
  const rubDirectionFlips = useRef(0);
  const lastDxSign = useRef(0);
  const lastHeadPos = useRef({ x: 0, y: 0 });

  const bellyMoveDistance = useRef(0);
  const clickHistory = useRef([]);
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAwake(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleGeneralClick = () => {
    const now = Date.now();
    clickHistory.current = clickHistory.current.filter((t) => now - t < 1800);
    clickHistory.current.push(now);

    if (clickHistory.current.length >= 4) {
      setEmotion('angry');
      setCustomColor('#ff0000');
      springHead.current.vz += 0.35;

      setTimeout(() => {
        setEmotion('normal');
        setCustomColor(null);
        clickHistory.current = [];
      }, 3500);
    }
  };

  const handleAntennaClick = (e) => {
    e.stopPropagation();
    handleGeneralClick();
    if (emotion === 'angry') return;

    setEmotion('startle');
    springHead.current.vy += 0.2;
    springHead.current.vz += 0.35;

    setTimeout(() => setEmotion('normal'), 1200);
  };

  const handleVisorDoubleClick = (e) => {
    e.stopPropagation();
    if (emotion === 'angry') return;

    setEmotion('wink');
    const colors = ['#ff007f', '#00ff66', '#ffaa00', '#9d00ff', '#00f3ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCustomColor(randomColor);

    setTimeout(() => {
      setEmotion('normal');
      setCustomColor(null);
    }, 2000);
  };

  const handleHeadPointerDown = (e) => {
    e.stopPropagation();
    headRubDistance.current = 0;
    rubDirectionFlips.current = 0;
    lastDxSign.current = 0;
    lastHeadPos.current = { x: e.pointer.x, y: e.pointer.y };
  };

  const handleHeadPointerMove = (e) => {
    if (emotion === 'angry' || e.buttons !== 1) return;

    const { x, y } = e.pointer;
    const dx = x - lastHeadPos.current.x;
    lastHeadPos.current = { x, y };

    if (Math.abs(dx) > 0.002) {
      const currentSign = Math.sign(dx);

      if (currentSign !== 0 && currentSign !== lastDxSign.current) {
        rubDirectionFlips.current += 1;
        lastDxSign.current = currentSign;
      }

      headRubDistance.current += Math.abs(dx);

      if (headRubDistance.current > 0.5 && rubDirectionFlips.current >= 2) {
        setEmotion('cute');
        headRubDistance.current = 0;
        rubDirectionFlips.current = 0;

        setTimeout(() => setEmotion('normal'), 3500);
      }
    }
  };

  const handleBellyPointerMove = (e) => {
    if (emotion === 'angry' || isDragging.current) return;
    const { x } = e.pointer;
    bellyMoveDistance.current += Math.abs(x);

    if (bellyMoveDistance.current > 0.8) {
      tickleWobble.current = Math.sin(Date.now() * 0.02) * 0.22;
      bellyMoveDistance.current = 0;
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    dragStartPos.current = { x: e.pointer.x, y: e.pointer.y };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    const time = state.clock.getElapsedTime();

    const sh = springHead.current;
    sh.vz += -sh.z * 15 * delta - sh.vz * 5 * delta;
    sh.z += sh.vz;
    sh.vy += -sh.y * 15 * delta - sh.vy * 5 * delta;
    sh.y += sh.vy;

    if (isDragging.current) {
      const dragY = y - dragStartPos.current.y;
      const dragX = x - dragStartPos.current.x;
      springBody.current.scaleY = THREE.MathUtils.lerp(springBody.current.scaleY, 1 + dragY * 0.6, delta * 10);
      springBody.current.rotZ = THREE.MathUtils.lerp(springBody.current.rotZ, -dragX * 0.4, delta * 10);
      springBody.current.rotX = THREE.MathUtils.lerp(springBody.current.rotX, dragY * 0.2, delta * 10);
    } else {
      springBody.current.scaleY = THREE.MathUtils.lerp(springBody.current.scaleY, 1, delta * 8);
      springBody.current.rotZ = THREE.MathUtils.lerp(springBody.current.rotZ, 0, delta * 8);
      springBody.current.rotX = THREE.MathUtils.lerp(springBody.current.rotX, 0, delta * 8);
    }

    tickleWobble.current = THREE.MathUtils.lerp(tickleWobble.current, 0, delta * 4);

    const targetRotY = x * 0.35 + tickleWobble.current + springBody.current.rotZ;
    const targetRotX = -y * 0.15 + springBody.current.rotX;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);

    if (headRef.current) {
      const targetZ = -x * 0.08 + sh.z;
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetZ, 0.06);
      headRef.current.position.y = 0.55 + sh.y;
    }

    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 8) * 0.08 + sh.vz * 1.2;
    }

    if (bodyRef.current) {
      bodyRef.current.scale.y = springBody.current.scaleY;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.75, 0]}
      scale={1.15}
      onClick={handleGeneralClick}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    >
      {/* CABEÇA */}
      <group ref={headRef} position={[0, 0.55, 0]}>
        <mesh
          position={[0, 0, 0]}
          scale={[1.1, 0.92, 0.92]}
          onPointerDown={handleHeadPointerDown}
          onPointerMove={handleHeadPointerMove}
        >
          <sphereGeometry args={[0.65, 64, 64]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Visor */}
        <mesh
          position={[0, 0.02, 0.28]}
          scale={[1.05, 0.8, 0.65]}
          onDoubleClick={handleVisorDoubleClick}
          onPointerDown={handleHeadPointerDown}
          onPointerMove={handleHeadPointerMove}
        >
          <sphereGeometry args={[0.55, 64, 64]} />
          <meshStandardMaterial color="#05070d" roughness={0.08} metalness={0.9} />
        </mesh>

        <RobotEyes isAwake={isAwake} emotion={emotion} customColor={customColor} />

        {/* ANTENA */}
        <group
          ref={antennaRef}
          position={[0, 0.58, -0.05]}
          rotation={[-0.15, 0, 0]}
          onClick={handleAntennaClick}
        >
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.018, 0.025, 0.25, 16]} />
            <meshStandardMaterial color="#0066ff" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <sphereGeometry args={[0.075, 32, 32]} />
            <meshBasicMaterial color={customColor || (isAwake ? '#00f3ff' : '#002244')} />
          </mesh>

          {/* EFEITOS VISUAIS DA ANTENA */}
          <AntennaEffects emotion={emotion} customColor={customColor} />
        </group>

        {/* DETALHES LATERAIS */}
        <group position={[-0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
            <meshStandardMaterial color="#0066ff" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>

        <group position={[0.68, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
            <meshStandardMaterial color="#0066ff" metalness={0.6} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* PESCOÇO */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.1, 32]} />
        <meshStandardMaterial color="#111318" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* CORPO */}
      <group ref={bodyRef}>
        <mesh
          position={[0, -0.4, 0]}
          onPointerMove={handleBellyPointerMove}
          onPointerDown={handlePointerDown}
        >
          <capsuleGeometry args={[0.42, 0.28, 32, 32]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.12} metalness={0.05} clearcoat={1.0} />
        </mesh>

        <mesh position={[0, -0.35, 0.12]} scale={[0.8, 0.68, 0.75]}>
          <capsuleGeometry args={[0.38, 0.2, 32, 32]} />
          <meshStandardMaterial color="#0066ff" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* BRAÇOS */}
      <group position={[-0.45, -0.3, 0]} rotation={[0.2, 0, 0.35]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color="#0066ff" metalness={0.5} />
        </mesh>
        <mesh position={[-0.08, -0.15, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.07, 0.16, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" clearcoat={0.8} />
        </mesh>
      </group>

      <group position={[0.45, -0.3, 0]} rotation={[0.2, 0, -0.35]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color="#0066ff" metalness={0.5} />
        </mesh>
        <mesh position={[0.08, -0.15, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.07, 0.16, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" clearcoat={0.8} />
        </mesh>
      </group>
    </group>
  );
}