import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { IoLogoGithub, IoLocationOutline, IoLinkOutline, IoMailOutline, IoCalendarOutline, IoPeopleOutline, IoGitBranchOutline, IoStarOutline, IoGitCommitOutline, IoCreateOutline, IoBookOutline, IoFolderOutline, IoChevronForwardOutline, IoRefreshOutline, IoShieldCheckmarkOutline, IoWarningOutline, IoBugOutline, IoScanOutline, IoSparklesOutline, IoTimeOutline, IoCodeSlashOutline, IoTrendingUpOutline, IoDocumentTextOutline, IoCheckmarkCircleOutline, IoLockClosedOutline,} from "react-icons/io5";

import Profile_Pic from "../components/header/Profile_Pic";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const [novaStats, setNovaStats] = useState(null);
  const [novaActivity, setNovaActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [novaLoading, setNovaLoading] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);

  const [githubConnected, setGithubConnected] = useState(false);
  const [githubError, setGithubError] = useState("");

  /* LOAD GITHUB PROFILE */

  const loadGithubProfile = async () => {
    setGithubLoading(true);
    setGithubError("");

    try {
      const response = await fetch(
        `${API_URL}/api/github/profile`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      /* 401 / 403 means the user is simply not connected. This must NOT break the NOVA profile.*/
      if (response.status === 401 || response.status === 403) {
        setProfile(null);
        setGithubConnected(false);
        return false;
      }

      if (!response.ok) {
        throw new Error(
          `GitHub profile request failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (
        data &&
        (data.login ||
          data.username ||
          data.id ||
          data.node_id)
      ) {
        setProfile(data);
        setGithubConnected(true);
        return true;
      }

      setProfile(null);
      setGithubConnected(false);

      return false;
    } catch (error) {
      console.warn("GitHub profile unavailable:", error);

      setProfile(null);
      setGithubConnected(false);

      setGithubError(
        "GitHub is not connected or could not be reached."
      );

      return false;
    } finally {
      setGithubLoading(false);
    }
  };

  /* LOAD GITHUB REPOSITORIES */

  const loadGithubRepositories = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/github/repos`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        setRepositories([]);
        return;
      }

      if (!response.ok) {
        throw new Error(
          `GitHub repository request failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setRepositories(data);
      } else if (Array.isArray(data?.repositories)) {
        setRepositories(data.repositories);
      } else if (Array.isArray(data?.repos)) {
        setRepositories(data.repos);
      } else {
        setRepositories([]);
      }
    } catch (error) {
      console.warn("GitHub repositories unavailable:", error);
      setRepositories([]);
    }
  };

  /* LOAD NOVA DATA */

  const loadNovaData = async () => {
    setNovaLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/nova/profile/stats`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `NOVA profile request failed: ${response.status}`
        );
      }

      const data = await response.json();

      setNovaStats(data || {});

      const activity =
        data?.activity ||
        data?.recentActivity ||
        data?.recent_activity ||
        [];

      setNovaActivity(
        Array.isArray(activity) ? activity : []
      );
    } catch (error) {
      console.warn("NOVA profile data unavailable:", error);

      /* Empty fallback keeps the profile usable even when, the backend has no security statistics yet.*/
      setNovaStats({
        analyses: 0,
        vulnerabilities: 0,
        repositoriesScanned: 0,
        securityScore: 0,
        fixesSuggested: 0,
        projects: 0,
        notebookPages: 0,
        activity: [],
      });

      setNovaActivity([]);
    } finally {
      setNovaLoading(false);
    }
  };

  /* LOAD EVERYTHING */

  const loadAllData = async () => {
    setLoading(true);

    try {
      /* NOVA and GitHub are intentionally loaded independently.If GitHub is not connected, NOVA still works.*/
      const githubConnectedResult =
        await loadGithubProfile();

      if (githubConnectedResult) {
        await loadGithubRepositories();
      } else {
        setRepositories([]);
      }

      await loadNovaData();
    } catch (error) {
      console.warn("Profile loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  /* REFRESH */

  const handleRefresh = async () => {
    await loadAllData();
  };

  /* NORMALIZE GITHUB REPOSITORIES */

  const normalizedRepositories = useMemo(() => {
    if (!githubConnected) return [];

    return repositories.map((repo, index) => ({
      id:
        repo.id ||
        repo.node_id ||
        repo.full_name ||
        index,

      name:
        repo.name ||
        repo.full_name?.split("/")?.pop() ||
        "Repository",

      description:
        repo.description ||
        "No repository description available.",

      language:
        repo.language ||
        "Unknown",

      stars:
        repo.stargazers_count ??
        repo.stars ??
        0,

      forks:
        repo.forks_count ??
        repo.forks ??
        0,

      watchers:
        repo.watchers_count ??
        repo.watchers ??
        0,

      private:
        repo.private ?? false,

      html_url:
        repo.html_url ||
        repo.url ||
        "#",

      updated_at:
        repo.updated_at ||
        repo.pushed_at ||
        null,

      topics:
        Array.isArray(repo.topics)
          ? repo.topics
          : [],
    }));
  }, [repositories, githubConnected]);

  /* PROFILE COMPLETION */

  const profileCompletion = githubConnected ? 100 : 70;

  /*  GITHUB DERIVED DATA */

  const githubUsername =
    profile?.login ||
    profile?.username ||
    "";

  const githubName =
    profile?.name ||
    githubUsername ||
    "GitHub User";

  const githubAvatar =
    profile?.avatar_url ||
    profile?.avatar ||
    null;

  const githubBio =
    profile?.bio ||
    "No GitHub bio available.";

  const githubLocation =
    profile?.location ||
    "";

  const githubEmail =
    profile?.email ||
    "";

  const githubFollowers =
    profile?.followers ?? 0;

  const githubFollowing =
    profile?.following ?? 0;

  const githubPublicRepos =
    profile?.public_repos ??
    normalizedRepositories.length ??
    0;

  const githubPrivateRepos =
    profile?.private_repos ??
    0;

  const githubCreatedAt =
    profile?.created_at ||
    null;

  const githubUrl =
    profile?.html_url ||
    (githubUsername
      ? `https://github.com/${githubUsername}`
      : "#");

  const totalStars = normalizedRepositories.reduce(
    (sum, repo) => sum + Number(repo.stars || 0),
    0
  );

  const totalForks = normalizedRepositories.reduce(
    (sum, repo) => sum + Number(repo.forks || 0),
    0
  );

  /* NOVA DATA */

  const analyses =
    Number(
      novaStats?.analyses ??
        novaStats?.totalAnalyses ??
        novaStats?.analysisCount ??
        0
    );

  const vulnerabilities =
    Number(
      novaStats?.vulnerabilities ??
        novaStats?.totalVulnerabilities ??
        novaStats?.vulnerabilityCount ??
        0
    );

  const repositoriesScanned =
    Number(
      novaStats?.repositoriesScanned ??
        novaStats?.reposScanned ??
        0
    );

  const securityScore =
    Number(
      novaStats?.securityScore ??
        novaStats?.score ??
        0
    );

  const fixesSuggested =
    Number(
      novaStats?.fixesSuggested ??
        novaStats?.suggestedFixes ??
        0
    );

  const projects =
    Number(
      novaStats?.projects ??
        novaStats?.projectCount ??
        0
    );

  const notebookPages =
    Number(
      novaStats?.notebookPages ??
        novaStats?.pages ??
        0
    );

  /* DISPLAY IDENTITY */

  const displayName = githubConnected
    ? githubName
    : novaStats?.profile?.name ||
      novaStats?.user?.name ||
      "NOVA User";

  const displayUsername = githubConnected
    ? `@${githubUsername}`
    : "NOVA Security Profile";

  const displayAvatar = githubConnected
    ? githubAvatar
    : null;

  const displayBio = githubConnected
    ? githubBio
    : novaStats?.profile?.bio ||
      novaStats?.user?.bio ||
      "Your AI-powered code security workspace.";

  /* LANGUAGE COLORS */

  const languageColors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-blue-400",
    Java: "bg-orange-500",
    C: "bg-gray-400",
    "C++": "bg-pink-500",
    "C#": "bg-purple-500",
    Go: "bg-cyan-400",
    Rust: "bg-orange-600",
    PHP: "bg-indigo-400",
    HTML: "bg-orange-400",
    CSS: "bg-blue-500",
    Dart: "bg-cyan-500",
    Kotlin: "bg-purple-400",
    Swift: "bg-orange-400",
    Unknown: "bg-gray-500",
  };

  /* TABS */

  const tabs = [
    {
      name: "Overview",
      icon: IoSparklesOutline,
    },
    {
      name: "Repositories",
      icon: IoFolderOutline,
      count: githubConnected
        ? normalizedRepositories.length
        : null,
    },
    {
      name: "Projects",
      icon: IoGitBranchOutline,
      count: projects,
    },
    {
      name: "Activity",
      icon: IoTimeOutline,
    },
  ];

  /* LOADING */

  if (loading && novaLoading && githubLoading) {
    return (
      <div className="min-h-screen bg-[#05050b] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />

          <p className="text-sm text-white/50">
            Loading your NOVA profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05050b] text-white overflow-x-hidden">
      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full" />

        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-violet-600/10 blur-[140px] rounded-full" />
      </div>

      {/* PAGE */}

      <main className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TOP HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Profile
              </h1>

              {githubConnected && (
                <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                  GitHub Connected
                </span>
              )}
            </div>

            <p className="text-white/40 text-sm mt-1">
              Manage your NOVA security workspace and connected account.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition text-sm text-white/70"
          >
            <IoRefreshOutline
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* PROFILE GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
          {/* LEFT PROFILE CARD */}

          <aside className="space-y-5">
            <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] backdrop-blur-xl p-6">
              {/* Avatar */}

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={Profile_Pic}
                        alt="NOVA profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    )}
                  </div>

                  {githubConnected && (
                    <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#11111b] border border-white/10 flex items-center justify-center">
                      <IoLogoGithub className="text-white text-sm" />
                    </div>
                  )}
                </div>
              </div>

              {/* Identity */}

              <div className="text-center mt-5">
                <h2 className="text-xl font-semibold">
                  {displayName}
                </h2>

                <p className="text-purple-400 text-sm mt-1">
                  {displayUsername}
                </p>

                <p className="text-white/45 text-sm mt-4 leading-6">
                  {displayBio}
                </p>
              </div>

              {/* GitHub details */}

              {githubConnected && (
                <div className="mt-6 space-y-3">
                  {githubLocation && (
                    <div className="flex items-center gap-3 text-sm text-white/55">
                      <IoLocationOutline className="text-white/30" />
                      <span>{githubLocation}</span>
                    </div>
                  )}

                  {githubEmail && (
                    <div className="flex items-center gap-3 text-sm text-white/55 break-all">
                      <IoMailOutline className="text-white/30" />
                      <span>{githubEmail}</span>
                    </div>
                  )}

                  {githubCreatedAt && (
                    <div className="flex items-center gap-3 text-sm text-white/55">
                      <IoCalendarOutline className="text-white/30" />

                      <span>
                        Joined{" "}
                        {new Date(
                          githubCreatedAt
                        ).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}

                  {githubUrl !== "#" && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-white/55 hover:text-white transition break-all"
                    >
                      <IoLinkOutline className="text-white/30" />

                      <span>
                        github.com/{githubUsername}
                      </span>
                    </a>
                  )}
                </div>
              )}

              {/* GitHub stats */}

              {githubConnected && (
                <div className="grid grid-cols-3 gap-2 mt-7">
                  <MiniStat
                    value={githubFollowers}
                    label="Followers"
                  />

                  <MiniStat
                    value={githubFollowing}
                    label="Following"
                  />

                  <MiniStat
                    value={githubPublicRepos}
                    label="Repos"
                  />
                </div>
              )}

              {/* Edit */}

              <NavLink
                to="/Edit_Profile"
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] py-3 text-sm text-white/70 hover:text-white transition"
              >
                <IoCreateOutline />

                Edit NOVA Profile
              </NavLink>
            </div>

            {/* PROFILE COMPLETION */}

            <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] backdrop-blur-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Profile completion
                  </p>

                  <p className="text-xs text-white/35 mt-1">
                    {githubConnected
                      ? "NOVA + GitHub profile"
                      : "NOVA profile"}
                  </p>
                </div>

                <span className="text-lg font-semibold text-purple-400">
                  {profileCompletion}%
                </span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-3 text-[11px] text-white/30">
                <span>NOVA 70%</span>

                <span>
                  {githubConnected
                    ? "GitHub +30%"
                    : "GitHub +30% available"}
                </span>
              </div>
            </div>

            {/* GITHUB CONNECT CARD */}

            {!githubConnected && (
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/[0.12] to-blue-500/[0.08] border border-purple-500/20 p-5">
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-purple-500/10 blur-3xl rounded-full" />

                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.07] flex items-center justify-center mb-4">
                    <IoLogoGithub className="text-xl" />
                  </div>

                  <h3 className="font-semibold">
                    Connect GitHub
                  </h3>

                  <p className="text-sm text-white/45 leading-6 mt-2">
                    Your NOVA profile is currently 70% complete.
                    Connect GitHub to unlock repository data,
                    GitHub activity, followers, stars and more.
                  </p>

                  {githubError && (
                    <p className="text-xs text-yellow-400/70 mt-3">
                      {githubError}
                    </p>
                  )}

                  <NavLink
                    to="/SingIn"
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
                  >
                    <IoLogoGithub />

                    Connect GitHub

                    <IoChevronForwardOutline />
                  </NavLink>
                </div>
              </div>
            )}

            {/* CONNECTED GITHUB CARD */}

            {githubConnected && (
              <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <IoCheckmarkCircleOutline className="text-green-400" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      GitHub connected
                    </p>

                    <p className="text-xs text-white/35">
                      @{githubUsername}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-5">
                  <MiniStat
                    value={totalStars}
                    label="Stars"
                  />

                  <MiniStat
                    value={totalForks}
                    label="Forks"
                  />
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT CONTENT */}

          <section className="min-w-0">
            {/* TABS */}

            <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] backdrop-blur-xl p-1.5 flex gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                const active =
                  activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    onClick={() =>
                      setActiveTab(tab.name)
                    }
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition ${
                      active
                        ? "bg-white/[0.09] text-white"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon />

                    {tab.name}

                    {tab.count !== null &&
                      tab.count !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            active
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-white/[0.06] text-white/30"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                  </button>
                );
              })}
            </div>

            {/* =================================================
                OVERVIEW
            ================================================= */}

            {activeTab === "Overview" && (
              <div className="mt-5 space-y-5">
                {/* NOVA header */}

                <SectionHeader
                  icon={IoSparklesOutline}
                  title="NOVA Security Overview"
                  subtitle="Your activity and security intelligence inside NOVA."
                />

                {/* NOVA Stats */}

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                  <StatCard
                    icon={IoScanOutline}
                    title="Analyses"
                    value={analyses}
                    description="Code analyses"
                  />

                  <StatCard
                    icon={IoBugOutline}
                    title="Vulnerabilities"
                    value={vulnerabilities}
                    description="Detected issues"
                  />

                  <StatCard
                    icon={IoFolderOutline}
                    title="Repositories"
                    value={repositoriesScanned}
                    description="Repositories scanned"
                  />

                  <StatCard
                    icon={IoShieldCheckmarkOutline}
                    title="Security Score"
                    value={
                      securityScore > 0
                        ? `${securityScore}%`
                        : "—"
                    }
                    description="Current score"
                  />
                </div>

                {/* Security + Fixes */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          Security posture
                        </p>

                        <p className="text-xs text-white/35 mt-1">
                          Based on your NOVA analyses.
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <IoShieldCheckmarkOutline className="text-green-400" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-end justify-between">
                        <span className="text-4xl font-bold">
                          {securityScore > 0
                            ? `${securityScore}%`
                            : "—"}
                        </span>

                        <span className="text-xs text-white/35">
                          Security Score
                        </span>
                      </div>

                      <div className="h-2 bg-white/[0.06] rounded-full mt-4 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                          style={{
                            width: `${Math.min(
                              Math.max(
                                securityScore,
                                0
                              ),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          Suggested fixes
                        </p>

                        <p className="text-xs text-white/35 mt-1">
                          Security improvements generated by NOVA.
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <IoCheckmarkCircleOutline className="text-blue-400" />
                      </div>
                    </div>

                    <div className="mt-7">
                      <span className="text-4xl font-bold">
                        {fixesSuggested}
                      </span>

                      <p className="text-xs text-white/35 mt-2">
                        Fix recommendations
                      </p>
                    </div>
                  </div>
                </div>

                {/* GitHub section only when connected */}

                {githubConnected ? (
                  <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-6">
                    <SectionHeader
                      icon={IoLogoGithub}
                      title="GitHub Overview"
                      subtitle="Your connected GitHub account."
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                      <StatCard
                        icon={IoFolderOutline}
                        title="Public Repos"
                        value={githubPublicRepos}
                        description="Public repositories"
                      />

                      <StatCard
                        icon={IoLockClosedOutline}
                        title="Private Repos"
                        value={githubPrivateRepos}
                        description="Private repositories"
                      />

                      <StatCard
                        icon={IoStarOutline}
                        title="Stars"
                        value={totalStars}
                        description="Repository stars"
                      />

                      <StatCard
                        icon={IoGitBranchOutline}
                        title="Forks"
                        value={totalForks}
                        description="Repository forks"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <MiniInfo
                        icon={IoPeopleOutline}
                        label="Followers"
                        value={githubFollowers}
                      />

                      <MiniInfo
                        icon={IoPeopleOutline}
                        label="Following"
                        value={githubFollowing}
                      />
                    </div>
                  </div>
                ) : (
                  /* GitHub locked section */

                  <div className="relative overflow-hidden rounded-3xl bg-white/[0.025] border border-white/[0.07] p-6">
                    <div className="absolute right-0 top-0 w-60 h-60 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <IoLogoGithub className="text-xl text-purple-300" />
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            GitHub data is not connected
                          </h3>

                          <p className="text-sm text-white/40 mt-1 max-w-xl leading-6">
                            Your NOVA profile is working normally at
                            70%. Connect your GitHub account to make
                            the profile 100% complete and unlock
                            repository and GitHub activity data.
                          </p>
                        </div>
                      </div>

                      <NavLink
                        to="/SingIn"
                        className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
                      >
                        <IoLogoGithub />

                        Connect GitHub

                        <IoChevronForwardOutline />
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================================================
                REPOSITORIES
            ================================================= */}

            {activeTab === "Repositories" && (
              <div className="mt-5">
                {githubConnected ? (
                  <>
                    <SectionHeader
                      icon={IoLogoGithub}
                      title="GitHub Repositories"
                      subtitle={`${normalizedRepositories.length} repositories available from your connected GitHub account.`}
                    />

                    {normalizedRepositories.length === 0 ? (
                      <EmptyState
                        icon={IoFolderOutline}
                        title="No repositories found"
                        description="Your GitHub account is connected, but no repositories were returned."
                      />
                    ) : (
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-5">
                        {normalizedRepositories.map(
                          (repo) => (
                            <RepositoryCard
                              key={repo.id}
                              repo={repo}
                              languageColors={
                                languageColors
                              }
                            />
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <GitHubLocked
                    title="Connect GitHub to view repositories"
                    description="Repository information belongs to your GitHub account. Connect GitHub to load your repositories into NOVA."
                  />
                )}
              </div>
            )}

            {/* =================================================
                PROJECTS
            ================================================= */}

            {activeTab === "Projects" && (
              <div className="mt-5 space-y-5">
                <SectionHeader
                  icon={IoGitBranchOutline}
                  title="NOVA Projects"
                  subtitle="Your projects and security work inside NOVA."
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <StatCard
                    icon={IoFolderOutline}
                    title="Projects"
                    value={projects}
                    description="NOVA projects"
                  />

                  <StatCard
                    icon={IoDocumentTextOutline}
                    title="Notebook"
                    value={notebookPages}
                    description="Notebook pages"
                  />

                  <StatCard
                    icon={IoScanOutline}
                    title="Scans"
                    value={repositoriesScanned}
                    description="Repositories scanned"
                  />
                </div>

                <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <IoSparklesOutline className="text-purple-300 text-xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        NOVA workspace
                      </h3>

                      <p className="text-sm text-white/40 mt-1">
                        Your projects, analyses and notebook data are
                        managed independently from GitHub.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                ACTIVITY
            ================================================= */}

            {activeTab === "Activity" && (
              <div className="mt-5 space-y-5">
                <SectionHeader
                  icon={IoTimeOutline}
                  title="Recent Activity"
                  subtitle="Your latest activity inside NOVA."
                />

                {novaActivity.length > 0 ? (
                  <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] divide-y divide-white/[0.05]">
                    {novaActivity.map(
                      (activity, index) => (
                        <ActivityItem
                          key={
                            activity.id ||
                            activity._id ||
                            index
                          }
                          activity={activity}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto">
                      <IoTimeOutline className="text-xl text-white/40" />
                    </div>

                    <h3 className="mt-4 font-medium">
                      No NOVA activity yet
                    </h3>

                    <p className="text-sm text-white/35 mt-2 max-w-md mx-auto">
                      Run a code analysis, scan a repository, or
                      create a notebook page and your activity will
                      appear here.
                    </p>
                  </div>
                )}

                {/* GitHub activity lock */}

                {!githubConnected ? (
                  <GitHubLocked
                    title="GitHub activity is locked"
                    description="Connect GitHub to include commits, repository updates and other GitHub activity in your profile."
                  />
                ) : (
                  <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                        <IoLogoGithub />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          GitHub activity enabled
                        </h3>

                        <p className="text-xs text-white/35 mt-1">
                          Connected as @{githubUsername}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-white/40 mt-5">
                      GitHub activity can now be combined with your
                      NOVA security activity.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

/* ===========================================================
   MINI STAT
=========================================================== */

const MiniStat = ({ value, label }) => {
  return (
    <div className="rounded-xl bg-white/[0.035] border border-white/[0.05] px-3 py-3 text-center">
      <p className="font-semibold text-sm">
        {value ?? 0}
      </p>

      <p className="text-[10px] text-white/30 mt-1">
        {label}
      </p>
    </div>
  );
};

/* ===========================================================
   STAT CARD
=========================================================== */

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
}) => {
  return (
    <div className="rounded-2xl bg-white/[0.035] border border-white/[0.07] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-white/35">
            {title}
          </p>

          <p className="text-2xl font-bold mt-2">
            {value}
          </p>

          <p className="text-[11px] text-white/25 mt-1">
            {description}
          </p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
          <Icon className="text-purple-300" />
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   SECTION HEADER
=========================================================== */

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
        <Icon className="text-purple-300" />
      </div>

      <div>
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="text-xs text-white/35 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

/* ===========================================================
   MINI INFO
=========================================================== */

const MiniInfo = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl bg-white/[0.025] border border-white/[0.05] px-4 py-3 flex items-center gap-3">
      <Icon className="text-white/35" />

      <div>
        <p className="text-[10px] text-white/30">
          {label}
        </p>

        <p className="text-sm font-medium mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
};

/* ===========================================================
   REPOSITORY CARD
=========================================================== */

const RepositoryCard = ({
  repo,
  languageColors,
}) => {
  return (
    <div className="group rounded-3xl bg-white/[0.035] border border-white/[0.07] hover:border-purple-500/20 hover:bg-white/[0.05] transition p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <IoFolderOutline className="text-purple-300 shrink-0" />

            <h3 className="font-semibold truncate">
              {repo.name}
            </h3>

            {repo.private && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/10">
                Private
              </span>
            )}
          </div>

          <p className="text-sm text-white/35 mt-3 leading-6 line-clamp-2 min-h-[48px]">
            {repo.description}
          </p>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] transition"
        >
          <IoChevronForwardOutline />
        </a>
      </div>

      <div className="flex items-center gap-4 mt-5 text-xs text-white/35">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              languageColors[
                repo.language
              ] || "bg-gray-500"
            }`}
          />

          {repo.language}
        </span>

        <span className="flex items-center gap-1">
          <IoStarOutline />
          {repo.stars}
        </span>

        <span className="flex items-center gap-1">
          <IoGitBranchOutline />
          {repo.forks}
        </span>
      </div>

      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {repo.topics
            .slice(0, 5)
            .map((topic) => (
              <span
                key={topic}
                className="text-[10px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-300/70"
              >
                {topic}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

/* ===========================================================
   GITHUB LOCKED
=========================================================== */

const GitHubLocked = ({
  title,
  description,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/[0.08] to-blue-500/[0.05] border border-white/[0.07] p-8 mt-5">
      <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative max-w-2xl">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
          <IoLogoGithub className="text-xl text-white/70" />
        </div>

        <h3 className="text-lg font-semibold mt-5">
          {title}
        </h3>

        <p className="text-sm text-white/40 mt-2 leading-6">
          {description}
        </p>

        <NavLink
          to="/SingIn"
          className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
        >
          <IoLogoGithub />

          Connect GitHub

          <IoChevronForwardOutline />
        </NavLink>
      </div>
    </div>
  );
};

/* ===========================================================
   EMPTY STATE
=========================================================== */

const EmptyState = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-3xl bg-white/[0.035] border border-white/[0.07] p-10 text-center mt-5">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-white/[0.05] flex items-center justify-center">
        <Icon className="text-xl text-white/35" />
      </div>

      <h3 className="font-medium mt-4">
        {title}
      </h3>

      <p className="text-sm text-white/35 mt-2">
        {description}
      </p>
    </div>
  );
};

/* ===========================================================
   ACTIVITY ITEM
=========================================================== */

const ActivityItem = ({
  activity,
}) => {
  const title =
    activity.title ||
    activity.name ||
    activity.action ||
    activity.type ||
    "NOVA activity";

  const description =
    activity.description ||
    activity.message ||
    activity.details ||
    "";

  const date =
    activity.created_at ||
    activity.createdAt ||
    activity.timestamp ||
    activity.date ||
    null;

  return (
    <div className="p-5 flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center">
        <IoSparklesOutline className="text-purple-300" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-sm font-medium">
            {title}
          </h3>

          {date && (
            <span className="text-[10px] text-white/25">
              {formatActivityDate(date)}
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs text-white/35 mt-1 leading-5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/* ===========================================================
   DATE FORMATTER
=========================================================== */

const formatActivityDate = (value) => {
  try {
    return new Date(value).toLocaleString(
      undefined,
      {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  } catch {
    return "";
  }
};

export default Profile;