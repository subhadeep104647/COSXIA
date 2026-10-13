import React from "react";
import { Link } from "react-router-dom";

import Logo from "./header/Logo";
import Icons from "./icon/Icons";

const Footer = () => {
  return (
    <footer
      className="
        relative
        z-20
        w-full
        mt-20
        px-4
        sm:px-6
        md:px-10
        pb-6
      "
    >
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          min-h-[280px]
          rounded-3xl

          bg-white/[0.04]
          backdrop-blur-2xl

          border
          border-white/10

          shadow-[0_0_50px_rgba(80,50,180,0.12)]

          px-6
          sm:px-8
          md:px-12
          py-10

          flex
          flex-col
          lg:flex-row

          items-center
          lg:items-start

          justify-between

          gap-12
        "
      >
        {/* =================================================
            BACKGROUND GLOW
        ================================================= */}

        <div
          className="
            absolute
            -top-32
            -left-32
            w-72
            h-72
            rounded-full
            bg-purple-600/10
            blur-3xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            -bottom-32
            right-0
            w-72
            h-72
            rounded-full
            bg-blue-600/10
            blur-3xl
            pointer-events-none
          "
        />

        {/* =================================================
            BRAND
        ================================================= */}

        <div
          className="
            relative
            flex
            flex-col
            items-center
            justify-center
            min-w-[220px]
            text-center
          "
        >
          <Logo />

          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              mt-5
            "
          >
            <h1
              className="
                text-center
                font-medium
                text-lg
                text-white
                tracking-wide
              "
            >
              Your AI
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-500
                  via-purple-500
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                  text-xl
                  font-semibold
                "
              >
                Code Security Assistant
              </span>
            </h1>

            <p
              className="
                text-center
                text-sm
                leading-6
                text-gray-500
                max-w-[240px]
              "
            >
              Detect vulnerabilities.
              <br />
              Understand the risk.
              <br />
              Secure your code.
            </p>

            <Icons />
          </div>
        </div>

        {/* =================================================
            FOOTER LINKS
        ================================================= */}

        <div
          className="
            relative
            w-full
            flex
            flex-wrap
            justify-center
            lg:justify-end
            gap-x-12
            sm:gap-x-16
            md:gap-x-20
            gap-y-10
            text-white
          "
        >
          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="flex flex-col gap-5 min-w-[190px]">
            <h2
              className="
                font-semibold
                text-lg
                tracking-wide
                text-nav
              "
            >
              Contact
            </h2>

            <div
              className="
                flex
                flex-col
                gap-2
                text-sm
                text-gray-400
              "
            >
              <a
                href="mailto:subhadeepbiswas205@gmail.com"
                className="hover:text-white transition-colors"
              >
                subhadeepbiswas205@gmail.com
              </a>

              <a
                href="mailto:spedoriobusiness@gmail.com"
                className="hover:text-white transition-colors"
              >
                spedoriobusiness@gmail.com
              </a>

              <a
                href="mailto:sanchariray71@gmail.com"
                className="hover:text-white transition-colors"
              >
                sanchariray71@gmail.com
              </a>

              <a
                href="mailto:jeetchakrabortyx9@gmail.com"
                className="hover:text-white transition-colors"
              >
                jeetchakrabortyx9@gmail.com
              </a>

              <a
                href="mailto:abirsanyal99@gmail.com"
                className="hover:text-white transition-colors"
              >
                abirsanyal99@gmail.com
              </a>
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="flex flex-col gap-5 min-w-[140px]">
            <h2
              className="
                font-semibold
                text-lg
                tracking-wide
                text-nav
              "
            >
              Quick Links
            </h2>

            <div
              className="
                flex
                flex-col
                gap-3
                text-sm
                text-gray-400
              "
            >
              <Link
                to="/"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                Home
              </Link>

              <Link
                to="/Features"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                Features
              </Link>

              <Link
                to="/How_It_Works"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                How It Works
              </Link>

              <Link
                to="/About"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                About NOVA
              </Link>

              <Link
                to="/Get_Started"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="flex flex-col gap-5 min-w-[160px]">
            <h2
              className="
                font-semibold
                text-lg
                tracking-wide
                text-nav
              "
            >
              Security
            </h2>

            <div
              className="
                flex
                flex-col
                gap-3
                text-sm
                text-gray-400
              "
            >
              <span className="hover:text-white transition-colors">
                Semgrep CE
              </span>

              <span className="hover:text-white transition-colors">
                RAG Context
              </span>

              <span className="hover:text-white transition-colors">
                LoRA-Tuned LLM
              </span>

              <span className="hover:text-white transition-colors">
                Explainable Analysis
              </span>

              <span className="hover:text-white transition-colors">
                Security Reports
              </span>
            </div>
          </div>

          {/* =================================================
              LEGAL
          ================================================= */}

          <div className="flex flex-col gap-5 min-w-[150px]">
            <h2
              className="
                font-semibold
                text-lg
                tracking-wide
                text-nav
              "
            >
              Legal
            </h2>

            <div
              className="
                flex
                flex-col
                gap-3
                text-sm
                text-gray-400
              "
            >
              <Link
                to="/Terms_and_con"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                Terms & Conditions
              </Link>

              <Link
                to="/Privacy_Policy"
                className="
                  hover:text-white
                  hover:translate-x-1
                  transition-all
                "
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
          text-center
          text-xs
          text-gray-600
          mt-5
          font-nova
        "
      >
        © {new Date().getFullYear()} NOVA.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;