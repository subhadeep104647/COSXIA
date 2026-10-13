import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  Github,
  Search,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Send,
  Loader2,
  GitBranch,
  ArrowLeft,
  RefreshCw,
  Lock,
  Globe,
  FolderGit2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const NewChat = () => {
  // ---------------------------------------
  // MAIN MODE
  // ---------------------------------------
  const [mode, setMode] = useState("manual");

  // ---------------------------------------
  // MANUAL CODE
  // ---------------------------------------
  const [code, setCode] = useState("");

  // ---------------------------------------
  // GITHUB
  // ---------------------------------------
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [repoSearch, setRepoSearch] = useState("");

  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // ---------------------------------------
  // ANALYSIS
  // ---------------------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // ---------------------------------------
  // LOAD GITHUB REPOSITORIES
  // ---------------------------------------
  const loadRepositories = async () => {
    setLoadingRepos(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/github/repos`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load your GitHub repositories."
        );
      }

      const data = await response.json();

      setRepositories(data.repositories || []);
    } catch (err) {
      setError(
        err.message ||
          "Could not load your GitHub repositories."
      );
    } finally {
      setLoadingRepos(false);
    }
  };

  // ---------------------------------------
  // LOAD REPOSITORIES WHEN GITHUB TAB OPENS
  // ---------------------------------------
  useEffect(() => {
    if (mode === "github") {
      loadRepositories();
    }
  }, [mode]);

  // ---------------------------------------
  // SELECT REPOSITORY
  // ---------------------------------------
  const selectRepository = async (repo) => {
    setSelectedRepo(repo);
    setSelectedBranch(
      repo.defaultBranch || "main"
    );
    setBranches([]);
    setError("");

    setLoadingBranches(true);

    try {
      const owner =
        repo.owner ||
        repo.fullName?.split("/")[0];

      const repoName =
        repo.name ||
        repo.fullName?.split("/")[1];

      const response = await fetch(
        `${API_URL}/api/github/repos/${encodeURIComponent(
          owner
        )}/${encodeURIComponent(repoName)}/branches`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load repository branches."
        );
      }

      const data = await response.json();

      setBranches(data.branches || []);
    } catch (err) {
      setError(
        err.message ||
          "Could not load repository branches."
      );
    } finally {
      setLoadingBranches(false);
    }
  };

  // ---------------------------------------
  // CHANGE REPOSITORY
  // ---------------------------------------
  const changeRepository = () => {
    setSelectedRepo(null);
    setBranches([]);
    setSelectedBranch("main");
    setError("");
  };

  // ---------------------------------------
  // ANALYZE
  // ---------------------------------------
  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    // Manual validation
    if (mode === "manual" && !code.trim()) {
      setError(
        "Please enter some code before starting the analysis."
      );
      return;
    }

    // GitHub validation
    if (mode === "github" && !selectedRepo) {
      setError(
        "Please select a GitHub repository first."
      );
      return;
    }

    setLoading(true);

    try {
      const payload =
        mode === "manual"
          ? {
              source: "manual",
              code,
            }
          : {
              source: "github",
              repository: selectedRepo.fullName,
              repoId: selectedRepo.id,
              branch: selectedBranch,
            };

      const response = await fetch(
        `${API_URL}/api/analyze`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let message =
          "Unable to analyze the code.";

        try {
          const errorData =
            await response.json();

          message =
            errorData.message ||
            errorData.detail ||
            message;
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(message);
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Backend connection failed. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // FILTER REPOSITORIES
  // ---------------------------------------
  const filteredRepositories =
    repositories.filter((repo) => {
      const search =
        repoSearch.toLowerCase();

      return (
        repo.name
          ?.toLowerCase()
          .includes(search) ||
        repo.fullName
          ?.toLowerCase()
          .includes(search) ||
        repo.description
          ?.toLowerCase()
          .includes(search)
      );
    });

  // ---------------------------------------
  // RENDER
  // ---------------------------------------
  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#050507]
        text-white
        overflow-x-hidden
        md:ml-64
        md:w-[calc(100%-16rem)]
      "
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute
            top-[-250px]
            left-[30%]
            w-[500px]
            h-[500px]
            bg-purple-600/10
            blur-[150px]
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-[-250px]
            right-[10%]
            w-[500px]
            h-[500px]
            bg-blue-600/10
            blur-[150px]
            rounded-full
          "
        />
      </div>

      {/* =====================================
          CONTENT
      ====================================== */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6">

        {/* ===================================
            HEADER
        ==================================== */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-6
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck
                className="text-purple-400"
                size={20}
              />

              <h1
                className="
                  text-xl
                  sm:text-2xl
                  font-semibold
                  tracking-tight
                "
              >
                NOVA Security Analysis
              </h1>
            </div>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-1
              "
            >
              Secure your code with AI-powered
              vulnerability analysis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-emerald-400
                animate-pulse
              "
            />

            <span className="text-xs text-gray-400">
              NOVA Engine Ready
            </span>
          </div>
        </div>

        {/* ===================================
            MODE SELECTOR
        ==================================== */}
        <div className="flex items-center gap-2 mb-5">

          {/* MANUAL */}
          <button
            onClick={() => {
              setMode("manual");
              setResult(null);
              setError("");
            }}
            className={`
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-lg
              text-xs
              border
              transition-all
              ${
                mode === "manual"
                  ? `
                    bg-purple-500/15
                    border-purple-500/40
                    text-purple-300
                  `
                  : `
                    bg-white/[0.03]
                    border-white/[0.08]
                    text-gray-500
                    hover:text-gray-300
                  `
              }
            `}
          >
            <Code2 size={14} />

            Manual Code
          </button>

          {/* GITHUB */}
          <button
            onClick={() => {
              setMode("github");
              setResult(null);
              setError("");
            }}
            className={`
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-lg
              text-xs
              border
              transition-all
              ${
                mode === "github"
                  ? `
                    bg-purple-500/15
                    border-purple-500/40
                    text-purple-300
                  `
                  : `
                    bg-white/[0.03]
                    border-white/[0.08]
                    text-gray-500
                    hover:text-gray-300
                  `
              }
            `}
          >
            <Github size={14} />

            Git Repository
          </button>
        </div>

        {/* ===================================
            WORKSPACE
        ==================================== */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1fr)_380px]
            gap-4
          "
        >

          {/* =================================
              LEFT PANEL
          ================================== */}
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              min-w-0
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-xl
              overflow-hidden
            "
          >

            {/* PANEL HEADER */}
            <div
              className="
                h-12
                px-4
                flex
                items-center
                justify-between
                border-b
                border-white/[0.07]
              "
            >
              <div className="flex items-center gap-2">

                {mode === "manual" ? (
                  <Code2
                    size={15}
                    className="text-purple-400"
                  />
                ) : (
                  <Github
                    size={15}
                    className="text-purple-400"
                  />
                )}

                <span className="text-xs text-gray-300">
                  {mode === "manual"
                    ? "Code Input"
                    : "Import Git Repository"}
                </span>
              </div>

              <span className="text-[10px] text-gray-600">
                {mode === "manual"
                  ? "Manual Analysis"
                  : "GitHub"}
              </span>
            </div>

            {/* =================================
                MANUAL CODE
            ================================== */}
            {mode === "manual" && (
              <div className="p-4">

                <textarea
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                  placeholder={`// Paste your code here...

function login(username, password) {
    const query =
        "SELECT * FROM users WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'";

    return database.query(query);
}`}
                  className="
                    w-full
                    min-h-[430px]
                    resize-none
                    bg-[#07070a]
                    border
                    border-white/[0.06]
                    rounded-xl
                    p-4
                    text-sm
                    text-gray-300
                    font-mono
                    leading-6
                    outline-none
                    placeholder:text-gray-700
                    focus:border-purple-500/30
                    transition
                  "
                />

                {/* MANUAL ACTIONS */}
                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  {/* UPLOAD */}
                  <label
                    className="
                      cursor-pointer
                      flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-lg
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                      text-xs
                      text-gray-500
                      hover:text-gray-300
                      hover:bg-white/[0.05]
                      transition
                    "
                  >
                    <Upload size={14} />

                    Upload File

                    <input
                      type="file"
                      className="hidden"
                      accept="
                        .js,
                        .jsx,
                        .ts,
                        .tsx,
                        .py,
                        .java,
                        .cpp,
                        .c,
                        .php,
                        .go,
                        .rb,
                        .sql
                      "
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (!file) return;

                        const reader =
                          new FileReader();

                        reader.onload = (event) => {
                          setCode(
                            event.target
                              ?.result || ""
                          );
                        };

                        reader.readAsText(file);
                      }}
                    />
                  </label>

                  {/* ANALYZE */}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      bg-gradient-to-r
                      from-purple-600
                      to-blue-600
                      text-white
                      text-xs
                      font-medium
                      shadow-[0_0_25px_rgba(139,92,246,0.2)]
                      hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
                      hover:scale-[1.02]
                      active:scale-95
                      disabled:opacity-50
                      disabled:hover:scale-100
                      transition-all
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />

                        Analyzing
                      </>
                    ) : (
                      <>
                        <Send size={14} />

                        Analyze Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* =================================
                GITHUB IMPORT
            ================================== */}
            {mode === "github" && (
              <div className="p-5">

                {/* =================================
                    SELECTED REPOSITORY
                ================================== */}
                {selectedRepo ? (
                  <div>

                    {/* BACK / CHANGE */}
                    <button
                      onClick={
                        changeRepository
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-gray-500
                        hover:text-white
                        transition
                        mb-5
                      "
                    >
                      <ArrowLeft size={14} />

                      All repositories
                    </button>

                    {/* SELECTED REPO CARD */}
                    <div
                      className="
                        rounded-xl
                        border
                        border-purple-500/20
                        bg-purple-500/[0.04]
                        p-4
                        mb-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            min-w-0
                          "
                        >
                          <div
                            className="
                              w-10
                              h-10
                              rounded-lg
                              bg-purple-500/10
                              border
                              border-purple-500/20
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >
                            <FolderGit2
                              size={18}
                              className="text-purple-400"
                            />
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                text-sm
                                text-gray-200
                                truncate
                              "
                            >
                              {selectedRepo.name}
                            </p>

                            <p
                              className="
                                text-[11px]
                                text-gray-600
                                truncate
                                mt-1
                              "
                            >
                              {selectedRepo.fullName}
                            </p>
                          </div>
                        </div>

                        <span
                          className="
                            text-[10px]
                            text-emerald-400
                            whitespace-nowrap
                          "
                        >
                          Selected
                        </span>
                      </div>
                    </div>

                    {/* BRANCH */}
                    <label
                      className="
                        block
                        text-xs
                        text-gray-400
                        mb-2
                      "
                    >
                      <span className="flex items-center gap-2">
                        <GitBranch size={13} />

                        Branch
                      </span>
                    </label>

                    <div className="relative mb-5">

                      <select
                        value={selectedBranch}
                        onChange={(e) =>
                          setSelectedBranch(
                            e.target.value
                          )
                        }
                        disabled={
                          loadingBranches
                        }
                        className="
                          appearance-none
                          w-full
                          bg-[#07070a]
                          border
                          border-white/[0.07]
                          rounded-xl
                          px-4
                          py-3
                          text-sm
                          text-gray-300
                          outline-none
                          focus:border-purple-500/30
                        "
                      >
                        {loadingBranches ? (
                          <option>
                            Loading branches...
                          </option>
                        ) : branches.length >
                          0 ? (
                          branches.map(
                            (branch) => (
                              <option
                                key={
                                  branch.name
                                }
                                value={
                                  branch.name
                                }
                              >
                                {branch.name}
                              </option>
                            )
                          )
                        ) : (
                          <option
                            value={
                              selectedBranch
                            }
                          >
                            {selectedBranch}
                          </option>
                        )}
                      </select>

                      <GitBranch
                        size={14}
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-600
                          pointer-events-none
                        "
                      />
                    </div>

                    {/* REPOSITORY INFO */}
                    <div
                      className="
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-white/[0.02]
                        p-4
                        mb-5
                      "
                    >
                      <div className="flex gap-3">

                        {selectedRepo.private ? (
                          <Lock
                            size={16}
                            className="text-gray-500 mt-0.5"
                          />
                        ) : (
                          <Globe
                            size={16}
                            className="text-gray-500 mt-0.5"
                          />
                        )}

                        <div>
                          <p className="text-xs text-gray-300">
                            {selectedRepo.private
                              ? "Private repository"
                              : "Public repository"}
                          </p>

                          <p
                            className="
                              text-[11px]
                              text-gray-600
                              mt-1
                              leading-5
                            "
                          >
                            NOVA will use your connected
                            GitHub access to read the
                            selected repository and analyze
                            its source code.
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* IMPORT BUTTON */}
                    <button
                      onClick={
                        handleAnalyze
                      }
                      disabled={
                        loading ||
                        loadingBranches ||
                        !selectedRepo
                      }
                      className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-purple-600
                        to-blue-600
                        text-sm
                        font-medium
                        shadow-[0_0_25px_rgba(139,92,246,0.2)]
                        hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
                        hover:scale-[1.01]
                        active:scale-95
                        disabled:opacity-50
                        disabled:hover:scale-100
                        transition-all
                      "
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />

                          Importing Repository...
                        </>
                      ) : (
                        <>
                          <Github size={16} />

                          Import Repository
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* =================================
                     REPOSITORY LIST
                  ================================== */
                  <div>

                    {/* GITHUB HEADER */}
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mb-5
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
                            bg-white/[0.05]
                            border
                            border-white/[0.08]
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Github
                            size={19}
                            className="text-white"
                          />
                        </div>

                        <div>
                          <p className="text-sm text-gray-200">
                            Import from GitHub
                          </p>

                          <p
                            className="
                              text-[11px]
                              text-emerald-400
                              mt-1
                            "
                          >
                            GitHub connected
                          </p>
                        </div>
                      </div>

                      {/* REFRESH */}
                      <button
                        onClick={
                          loadRepositories
                        }
                        disabled={
                          loadingRepos
                        }
                        title="Refresh repositories"
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          text-gray-500
                          hover:text-white
                          hover:bg-white/[0.06]
                          transition
                        "
                      >
                        <RefreshCw
                          size={14}
                          className={
                            loadingRepos
                              ? "animate-spin"
                              : ""
                          }
                        />
                      </button>
                    </div>

                    {/* SEARCH */}
                    <div className="relative mb-4">

                      <Search
                        size={15}
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-gray-600
                        "
                      />

                      <input
                        value={repoSearch}
                        onChange={(e) =>
                          setRepoSearch(
                            e.target.value
                          )
                        }
                        placeholder="Search repositories..."
                        className="
                          w-full
                          bg-[#07070a]
                          border
                          border-white/[0.07]
                          rounded-xl
                          py-3
                          pl-10
                          pr-4
                          text-sm
                          text-gray-300
                          outline-none
                          placeholder:text-gray-700
                          focus:border-purple-500/30
                        "
                      />
                    </div>

                    {/* REPOSITORIES */}
                    <div
                      className="
                        space-y-2
                        max-h-[430px]
                        overflow-y-auto
                        pr-1
                      "
                    >
                      {loadingRepos ? (
                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            py-20
                          "
                        >
                          <Loader2
                            size={24}
                            className="
                              text-purple-400
                              animate-spin
                              mb-3
                            "
                          />

                          <p className="text-xs text-gray-500">
                            Loading your repositories...
                          </p>
                        </div>
                      ) : filteredRepositories.length >
                        0 ? (
                        filteredRepositories.map(
                          (repo) => (
                            <button
                              key={repo.id}
                              onClick={() =>
                                selectRepository(
                                  repo
                                )
                              }
                              className="
                                w-full
                                text-left
                                p-4
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-white/[0.02]
                                hover:bg-purple-500/[0.06]
                                hover:border-purple-500/20
                                transition-all
                                group
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-3
                                    min-w-0
                                  "
                                >
                                  <div
                                    className="
                                      w-9
                                      h-9
                                      rounded-lg
                                      bg-white/[0.04]
                                      border
                                      border-white/[0.06]
                                      flex
                                      items-center
                                      justify-center
                                      shrink-0
                                    "
                                  >
                                    <Github
                                      size={16}
                                      className="
                                        text-gray-500
                                        group-hover:text-purple-400
                                        transition
                                      "
                                    />
                                  </div>

                                  <div className="min-w-0">

                                    <div className="flex items-center gap-2">
                                      <p
                                        className="
                                          text-sm
                                          text-gray-200
                                          truncate
                                        "
                                      >
                                        {repo.name}
                                      </p>

                                      {repo.private && (
                                        <Lock
                                          size={11}
                                          className="text-gray-600 shrink-0"
                                        />
                                      )}
                                    </div>

                                    <p
                                      className="
                                        text-[11px]
                                        text-gray-600
                                        mt-1
                                        truncate
                                      "
                                    >
                                      {repo.fullName}
                                    </p>

                                    {repo.description && (
                                      <p
                                        className="
                                          text-[10px]
                                          text-gray-700
                                          mt-1
                                          truncate
                                        "
                                      >
                                        {
                                          repo.description
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <span
                                  className="
                                    text-[11px]
                                    text-purple-400
                                    opacity-0
                                    group-hover:opacity-100
                                    transition
                                    whitespace-nowrap
                                  "
                                >
                                  Import →
                                </span>
                              </div>
                            </button>
                          )
                        )
                      ) : (
                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            py-16
                            text-center
                          "
                        >
                          <FolderGit2
                            size={24}
                            className="
                              text-gray-700
                              mb-3
                            "
                          />

                          <p className="text-xs text-gray-500">
                            No repositories found
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-700
                              mt-1
                            "
                          >
                            Try another search.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.section>

          {/* =================================
              RIGHT ANALYSIS PANEL
          ================================== */}
          <motion.section
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              min-w-0
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              backdrop-blur-xl
              overflow-hidden
              min-h-[500px]
            "
          >

            {/* ANALYSIS HEADER */}
            <div
              className="
                h-12
                px-4
                flex
                items-center
                justify-between
                border-b
                border-white/[0.07]
              "
            >
              <div className="flex items-center gap-2">

                <Sparkles
                  size={15}
                  className="text-purple-400"
                />

                <span className="text-xs text-gray-300">
                  Security Analysis
                </span>
              </div>

              {result && (
                <span className="text-[10px] text-emerald-400">
                  Analysis Complete
                </span>
              )}
            </div>

            {/* =================================
                ERROR
            ================================== */}
            {error && (
              <div
                className="
                  m-4
                  p-4
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/[0.05]
                "
              >
                <div className="flex gap-3">

                  <AlertTriangle
                    size={18}
                    className="
                      text-red-400
                      shrink-0
                    "
                  />

                  <div>
                    <p className="text-sm text-red-300">
                      Something went wrong
                    </p>

                    <p
                      className="
                        text-xs
                        text-red-400/70
                        mt-1
                        leading-5
                      "
                    >
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =================================
                LOADING
            ================================== */}
            {loading && (
              <div
                className="
                  min-h-[450px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  px-6
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-purple-500/10
                    border
                    border-purple-500/20
                    flex
                    items-center
                    justify-center
                    mb-4
                  "
                >
                  <Loader2
                    size={22}
                    className="
                      text-purple-400
                      animate-spin
                    "
                  />
                </div>

                <p className="text-sm text-gray-300">
                  NOVA is analyzing your code
                </p>

                <p
                  className="
                    text-xs
                    text-gray-600
                    mt-2
                    max-w-xs
                    leading-5
                  "
                >
                  Detecting vulnerabilities and
                  generating security explanations...
                </p>
              </div>
            )}

            {/* =================================
                EMPTY
            ================================== */}
            {!loading &&
              !result &&
              !error && (
                <div
                  className="
                    min-h-[450px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-6
                  "
                >
                  <div
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-purple-500/10
                      border
                      border-purple-500/20
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >
                    <Search
                      size={20}
                      className="text-purple-400"
                    />
                  </div>

                  <h3 className="text-sm font-medium text-gray-300">
                    Ready to Analyze
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-600
                      mt-2
                      max-w-xs
                      leading-5
                    "
                  >
                    Paste your code or import a GitHub
                    repository to start NOVA's security
                    analysis.
                  </p>
                </div>
              )}

            {/* =================================
                RESULT
            ================================== */}
            {!loading && result && (
              <div className="p-4 space-y-4">

                {/* SUMMARY */}
                <div
                  className="
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      mb-3
                    "
                  >
                    <span className="text-xs text-gray-500">
                      Security Summary
                    </span>

                    {result.riskLevel && (
                      <span
                        className={`
                          px-2.5
                          py-1
                          rounded-md
                          text-[10px]
                          font-medium
                          ${
                            result.riskLevel
                              .toLowerCase() ===
                            "high"
                              ? `
                                bg-red-500/10
                                text-red-400
                                border
                                border-red-500/20
                              `
                              : result.riskLevel
                                  .toLowerCase() ===
                                "medium"
                              ? `
                                bg-yellow-500/10
                                text-yellow-400
                                border
                                border-yellow-500/20
                              `
                              : `
                                bg-emerald-500/10
                                text-emerald-400
                                border
                                border-emerald-500/20
                              `
                          }
                        `}
                      >
                        {result.riskLevel}
                      </span>
                    )}
                  </div>

                  <p
                    className="
                      text-sm
                      text-gray-300
                      leading-6
                    "
                  >
                    {result.summary ||
                      "Analysis completed successfully."}
                  </p>
                </div>

                {/* VULNERABILITIES */}
                {Array.isArray(
                  result.vulnerabilities
                ) &&
                  result.vulnerabilities.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="
                          rounded-xl
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >
                          <div>
                            <h4 className="text-sm text-gray-200">
                              {item.title ||
                                "Security Vulnerability"}
                            </h4>

                            {item.line && (
                              <p
                                className="
                                  text-[10px]
                                  text-gray-600
                                  mt-1
                                "
                              >
                                Line {item.line}
                              </p>
                            )}
                          </div>

                          <span
                            className="
                              text-[10px]
                              text-red-400
                              bg-red-500/10
                              border
                              border-red-500/20
                              px-2
                              py-1
                              rounded-md
                              whitespace-nowrap
                            "
                          >
                            {item.severity ||
                              "Unknown"}
                          </span>
                        </div>

                        {item.description && (
                          <p
                            className="
                              text-xs
                              text-gray-500
                              leading-5
                              mt-3
                            "
                          >
                            {item.description}
                          </p>
                        )}

                        {item.recommendation && (
                          <div
                            className="
                              mt-3
                              p-3
                              rounded-lg
                              bg-purple-500/[0.04]
                              border
                              border-purple-500/10
                            "
                          >
                            <p
                              className="
                                text-[10px]
                                text-purple-400
                                mb-1
                              "
                            >
                              Recommendation
                            </p>

                            <p
                              className="
                                text-xs
                                text-gray-400
                                leading-5
                              "
                            >
                              {
                                item.recommendation
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  )}

                {/* SUGGESTED FIX */}
                {result.suggestedFix && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-emerald-500/10
                      bg-emerald-500/[0.03]
                      p-4
                    "
                  >
                    <div className="flex items-center gap-2 mb-3">

                      <CheckCircle2
                        size={15}
                        className="text-emerald-400"
                      />

                      <span className="text-xs text-emerald-400">
                        Suggested Fix
                      </span>
                    </div>

                    <pre
                      className="
                        text-xs
                        text-gray-400
                        whitespace-pre-wrap
                        overflow-x-auto
                        font-mono
                        leading-5
                      "
                    >
                      {result.suggestedFix}
                    </pre>
                  </div>
                )}

                {/* SECURE CODE */}
                {result.secureCode && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-[#07070a]
                      p-4
                    "
                  >
                    <p
                      className="
                        text-xs
                        text-gray-500
                        mb-3
                      "
                    >
                      Secure Code
                    </p>

                    <pre
                      className="
                        text-xs
                        text-gray-400
                        whitespace-pre-wrap
                        overflow-x-auto
                        font-mono
                        leading-5
                      "
                    >
                      {result.secureCode}
                    </pre>
                  </div>
                )}

                {/* PLAIN TEXT RESPONSE */}
                {result.message && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-white/[0.02]
                      p-4
                    "
                  >
                    <p
                      className="
                        text-xs
                        text-gray-400
                        leading-6
                        whitespace-pre-wrap
                      "
                    >
                      {result.message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default NewChat;