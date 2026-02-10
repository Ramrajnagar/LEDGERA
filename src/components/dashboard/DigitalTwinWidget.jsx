
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DigitalTwinWidget() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505); // Match control panel bg

        // Camera
        const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Objects
        // 1. Wireframe Globe/Container
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x22d3ee,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // 2. Core (The "Package")
        const coreGeo = new THREE.BoxGeometry(1, 1, 1);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: false });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // 3. Orbiting Rings
        const ringGeo = new THREE.TorusGeometry(3, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        // Animation Loop
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            globe.rotation.y += 0.002;
            core.rotation.x -= 0.01;
            core.rotation.y -= 0.01;
            ring.rotation.z += 0.005;
            ring.rotation.x = Math.PI / 2 + Math.sin(Date.now() * 0.001) * 0.2;

            renderer.render(scene, camera);
        };

        animate();

        // Resize Handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="w-full h-full relative group overflow-hidden bg-control-panel border border-control-border">
            <div ref={containerRef} className="absolute inset-0" />

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="text-xs font-mono text-control-cyan mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-control-cyan rounded-full animate-pulse" />
                    DIGITAL_TWIN :: ID-8842
                </h3>
                <div className="text-[10px] text-control-muted font-mono space-y-1">
                    <p>SYNC_STATUS: <span className="text-control-success">VERIFIED</span></p>
                    <p>LATENCY: 12ms</p>
                </div>
            </div>

            {/* Scan effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-control-cyan/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2000ms] pointer-events-none" />
        </div>
    );
}
