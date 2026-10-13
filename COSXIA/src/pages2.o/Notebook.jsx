import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  MoreHorizontal,
  Trash2,
  Pin,
  Clock3,
  Check,
  Plus,
} from "lucide-react";
import { useLocation } from "react-router-dom";

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
        content:
          "Add your research notes here...",
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

const Notebook = () => {
  const location = useLocation();

  // =====================================================
  // STATE
  // =====================================================

  const [sections, setSections] = useState(() => {
    try {
      const saved =
        localStorage.getItem(
          "nova-notebook"
        );

      return saved
        ? JSON.parse(saved)
        : defaultSections;
    } catch {
      return defaultSections;
    }
  });

  const [activeSectionId, setActiveSectionId] =
    useState(() => {
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

  const [activePageId, setActivePageId] =
    useState(() => {
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
  // HANDLE SIDEBAR NAVIGATION
  // =====================================================

  useEffect(() => {
    const sectionId =
      location.state?.sectionId;

    const pageId =
      location.state?.pageId;

    if (sectionId !== undefined) {
      setActiveSectionId(
        Number(sectionId)
      );

      localStorage.setItem(
        "nova-notebook-active-section",
        String(sectionId)
      );
    }

    if (pageId !== undefined) {
      setActivePageId(
        pageId === null
          ? null
          : Number(pageId)
      );

      if (pageId === null) {
        localStorage.removeItem(
          "nova-notebook-active-page"
        );
      } else {
        localStorage.setItem(
          "nova-notebook-active-page",
          String(pageId)
        );
      }
    }
  }, [location.state]);

  // =====================================================
  // SAVE NOTEBOOK
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "nova-notebook",
      JSON.stringify(sections)
    );

    window.dispatchEvent(
      new Event("nova:notebook-updated")
    );
  }, [sections]);

  // =====================================================
  // ACTIVE SECTION
  // =====================================================

  const activeSection =
    sections.find(
      (section) =>
        section.id === activeSectionId
    );

  // =====================================================
  // ACTIVE PAGE
  // =====================================================

  const activePage =
    activeSection?.pages.find(
      (page) =>
        page.id === activePageId
    );

  // =====================================================
  // SELECT SECTION
  // =====================================================

  const handleSectionChange = (
    section
  ) => {
    setActiveSectionId(
      section.id
    );

    localStorage.setItem(
      "nova-notebook-active-section",
      String(section.id)
    );

    if (section.pages.length > 0) {
      setActivePageId(
        section.pages[0].id
      );

      localStorage.setItem(
        "nova-notebook-active-page",
        String(section.pages[0].id)
      );
    } else {
      setActivePageId(null);

      localStorage.removeItem(
        "nova-notebook-active-page"
      );
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

    setSections((prev) => [
      ...prev,
      newSection,
    ]);

    setActiveSectionId(
      newSection.id
    );

    setActivePageId(null);

    localStorage.setItem(
      "nova-notebook-active-section",
      String(newSection.id)
    );

    localStorage.removeItem(
      "nova-notebook-active-page"
    );
  };

  // =====================================================
  // ADD PAGE
  // =====================================================

  const addPage = () => {
    if (!activeSection) return;

    const newPage = {
      id: Date.now(),
      title: "Untitled Page",
      content: "",
      updatedAt: "Just now",
    };

    setSections((prev) =>
      prev.map((section) =>
        section.id ===
        activeSectionId
          ? {
              ...section,
              pages: [
                ...section.pages,
                newPage,
              ],
            }
          : section
      )
    );

    setActivePageId(
      newPage.id
    );

    localStorage.setItem(
      "nova-notebook-active-page",
      String(newPage.id)
    );
  };

  // =====================================================
  // UPDATE PAGE
  // =====================================================

  const updatePage = (
    field,
    value
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id ===
        activeSectionId
          ? {
              ...section,
              pages: section.pages.map(
                (page) =>
                  page.id ===
                  activePageId
                    ? {
                        ...page,
                        [field]:
                          value,
                        updatedAt:
                          "Just now",
                      }
                    : page
              ),
            }
          : section
      )
    );
  };

  // =====================================================
  // DELETE PAGE
  // =====================================================

  const deletePage = () => {
    if (
      !activeSection ||
      !activePage
    ) {
      return;
    }

    const remainingPages =
      activeSection.pages.filter(
        (page) =>
          page.id !==
          activePageId
      );

    setSections((prev) =>
      prev.map((section) =>
        section.id ===
        activeSectionId
          ? {
              ...section,
              pages:
                remainingPages,
            }
          : section
      )
    );

    setActivePageId(
      remainingPages.length > 0
        ? remainingPages[0].id
        : null
    );

    if (
      remainingPages.length > 0
    ) {
      localStorage.setItem(
        "nova-notebook-active-page",
        String(
          remainingPages[0].id
        )
      );
    } else {
      localStorage.removeItem(
        "nova-notebook-active-page"
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen w-full text-white bg-[#050509] relative overflow-hidden">
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      {/* =================================================
          MAIN NOTEBOOK EDITOR

          No separate Notebook sidebar here.
          Main NOVA Sidebar handles sections/pages.
      ================================================= */}

      <div className="relative z-10 min-h-screen flex">
        <main className="flex-1 min-w-0 flex flex-col">
          {/* =================================================
              EDITOR HEADER
          ================================================= */}

          <header
            className="
              h-[64px]
              shrink-0
              px-6
              flex
              items-center
              justify-between

              border-b
              border-white/[0.05]

              bg-white/[0.015]
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-3">
              <button
                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:text-white
                  hover:bg-white/[0.06]
                  transition
                "
              >
                {activePage ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              <div className="text-xs text-gray-500">
                {activeSection?.name ||
                  "Notebook"}
              </div>

              {activePage && (
                <>
                  <ChevronRight
                    size={13}
                    className="text-gray-700"
                  />

                  <div className="text-xs text-gray-300">
                    {activePage.title ||
                      "Untitled Page"}
                  </div>
                </>
              )}
            </div>

            {activePage && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <Check size={12} />
                  Saved
                </div>

                <button
                  onClick={deletePage}
                  className="
                    w-8
                    h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:text-red-400
                    hover:bg-red-500/10
                    transition
                  "
                  title="Delete page"
                >
                  <Trash2 size={15} />
                </button>

                <button
                  className="
                    w-8
                    h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition
                  "
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
            )}
          </header>

          {/* =================================================
              EDITOR
          ================================================= */}

          {activePage ? (
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-8 md:px-14 py-12">
                {/* PAGE ICON */}

                <div className="mb-6">
                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl

                      bg-purple-500/[0.08]
                      border
                      border-purple-500/10

                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FileText
                      size={21}
                      className="text-purple-400"
                    />
                  </div>
                </div>

                {/* TITLE */}

                <input
                  value={
                    activePage.title
                  }
                  onChange={(e) =>
                    updatePage(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Untitled Page"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    border-none

                    text-3xl
                    md:text-4xl
                    font-semibold
                    text-white

                    placeholder:text-gray-700

                    mb-8
                  "
                />

                {/* META */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    mb-8

                    text-[10px]
                    text-gray-600
                  "
                >
                  <div className="flex items-center gap-1.5">
                    <Clock3 size={11} />

                    Last edited{" "}
                    {activePage.updatedAt}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Pin size={11} />

                    NOVA Notebook
                  </div>
                </div>

                {/* CONTENT */}

                <textarea
                  value={
                    activePage.content
                  }
                  onChange={(e) =>
                    updatePage(
                      "content",
                      e.target.value
                    )
                  }
                  placeholder="Start writing..."
                  spellCheck={true}
                  className="
                    w-full
                    min-h-[550px]
                    resize-none

                    bg-transparent
                    outline-none
                    border-none

                    text-[15px]
                    leading-8

                    text-gray-300
                    placeholder:text-gray-700

                    font-['Poppins']

                    scrollbar-hide
                  "
                />
              </div>
            </div>
          ) : (
            /* =================================================
                EMPTY NOTEBOOK
            ================================================= */

            <div
              className="
                flex-1
                flex
                items-center
                justify-center
                px-6
              "
            >
              <div className="text-center">
                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    mb-5

                    rounded-2xl

                    bg-purple-500/[0.08]

                    flex
                    items-center
                    justify-center
                  "
                >
                  <FileText
                    size={28}
                    className="text-purple-400"
                  />
                </div>

                <h2 className="text-lg font-semibold text-white">
                  Your notebook is empty
                </h2>

                <p className="text-xs text-gray-600 mt-2 mb-5">
                  Create a page and start
                  writing.
                </p>

                <button
                  onClick={addPage}
                  className="
                    inline-flex
                    items-center
                    gap-2

                    px-4
                    py-2

                    rounded-xl

                    bg-gradient-to-r
                    from-purple-600
                    to-blue-600

                    text-xs
                    font-medium
                    text-white

                    shadow-lg
                    shadow-purple-900/20

                    hover:scale-[1.02]

                    transition
                  "
                >
                  <Plus size={14} />

                  New Page
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Notebook;