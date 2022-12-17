import React from "react";
import { Canvas, useFrame } from "react-three-fiber";
// import { Vector3 } from '';

function App() {
  useFrame(() => {
    // Update the camera's position based on user input or other logic here
  });

  return (
    <React.StrictMode>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshBasicMaterial attach="material" color="red" />
        </mesh>
        {/* <mesh position={new Vector3(0, 0, -5)}>
        <planeGeometry attach="geometry" args={[5, 5]} />
        <meshBasicMaterial attach="material" color="blue" />
      </mesh> */}
      </Canvas>
    </React.StrictMode>
  );
}

export default App;
