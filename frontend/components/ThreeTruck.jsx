"use client";
import { Canvas } from "@react-three/fiber";

export default function ThreeTruck() {
  return (
    <Canvas className="h-[400px] bg-slate-800 rounded-xl">
      <ambientLight />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}
