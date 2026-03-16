"use client";

import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";

/* ── Skill data for the 3x3 grid ── */
const SKILLS = [
    { name: "Next.js",       bg: "#111827", accent: "#4ade80" },
    { name: "TypeScript",    bg: "#1e3a5f", accent: "#60a5fa" },
    { name: "React",         bg: "#1a2744", accent: "#67e8f9" },
    { name: "FastAPI",       bg: "#0d2626", accent: "#34d399" },
    { name: "Python",        bg: "#1c2a3a", accent: "#818cf8" },
    { name: "Docker",        bg: "#0d2033", accent: "#38bdf8" },
    { name: "PostgreSQL",    bg: "#1a2035", accent: "#a78bfa" },
    { name: "Terraform",     bg: "#2a1a3e", accent: "#c084fc" },
    { name: "React Native",  bg: "#1a2a3a", accent: "#f472b6" },
];

const COLS = 3;
const CARD_W = 1.55;
const CARD_H = 0.85;
const CARD_D = 0.08;
const GAP_X = 0.25;
const GAP_Y = 0.22;
const RADIUS = 0.07;

/* ── Mouse-parallax controller: rotates the entire group ── */
function SceneGroup({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);
    const targetRot = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
            targetRot.current = { x: ny * 0.12, y: nx * 0.18 };
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        const lerpF = 1 - Math.pow(0.04, delta);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x, targetRot.current.x, lerpF
        );
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, targetRot.current.y, lerpF
        );
    });

    return <group ref={groupRef}>{children}</group>;
}

/* ── Individual 3D skill card ── */
function SkillCard({
    skill,
    position,
    delay,
    reducedMotion,
}: {
    skill: typeof SKILLS[number];
    position: [number, number, number];
    delay: number;
    reducedMotion: boolean;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Falling entry: start high, fall to target
    const startY = position[1] + (reducedMotion ? 0 : 8 + delay * 1.5);
    const currentY = useRef(startY);
    const settled = useRef(false);
    const elapsed = useRef(0);

    useFrame((_, delta) => {
        if (!meshRef.current) return;
        elapsed.current += delta;
        if (elapsed.current < delay && !reducedMotion) return;

        const targetY = position[1];
        const targetZ = hovered ? 0.45 : 0;
        const lerpF = 1 - Math.pow(0.04, delta);

        if (!settled.current) {
            currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, lerpF);
            meshRef.current.position.y = currentY.current;
            if (Math.abs(currentY.current - targetY) < 0.001) settled.current = true;
        }

        // Hover elevation
        meshRef.current.position.z = THREE.MathUtils.lerp(
            meshRef.current.position.z, targetZ, lerpF
        );

        // Subtle hover tilt
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x, hovered ? -0.08 : 0, lerpF
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y, hovered ? 0.1 : 0, lerpF
        );
    });

    const accentColor = useMemo(() => new THREE.Color(skill.accent), [skill.accent]);
    const bgColor = useMemo(() => new THREE.Color(skill.bg), [skill.bg]);

    return (
        <group
            ref={meshRef}
            position={[position[0], reducedMotion ? position[1] : startY, position[2]]}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            {/* Card body */}
            <RoundedBox args={[CARD_W, CARD_H, CARD_D]} radius={RADIUS} smoothness={4}>
                <meshStandardMaterial
                    color={bgColor}
                    metalness={0.3}
                    roughness={0.6}
                    emissive={hovered ? accentColor : new THREE.Color(0x000000)}
                    emissiveIntensity={hovered ? 0.08 : 0}
                />
            </RoundedBox>

            {/* Accent top border strip */}
            <mesh position={[0, CARD_H / 2 - 0.03, CARD_D / 2 + 0.001]}>
                <planeGeometry args={[CARD_W - RADIUS * 2, 0.04]} />
                <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
            </mesh>

            {/* Skill name via HTML (no font download needed) */}
            <Html
                position={[0, -0.02, CARD_D / 2 + 0.01]}
                center
                style={{ pointerEvents: "none", userSelect: "none" }}
                distanceFactor={4.5}
            >
                <div
                    style={{
                        color: "#ffffff",
                        fontSize: "13px",
                        fontWeight: 600,
                        fontFamily: "var(--font-geist-sans, system-ui, sans-serif)",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.02em",
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                >
                    {skill.name}
                </div>
            </Html>

            {/* Accent dot */}
            <mesh position={[CARD_W / 2 - 0.18, -CARD_H / 2 + 0.15, CARD_D / 2 + 0.005]}>
                <circleGeometry args={[0.048, 24]} />
                <meshBasicMaterial color={accentColor} />
            </mesh>
        </group>
    );
}

/* ── Full 3D grid scene ── */
function Grid3D({ reducedMotion }: { reducedMotion: boolean }) {
    const rows = Math.ceil(SKILLS.length / COLS);
    const totalW = COLS * CARD_W + (COLS - 1) * GAP_X;
    const totalH = rows * CARD_H + (rows - 1) * GAP_Y;

    return (
        <SceneGroup>
            {SKILLS.map((skill, i) => {
                const col = i % COLS;
                const row = Math.floor(i / COLS);
                const x = col * (CARD_W + GAP_X) - totalW / 2 + CARD_W / 2;
                const y = -(row * (CARD_H + GAP_Y) - totalH / 2 + CARD_H / 2);
                return (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        position={[x, y, 0]}
                        delay={reducedMotion ? 0 : 0.1 + i * 0.07}
                        reducedMotion={reducedMotion}
                    />
                );
            })}
        </SceneGroup>
    );
}

/* ── Exported component (Canvas wrapper) ── */
export default function SkillsGrid3D() {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 5.8], fov: 48 }}
            dpr={[1, 1.5]}
            style={{ width: "100%", height: "100%", display: "block", cursor: "default" }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} />
            <pointLight position={[-4, -4, 3]} intensity={0.5} color="#4ade80" />
            <pointLight position={[4, 4, 3]} intensity={0.4} color="#60a5fa" />

            <Suspense fallback={null}>
                <Grid3D reducedMotion={reducedMotion} />
            </Suspense>
        </Canvas>
    );
}
