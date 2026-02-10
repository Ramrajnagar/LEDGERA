
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkHero() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        // Transparent background to blend with CSS gradients
        scene.background = null;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Objects
        // 1. Central Globe (Wireframe)
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x22d3ee, // Cyan
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // 2. Particles (Nodes)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // 3. Floating Connection Lines (Abstract Supply Chain)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.1 });
        const lineGeometry = new THREE.BufferGeometry();
        const linePoints = [];
        for (let i = 0; i < 50; i++) {
            const start = new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
            const end = new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
            linePoints.push(start, end);
        }
        lineGeometry.setFromPoints(linePoints);
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // Interaction State
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotation
            globe.rotation.y += 0.002;
            globe.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.001;
            lines.rotation.y -= 0.001;

            // Mouse Interaction (Parallax)
            camera.position.x += (mouseX * 1 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 1 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
        />
    );
}
