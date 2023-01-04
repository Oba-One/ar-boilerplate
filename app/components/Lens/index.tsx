import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  PivotControls,
  TransformControls,
} from "@react-three/drei";
// import { Mesh } from "three";

import "./styles.module.css";
// import CustomObject from "./CustomObject";
const Experience: React.FC = () => {
  const cube = useRef(null!);
  const sphere = useRef(null!);

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2} ref={sphere}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={7}
            occlude={[sphere, cube]}
          >
            That's a sphere!
          </Html>
        </mesh>
      </PivotControls>
      <mesh ref={cube} position-x={2} rotation-y={Math.PI * 0.25} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cube} />\{" "}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      {/* <CustomObject /> */}
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
