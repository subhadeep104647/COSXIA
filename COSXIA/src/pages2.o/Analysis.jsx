import React, { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  GitBranch,
  Github,
  FileCode2,
  Bug,
  BrainCircuit,
  RefreshCw,
  ChevronRight,
  Activity,
  Lock,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";


// =====================================================
// DEMO DATA
// Used only when backend analysis data is not available.
// Replace this with your real backend response.
// =====================================================

const demoAnalysis = {
  repository: {
    name: "NOVA",
    fullName: "Subhadeep/NOVA",
    branch: "main",
  },

  summary:
    "The repository contains several security-sensitive patterns that should be reviewed before production deployment.",

  securityScore: 72,

  status: "Completed",

  analyzedFiles: 28,

  analysisTime: "4.8s",

  vulnerabilities: [
    {
      id: 1,
      title: "SQL Injection",
      severity: "Critical",
      file: "auth/login.js",
      line: 18,
      description:
        "User-controlled input is directly concatenated into a SQL query.",
      recommendation:
        "Use parameterized queries or prepared statements instead of string concatenation.",
      category: "Injection",
    },

    {
      id: 2,
      title: "Hardcoded Secret",
      severity: "High",
      file: "config/database.js",
      line: 11,
      description:
        "A database credential appears to be stored directly inside the source code.",
      recommendation:
        "Move credentials into environment variables or a secure secrets manager.",
      category: "Secrets",
    },

    {
      id: 3,
      title: "Cross-Site Scripting",
      severity: "High",
      file: "components/Profile.jsx",
      line: 42,
      description:
        "User-controlled content may be rendered without sufficient sanitization.",
      recommendation:
        "Sanitize untrusted HTML and avoid unsafe DOM rendering APIs.",
      category: "XSS",
    },

    {
      id: 4,
      title: "Weak Password Validation",
      severity: "Medium",
      file: "utils/validation.js",
      line: 27,
      description:
        "Password validation does not enforce sufficient complexity requirements.",
      recommendation:
        "Implement stronger password requirements and enforce server-side validation.",
      category: "Authentication",
    },

    {
      id: 5,
      title: "Missing Security Headers",
      severity: "Low",
      file: "server/index.js",
      line: 64,
      description:
        "Recommended HTTP security headers are not configured.",
      recommendation:
        "Configure appropriate Content-Security-Policy and other security headers.",
      category: "Configuration",
    },
  ],

  llmAnalysis: {
    explanation:
      "The highest-risk issue is the SQL injection vulnerability because attacker-controlled input reaches the database query without parameterization. The hardcoded credential is also important because source-code exposure could compromise the database.",
    priority:
      "Fix the Critical SQL Injection issue first, followed by the hardcoded secret and XSS vulnerability.",
  },
};


// =====================================================
// HELPERS
// =====================================================

const severityConfig = {
  Critical: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    bar: "bg-red-500",
  },

  High: {
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    bar: "bg-orange-500",
  },

  Medium: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    bar: "bg-yellow-500",
  },

  Low: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    bar: "bg-blue-500",
  },
};


const SeverityIcon = ({ severity }) => {
  if (severity === "Critical") {
    return <ShieldAlert size={17} />;
  }

  if (severity === "High") {
    return <AlertTriangle size={17} />;
  }

  if (severity === "Medium") {
    return <AlertCircle size={17} />;
  }

  return <Activity size={17} />;
};


// =====================================================
// ANALYSIS PAGE
// =====================================================

const Analysis = () => {

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD ANALYSIS
  // =====================================================

  useEffect(() => {

    const loadAnalysis = async () => {

      try {

        // -------------------------------------------------
        // OPTION 1:
        // Read result saved by NewChat.jsx
        // -------------------------------------------------

        const savedResult =
          localStorage.getItem("nova_analysis_result");

        if (savedResult) {

          const parsedResult = JSON.parse(savedResult);

          setAnalysis(parsedResult);

          setLoading(false);

          return;
        }


        // -------------------------------------------------
        // OPTION 2:
        // Backend endpoint
        //
        // Change this URL when your backend is ready.
        // -------------------------------------------------

        const API_URL =
          import.meta.env.VITE_API_URL ||
          "http://localhost:8000";


        try {

          const response = await fetch(
            `${API_URL}/api/analysis/latest`,
            {
              credentials: "include",
            }
          );


          if (response.ok) {

            const data = await response.json();

            setAnalysis(data);

            setLoading(false);

            return;
          }

        } catch (backendError) {

          console.log(
            "Backend analysis endpoint unavailable."
          );

        }


        // -------------------------------------------------
        // DEMO DATA
        // -------------------------------------------------

        setAnalysis(demoAnalysis);

      } catch (error) {

        console.error(
          "Failed to load analysis:",
          error
        );

        setAnalysis(demoAnalysis);

      } finally {

        setLoading(false);

      }

    };


    loadAnalysis();

  }, []);


  // =====================================================
  // COUNTS
  // =====================================================

  const counts = useMemo(() => {

    const vulnerabilities =
      analysis?.vulnerabilities || [];

    return {
      Critical: vulnerabilities.filter(
        (item) => item.severity === "Critical"
      ).length,

      High: vulnerabilities.filter(
        (item) => item.severity === "High"
      ).length,

      Medium: vulnerabilities.filter(
        (item) => item.severity === "Medium"
      ).length,

      Low: vulnerabilities.filter(
        (item) => item.severity === "Low"
      ).length,
    };

  }, [analysis]);


  // =====================================================
  // TOTAL
  // =====================================================

  const totalVulnerabilities =
    counts.Critical +
    counts.High +
    counts.Medium +
    counts.Low;


  // =====================================================
  // REFRESH
  // =====================================================

  const refreshAnalysis = () => {

    window.location.reload();

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <main
        className="
          min-h-screen
          w-full
          px-5
          md:px-8
          py-8
          text-white
        "
      >

        <div className="max-w-7xl mx-auto">

          <div
            className="
              animate-pulse
              h-8
              w-64
              rounded-lg
              bg-white/[0.06]
            "
          />

          <div
            className="
              mt-3
              animate-pulse
              h-4
              w-96
              max-w-full
              rounded
              bg-white/[0.04]
            "
          />

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-4
              mt-8
            "
          >

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="
                  h-28
                  rounded-2xl
                  bg-white/[0.04]
                  animate-pulse
                "
              />

            ))}

          </div>

        </div>

      </main>
    );

  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <main
      className="
        min-h-screen
        w-full
        px-5
        md:px-8
        py-7
        text-white
        relative
      "
    >

      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[300px]
          bg-purple-600/[0.08]
          blur-[120px]
          rounded-full
        "
      />


      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
        "
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-purple-500/10
                  border
                  border-purple-400/20
                  text-purple-400
                "
              >

                <ShieldCheck size={21} />

              </div>


              <div>

                <h1
                  className="
                    text-2xl
                    md:text-3xl
                    font-semibold
                    tracking-tight
                  "
                >
                  Security Analysis
                </h1>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  AI-powered vulnerability analysis
                  of your repository.
                </p>

              </div>

            </div>

          </div>


          {/* Repository */}

          <div
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              bg-white/[0.035]
              backdrop-blur-2xl
              border
              border-white/[0.07]
            "
          >

            <Github
              size={20}
              className="text-gray-300"
            />

            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-white
                "
              >
                {analysis?.repository?.fullName ||
                  analysis?.repository?.name ||
                  "Git Repository"}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  text-gray-500
                  mt-1
                "
              >

                <GitBranch size={12} />

                {analysis?.repository?.branch ||
                  "main"}

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            STATUS BAR
        ================================================= */}

        <div
          className="
            mt-7
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-emerald-500/10
              border
              border-emerald-500/15
              text-emerald-400
              text-xs
            "
          >

            <CheckCircle2 size={14} />

            Analysis Completed

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.06]
              text-gray-400
              text-xs
            "
          >

            <FileCode2 size={14} />

            {analysis?.analyzedFiles || 0}
            {" "}
            files analyzed

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.06]
              text-gray-400
              text-xs
            "
          >

            <Clock3 size={14} />

            {analysis?.analysisTime || "--"}

          </div>


          <button
            onClick={refreshAnalysis}
            className="
              ml-auto
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.06]
              text-gray-400
              text-xs
              hover:text-white
              hover:bg-white/[0.07]
              transition
            "
          >

            <RefreshCw size={14} />

            Refresh

          </button>

        </div>


        {/* =================================================
            TOP CARDS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
            mt-5
          "
        >


          {/* SECURITY SCORE */}

          <div
            className="
              rounded-2xl
              bg-white/[0.035]
              backdrop-blur-2xl
              border
              border-white/[0.07]
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span
                className="
                  text-sm
                  text-gray-400
                "
              >
                Security Score
              </span>

              <ShieldCheck
                size={18}
                className="text-purple-400"
              />

            </div>


            <div
              className="
                mt-4
                flex
                items-end
                gap-2
              "
            >

              <span
                className="
                  text-3xl
                  font-semibold
                "
              >
                {analysis?.securityScore ?? 0}
              </span>

              <span
                className="
                  text-gray-500
                  text-sm
                  mb-1
                "
              >
                / 100
              </span>

            </div>


            <div
              className="
                mt-4
                h-1.5
                rounded-full
                bg-white/[0.06]
                overflow-hidden
              "
            >

              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-blue-500
                "
                style={{
                  width: `${analysis?.securityScore || 0}%`,
                }}
              />

            </div>

          </div>


          {/* CRITICAL */}

          <SeverityCard
            title="Critical"
            count={counts.Critical}
            icon={<ShieldAlert size={18} />}
          />


          {/* HIGH */}

          <SeverityCard
            title="High"
            count={counts.High}
            icon={<AlertTriangle size={18} />}
          />


          {/* TOTAL */}

          <div
            className="
              rounded-2xl
              bg-white/[0.035]
              backdrop-blur-2xl
              border
              border-white/[0.07]
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span
                className="
                  text-sm
                  text-gray-400
                "
              >
                Total Findings
              </span>

              <Bug
                size={18}
                className="text-purple-400"
              />

            </div>


            <p
              className="
                mt-4
                text-3xl
                font-semibold
              "
            >
              {totalVulnerabilities}
            </p>

            <p
              className="
                text-xs
                text-gray-500
                mt-1
              "
            >
              Security findings
            </p>

          </div>

        </div>


        {/* =================================================
            GRAPH + AI SUMMARY
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
            mt-5
          "
        >


          {/* VULNERABILITY GRAPH */}

          <div
            className="
              rounded-2xl
              bg-white/[0.035]
              backdrop-blur-2xl
              border
              border-white/[0.07]
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-6
              "
            >

              <div>

                <h2
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  Vulnerability Distribution
                </h2>

                <p
                  className="
                    text-xs
                    text-gray-500
                    mt-1
                  "
                >
                  Findings by severity
                </p>

              </div>

              <Activity
                size={18}
                className="text-purple-400"
              />

            </div>


            <div className="space-y-5">

              {Object.entries(counts).map(
                ([severity, count]) => {

                  const maxCount =
                    Math.max(
                      ...Object.values(counts),
                      1
                    );

                  const percentage =
                    (count / maxCount) * 100;

                  const config =
                    severityConfig[severity];

                  return (

                    <div key={severity}>

                      <div
                        className="
                          flex
                          justify-between
                          items-center
                          mb-2
                        "
                      >

                        <div
                          className={`
                            flex
                            items-center
                            gap-2
                            text-xs
                            ${config.text}
                          `}
                        >

                          <SeverityIcon
                            severity={severity}
                          />

                          {severity}

                        </div>

                        <span
                          className="
                            text-xs
                            text-gray-400
                          "
                        >
                          {count}
                        </span>

                      </div>


                      <div
                        className="
                          h-2
                          w-full
                          rounded-full
                          bg-white/[0.05]
                          overflow-hidden
                        "
                      >

                        <div
                          className={`
                            h-full
                            rounded-full
                            ${config.bar}
                            transition-all
                            duration-700
                          `}
                          style={{
                            width:
                              count === 0
                                ? "0%"
                                : `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>


          {/* AI SUMMARY */}

          <div
            className="
              rounded-2xl
              bg-white/[0.035]
              backdrop-blur-2xl
              border
              border-white/[0.07]
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-purple-500/10
                  text-purple-400
                "
              >

                <BrainCircuit size={19} />

              </div>

              <div>

                <h2
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  AI Security Summary
                </h2>

                <p
                  className="
                    text-xs
                    text-gray-500
                    mt-1
                  "
                >
                  LLM-generated security assessment
                </p>

              </div>

            </div>


            <p
              className="
                mt-5
                text-sm
                leading-7
                text-gray-400
              "
            >
              {analysis?.summary ||
                "No security summary available."}
            </p>


            <div
              className="
                mt-5
                p-4
                rounded-xl
                bg-purple-500/[0.06]
                border
                border-purple-500/[0.12]
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-purple-400
                  text-xs
                  font-medium
                "
              >

                <Sparkles size={14} />

                AI Priority

              </div>


              <p
                className="
                  mt-2
                  text-xs
                  leading-6
                  text-gray-400
                "
              >
                {analysis?.llmAnalysis?.priority ||
                  "Prioritize the highest-severity findings first."}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            VULNERABILITIES
        ================================================= */}

        <div className="mt-5">

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >

            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                Vulnerabilities
              </h2>

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                Security issues detected by NOVA
              </p>

            </div>


            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-gray-500
              "
            >

              <Search size={14} />

              {totalVulnerabilities} findings

            </div>

          </div>


          <div className="space-y-3">

            {analysis?.vulnerabilities?.map(
              (vulnerability) => {

                const config =
                  severityConfig[
                    vulnerability.severity
                  ] || severityConfig.Low;

                return (

                  <div
                    key={vulnerability.id}
                    className="
                      rounded-2xl
                      bg-white/[0.035]
                      backdrop-blur-2xl
                      border
                      border-white/[0.07]
                      p-5
                      hover:bg-white/[0.055]
                      transition-all
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-start
                        gap-4
                      "
                    >

                      {/* ICON */}

                      <div
                        className={`
                          w-10
                          h-10
                          shrink-0
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          ${config.bg}
                          ${config.text}
                          ${config.border}
                          border
                        `}
                      >

                        <SeverityIcon
                          severity={
                            vulnerability.severity
                          }
                        />

                      </div>


                      {/* CONTENT */}

                      <div className="flex-1 min-w-0">

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >

                          <h3
                            className="
                              text-sm
                              font-semibold
                              text-white
                            "
                          >
                            {vulnerability.title}
                          </h3>


                          <span
                            className={`
                              px-2
                              py-1
                              rounded-md
                              text-[10px]
                              font-medium
                              ${config.bg}
                              ${config.text}
                              border
                              ${config.border}
                            `}
                          >
                            {vulnerability.severity}
                          </span>

                        </div>


                        {/* FILE */}

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                            mt-2
                            text-xs
                            text-gray-500
                          "
                        >

                          <FileCode2 size={13} />

                          <span>
                            {vulnerability.file}
                          </span>

                          <span>
                            :
                          </span>

                          <span>
                            Line {vulnerability.line}
                          </span>

                          <span>
                            •
                          </span>

                          <span>
                            {vulnerability.category}
                          </span>

                        </div>


                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-4
                            text-sm
                            leading-6
                            text-gray-400
                          "
                        >
                          {vulnerability.description}
                        </p>


                        {/* RECOMMENDATION */}

                        <div
                          className="
                            mt-4
                            rounded-xl
                            bg-black/20
                            p-4
                          "
                        >

                          <div
                            className="
                              text-xs
                              font-medium
                              text-gray-300
                            "
                          >
                            Recommended Fix
                          </div>

                          <p
                            className="
                              mt-2
                              text-xs
                              leading-6
                              text-gray-500
                            "
                          >
                            {vulnerability.recommendation}
                          </p>

                        </div>

                      </div>


                      <ChevronRight
                        size={18}
                        className="
                          hidden
                          lg:block
                          text-gray-700
                          mt-2
                        "
                      />

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </div>


        {/* =================================================
            LLM EXPLANATION
        ================================================= */}

        <div
          className="
            mt-5
            rounded-2xl
            bg-gradient-to-br
            from-purple-500/[0.08]
            to-blue-500/[0.04]
            backdrop-blur-2xl
            border
            border-purple-400/[0.12]
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                bg-purple-500/10
                text-purple-400
              "
            >

              <BrainCircuit size={21} />

            </div>


            <div>

              <h2
                className="
                  text-sm
                  font-semibold
                "
              >
                NOVA LLM Analysis
              </h2>

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                Explainable security intelligence
              </p>

            </div>

          </div>


          <p
            className="
              mt-5
              text-sm
              leading-7
              text-gray-400
            "
          >
            {analysis?.llmAnalysis?.explanation ||
              "The LLM analysis will appear here after the repository is processed."}
          </p>

        </div>


        {/* =================================================
            SECURITY FOOTNOTE
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-[11px]
            text-gray-600
          "
        >

          <Lock size={12} />

          Repository analysis is processed through
          NOVA's secure analysis pipeline.

        </div>

      </div>

    </main>

  );
};


// =====================================================
// SEVERITY CARD
// =====================================================

const SeverityCard = ({
  title,
  count,
  icon,
}) => {

  const config =
    severityConfig[title];

  return (

    <div
      className="
        rounded-2xl
        bg-white/[0.035]
        backdrop-blur-2xl
        border
        border-white/[0.07]
        p-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <span
          className="
            text-sm
            text-gray-400
          "
        >
          {title}
        </span>

        <div
          className={`
            ${config.text}
          `}
        >
          {icon}
        </div>

      </div>


      <p
        className="
          mt-4
          text-3xl
          font-semibold
        "
      >
        {count}
      </p>


      <p
        className="
          text-xs
          text-gray-500
          mt-1
        "
      >
        {title.toLowerCase()} findings
      </p>

    </div>

  );

};


export default Analysis;