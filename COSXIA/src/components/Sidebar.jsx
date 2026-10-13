import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Logo from "../components/header/Logo";

import {
  IoDocumentTextOutline,
  IoCodeSlashOutline,
  IoChevronForwardOutline,
  IoChevronDownOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoFolderOutline,
  IoLogoGithub,
  IoAddOutline,
} from "react-icons/io5";

// =====================================================
// SIDEBAR
// =====================================================

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // =====================================================
  // GITHUB REPOSITORY
  // =====================================================

  const [repoName, setRepoName] = useState("");
  const [repoFiles, setRepoFiles] = useState([]);

  // =====================================================
  // NOTEBOOK
  // =====================================================

  const defaultSections = [
    {
      id: 1,
      name: "General",
      color: "purple",
      pages: [
        {
          id: 101,
          title: "Welcome to NOVA Notebook",
          content:
            "Write your notes here...\n\nYou can keep project ideas, security findings, research notes, algorithms, and other important information inside NOVA.",
          updatedAt: "Just now",
        },
        {
          id: 102,
          title: "Project Ideas",
          content:
            "• AI Code Security Assistant\n• GitHub Repository Analyzer\n• Vulnerability Detection\n• Security Dashboard",
          updatedAt: "Today",
        },
      ],
    },
    {
      id: 2,
      name: "Research",
      color: "blue",
      pages: [
        {
          id: 201,
          title: "Security Research",
          content: "Add your research notes here...",
          updatedAt: "Today",
        },
      ],
    },
    {
      id: 3,
      name: "DSA",
      color: "green",
      pages: [
        {
          id: 301,
          title: "Arrays",
          content:
            "• Two Sum\n• Maximum Subarray\n• Rotate Array\n• Missing Number",
          updatedAt: "Yesterday",
        },
      ],
    },
  ];

  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem("nova-notebook");
      return saved ? JSON.parse(saved) : defaultSections;
    } catch {
      return defaultSections;
    }
  });

  const [activeSectionId, setActiveSectionId] = useState(() => {
    try {
      return (
        Number(
          localStorage.getItem(
            "nova-notebook-active-section"
          )
        ) || 1
      );
    } catch {
      return 1;
    }
  });

  const [activePageId, setActivePageId] = useState(() => {
    try {
      return (
        Number(
          localStorage.getItem(
            "nova-notebook-active-page"
          )
        ) || 101
      );
    } catch {
      return 101;
    }
  });

  // =====================================================
  // NOTEBOOK OPEN / CLOSE
  // =====================================================

  const [notebookOpen, setNotebookOpen] = useState(true);

  // =====================================================
  // NOTEBOOK INDIVIDUAL SECTIONS OPEN / CLOSE
  // =====================================================

  const [expandedSections, setExpandedSections] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "nova-notebook-expanded"
      );

      return saved
        ? JSON.parse(saved)
        : {
            1: true,
          };
    } catch {
      return {
        1: true,
      };
    }
  });

  // =====================================================
  // SCREEN SIZE
  // =====================================================

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener(
        "resize",
        checkScreen
      );
    };
  }, []);

  // =====================================================
  // LOAD IMPORTED GITHUB REPOSITORY
  // =====================================================

  useEffect(() => {
    const loadRepository = () => {
      try {
        const storedRepo =
          localStorage.getItem("novaImportedRepo");

        const storedFiles =
          localStorage.getItem("novaRepoFiles");

        // Repository
        if (storedRepo) {
          const repo = JSON.parse(storedRepo);

          setRepoName(
            repo?.fullName ||
              repo?.name ||
              repo?.repository ||
              ""
          );
        } else {
          setRepoName("");
        }

        // Files
        if (storedFiles) {
          const files = JSON.parse(storedFiles);

          if (Array.isArray(files)) {
            setRepoFiles(files);
          }
        } else {
          setRepoFiles([]);
        }
      } catch (error) {
        console.error(
          "Failed to load repository:",
          error
        );
      }
    };

    loadRepository();

    // =================================================
    // LISTEN FOR REPOSITORY IMPORT FROM NEWCHAT
    // =================================================

    const handleRepositoryImport = (event) => {
      const data = event.detail;

      if (!data) return;

      setRepoName(
        data?.repo?.fullName ||
          data?.repo?.name ||
          data?.repository ||
          ""
      );

      if (Array.isArray(data?.files)) {
        setRepoFiles(data.files);
      }
    };

    window.addEventListener(
      "nova:repository-imported",
      handleRepositoryImport
    );

    // =================================================
    // STORAGE CHANGE
    // =================================================

    const handleStorage = () => {
      loadRepository();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "nova:repository-imported",
        handleRepositoryImport
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  // =====================================================
  // LOAD NOTEBOOK
  // =====================================================

  useEffect(() => {
    const loadNotebook = () => {
      try {
        const saved = localStorage.getItem(
          "nova-notebook"
        );

        if (saved) {
          setSections(JSON.parse(saved));
        }

        const savedSection =
          localStorage.getItem(
            "nova-notebook-active-section"
          );

        const savedPage =
          localStorage.getItem(
            "nova-notebook-active-page"
          );

        if (savedSection) {
          setActiveSectionId(
            Number(savedSection)
          );
        }

        if (savedPage) {
          setActivePageId(
            Number(savedPage)
          );
        }

        const savedExpanded =
          localStorage.getItem(
            "nova-notebook-expanded"
          );

        if (savedExpanded) {
          setExpandedSections(
            JSON.parse(savedExpanded)
          );
        }
      } catch (error) {
        console.error(
          "Failed to load notebook:",
          error
        );
      }
    };

    loadNotebook();

    const handleNotebookUpdate = () => {
      loadNotebook();
    };

    window.addEventListener(
      "nova:notebook-updated",
      handleNotebookUpdate
    );

    window.addEventListener(
      "storage",
      handleNotebookUpdate
    );

    return () => {
      window.removeEventListener(
        "nova:notebook-updated",
        handleNotebookUpdate
      );

      window.removeEventListener(
        "storage",
        handleNotebookUpdate
      );
    };
  }, []);

  // =====================================================
  // NAVIGATION STYLE
  // =====================================================

  const navStyle = ({ isActive }) => `
    group
    flex
    items-center
    ${
      isOpen
        ? "gap-3 px-3"
        : "justify-center px-2"
    }
    w-full
    h-11
    rounded-xl
    text-sm
    font-medium
    font-['Poppins']
    transition-all
    duration-200
    ${
      isActive
        ? "text-white bg-white/[0.08]"
        : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
    }
  `;

  // =====================================================
  // GET FILE NAME
  // =====================================================

  const getFileName = (file) => {
    if (typeof file === "string") {
      return file;
    }

    return (
      file?.path ||
      file?.name ||
      file?.filename ||
      ""
    );
  };

  // =====================================================
  // FILE ICON
  // =====================================================

  const getFileIcon = (fileName) => {
    const extension = fileName
      .split(".")
      .pop()
      ?.toLowerCase();

    if (
      [
        "js",
        "jsx",
        "ts",
        "tsx",
        "cpp",
        "c",
        "java",
        "py",
        "html",
        "css",
      ].includes(extension)
    ) {
      return (
        <IoCodeSlashOutline className="text-gray-500 shrink-0" />
      );
    }

    if (
      [
        "json",
        "xml",
        "yaml",
        "yml",
        "md",
        "txt",
      ].includes(extension)
    ) {
      return (
        <IoDocumentTextOutline className="text-gray-500 shrink-0" />
      );
    }

    return (
      <IoDocumentTextOutline className="text-gray-500 shrink-0" />
    );
  };

  // =====================================================
  // CLOSE SIDEBAR ON MOBILE
  // =====================================================

  const handleNavigation = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // =====================================================
  // OPEN GITHUB REPOSITORY
  // =====================================================

  const handleGitRepository = () => {
    navigate("/NewChat", {
      state: {
        openGitRepo: true,
      },
    });

    if (isMobile) {
      setIsOpen(false);
    }
  };

  // =====================================================
  // NOTEBOOK SECTION COLOR
  // =====================================================

  const getSectionColor = (color) => {
    const colors = {
      purple: "bg-purple-500",
      blue: "bg-blue-500",
      green: "bg-emerald-500",
      orange: "bg-orange-500",
      pink: "bg-pink-500",
    };

    return colors[color] || colors.purple;
  };

  // =====================================================
  // TOGGLE INDIVIDUAL NOTEBOOK SECTION
  // =====================================================

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => {
      const updated = {
        ...prev,
        [sectionId]: !prev[sectionId],
      };

      localStorage.setItem(
        "nova-notebook-expanded",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // =====================================================
  // OPEN NOTEBOOK PAGE
  // =====================================================

  const openNotebookPage = (
    sectionId,
    pageId
  ) => {
    setActiveSectionId(sectionId);
    setActivePageId(pageId);

    localStorage.setItem(
      "nova-notebook-active-section",
      String(sectionId)
    );

    localStorage.setItem(
      "nova-notebook-active-page",
      String(pageId)
    );

    navigate("/Notebook", {
      state: {
        sectionId,
        pageId,
      },
    });

    if (isMobile) {
      setIsOpen(false);
    }
  };

  // =====================================================
  // ADD SECTION
  // =====================================================

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      name: "New Section",
      color: "purple",
      pages: [],
    };

    const updated = [
      ...sections,
      newSection,
    ];

    setSections(updated);

    localStorage.setItem(
      "nova-notebook",
      JSON.stringify(updated)
    );

    localStorage.setItem(
      "nova-notebook-active-section",
      String(newSection.id)
    );

    localStorage.removeItem(
      "nova-notebook-active-page"
    );

    setActiveSectionId(
      newSection.id
    );

    setActivePageId(null);

    setExpandedSections((prev) => {
      const updatedExpanded = {
        ...prev,
        [newSection.id]: true,
      };

      localStorage.setItem(
        "nova-notebook-expanded",
        JSON.stringify(updatedExpanded)
      );

      return updatedExpanded;
    });

    window.dispatchEvent(
      new Event("nova:notebook-updated")
    );

    navigate("/Notebook", {
      state: {
        sectionId: newSection.id,
        pageId: null,
      },
    });
  };

  // =====================================================
  // ADD PAGE
  // =====================================================

  const addPage = (sectionId) => {
    const newPage = {
      id: Date.now(),
      title: "Untitled Page",
      content: "",
      updatedAt: "Just now",
    };

    const updated = sections.map(
      (section) =>
        section.id === sectionId
          ? {
              ...section,
              pages: [
                ...section.pages,
                newPage,
              ],
            }
          : section
    );

    setSections(updated);

    localStorage.setItem(
      "nova-notebook",
      JSON.stringify(updated)
    );

    localStorage.setItem(
      "nova-notebook-active-section",
      String(sectionId)
    );

    localStorage.setItem(
      "nova-notebook-active-page",
      String(newPage.id)
    );

    setActiveSectionId(sectionId);
    setActivePageId(newPage.id);

    setExpandedSections((prev) => {
      const updatedExpanded = {
        ...prev,
        [sectionId]: true,
      };

      localStorage.setItem(
        "nova-notebook-expanded",
        JSON.stringify(updatedExpanded)
      );

      return updatedExpanded;
    });

    window.dispatchEvent(
      new Event("nova:notebook-updated")
    );

    navigate("/Notebook", {
      state: {
        sectionId,
        pageId: newPage.id,
      },
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          MOBILE OPEN BUTTON
      ================================================= */}

      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed
            top-4
            left-4
            z-[100]

            w-10
            h-10

            flex
            items-center
            justify-center

            rounded-xl

            bg-black/40
            backdrop-blur-2xl

            text-gray-200

            hover:bg-white/[0.08]
            hover:text-white

            transition-all
            duration-300
          "
        >
          <IoMenuOutline className="text-xl" />
        </button>
      )}

      {/* =================================================
          MOBILE BACKDROP
      ================================================= */}

      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            z-[80]

            bg-black/50
            backdrop-blur-[2px]
          "
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          bottom-0

          z-[90]

          flex
          flex-col

          bg-[#09090b]/70
          backdrop-blur-3xl
          backdrop-saturate-150

          text-white

          shadow-[10px_0_50px_rgba(0,0,0,0.25)]

          overflow-hidden

          transition-all
          duration-300
          ease-in-out

          ${
            isMobile
              ? isOpen
                ? "translate-x-0 w-[260px]"
                : "-translate-x-full w-[260px]"
              : isOpen
              ? "translate-x-0 w-[260px]"
              : "translate-x-0 w-[72px]"
          }
        `}
      >
        {/* =================================================
            TOP HEADER
        ================================================= */}

        <div
          className={`
            h-[76px]
            shrink-0

            flex
            items-center

            ${
              isOpen
                ? "justify-between px-5"
                : "justify-center px-2"
            }
          `}
        >
          {/* LOGO */}

          <div
            className={`
              transition-all
              duration-300

              ${
                isOpen
                  ? "opacity-100"
                  : "opacity-0 w-0 overflow-hidden"
              }
            `}
          >
            {isOpen && <Logo />}
          </div>

          {/* DESKTOP TOGGLE */}

          {!isMobile && (
            <button
              onClick={() =>
                setIsOpen(
                  (prev) => !prev
                )
              }
              title={
                isOpen
                  ? "Collapse sidebar"
                  : "Open sidebar"
              }
              className="
                w-9
                h-9

                shrink-0

                flex
                items-center
                justify-center

                rounded-xl

                bg-white/[0.04]
                backdrop-blur-xl

                text-gray-400

                hover:bg-white/[0.08]
                hover:text-white

                transition-all
                duration-300
              "
            >
              <IoMenuOutline className="text-xl" />
            </button>
          )}

          {/* MOBILE CLOSE */}

          {isMobile && isOpen && (
            <button
              onClick={() =>
                setIsOpen(false)
              }
              className="
                w-9
                h-9

                flex
                items-center
                justify-center

                rounded-xl

                bg-white/[0.04]

                text-gray-400

                hover:bg-white/[0.08]
                hover:text-white

                transition-all
              "
            >
              <IoCloseOutline className="text-xl" />
            </button>
          )}
        </div>

        {/* =================================================
            MAIN NAVIGATION
        ================================================= */}

        <div className="px-3">

          {/* =================================================
              NOTEBOOK
          ================================================= */}

          <div>

            {/* NOTEBOOK HEADER */}

            <div className="flex items-center gap-1">

              {/* NOTEBOOK OPEN/CLOSE */}

              <button
                onClick={() =>
                  setNotebookOpen(
                    (prev) => !prev
                  )
                }
                className={`
                  flex-1
                  flex
                  items-center

                  ${
                    isOpen
                      ? "gap-2 px-2"
                      : "justify-center px-2"
                  }

                  w-full
                  h-11

                  rounded-xl

                  text-sm
                  font-medium
                  font-['Poppins']

                  transition-all
                  duration-200

                  ${
                    location.pathname ===
                    "/Notebook"
                      ? "text-white bg-white/[0.08]"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                  }
                `}
                title={
                  !isOpen
                    ? "Notebook"
                    : notebookOpen
                    ? "Close Notebook"
                    : "Open Notebook"
                }
              >

                {/* NOTEBOOK ARROW */}

                {isOpen &&
                  (notebookOpen ? (
                    <IoChevronDownOutline
                      className="
                        text-[13px]
                        text-gray-500
                        shrink-0
                      "
                    />
                  ) : (
                    <IoChevronForwardOutline
                      className="
                        text-[13px]
                        text-gray-500
                        shrink-0
                      "
                    />
                  ))}

                {/* NOTEBOOK ICON */}

                <IoDocumentTextOutline
                  className="
                    text-[19px]
                    shrink-0
                  "
                />

                {isOpen && (
                  <span>
                    Notebook
                  </span>
                )}
              </button>

              {/* NEW SECTION */}

              {isOpen && (
                <button
                  onClick={addSection}
                  title="New section"
                  className="
                    w-8
                    h-8
                    shrink-0

                    flex
                    items-center
                    justify-center

                    rounded-lg

                    text-gray-500

                    hover:text-white
                    hover:bg-white/[0.06]

                    transition
                  "
                >
                  <IoAddOutline size={18} />
                </button>
              )}
            </div>

            {/* =================================================
                NOTEBOOK SECTIONS + PAGES

                OPEN/CLOSE WITH NOTEBOOK BUTTON
            ================================================= */}

            {isOpen &&
              notebookOpen && (
                <div className="mt-2 pl-1">

                  <div className="px-2 mb-2">
                    <p className="text-[10px] uppercase tracking-wider text-gray-600">
                      Sections
                    </p>
                  </div>

                  <div className="space-y-1">

                    {sections.map(
                      (section) => {
                        const isExpanded =
                          expandedSections[
                            section.id
                          ];

                        const isActiveSection =
                          activeSectionId ===
                          section.id;

                        return (
                          <div
                            key={section.id}
                          >

                            {/* SECTION */}

                            <div
                              className={`
                                group
                                flex
                                items-center
                                gap-1
                                w-full
                                rounded-lg

                                ${
                                  isActiveSection
                                    ? "bg-white/[0.06]"
                                    : "hover:bg-white/[0.04]"
                                }
                              `}
                            >

                              <button
                                onClick={() => {
                                  toggleSection(
                                    section.id
                                  );

                                  if (
                                    section
                                      .pages
                                      ?.length >
                                    0
                                  ) {
                                    openNotebookPage(
                                      section.id,
                                      section
                                        .pages[0]
                                        .id
                                    );
                                  } else {
                                    setActiveSectionId(
                                      section.id
                                    );

                                    setActivePageId(
                                      null
                                    );

                                    navigate(
                                      "/Notebook",
                                      {
                                        state: {
                                          sectionId:
                                            section.id,
                                          pageId:
                                            null,
                                        },
                                      }
                                    );
                                  }
                                }}
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  flex-1
                                  min-w-0

                                  px-2
                                  py-1.5

                                  text-left
                                  text-xs
                                  text-gray-400

                                  hover:text-white

                                  transition
                                "
                              >

                                {/* SECTION ARROW */}

                                {isExpanded ? (
                                  <IoChevronDownOutline
                                    className="
                                      text-[11px]
                                      text-gray-600
                                      shrink-0
                                    "
                                  />
                                ) : (
                                  <IoChevronForwardOutline
                                    className="
                                      text-[11px]
                                      text-gray-600
                                      shrink-0
                                    "
                                  />
                                )}

                                {/* COLOR */}

                                <span
                                  className={`
                                    w-2
                                    h-2
                                    rounded-full
                                    shrink-0
                                    ${getSectionColor(
                                      section.color
                                    )}
                                  `}
                                />

                                {/* NAME */}

                                <span className="truncate">
                                  {section.name}
                                </span>

                                {/* PAGE COUNT */}

                                <span className="ml-auto text-[9px] text-gray-600">
                                  {
                                    section
                                      .pages
                                      ?.length
                                  }
                                </span>
                              </button>

                              {/* ADD PAGE */}

                              <button
                                onClick={() =>
                                  addPage(
                                    section.id
                                  )
                                }
                                title="New page"
                                className="
                                  w-6
                                  h-6
                                  mr-1

                                  flex
                                  items-center
                                  justify-center

                                  rounded-md

                                  text-gray-600

                                  opacity-0
                                  group-hover:opacity-100

                                  hover:text-white
                                  hover:bg-white/[0.07]

                                  transition
                                "
                              >
                                <IoAddOutline
                                  size={14}
                                />
                              </button>
                            </div>

                            {/* PAGES */}

                            {isExpanded &&
                              section.pages
                                ?.length >
                                0 && (
                                <div className="ml-5 mt-0.5 space-y-0.5">

                                  {section.pages.map(
                                    (page) => {
                                      const isActive =
                                        activePageId ===
                                          page.id &&
                                        activeSectionId ===
                                          section.id;

                                      return (
                                        <button
                                          key={
                                            page.id
                                          }
                                          onClick={() =>
                                            openNotebookPage(
                                              section.id,
                                              page.id
                                            )
                                          }
                                          className={`
                                            w-full

                                            flex
                                            items-center
                                            gap-2

                                            px-2
                                            py-1.5

                                            rounded-lg

                                            text-left
                                            text-[11px]

                                            transition

                                            ${
                                              isActive
                                                ? "text-white bg-white/[0.08]"
                                                : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
                                            }
                                          `}
                                        >

                                          <IoDocumentTextOutline
                                            className={`
                                              text-[13px]
                                              shrink-0

                                              ${
                                                isActive
                                                  ? "text-purple-400"
                                                  : "text-gray-600"
                                              }
                                            `}
                                          />

                                          <span className="truncate">
                                            {page.title ||
                                              "Untitled Page"}
                                          </span>

                                        </button>
                                      );
                                    }
                                  )}

                                </div>
                              )}

                          </div>
                        );
                      }
                    )}

                  </div>
                </div>
              )}
          </div>

          {/* =================================================
              ANALYSIS
          ================================================= */}

          <NavLink
            to="/Analysis"
            className={navStyle}
            onClick={handleNavigation}
            title={
              !isOpen
                ? "Analysis"
                : ""
            }
          >
            <IoCodeSlashOutline
              className="
                text-[19px]
                shrink-0
              "
            />

            {isOpen && (
              <span>
                Analysis
              </span>
            )}
          </NavLink>
        </div>

        {/* =================================================
            GITHUB REPOSITORY
        ================================================= */}

        <div
          className={`
            mt-5

            ${
              isOpen
                ? "px-3"
                : "px-2"
            }
          `}
        >

          {/* REPOSITORY BUTTON */}

          <button
            onClick={handleGitRepository}
            className={`
              w-full
              h-10

              flex
              items-center

              ${
                isOpen
                  ? "gap-2 px-2"
                  : "justify-center"
              }

              rounded-xl

              text-gray-300

              hover:text-white
              hover:bg-white/[0.05]

              transition-all
            `}
            title={
              !isOpen
                ? "Git Repository"
                : ""
            }
          >

            <IoLogoGithub
              className="
                text-[18px]
                shrink-0
              "
            />

            {isOpen && (
              <>
                <span
                  className="
                    flex-1
                    text-left
                    text-sm
                    font-medium
                    font-['Poppins']
                  "
                >
                  Git Repository
                </span>

                <IoChevronForwardOutline
                  className="
                    text-sm
                    text-gray-500
                  "
                />
              </>
            )}
          </button>

          {/* =================================================
              IMPORTED REPOSITORY
          ================================================= */}

          {isOpen && (
            <div className="mt-1">

              {/* REPOSITORY NAME */}

              {repoName ? (
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    px-3
                    py-2

                    rounded-lg

                    text-xs
                    text-gray-300

                    bg-white/[0.035]
                  "
                >
                  <IoFolderOutline
                    className="
                      text-purple-400
                      shrink-0
                    "
                  />

                  <span className="truncate">
                    {repoName}
                  </span>
                </div>
              ) : (
                <div
                  className="
                    px-3
                    py-2

                    text-xs
                    text-gray-500
                  "
                >
                  Import a GitHub repository
                </div>
              )}

              {/* REPOSITORY FILES */}

              {repoFiles.length > 0 && (
                <div
                  className="
                    mt-1

                    max-h-[calc(100vh-250px)]

                    overflow-y-auto

                    scrollbar-thin
                    scrollbar-thumb-white/10
                  "
                >
                  {repoFiles.map(
                    (file, index) => {
                      const fileName =
                        getFileName(file);

                      if (!fileName) {
                        return null;
                      }

                      return (
                        <button
                          key={`${fileName}-${index}`}
                          className="
                            w-full

                            flex
                            items-center
                            gap-2

                            px-3
                            py-1.5

                            rounded-lg

                            text-left
                            text-[11px]
                            text-gray-500

                            hover:text-gray-200
                            hover:bg-white/[0.05]

                            transition-all
                          "
                          title={fileName}
                        >
                          {getFileIcon(
                            fileName
                          )}

                          <span className="truncate">
                            {fileName}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            EMPTY SPACE
        ================================================= */}

        <div className="flex-1" />

        {/* =================================================
            BOTTOM PROFILE
        ================================================= */}

        <div
          className={`
            shrink-0
            mb-4

            ${
              isOpen
                ? "px-3"
                : "px-2"
            }
          `}
        >
          <NavLink
            to="/Profile"
            onClick={handleNavigation}
            className={`
              flex
              items-center

              ${
                isOpen
                  ? "gap-3 px-3"
                  : "justify-center"
              }

              h-12

              rounded-xl

              bg-white/[0.04]
              backdrop-blur-xl

              hover:bg-white/[0.08]

              transition-all
            `}
            title={
              !isOpen
                ? "Profile"
                : ""
            }
          >

            {/* AVATAR */}

            <div
              className="
                w-8
                h-8

                shrink-0

                rounded-full

                flex
                items-center
                justify-center

                bg-gradient-to-br
                from-purple-500
                to-blue-500

                text-white

                text-sm
                font-semibold
              "
            >
              S
            </div>

            {isOpen && (
              <div className="min-w-0">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-gray-200
                    truncate
                  "
                >
                  Subhadeep
                </p>

                <p
                  className="
                    text-[11px]
                    text-gray-500
                  "
                >
                  View Profile
                </p>

              </div>
            )}

          </NavLink>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;