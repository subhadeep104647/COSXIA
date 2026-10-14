import React from "react";
import { Link } from "react-router-dom";
import Logo from "./header/Logo";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black font-nova">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">

        {/* Top divider */}
        <div className="h-px w-full bg-black/10" />

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div className="max-w-[360px]">
            <div className="flex items-center gap-3">
              <div className="">
                <Logo/>
              </div>

            </div>

            <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.04em]">
              Your AI Code
              <br />
              Security Assistant.
            </h2>

            <p className="mt-5 max-w-[310px] text-sm leading-6 text-black/50">
              Detect vulnerabilities. Understand the risk.
              Secure your code with explainable AI.
            </p>

            <Link
              to="/Get_Started"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-black/80"
            >
              Connect Us

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
              Product
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              <Link
                to="/"
                className="w-fit transition-colors hover:text-black/50"
              >
                Home
              </Link>

              <Link
                to="/Features"
                className="w-fit transition-colors hover:text-black/50"
              >
                Features
              </Link>

              <Link
                to="/How_It_Works"
                className="w-fit transition-colors hover:text-black/50"
              >
                How It Works
              </Link>

              <Link
                to="/SingIn"
                className="w-fit transition-colors hover:text-black/50"
              >
                Sing In
              </Link>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
              Security
            </h3>

            <div className="flex flex-col gap-4 text-sm text-black/70">
              <span>Semgrep Detection</span>
              <span>RAG Context</span>
              <span>LLM Analysis</span>
              <span>Explainable AI</span>
              <span>Security Reports</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
              Legal
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              <Link
                to="/About"
                className="w-fit transition-colors hover:text-black/50"
              >
                About NOVA
              </Link>

              <Link
                to="/Terms_and_con"
                className="w-fit transition-colors hover:text-black/50"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/Privacy_Policy"
                className="w-fit transition-colors hover:text-black/50"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-black/10 py-6 text-xs text-black/40 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {currentYear} NOVA. All rights reserved.
          </p>

          <p className="tracking-wide">
            DETECT · EXPLAIN · SECURE
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;