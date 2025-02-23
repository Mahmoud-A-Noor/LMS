"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { useTheme } from "../../hooks/useTheme";

export default function ParticleBackground() {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: theme === "dark" ? "#ffffff" : "#000000" }, // Adapt color based on theme
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 2, direction: "none", outModes: "out" },
      links: { enable: true, distance: 150, color: theme === "dark" ? "#ffffff" : "#000000", opacity: 0.4, width: 1 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100 },
        push: { quantity: 4 },
      },
    },
  };

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      <Particles className="h-screen w-screen" id="particles" init={particlesInit} options={options} />
    </div>
  );
}
