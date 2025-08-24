import type { COBEOptions } from "cobe";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";

import { useEffect, useRef } from "react";
const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 400,
  height: 400,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0, // Day mode
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.8, 0.8, 0.8], // Brighter globe color
  markerColor: [1, 0.4, 0],
  glowColor: [0.2, 0.6, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.06 }, // Manila
    { location: [40.7128, -74.006], size: 0.16 }, // New York
    { location: [48.8566, 2.3522], size: 0.08 }, // Paris
    { location: [35.6895, 139.6917], size: 0.08 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
    { location: [55.7558, 37.6173], size: 0.08 }, // Moscow
    { location: [52.52, 13.405], size: 0.06 }, // Berlin
    { location: [34.0522, -118.2437], size: 0.1 }, // Los Angeles
    { location: [19.4326, -99.1332], size: 0.12 }, // Mexico City
  ],
};

const Globe = () => {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md font-[Poppins] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 mx-0 lg:mx-0 lg:mr-4">
      {/* Left text */}

      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Explore the World
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track locations across the globe with live markers. Drag the globe to
          interact and explore key cities.
        </p>
      </div>

      {/* Globe in the middle */}
      <div className="relative flex items-center justify-center w-full max-w-[250px] mx-auto">
        <canvas
          className="w-full aspect-square opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>

      {/* Right text */}
      <div className="flex-1 text-center lg:text-right">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Key Cities
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Manila, New York, Tokyo, Paris, and more — visualize your global
          network with dynamic markers.
        </p>
      </div>
    </div>
  );
};

export default Globe;
