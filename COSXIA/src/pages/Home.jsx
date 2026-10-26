import React, { useMemo } from "react";
import { motion } from "framer-motion";
import How_It_Works from "./How_It_Works";
import Features from "./Features";
import Footer from "../components/Footer";

const vulnerabilities = [

  {
    text: "Cross-Site Scripting",
    position: "top-[55px] left-[15%]",
    animation: "float1",
    duration: "4.8s",
    delay: "0s",
  },

  {
    text: "Hardcoded Credentials",
    position: "top-[55px] left-[54%]",
    animation: "float2",
    duration: "5.6s",
    delay: "0.8s",
  },

  {
    text: "SQL Injection",
    position: "top-[116px] left-0",
    animation: "float3",
    duration: "5.1s",
    delay: "1.2s",
  },

  {
    text: "Command Injection",
    position: "top-[116px] left-[33%]",
    animation: "float1",
    duration: "4.6s",
    delay: "0.4s",
  },

  {
    text: "Path Traversal",
    position: "top-[116px] right-[7%]",
    animation: "float2",
    duration: "5.3s",
    delay: "1.6s",
  },

  {
    text: "Broken Authentication",
    position: "top-[325px] left-[14%]",
    animation: "float3",
    duration: "5.8s",
    delay: "0.6s",
  },

  {
    text: "Insecure Cryptography",
    position: "top-[325px] left-[53%]",
    animation: "float1",
    duration: "5s",
    delay: "1.8s",
  },

  {
    text: "Insecure Deserialization",
    position: "top-[380px] left-0",
    animation: "float2",
    duration: "5.5s",
    delay: "0.2s",
  },

  {
    text: "Improper Input Validation",
    position: "top-[420px] left-[32%]",
    animation: "float3",
    duration: "4.9s",
    delay: "1.4s",
  },

  {
    text: "Sensitive Data Exposure",
    position: "top-[420px] right-[3%]",
    animation: "float1",
    duration: "5.7s",
    delay: "0.9s",
  },
];


const createWaveDots = () => {

  const dots = [];

  // ONE wave. The left and right edges are cycle-compatible,

  // so the same wave can move continuously without a seam.

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

      const opacity =
        0.18 +
        (1 - depth) * 0.72;

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

/* EXTRA FLOATING DEPTH PARTICLES */

const createDepthParticles = () => {

  const particles = [];

  for (let i = 0; i < 75; i++) {

    const x = (i * 137) % 1100;

    const y = 55 + ((i * 83) % 190);

    particles.push({
      id: i,
      x,
      y,
      size: 0.7 + ((i * 17) % 10) / 10,
      opacity: 0.08 + ((i * 13) % 25) / 100,
      delay: -(i * 0.12),
    });
  }
  return particles;
};

const WaveSurface = ({ waveDots, copyId }) => {
  return (
    <g>
      {/* VERY SUBTLE SHADOW WAVE */}

      <g
        opacity="0.055"
        filter="url(#softWaveBlur)"
      >

        {waveDots
          .filter((dot) => dot.layer > 7)
          .map((dot) => (
            <circle
              key={`shadow-${copyId}-${dot.id}`}
              cx={dot.x}
              cy={dot.y + 5}
              r={dot.size * 2.5}
              fill="black"
            />
          ))}
      </g>

      {/* BACK → FRONT DOT SURFACE */}

      {waveDots.map((dot) => (
        <circle
          key={`wave-${copyId}-${dot.id}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill="black"
          opacity={dot.opacity}
          className="realistic-wave-dot"
          style={{
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      {/* EXTRA FRONT HIGHLIGHT DOTS */}

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
            r={0.55}
            fill="white"
            opacity="0.38"
            className="wave-highlight"
            style={{
              animationDelay: `${dot.delay * 0.8}s`,
            }}
          />
        ))}
    </g>
  );
};

export default function Home() {

  const waveDots = useMemo(() => createWaveDots(), []);

  const depthParticles = useMemo(() => createDepthParticles(), []);

  return (

    <main className="min-h-screen w-full overflow-hidden bg-white font-['Montserrat'] text-black px-10">

      {/* HERO */}

      <section className="flex min-h-screen w-full items-center flex-row gap-2">

        {/* LEFT CONTENT */}

        <div className="relative z-30 w-[39%] flex flex-col gap-3">
          <h1 className="text-[clamp(25px,2vw,31px)] font-nova font-semibold leading-[1.15] tracking-[-0.8px]">
            Your AI Code Security Assistant
          </h1>
          <p className="text-[clamp(14px,1.15vw,17px)] font-nova font-normal leading-[1.4] text-[#222]">
            Detect vulnerabilities. Understand bugs. Secure
            <br />
            your code. Get AI-powered explanations and
            <br />
            remediation guidance for your code.
          </p>
        </div>
        {/* RIGHT SECURITY VISUAL */}

        <div className="relative h-[500px] w-[61%]">

          {/* VULNERABILITY TAGS */}

          {vulnerabilities.map((item, index) => (
              <div
                key={index}
                className={`absolute z-30 ${item.position} whitespace-nowrap rounded-[7px] bg-black px-3 py-2 text-[11px] font-normal leading-none text-white transition-all duration-300 hover:-translate-y-[3px]`}
                style={{
                          animation: `${item.animation} ${item.duration} ease-in-out infinite`,
                          animationDelay: item.delay,
                          willChange: "transform",
                        }}
              >
    {item.text}
  </div>
))}
          <div className=" absolute left-[-40px] top-[115px] h-[310px] w-[calc(100%+80px)] overflow-hidden pointer-events-none">
        {/* ONE WAVE — SEAMLESS CONTINUOUS CYCLE */}

            <svg
              viewBox="0 0 1100 300"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible continuous-wave-svg"
            >
              <defs>
                <filter
                  id="softWaveBlur"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feGaussianBlur stdDeviation="8" />
                </filter>

                <filter
                  id="tinyBlur"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>

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

              <rect x="0" y="0" width="1100" height="300" fill="url(#continuousWavePattern)"/>
            </svg>

{/*  FLOATING DEPTH PARTICLES, These remain independent from, the main horizontal wave movement. */}

            <svg viewBox="0 0 1100 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible pointer-events-none">
              {depthParticles.map((particle) => (
                <circle
                  key={`particle-${particle.id}`}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.size}
                  fill="black"
                  opacity={particle.opacity}
                  className="depth-particle"
                  style={{
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}

            </svg>

            {/*  VERY SUBTLE MOVING ATMOSPHERE */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="wave-atmosphere" />
            </div>

          </div>

        </div>

      </section>

      {/* ANIMATIONS */}
      <style>{`

        /* SEAMLESS ONE-WAVE FLOW */
        .continuous-wave-svg {
          overflow: visible;
        }
     }

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

        /* DOT HIGHLIGHTS */
        @keyframes waveHighlight {
          0% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.55;
          }
          100% {
            opacity: 0.12;
          }
        }

        .wave-highlight {
          animation:
            waveHighlight
            3.2s
            ease-in-out
            infinite;
        }

        /* FLOATING DEPTH PARTICLES */
        @keyframes depthFloat {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.08;
          }
          50% {
            transform: translate3d(4px, -7px, 0);
            opacity: 0.22;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.08;
          }
        }

        .depth-particle {
          transform-box: fill-box;
          transform-origin: center;
          animation:
            depthFloat
            5.5s
            ease-in-out
            infinite;
          will-change: transform, opacity;
        }

        /* SOFT ATMOSPHERIC MOTION */
        @keyframes atmosphereMove {
          0% {
            transform:
              translateX(-8px)
              scaleX(0.98);
            opacity: 0.02;
          }
          50% {
            transform:
              translateX(8px)
              scaleX(1.02);
            opacity: 0.05;
          }
          100% {
            transform:
              translateX(-8px)
              scaleX(0.98);
            opacity: 0.02;
          }
        }

        .wave-atmosphere {
          position: absolute;
          left: 8%;
          top: 25%;
          width: 80%;
          height: 35%;
          border-radius: 50%;
          background:
            radial-gradient(
              ellipse,
              rgba(0,0,0,0.07) 0%,
              rgba(0,0,0,0.025) 35%,
              transparent 72%
            );
          filter: blur(18px);
          animation:
            atmosphereMove
            7s
            ease-in-out
            infinite;
        }
        /* VULNERABILITY FLOATING ANIMATIONS */
        @keyframes float1 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(0, -7px, 0);
          }
          50% {
            transform: translate3d(3px, -11px, 0);
          }
          75% {
            transform: translate3d(-2px, -5px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes float2 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(3px, -5px, 0);
          }
          50% {
            transform: translate3d(-2px, -10px, 0);
          }
          75% {
            transform: translate3d(2px, -6px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes float3 {
          0% {
            transform: translate3d(0, 0, 0);
          }
          20% {
            transform: translate3d(-2px, -6px, 0);
          }
          50% {
            transform: translate3d(2px, -12px, 0);
          }
          80% {
            transform: translate3d(-3px, -5px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        /* =================================================
           REDUCED MOTION
        ================================================= */
        @media (prefers-reduced-motion: reduce) {
          .wave-flow-track,
          .realistic-wave-dot,
          .wave-highlight,
          .depth-particle,
          .wave-atmosphere {
            animation: none !important;
          }
          [style*="animation"] {
            animation: none !important;
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
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
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
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
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
