import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import {
  ShieldCheck,
  KeyRound,
  ArrowRight,
} from "lucide-react";

const SignIn = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuth(true);

    setTimeout(() => {
      navigate("/NewChat");
    }, 700);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundColor: "#00000",
        minHeight: "100vh",
      }}
    >

      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Purple glow */}
        <div className=" absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]"/>

        {/* Blue glow */}
        <div className=" absolute bottom-[-250px] left-[25%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[160px]"/>

        {/* Violet glow */}
        <div className=" absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[130px] "/>

      </div>

      {/* MAIN SPLIT SCREEN */}

      <div className=" relative z-10 min-h-screen w-full grid grid-cols-1 lg:grid-cols-[1fr_530px]" style={{ backgroundColor: "transparent", }}>

        {/* LEFT SIDE */}

        <div className="  hidden lg:flex relative items-center justify-center px-16 xl:px-28 ">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut",}} 
            className="max-w-[700px]">

            {/* MAIN HEADING */}

            <h1 className=" text-5xl text-black xl:text-7xl font-bold font-nova leading-[1.05] tracking-tight">

              <motion.span
                initial={{ opacity: 0, y: 25, }}
                animate={{opacity: 1, y: 0,}}
                transition={{ delay: 0.25, duration: 0.7,}}
                className="block">
                Secure your code.
              </motion.span>


              <motion.span
                initial={{ opacity: 0, y: 25,}}
                animate={{ opacity: 1, y: 0,}}
                transition={{ delay: 0.4, duration: 0.7,}}
                className=" block bg-gradient-to-r from-button via-purple-500 to-nav bg-clip-text text-transparent">
                Understand the risk.
              </motion.span>

            </h1>


            {/* DESCRIPTION */}

            <motion.p
              initial={{ opacity: 0, y: 20,}}
              animate={{ opacity: 1, y: 0,}}
              transition={{ delay: 0.55, duration: 0.7,}}
              className=" mt-7 max-w-[620px] text-gray-700 text-lg xl:text-xl leading-relaxed font-nova ">
              Welcome back to COXIA — your AI-powered code security
              assistant for detecting vulnerabilities, understanding
              risks, and getting intelligent remediation guidance.
            </motion.p>


            {/* FEATURES */}

            <motion.div
              initial={{ opacity: 0,}}
              animate={{ opacity: 1,}}
              transition={{ delay: 0.8, duration: 0.7,}}
              className=" flex flex-wrap gap-3 mt-9">

              <div className=" flex items-center gap-2 px-4 py-2 rounded-3xl border border-gray-400 bg-white/[0.03] text-sm text-gray-600">
                <ShieldCheck size={15} className="text-purple-400"/> Vulnerability Detection
              </div>

              <div className=" flex items-center gap-2 px-4 py-2 rounded-3xl border border-gray-400 bg-white/[0.03] text-sm text-gray-600">
                <KeyRound size={15} className="text-blue-400"/> Explainable AI
              </div>

            </motion.div>

            {/* BOTTOM TEXT */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
                duration: 0.8,
              }}
              className="
                mt-12
                text-sm
                text-gray-600
                font-nova
              "
            >
              Detect vulnerabilities. Understand the cause. Secure the code.
            </motion.p>

          </motion.div>

        </div>


        {/* =========================================
            RIGHT LOGIN PANEL
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            min-h-screen
            flex
            items-center
            justify-center
            px-6
            py-12
            border-l
            border-white/[0.07]
          "
          style={{
            backgroundColor: "#0d0c11",
          }}
        >

          <div className="w-full max-w-[390px]">


            {/* MOBILE NOVA LOGO */}

            <div className="lg:hidden text-center mb-10">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-2xl
                  font-bold
                  font-nova
                "
              >

                <ShieldCheck className="text-purple-400" />

                NOVA

              </div>

            </div>


            {/* HEADING */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="text-center mb-8"
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  font-nova
                  tracking-tight
                "
              >
                Welcome back
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  text-gray-500
                  font-nova
                "
              >
                Sign in to continue to NOVA
              </p>

            </motion.div>


            {/* =========================================
                GITHUB BUTTON
            ========================================= */}

            <motion.button
              onClick={handleLogin}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
              }}
              whileHover={{
                scale: 1.015,
                borderColor: "rgba(168,85,247,0.45)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                group
                relative
                w-full
                h-[52px]
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                hover:bg-white/[0.07]
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-3
                text-sm
                font-medium
                font-nova
              "
            >

              <IoLogoGithub
                size={21}
                className="text-white"
              />

              <span>
                Continue with GitHub
              </span>


              <ArrowRight
                size={16}
                className="
                  absolute
                  right-4
                  opacity-0
                  -translate-x-2
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  transition-all
                  duration-300
                  text-purple-400
                "
              />

            </motion.button>


            {/* DIVIDER */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.6,
              }}
              className="
                flex
                items-center
                gap-4
                my-7
              "
            >

              <div className="h-px flex-1 bg-white/[0.08]" />

              <span
                className="
                  text-xs
                  text-gray-600
                  font-nova
                "
              >
                OR
              </span>

              <div className="h-px flex-1 bg-white/[0.08]" />

            </motion.div>


            {/* =========================================
                SSO BUTTON
            ========================================= */}

            <motion.button
              onClick={handleLogin}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
              }}
              whileHover={{
                scale: 1.015,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                w-full
                h-[52px]
                rounded-xl
                border
                border-white/10
                bg-white/[0.025]
                flex
                items-center
                justify-center
                gap-3
                text-sm
                text-gray-300
                font-medium
                font-nova
                transition-all
                duration-300
              "
            >

              <KeyRound
                size={18}
                className="text-purple-400"
              />

              Continue with Single Sign-On

            </motion.button>


            {/* =========================================
                TERMS
            ========================================= */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
              }}
              className="
                text-center
                text-[11px]
                leading-relaxed
                text-gray-600
                mt-20
                font-nova
              "
            >

              By continuing, you agree to NOVA's{" "}

              <Link
                to="/Terms_and_con"
                className="
                  text-purple-400
                  hover:text-purple-300
                "
              >
                Terms of Use
              </Link>

              {" "}and{" "}

              <Link
                to="/Privacy_Policy"
                className="
                  text-purple-400
                  hover:text-purple-300
                "
              >
                Privacy Policy
              </Link>

              .

            </motion.p>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default SignIn;