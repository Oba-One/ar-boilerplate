import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";

import 'styles.module.css'

const Cube: React.FC<{ position: any }> = (props) => {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      //@ts-ignore
      mesh.current.rotation.y += 0.01;
    }
  });
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });

  return (
    //@ts-ignore
    <a.mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => setActive(!active)}
      scale={scale}
      {...props}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </a.mesh>
  );
};

const Lens: React.FC = () => {
  const redBallRef = useRef<any>();

  useEffect(() => {
    // new GLTFLoader().load("./model.gltf", (gltf) => {
    //   scene.add(gltf.scene);
    // });
  }, []);

  useFrame(() => {
    if (redBallRef.current) {
      redBallRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube position={[-2.2, 0, 0]} />
      <Cube position={[2.2, 0, 0]} />
    </Canvas>
  );
};

export default Lens;
