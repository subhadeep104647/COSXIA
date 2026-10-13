import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  SearchCode,
  BrainCircuit,
  Wrench,
} from "lucide-react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      number: "01",
      title: "AI Vulnerability Detection",
      shortTitle: "Detect",
      description:
        "Automatically identifies security vulnerabilities in source code using static analysis and AI-powered reasoning.",
      details:
        "Semgrep detects suspicious patterns and vulnerabilities, while the AI model analyzes the finding to understand its security context.",
      tags: ["Semgrep CE", "Static Analysis", "Security"],
      icon: ShieldAlert,
      color: "from-red-400/30 to-purple-400/30",
      iconColor: "#FCA5A5",
    },

    {
      number: "02",
      title: "Root Cause Explanation",
      shortTitle: "Explain",
      description:
        "Understand exactly where the problem occurs, why it occurs, and how it affects your application.",
      details:
        "Instead of simply reporting an error, the system explains the vulnerable code in plain English and identifies the underlying cause.",
      tags: ["AI Analysis", "Explainability", "Root Cause"],
      icon: SearchCode,
      color: "from-purple-400/30 to-blue-400/30",
      iconColor: "#C4B5FD",
    },

    {
      number: "03",
      title: "Context-Aware RAG Analysis",
      shortTitle: "Understand",
      description:
        "Retrieves relevant security knowledge and combines it with your code context for more meaningful analysis.",
      details:
        "The RAG layer retrieves relevant information before the LLM generates its explanation, helping the system provide context-aware security insights.",
      tags: ["RAG", "LLM", "Knowledge Retrieval"],
      icon: BrainCircuit,
      color: "from-blue-400/30 to-cyan-400/30",
      iconColor: "#93C5FD",
    },

    {
      number: "04",
      title: "Remediation Guidance",
      shortTitle: "Remedy",
      description:
        "Get practical guidance on how to address the detected vulnerability without automatically modifying your code.",
      details:
        "The system explains the recommended remediation approach so the developer remains in control of the final code changes.",
      tags: ["Remediation", "Developer Control", "Secure Coding"],
      icon: Wrench,
      color: "from-emerald-400/30 to-purple-400/30",
      iconColor: "#86EFAC",
    },
  ];

  return (
    <section className="w-full py-28 px-6 bg-white text-gray-900">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col items-center text-center gap-5 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-bold font-nova text-5xl tracking-normal text-gray-900"
        >
          Everything you need to{" "}
          <span className="bg-black bg-clip-text text-transparent">
            secure your code
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-medium font-nova text-lg text-gray-600 tracking-wide max-w-2xl"
        >
          An AI-powered security assistant that detects vulnerabilities,
          explains their root causes, and provides context-aware remediation
          guidance.
        </motion.p>
      </div>

      {/* ================= FEATURE CARDS ================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          lg:flex-row
          gap-3
          h-auto
          lg:h-[480px]
        "
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = activeFeature === index;

          return (
            <motion.div
              key={feature.number}
              onMouseEnter={() => setActiveFeature(index)}
              layout
              animate={{
                flex: isActive ? 2.4 : 1,
                opacity: isActive ? 1 : 0.55,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                relative
                overflow-hidden
                cursor-pointer
                rounded-2xl
                border
                backdrop-blur-xl
                bg-gradient-to-br
                ${feature.color}
                ${
                  isActive
                    ? "border-purple-300/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                    : "border-gray-200"
                }
              `}
            >
              {/* Background glow */}

              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="
                  absolute
                  -top-24
                  -right-24
                  w-56
                  h-56
                  rounded-full
                  bg-purple-500/10
                  blur-3xl
                  pointer-events-none
                "
              />

              {/* ================= CARD CONTENT ================= */}

              <div className="relative z-10 h-full p-7 flex flex-col">
                {/* Number */}

                <div className="flex items-center justify-between mb-8">
                  <span
                    className={`
                      text-sm
                      font-mono
                      transition-colors
                      duration-300
                      ${
                        isActive
                          ? "text-purple-600"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {feature.number}
                  </span>

                  <motion.div
                    animate={{
                      rotate: isActive ? 0 : -8,
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      bg-white/70
                      border
                      border-gray-200
                    "
                  >
                    <Icon
                      size={22}
                      color={feature.iconColor}
                    />
                  </motion.div>
                </div>

                {/* Title */}

                <motion.h2
                  layout="position"
                  className="
                    text-2xl
                    font-semibold
                    font-nova
                    text-gray-900
                    mb-4
                  "
                >
                  {feature.title}
                </motion.h2>

                {/* Description */}

                <p className="text-sm text-gray-900 leading-6 font-nova">
                  {feature.description}
                </p>

                {/* ================= EXPANDED CONTENT ================= */}

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="mt-7"
                    >
                      <div className="h-px w-full bg-gray-200 mb-6" />

                      <p className="text-sm text-gray-900 leading-6 font-nova">
                        {feature.details}
                      </p>

                      {/* Tags */}

                      <div className="flex flex-wrap gap-2 mt-6">
                        {feature.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-nova
                              text-gray-900
                              bg-white/70
                              border
                              border-gray-200
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ================= BOTTOM LABEL ================= */}

                <div className="mt-auto pt-8">
                  <motion.div
                    animate={{
                      width: isActive ? "100%" : "25%",
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-purple-400
                      to-sky-300
                    "
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= NOVELTY STATEMENT ================= */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          max-w-4xl
          mx-auto
          mt-16
          text-center
        "
      >
        <p className="text-sm font-nova uppercase tracking-[0.3em] text-black mb-4">
          What makes it different
        </p>

        <p className="text-lg text-gray-600 font-nova leading-8">
          Unlike conventional static analyzers that only report
          vulnerabilities, our system combines{" "}
          <span className="text-gray-900 font-semibold">
            static analysis, LLM-based reasoning, and RAG
          </span>{" "}
          to explain the problem, identify its root cause, and provide
          actionable remediation guidance.
        </p>
      </motion.div>
    </section>
  );
};

export default Features;