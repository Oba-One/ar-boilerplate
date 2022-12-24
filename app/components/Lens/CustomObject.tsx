import React from "react";

const CustomObject: React.FC = () => {
  const verticesCount = 10 * 3;
  const positions = new Float32Array(verticesCount * 3);

  for (let i = 0; i < verticesCount * 3; i++)
    positions[i] = Math.random() - 0.5 * 3;

  return (
    <mesh>
      <boxGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={verticesCount}
        />
      </boxGeometry>
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default CustomObject;
