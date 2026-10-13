import React from "react";
import {
  CodeXml,
  ShieldAlert,
  Search,
  BrainCircuit,
  FileCheck2,
} from "lucide-react";
import { motion } from "framer-motion";

const How_It_Works = () => {
  const steps = [
    {
      icon: CodeXml,
      title: "Submit Code",
      description: (
        <>
          Developer submits code through
          <br />
          the NOVA interface or VS Code.
        </>
      ),
    },

    {
      icon: ShieldAlert,
      title: "Detect Vulnerability",
      description: (
        <>
          Semgrep CE scans the code and
          <br />
          identifies security vulnerabilities.
        </>
      ),
    },

    {
      icon: Search,
      title: "Retrieve Context",
      description: (
        <>
          RAG retrieves relevant security
          <br />
          knowledge and vulnerability context.
        </>
      ),
    },

    {
      icon: BrainCircuit,
      title: "AI Analysis",
      description: (
        <>
          The LoRA-tuned LLM analyzes the
          <br />
          vulnerability and its root cause.
        </>
      ),
    },

    {
      icon: FileCheck2,
      title: "Security Report",
      description: (
        <>
          NOVA explains the issue and provides
          <br />
          remediation guidance.
        </>
      ),
    },
  ];

  return (
    <section className="relative flex flex-col items-center w-full py-24 overflow-hidden bg-white text-gray-900">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-[15%]
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[300px]
            rounded-full
            bg-purple-600/8
            blur-[120px]
          "
        />
      </div>

      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <h1
          className="
            font-bold
            font-nova
            text-5xl
            tracking-normal
            text-center
            text-gray-900
          "
        >
          From vulnerable code to{" "}
          <span
            className="
              bg-gradient-to-r
              from-button
              via-purple-500
              to-nav
              bg-clip-text
              text-transparent
            "
          >
            secure solution
          </span>
        </h1>

        <p
          className="
            font-medium
            font-nova
            text-lg
            text-gray-600
            text-center
            max-w-2xl
          "
        >
          NOVA combines static analysis, retrieval-augmented generation,
          and a tuned language model to understand and explain code
          security issues.
        </p>
      </motion.div>

      {/* =====================================================
          WORKFLOW
      ===================================================== */}

      <div className="relative z-10 mt-20 w-full max-w-[1250px]">

        {/* Connecting line */}

        <div
          className="
            absolute
            top-[42px]
            left-[10%]
            right-[10%]
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-purple-400/50
            to-transparent
          "
        />

        <div
          className="
            absolute
            top-[39px]
            left-[10%]
            right-[10%]
            h-[7px]
            bg-purple-500/10
            blur-md
          "
        />

        {/* Steps */}

        <div className="relative flex flex-row items-start justify-between">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  w-[210px]
                "
              >

                {/* ICON */}

                <motion.div
                  whileHover={{
                    scale: 1.12,
                    y: -5,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    relative
                    z-20
                    flex
                    items-center
                    justify-center
                    w-[84px]
                    h-[84px]
                    rounded-2xl
                    bg-white
                    backdrop-blur-xl
                    border
                    border-purple-200
                    shadow-[0_10px_35px_rgba(139,92,246,0.12)]
                    cursor-pointer
                  "
                >

                  {/* Icon glow */}

                  <div
                    className="
                      absolute
                      inset-0
                      rounded-2xl
                      bg-purple-500/8
                      blur-xl
                    "
                  />

                  <Icon
                    size={34}
                    strokeWidth={1.5}
                    className="
                      relative
                      text-purple-600
                    "
                  />
                </motion.div>

                {/* STEP NUMBER */}

                <div
                  className="
                    absolute
                    top-[-10px]
                    right-[42px]
                    z-30
                    flex
                    items-center
                    justify-center
                    w-6
                    h-6
                    rounded-full
                    bg-gradient-to-r
                    from-purple-500
                    to-button
                    text-[11px]
                    font-bold
                    text-white
                  "
                >
                  {index + 1}
                </div>

                {/* TITLE */}

                <h2
                  className="
                    mt-7
                    text-lg
                    tracking-wide
                    font-semibold
                    font-nova
                    text-gray-900
                    text-center
                  "
                >
                  {step.title}
                </h2>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    font-medium
                    font-nova
                    text-gray-600
                    text-center
                  "
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* =====================================================
          TECHNICAL PIPELINE
      ===================================================== */}

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
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          relative
          z-10
          mt-20
          flex
          items-center
          justify-center
          gap-3
          px-8
          py-5
          rounded-2xl
          bg-white
          backdrop-blur-xl
          border
          border-gray-200
          shadow-[0_15px_40px_rgba(139,92,246,0.08)]
        "
      >

        <span className="text-sm font-nova text-gray-600">
          Security Pipeline
        </span>

        <span className="text-purple-500">→</span>

        <span className="text-sm font-nova font-medium text-gray-800">
          Semgrep CE
        </span>

        <span className="text-purple-500">→</span>

        <span className="text-sm font-nova font-medium text-gray-800">
          RAG
        </span>

        <span className="text-purple-500">→</span>

        <span className="text-sm font-nova font-medium text-gray-800">
          LoRA-Tuned LLM
        </span>

        <span className="text-purple-500">→</span>

        <span className="text-sm font-nova font-medium text-gray-800">
          Report
        </span>
      </motion.div>

      {/* =====================================================
          NOVA IMAGE / PROJECT PREVIEW
          YOUR PICTURE IS NOT REMOVED
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 70,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          relative
          z-10
          mt-20
          w-[1000px]
          max-w-[90vw]
          p-5
          rounded-3xl
          bg-white
          backdrop-blur-xl
          border
          border-purple-200/60
          shadow-[0_20px_70px_rgba(139,92,246,0.12)]
        "
      >

        {/* Preview glow */}

        <div
          className="
            absolute
            inset-0
            rounded-3xl
            bg-purple-500/[0.04]
            blur-2xl
            pointer-events-none
          "
        />

        {/* Image */}

        <div className="relative overflow-hidden rounded-2xl">

          <img
            src="/NOVA.png"
            alt="NOVA Security Assistant Interface"
            className="
              w-full
              h-auto
              border
              border-gray-200
              rounded-2xl
              shadow-2xl
              transition-transform
              duration-700
              hover:scale-[1.015]
            "
          />

          {/* Image overlay */}

          <div
            className="
              absolute
              inset-0
              rounded-2xl
              bg-gradient-to-t
              from-black/10
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

        </div>
      </motion.div>

      {/* =====================================================
          FINAL EXPLANATION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{
          once: true,
        }}
        className="
          relative
          z-10
          mt-12
          max-w-3xl
          px-6
          text-center
        "
      >
        <p className="text-gray-600 font-nova leading-7">

          NOVA first detects security vulnerabilities using{" "}

          <span className="text-purple-600 font-semibold font-nova">
            Semgrep CE
          </span>

          . Relevant security knowledge is then retrieved using{" "}

          <span className="text-purple-600 font-semibold font-nova">
            RAG
          </span>

          , while the{" "}

          <span className="text-purple-600 font-semibold font-nova">
            LoRA-tuned LLM
          </span>

          {" "}
          analyzes the vulnerability, explains its root cause,
          assesses its impact, and provides practical remediation guidance.

        </p>
      </motion.div>

    </section>
  );
};

export default How_It_Works;