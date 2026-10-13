import React from "react";
import { ShieldCheck, BrainCircuit, SearchCode, Bug, FileSearch, Sparkles, Code2, LockKeyhole, ChartNoAxesCombined, GraduationCap, Globe, GitBranch, Terminal, Zap, Target, Layers3,} from "lucide-react";

const About = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#07070c]
        text-white
        px-4
        md:px-8
        py-12
      "
    >

      {/* =========================================
          BACKGROUND GLOW
      ========================================== */}

      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[300px]
          rounded-full
          bg-purple-600/10
          blur-[140px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-[500px]
          right-[-150px]
          w-[400px]
          h-[400px]
          rounded-full
          bg-blue-600/5
          blur-[120px]
          pointer-events-none
        "
      />


      {/* =========================================
          MAIN CONTAINER
      ========================================== */}

      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto

          rounded-3xl

          bg-white/[0.03]
          backdrop-blur-xl

          border
          border-white/[0.08]

          shadow-[0_0_60px_rgba(99,102,241,0.08)]

          px-6
          md:px-10
          lg:px-16

          py-14
        "
      >


        {/* =========================================
            HERO / INTRO
        ========================================== */}

        <section className="text-center max-w-4xl mx-auto">

          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-2

              rounded-full

              bg-purple-500/10
              border
              border-purple-400/20

              text-sm
              text-purple-300

              mb-6
            "
          >
            <ShieldCheck size={16} />

            AI-Powered Code Security
          </div>


          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl

              font-bold
              tracking-tight

              mb-6
            "
          >
            About{" "}
            <span
              className="
                bg-gradient-to-r
                from-purple-400
                via-blue-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              NOVA
            </span>
          </h1>


          <p
            className="
              text-gray-400
              text-base
              md:text-lg
              leading-8
            "
          >
            NOVA is an AI-powered code security assistant designed to help
            developers detect vulnerabilities, understand security risks,
            and improve the safety of their code.
          </p>


          <p
            className="
              mt-5
              text-gray-500
              leading-7
            "
          >
            Instead of simply identifying that something is wrong, NOVA
            focuses on explaining <span className="text-gray-300">where</span>{" "}
            the vulnerability exists, <span className="text-gray-300">why</span>{" "}
            it is dangerous, and <span className="text-gray-300">how</span>{" "}
            developers can address it.
          </p>

        </section>


        {/* =========================================
            WHAT IS NOVA?
        ========================================== */}

        <section className="mt-20">

          <div className="flex items-center justify-center gap-3 mb-8">

            <div
              className="
                p-2.5
                rounded-xl
                bg-purple-500/10
                border
                border-purple-400/20
              "
            >
              <BrainCircuit
                size={22}
                className="text-purple-400"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold">
              What is NOVA?
            </h2>

          </div>


          <div
            className="
              max-w-4xl
              mx-auto
              text-center
              text-gray-400
              leading-8
            "
          >
            <p>
              NOVA combines static security analysis, context-aware retrieval,
              and AI-powered reasoning into a single security workflow.
              It is designed to bridge the gap between traditional
              vulnerability detection and developer-friendly security
              understanding.
            </p>

            <p className="mt-5">
              The system uses <span className="text-purple-300">Semgrep CE</span>
              {" "}for vulnerability detection,{" "}
              <span className="text-blue-300">RAG</span> for retrieving
              relevant security context, and a{" "}
              <span className="text-cyan-300">LoRA-tuned LLM</span> to generate
              explainable analysis and remediation guidance.
            </p>
          </div>

        </section>


        {/* =========================================
            WHAT MAKES NOVA DIFFERENT?
        ========================================== */}

        <section className="mt-20">

          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-4">

              <Sparkles className="text-yellow-300" size={22} />

              <h2 className="text-2xl md:text-3xl font-semibold">
                What Makes NOVA Different?
              </h2>

            </div>

            <p className="text-gray-500 max-w-2xl mx-auto">
              NOVA goes beyond simply reporting vulnerabilities by combining
              detection, context, reasoning, and explainability.
            </p>

          </div>


          <div className="grid md:grid-cols-2 gap-5">


            {/* Detection */}

            <div
              className="
                group
                rounded-2xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                p-6

                transition-all
                duration-300

                hover:bg-white/[0.06]
                hover:border-red-400/20
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-red-500/10
                  border
                  border-red-400/20
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <Bug className="text-red-400" size={21} />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                Vulnerability Detection
              </h3>

              <p className="text-gray-400 text-sm leading-6">
                NOVA uses Semgrep CE to identify security vulnerabilities
                and suspicious code patterns before they become bigger
                problems.
              </p>

            </div>


            {/* Context */}

            <div
              className="
                group
                rounded-2xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                p-6

                transition-all
                duration-300

                hover:bg-white/[0.06]
                hover:border-blue-400/20
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-blue-500/10
                  border
                  border-blue-400/20
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <SearchCode className="text-blue-400" size={21} />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                Context-Aware RAG
              </h3>

              <p className="text-gray-400 text-sm leading-6">
                Relevant security knowledge and contextual information are
                retrieved through Retrieval-Augmented Generation to make
                the analysis more relevant and useful.
              </p>

            </div>


            {/* Explainable AI */}

            <div
              className="
                group
                rounded-2xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                p-6

                transition-all
                duration-300

                hover:bg-white/[0.06]
                hover:border-purple-400/20
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-purple-500/10
                  border
                  border-purple-400/20
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <BrainCircuit
                  className="text-purple-400"
                  size={21}
                />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                Explainable AI
              </h3>

              <p className="text-gray-400 text-sm leading-6">
                Instead of returning an unexplained warning, NOVA translates
                technical security findings into understandable explanations
                for developers.
              </p>

            </div>


            {/* Remediation */}

            <div
              className="
                group
                rounded-2xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                p-6

                transition-all
                duration-300

                hover:bg-white/[0.06]
                hover:border-green-400/20
                hover:-translate-y-1
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-green-500/10
                  border
                  border-green-400/20
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <ShieldCheck
                  className="text-green-400"
                  size={21}
                />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                Remediation Guidance
              </h3>

              <p className="text-gray-400 text-sm leading-6">
                NOVA provides guidance on how developers can address
                detected vulnerabilities and write safer code.
              </p>

            </div>

          </div>

        </section>


        {/* =========================================
            HOW NOVA WORKS
        ========================================== */}

        <section className="mt-20">

          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-4">

              <Layers3
                className="text-cyan-300"
                size={23}
              />

              <h2 className="text-2xl md:text-3xl font-semibold">
                How NOVA Works
              </h2>

            </div>

            <p className="text-gray-500">
              From vulnerable code to explainable security guidance.
            </p>

          </div>


          <div className="grid md:grid-cols-5 gap-4">


            {/* Step 1 */}

            <div
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/[0.07]
                p-5
                text-center
              "
            >

              <Code2
                className="mx-auto text-cyan-400 mb-4"
                size={25}
              />

              <span className="text-xs text-gray-600">
                01
              </span>

              <h3 className="font-semibold mt-2 mb-2">
                Submit Code
              </h3>

              <p className="text-xs text-gray-500 leading-5">
                Developer submits code for security analysis.
              </p>

            </div>


            {/* Step 2 */}

            <div
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/[0.07]
                p-5
                text-center
              "
            >

              <Bug
                className="mx-auto text-red-400 mb-4"
                size={25}
              />

              <span className="text-xs text-gray-600">
                02
              </span>

              <h3 className="font-semibold mt-2 mb-2">
                Detect
              </h3>

              <p className="text-xs text-gray-500 leading-5">
                Semgrep CE scans the code for vulnerabilities.
              </p>

            </div>


            {/* Step 3 */}

            <div
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/[0.07]
                p-5
                text-center
              "
            >

              <FileSearch
                className="mx-auto text-blue-400 mb-4"
                size={25}
              />

              <span className="text-xs text-gray-600">
                03
              </span>

              <h3 className="font-semibold mt-2 mb-2">
                Retrieve
              </h3>

              <p className="text-xs text-gray-500 leading-5">
                RAG retrieves relevant security context.
              </p>

            </div>


            {/* Step 4 */}

            <div
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/[0.07]
                p-5
                text-center
              "
            >

              <BrainCircuit
                className="mx-auto text-purple-400 mb-4"
                size={25}
              />

              <span className="text-xs text-gray-600">
                04
              </span>

              <h3 className="font-semibold mt-2 mb-2">
                Analyze
              </h3>

              <p className="text-xs text-gray-500 leading-5">
                The LoRA-tuned LLM reasons over the findings.
              </p>

            </div>


            {/* Step 5 */}

            <div
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/[0.07]
                p-5
                text-center
              "
            >

              <ShieldCheck
                className="mx-auto text-green-400 mb-4"
                size={25}
              />

              <span className="text-xs text-gray-600">
                05
              </span>

              <h3 className="font-semibold mt-2 mb-2">
                Secure
              </h3>

              <p className="text-xs text-gray-500 leading-5">
                Developer receives an explainable security report.
              </p>

            </div>

          </div>

        </section>


        {/* =========================================
            TECHNOLOGY STACK
        ========================================== */}

        <section className="mt-20">

          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-4">

              <Terminal
                className="text-purple-400"
                size={23}
              />

              <h2 className="text-2xl md:text-3xl font-semibold">
                NOVA Technology
              </h2>

            </div>

            <p className="text-gray-500 max-w-2xl mx-auto">
              The system combines security scanning, retrieval,
              and specialized AI reasoning into one pipeline.
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.03]
                p-5
                text-center
              "
            >
              <SearchCode
                className="mx-auto text-red-400 mb-3"
                size={23}
              />

              <h3 className="font-medium">
                Semgrep CE
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Vulnerability Detection
              </p>
            </div>


            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.03]
                p-5
                text-center
              "
            >
              <FileSearch
                className="mx-auto text-blue-400 mb-3"
                size={23}
              />

              <h3 className="font-medium">
                RAG
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Context Retrieval
              </p>
            </div>


            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.03]
                p-5
                text-center
              "
            >
              <BrainCircuit
                className="mx-auto text-purple-400 mb-3"
                size={23}
              />

              <h3 className="font-medium">
                LoRA
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Model Adaptation
              </p>
            </div>


            <div
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.03]
                p-5
                text-center
              "
            >
              <Sparkles
                className="mx-auto text-cyan-400 mb-3"
                size={23}
              />

              <h3 className="font-medium">
                LLM
              </h3>

              <p className="text-xs text-gray-500 mt-2">
                Explainable Analysis
              </p>
            </div>

          </div>

        </section>


        {/* =========================================
            VISION
        ========================================== */}

        <section className="mt-20">

          <div
            className="
              rounded-3xl
              bg-gradient-to-br
              from-purple-500/10
              via-blue-500/5
              to-transparent

              border
              border-purple-400/10

              p-8
              md:p-12

              text-center
            "
          >

            <Target
              className="mx-auto text-purple-400 mb-5"
              size={30}
            />

            <h2 className="text-2xl md:text-3xl font-semibold mb-5">
              Our Vision
            </h2>

            <p
              className="
                max-w-3xl
                mx-auto
                text-gray-400
                leading-8
              "
            >
              Our vision is to make application security more accessible
              to developers by turning complex vulnerability findings into
              understandable, actionable security knowledge.
            </p>

          </div>

        </section>


        {/* =========================================
            IMPACT
        ========================================== */}

        <section className="mt-20">

          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-4">

              <Zap
                className="text-yellow-300"
                size={23}
              />

              <h2 className="text-2xl md:text-3xl font-semibold">
                Why NOVA Matters
              </h2>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-5">

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">

              <ShieldCheck className="text-green-400 shrink-0" />

              <div>
                <h3 className="font-semibold mb-1">
                  Earlier Security Detection
                </h3>

                <p className="text-sm text-gray-500">
                  Helps identify security issues during development
                  instead of waiting until later stages.
                </p>
              </div>

            </div>


            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">

              <BrainCircuit className="text-purple-400 shrink-0" />

              <div>
                <h3 className="font-semibold mb-1">
                  Better Security Understanding
                </h3>

                <p className="text-sm text-gray-500">
                  Converts technical findings into explanations developers
                  can understand and act upon.
                </p>
              </div>

            </div>


            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">

              <GraduationCap className="text-blue-400 shrink-0" />

              <div>
                <h3 className="font-semibold mb-1">
                  Security Learning
                </h3>

                <p className="text-sm text-gray-500">
                  Developers can learn from vulnerabilities instead of
                  simply fixing warnings without understanding them.
                </p>
              </div>

            </div>


            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">

              <ChartNoAxesCombined className="text-cyan-400 shrink-0" />

              <div>
                <h3 className="font-semibold mb-1">
                  Developer Productivity
                </h3>

                <p className="text-sm text-gray-500">
                  Brings detection, explanation, and remediation guidance
                  into a unified workflow.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            FUTURE SCOPE
        ========================================== */}

        <section className="mt-20">

          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-4">

              <Globe
                className="text-cyan-300"
                size={23}
              />

              <h2 className="text-2xl md:text-3xl font-semibold">
                Future Scope
              </h2>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-4">

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="text-purple-400" size={20} />
                <h3 className="font-medium">
                  Multi-Language Security Analysis
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                Expand security analysis across a wider range of
                programming languages and frameworks.
              </p>
            </div>


            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="text-blue-400" size={20} />
                <h3 className="font-medium">
                  GitHub Integration
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                Integrate security analysis directly into repository
                and development workflows.
              </p>
            </div>


            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <div className="flex items-center gap-3 mb-2">
                <LockKeyhole className="text-green-400" size={20} />
                <h3 className="font-medium">
                  Advanced Security Detection
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                Extend the system with additional vulnerability
                categories and security intelligence.
              </p>
            </div>


            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <div className="flex items-center gap-3 mb-2">
                <ChartNoAxesCombined className="text-cyan-400" size={20} />
                <h3 className="font-medium">
                  Security Analytics
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                Provide deeper insights into vulnerability patterns,
                severity, and remediation trends.
              </p>
            </div>

          </div>

        </section>


        {/* =========================================
            FINAL MESSAGE
        ========================================== */}

        <div
          className="
            mt-20
            pt-10

            border-t
            border-white/[0.07]

            text-center
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-gray-500
            "
          >

            <ShieldCheck
              size={17}
              className="text-purple-400"
            />

            NOVA — From Vulnerability Detection to Explainable Security.

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;