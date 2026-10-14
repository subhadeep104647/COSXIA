import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  Code2,
  Brain,
  ShieldCheck,
  Database,
  Globe,
  Github,
} from "lucide-react";

const developers = [
  {
    name: "Sanchari Ray",
    role: "Frontend Developer",
    contribution:
      "Designed and developed the NOVA frontend, user interface, responsive layouts, and interactive user experience.",
    email: "sanchariray71@gmail.com",
    icon: Code2,
  },
  {
    name: "Subhadeep Biswas",
    role: "AI / Backend Developer",
    contribution:
      "Worked on AI integration, backend architecture, vulnerability analysis, and system development.",
    email: "subhadeepbiswas205@gmail.com",
    icon: Brain,
  },
  {
    name: "Spedorio",
    role: "Security & Research",
    contribution:
      "Contributed to cybersecurity research, vulnerability analysis, security concepts, and project development.",
    email: "spedoriobusiness@gmail.com",
    icon: ShieldCheck,
  },
  {
    name: "Jeet Chakraborty",
    role: "Database & Backend",
    contribution:
      "Contributed to database design, backend development, data management, and system integration.",
    email: "jeetchakrabortyx9@gmail.com",
    icon: Database,
  },
  {
    name: "Abir Sanyal",
    role: "Web Developer",
    contribution:
      "Contributed to web development, project implementation, testing, and overall application development.",
    email: "abirsanyal99@gmail.com",
    icon: Globe,
  },
];

const Get_Started = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-white text-black font-nova">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-[140px]" />
        <div className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-black/[0.025] blur-[140px]" />
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-10">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="mx-auto max-w-[1500px] px-6 pb-20 pt-28 sm:px-10 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[850px]"
          >

            {/* Small label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.025] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-black/50">
              <ShieldCheck size={14} />
              NOVA Development Team
            </div>

            {/* Heading */}

            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl">

              Meet the
              <br />

              <span className="text-black/35">
                Developers.
              </span>

            </h1>

            {/* Description */}

            <p className="mt-8 max-w-[680px] text-base leading-7 text-black/50 sm:text-lg">
              NOVA is built by a team of developers working across frontend
              engineering, artificial intelligence, cybersecurity, backend
              systems, and research.
            </p>

          </motion.div>

        </section>


        {/* =================================================
            TEAM SECTION
        ================================================= */}

        <section className="border-t border-black/10">

          <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16">

            {/* Section heading */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
            >

              <div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  The Team
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  People behind NOVA
                </h2>

              </div>

              <p className="max-w-[360px] text-sm leading-6 text-black/40">
                Each developer contributes a different area of expertise to
                build the NOVA security platform.
              </p>

            </motion.div>


            {/* =================================================
                DEVELOPER CARDS
            ================================================= */}

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {developers.map((developer, index) => {

                const Icon = developer.icon;

                return (
                  <motion.article
                    key={developer.name}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative overflow-hidden rounded-[24px] border border-black/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)]"
                  >

                    {/* Top */}

                    <div className="flex items-start justify-between">

                      {/* Avatar */}

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-500 group-hover:scale-105">
                        <Icon
                          size={23}
                          strokeWidth={1.7}
                        />
                      </div>

                      {/* Number */}

                      <span className="text-xs font-medium tracking-[0.15em] text-black/20">
                        0{index + 1}
                      </span>

                    </div>


                    {/* Name */}

                    <div className="mt-7">

                      <h3 className="text-xl font-semibold tracking-[-0.025em]">
                        {developer.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-black/40">
                        {developer.role}
                      </p>

                    </div>


                    {/* Divider */}

                    <div className="my-6 h-px w-full bg-black/10" />


                    {/* Contribution */}

                    <div>

                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                        Contribution
                      </p>

                      <p className="text-sm leading-6 text-black/55">
                        {developer.contribution}
                      </p>

                    </div>


                    {/* Email */}

                    <a
                      href={`mailto:${developer.email}`}
                      className="group/email mt-7 flex items-center gap-3 border-t border-black/10 pt-5"
                    >

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.04]">
                        <Mail
                          size={14}
                          className="text-black/60"
                        />
                      </div>

                      <span className="min-w-0 flex-1 truncate text-xs text-black/50 transition-colors group-hover/email:text-black">
                        {developer.email}
                      </span>

                      <ArrowUpRight
                        size={14}
                        className="text-black/30 transition-all duration-300 group-hover/email:-translate-y-0.5 group-hover/email:translate-x-0.5 group-hover/email:text-black"
                      />

                    </a>

                  </motion.article>
                );
              })}

            </div>

          </div>

        </section>


        {/* =================================================
            CONTRIBUTION / PROJECT SECTION
        ================================================= */}

        <section className="border-t border-black/10 bg-[#fafafa]">

          <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-16">

            <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">

              {/* Left */}

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >

                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  Our contribution
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                  Different skills.
                  <br />
                  <span className="text-black/35">
                    One vision.
                  </span>
                </h2>

                <p className="mt-6 max-w-[430px] text-sm leading-6 text-black/45">
                  NOVA combines software engineering, AI, cybersecurity,
                  research, and design into one developer-focused security
                  platform.
                </p>

              </motion.div>


              {/* Right */}

              <div>

                {[
                  ["01", "Frontend Engineering", "Interface, interaction, responsive design and user experience."],
                  ["02", "Artificial Intelligence", "LLM integration, intelligent analysis and explainable security insights."],
                  ["03", "Cybersecurity", "Vulnerability detection, security analysis and remediation guidance."],
                  ["04", "Backend & Data", "Application logic, databases, APIs and system integration."],
                ].map(([number, title, description], index) => (

                  <motion.div
                    key={number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    className="flex gap-6 border-t border-black/10 py-7"
                  >

                    <span className="pt-1 text-xs text-black/25">
                      {number}
                    </span>

                    <div>

                      <h3 className="text-lg font-semibold">
                        {title}
                      </h3>

                      <p className="mt-2 max-w-[560px] text-sm leading-6 text-black/45">
                        {description}
                      </p>

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <section className="border-t border-black/10">

          <div className="mx-auto max-w-[1500px] px-6 py-24 text-center sm:px-10 lg:px-16">

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black">
                <ShieldCheck
                  size={25}
                  strokeWidth={1.7}
                  className="text-white"
                />
              </div>

              <h2 className="mx-auto mt-7 max-w-[650px] text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Built to help developers
                <span className="text-black/35">
                  {" "}write safer code.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-[520px] text-sm leading-6 text-black/45">
                NOVA — Explainable AI Based Source Code Vulnerability Detection
                and Remediation Recommendation System.
              </p>

            </motion.div>

          </div>

        </section>


        {/* =================================================
            FOOTER LINE
        ================================================= */}

        <div className="border-t border-black/10">

          <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-6 py-6 text-[11px] text-black/35 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">

            <span>
              © {new Date().getFullYear()} NOVA
            </span>

            <span className="tracking-[0.15em]">
              DETECT · EXPLAIN · SECURE
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Get_Started;