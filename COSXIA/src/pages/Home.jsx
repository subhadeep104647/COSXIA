import React, { useMemo } from "react";
import { motion } from "framer-motion";
import How_It_Works from "./How_It_Works";
import Features from "./Features";
import Footer from "../components/Footer";

const vulnerabilities = [
  {
    text: "Cross-Site Scripting",
    position: "top-[55px] left-[8%]",
    animation: "float1",
    duration: "4.8s",
    delay: "0s",
    color: "purple",
  },
  {
    text: "Hardcoded Credentials",
    position: "top-[55px] left-[52%]",
    animation: "float2",
    duration: "5.6s",
    delay: "0.8s",
    color: "blue",
  },
  {
    text: "SQL Injection",
    position: "top-[116px] left-0",
    animation: "float3",
    duration: "5.1s",
    delay: "1.2s",
    color: "cyan",
  },
  {
    text: "Command Injection",
    position: "top-[116px] left-[30%]",
    animation: "float1",
    duration: "4.6s",
    delay: "0.4s",
    color: "purple",
  },
  {
    text: "Path Traversal",
    position: "top-[116px] right-[4%]",
    animation: "float2",
    duration: "5.3s",
    delay: "1.6s",
    color: "blue",
  },
  {
    text: "Broken Authentication",
    position: "top-[325px] left-[8%]",
    animation: "float3",
    duration: "5.8s",
    delay: "0.6s",
    color: "cyan",
  },
  {
    text: "Insecure Cryptography",
    position: "top-[325px] left-[50%]",
    animation: "float1",
    duration: "5s",
    delay: "1.8s",
    color: "purple",
  },
  {
    text: "Insecure Deserialization",
    position: "top-[380px] left-0",
    animation: "float2",
    duration: "5.5s",
    delay: "0.2s",
    color: "blue",
  },
  {
    text: "Improper Input Validation",
    position: "top-[420px] left-[29%]",
    animation: "float3",
    duration: "4.9s",
    delay: "1.4s",
    color: "cyan",
  },
  {
    text: "Sensitive Data Exposure",
    position: "top-[420px] right-0",
    animation: "float1",
    duration: "5.7s",
    delay: "0.9s",
    color: "purple",
  },
];

/* =========================================================
   WAVE DOTS
========================================================= */

const createWaveDots = () => {
  const dots = [];

  const width = 1100;
  const height = 300;
  const xCount = 150;
  const depthRows = 13;

  for (let layer = 0; layer < depthRows; layer++) {
    const depth = layer / (depthRows - 1);

    for (let i = 0; i <= xCount; i++) {
      const x = (i / xCount) * width;

      const mainWave =
        Math.cos((x / width) * Math.PI * 6 - 0.5) *
        (54 - depth * 14);

      const secondaryWave =
        Math.sin((x / width) * Math.PI * 10 + layer * 0.45) *
        12;

      const organicWave =
        Math.sin((x / width) * Math.PI * 18 + layer * 0.7) *
        3.5;

      const depthOffset = (depth - 0.5) * 78;

      const y =
        height / 2 +
        mainWave +
        secondaryWave +
        organicWave +
        depthOffset;

      const size =
        1.05 +
        (1 - depth) * 1.15 +
        Math.sin((i / xCount) * Math.PI) * 0.35;

      const opacity = 0.18 + (1 - depth) * 0.72;

      dots.push({
        id: `${layer}-${i}`,
        x,
        y,
        size,
        opacity,
        layer,
        delay: -(i * 0.035 + layer * 0.09),
      });
    }
  }

  return dots;
};

/* =========================================================
   DEPTH PARTICLES
========================================================= */

const createDepthParticles = () => {
  const particles = [];

  for (let i = 0; i < 45; i++) {
    const x = (i * 137) % 1100;
    const y = 55 + ((i * 83) % 190);

    particles.push({
      id: i,
      x,
      y,
      size: 0.7 + ((i * 17) % 10) / 10,
      opacity: 0.06 + ((i * 13) % 18) / 100,
      delay: -(i * 0.12),
    });
  }

  return particles;
};

/* =========================================================
   WAVE SURFACE
========================================================= */

const WaveSurface = ({ waveDots, copyId }) => {
  return (
    <g>
      {/* Back depth dots */}

      {waveDots.map((dot) => (
        <circle
          key={`wave-${copyId}-${dot.id}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill="url(#waveGradient)"
          opacity={dot.opacity}
          className="realistic-wave-dot"
          style={{
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      {/* Small front highlights */}

      {waveDots
        .filter(
          (dot) =>
            dot.layer <= 3 &&
            dot.size > 1.5
        )
        .map((dot) => (
          <circle
            key={`front-${copyId}-${dot.id}`}
            cx={dot.x}
            cy={dot.y}
            r={0.5}
            fill="white"
            opacity="0.28"
            className="wave-highlight"
            style={{
              animationDelay: `${dot.delay * 0.8}s`,
            }}
          />
        ))}
    </g>
  );
};

/* =========================================================
   TAG COLORS
========================================================= */

const tagStyles = {
  purple: `
    border-purple-400/30
    bg-purple-500/[0.055]
    text-purple-700
    hover:border-purple-400/55
    hover:bg-purple-500/[0.10]
    hover:shadow-purple-500/[0.10]
  `,

  blue: `
    border-blue-400/30
    bg-blue-500/[0.055]
    text-blue-700
    hover:border-blue-400/55
    hover:bg-blue-500/[0.10]
    hover:shadow-blue-500/[0.10]
  `,

  cyan: `
    border-cyan-400/30
    bg-cyan-500/[0.055]
    text-cyan-700
    hover:border-cyan-400/55
    hover:bg-cyan-500/[0.10]
    hover:shadow-cyan-500/[0.10]
  `,
};

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const waveDots = useMemo(
    () => createWaveDots(),
    []
  );

  const depthParticles = useMemo(
    () => createDepthParticles(),
    []
  );

  return (
    <main
      className="
        min-h-screen
        w-full
        overflow-hidden
        bg-white
        px-10
        font-['Montserrat']
        text-black
      "
      style={{
        "--wave-button": "#6366f1",
        "--wave-nav": "#06b6d4",
      }}
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="flex min-h-screen w-full items-center">
        <div
          className="
            grid
            min-h-screen
            w-full
            grid-cols-1
            items-center
            gap-4
            lg:grid-cols-[45%_55%]
          "
        >
          {/* =================================================
              LEFT — 45%
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-30
              flex
              h-full
              min-w-0
              items-center
            "
          >
            <div className="w-ful max-w-[620px] pr-6 lg:pr-10">

              <h1 className=" font-nova text-[clamp(30px,3vw,48px)] font-semibold leading-[1.08] tracking-[-1.5px]"> Your AI Code
                <br /><span
                  className="
                    bg-gradient-to-r
                    from-button
                    via-purple-500
                    to-nav
                    bg-clip-text
                    text-transparent ">
                  Security Assistant
                </span>
              </h1>

              <p
                className="
                  mt-6
                  max-w-[570px]
                  font-nova
                  text-[clamp(14px,1.1vw,17px)]
                  font-normal
                  leading-[1.65]
                  text-[#333]
                "
              >
                Detect vulnerabilities. Understand bugs.
                <br />
                Secure your code with AI-powered
                <br />
                explanations and remediation guidance.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div
                  className="
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2
                    text-[11px]
                    font-medium
                    text-gray-600
                    shadow-[0_6px_20px_rgba(0,0,0,0.035)]
                    transition-[transform,border-color,box-shadow]
                    duration-300
                    ease-out
                    hover:-translate-y-0.5
                    hover:border-purple-200
                    hover:shadow-[0_10px_25px_rgba(99,102,241,0.08)]
                  "
                >
                  Explainable AI
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2
                    text-[11px]
                    font-medium
                    text-gray-600
                    shadow-[0_6px_20px_rgba(0,0,0,0.035)]
                    transition-[transform,border-color,box-shadow]
                    duration-300
                    ease-out
                    hover:-translate-y-0.5
                    hover:border-blue-200
                    hover:shadow-[0_10px_25px_rgba(59,130,246,0.08)]
                  "
                >
                  Vulnerability Detection
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2
                    text-[11px]
                    font-medium
                    text-gray-600
                    shadow-[0_6px_20px_rgba(0,0,0,0.035)]
                    transition-[transform,border-color,box-shadow]
                    duration-300
                    ease-out
                    hover:-translate-y-0.5
                    hover:border-cyan-200
                    hover:shadow-[0_10px_25px_rgba(6,182,212,0.08)]
                  "
                >
                  Secure Remediation
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT — 55%
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              h-[500px]
              min-w-0
              w-full
            "
          >
            {/* =================================================
                VULNERABILITY TAGS
            ================================================= */}

            {vulnerabilities.map((item, index) => (
              <div
                key={index}
                className={`absolute z-40 ${item.position}`}
                style={{
                  animation: `${item.animation} ${item.duration} ease-in-out infinite`,
                  animationDelay: item.delay,
                  willChange: "transform",
                }}
              >
                <div
                  className={`
                    group
                    cursor-pointer
                    whitespace-nowrap
                    rounded-[9px]
                    border
                    px-3.5
                    py-2.5
                    text-[11px]
                    font-medium
                    leading-none
                    backdrop-blur-md
                    transform-gpu

                    transition-[transform,background-color,border-color,box-shadow]
                    duration-300
                    ease-out

                    ${tagStyles[item.color]}

                    shadow-[0_5px_18px_rgba(99,102,241,0.045)]

                    hover:-translate-y-1
                    hover:shadow-[0_10px_28px_rgba(99,102,241,0.11)]
                  `}
                >
                  <span
                    className="
                      mr-1.5
                      inline-block
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-current
                      align-middle
                      opacity-55
                      transition-opacity
                      duration-300
                      ease-out
                      group-hover:opacity-100
                    "
                  />

                  {item.text}
                </div>
              </div>
            ))}

            {/* =================================================
                WAVE CONTAINER
            ================================================= */}

            <div
              className="
                group/wave
                pointer-events-auto
                absolute
                left-[-45px]
                top-[95px]
                h-[330px]
                w-[calc(100%+90px)]
                overflow-visible
              "
            >
              {/* Lightweight glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[10%]
                  top-[20%]
                  h-[60%]
                  w-[80%]
                  rounded-full
                  bg-gradient-to-r
                  from-button/[0.015]
                  via-purple-500/[0.045]
                  to-nav/[0.015]
                  opacity-0
                  blur-2xl
                  transition-opacity
                  duration-500
                  ease-out
                  group-hover/wave:opacity-100
                "
              />

              {/* =================================================
                  SINGLE CONTINUOUS WAVE
              ================================================= */}

              <svg
                viewBox="0 0 1100 300"
                preserveAspectRatio="none"
                className="
                  continuous-wave-svg
                  absolute
                  inset-0
                  h-full
                  w-full
                  overflow-visible
                  transform-gpu
                  transition-transform
                  duration-700
                  ease-out
                  group-hover/wave:scale-[1.008]
                "
              >
                <defs>
                  {/* Main gradient */}

                  <linearGradient
                    id="waveGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--wave-button)"
                    />

                    <stop
                      offset="50%"
                      stopColor="#a855f7"
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--wave-nav)"
                    />
                  </linearGradient>

                  {/* Hover gradient */}

                  <linearGradient
                    id="waveHoverGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4f46e5"
                    />

                    <stop
                      offset="50%"
                      stopColor="#a855f7"
                    />

                    <stop
                      offset="100%"
                      stopColor="#0891b2"
                    />
                  </linearGradient>

                  {/* Continuous wave pattern */}

                  <pattern
                    id="continuousWavePattern"
                    x="0"
                    y="0"
                    width="1100"
                    height="300"
                    patternUnits="userSpaceOnUse"
                  >
                    <WaveSurface
                      waveDots={waveDots}
                      copyId="main"
                    />

                    <animateTransform
                      attributeName="patternTransform"
                      type="translate"
                      from="0 0"
                      to="1100 0"
                      dur="4.2s"
                      repeatCount="indefinite"
                    />
                  </pattern>
                </defs>

                {/* Main wave */}

                <rect
                  className="wave-main-layer"
                  x="0"
                  y="0"
                  width="1100"
                  height="300"
                  fill="url(#continuousWavePattern)"
                />

                {/* Lightweight hover layer */}

                <rect
                  className="wave-hover-layer"
                  x="0"
                  y="0"
                  width="1100"
                  height="300"
                  fill="url(#continuousWavePattern)"
                />
              </svg>

              {/* =================================================
                  LIGHTWEIGHT DEPTH PARTICLES
              ================================================= */}

              <svg
                viewBox="0 0 1100 300"
                preserveAspectRatio="none"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  h-full
                  w-full
                  overflow-visible
                  opacity-50
                "
              >
                <defs>
                  <radialGradient id="particleGradient">
                    <stop
                      offset="0%"
                      stopColor="#a855f7"
                    />

                    <stop
                      offset="100%"
                      stopColor="#06b6d4"
                    />
                  </radialGradient>
                </defs>

                {depthParticles.map((particle) => (
                  <circle
                    key={`particle-${particle.id}`}
                    cx={particle.x}
                    cy={particle.y}
                    r={particle.size}
                    fill="url(#particleGradient)"
                    opacity={particle.opacity}
                    className="depth-particle"
                    style={{
                      animationDelay: `${particle.delay}s`,
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        /* =================================================
           WAVE GPU OPTIMIZATION
        ================================================= */

        .continuous-wave-svg {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .wave-main-layer {
          opacity: 0.92;
        }

        .wave-hover-layer {
          opacity: 0;

          transition:
            opacity 500ms ease-out;
        }

        .group\\/wave:hover .wave-hover-layer {
          opacity: 0.13;
        }

        /* =================================================
           WAVE DOTS

           No hover filters.
           No hover opacity recalculation.
           This keeps the SVG cheap.
        ================================================= */

        .realistic-wave-dot {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            realisticWave
            4.8s
            ease-in-out
            infinite;

          will-change: transform;
        }

        @keyframes realisticWave {
          0% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(0, -1px, 0)
              scale(1.025);
          }

          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
        }

        /* =================================================
           HIGHLIGHTS
        ================================================= */

        .wave-highlight {
          animation:
            waveHighlight
            3.4s
            ease-in-out
            infinite;
        }

        @keyframes waveHighlight {
          0% {
            opacity: 0.12;
          }

          50% {
            opacity: 0.38;
          }

          100% {
            opacity: 0.12;
          }
        }

        /* =================================================
           PARTICLES
        ================================================= */

        .depth-particle {
          transform-box: fill-box;
          transform-origin: center;

          animation:
            depthFloat
            6s
            ease-in-out
            infinite;

          will-change: transform;
        }

        @keyframes depthFloat {
          0% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(3px, -5px, 0);
          }

          100% {
            transform:
              translate3d(0, 0, 0);
          }
        }

        /* =================================================
           VULNERABILITY TAG FLOAT 1
        ================================================= */

        @keyframes float1 {
          0% {
            transform:
              translate3d(0, 0, 0);
          }

          25% {
            transform:
              translate3d(0, -6px, 0);
          }

          50% {
            transform:
              translate3d(2px, -9px, 0);
          }

          75% {
            transform:
              translate3d(-2px, -4px, 0);
          }

          100% {
            transform:
              translate3d(0, 0, 0);
          }
        }

        /* =================================================
           VULNERABILITY TAG FLOAT 2
        ================================================= */

        @keyframes float2 {
          0% {
            transform:
              translate3d(0, 0, 0);
          }

          25% {
            transform:
              translate3d(2px, -5px, 0);
          }

          50% {
            transform:
              translate3d(-2px, -8px, 0);
          }

          75% {
            transform:
              translate3d(2px, -4px, 0);
          }

          100% {
            transform:
              translate3d(0, 0, 0);
          }
        }

        /* =================================================
           VULNERABILITY TAG FLOAT 3
        ================================================= */

        @keyframes float3 {
          0% {
            transform:
              translate3d(0, 0, 0);
          }

          25% {
            transform:
              translate3d(-2px, -5px, 0);
          }

          50% {
            transform:
              translate3d(2px, -9px, 0);
          }

          75% {
            transform:
              translate3d(-2px, -4px, 0);
          }

          100% {
            transform:
              translate3d(0, 0, 0);
          }
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          .realistic-wave-dot,
          .wave-highlight,
          .depth-particle,
          .group\\/wave,
          [style*="animation"] {
            animation: none !important;
          }
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1023px) {
          .continuous-wave-svg {
            opacity: 0.95;
          }
        }

        @media (max-width: 640px) {
          .continuous-wave-svg {
            transform: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="relative z-30 mt-20 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="inline-block tracking-wide"
        >
          <Features />
        </motion.div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="relative z-30 mt-20 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="inline-block tracking-wide"
        >
          <How_It_Works />
        </motion.div>
      </section>

    </main>
  );
}