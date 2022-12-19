import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { XR, useXR } from "@react-three/xr";

const ARCanvas: React.FC = () => {
  const { gl, scene, camera, size } = useThree();
  const redBallRef = useRef<any>();

  useEffect(() => {
    new GLTFLoader().load("./model.gltf", (gltf) => {
      scene.add(gltf.scene);
    });
  }, [scene]);

  // useXR((inputs: any[]) => {
  //   inputs.forEach(
  //     (input: {
  //       addEventListener: (
  //         arg0: string,
  //         arg1: { (event: any): void; (event: any): void }
  //       ) => void;
  //     }) => {
  //       input.addEventListener("selectstart", (event: any) => {
  //         console.log("Select start event:", event);
  //       });
  //       input.addEventListener("selectend", (event: any) => {
  //         console.log("Select end event:", event);
  //       });
  //     }
  //   );
  // });


  useFrame(() => {
    if (redBallRef.current) {
      redBallRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Canvas
      gl={gl}
      camera={camera}
      onCreated={() => {
        // gl.setClearColor(new Color("lightgrey"));
      }}
    >
      {/* <XR /> */}
      <ambientLight intensity={0.5} />
      <pointLight intensity={1} position={[10, 10, 10]} />
    </Canvas>
  );
};

export default ARCanvas;
