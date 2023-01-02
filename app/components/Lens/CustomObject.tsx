import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const verticesCount = 10 * 3;

const CustomObject: React.FC = () => {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3;

    return positions;
  }, []);

  useEffect(() => {

  },[])

  return (
    <mesh>
      <boxGeometry ref={ref}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={verticesCount}
        />
      </boxGeometry>
      <meshBasicMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default CustomObject;
