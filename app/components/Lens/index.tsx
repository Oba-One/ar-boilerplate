import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./styles.module.css";
import CustomObject from "./CustomObject";

extend({
  OrbitControls,
});

const Experience: React.FC = () => {
  const { camera, gl } = useThree();
  const ref = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current?.rotation) {
      ref.current.rotation.y += delta;
    }
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <group>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
        <mesh ref={ref} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  );
};

const Lens: React.FC = () => {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
};

export default Lens;
