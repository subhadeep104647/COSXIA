import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import Logo from "./header/Logo";

import {

  IoDocumentTextOutline,

  IoCodeSlashOutline,

  IoChevronForwardOutline,

  IoMenuOutline,

  IoCloseOutline,

  IoFolderOutline,

  IoLogoGithub,

} from "react-icons/io5";

// =====================================================

// SIDEBAR

// =====================================================

const Sidebar = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  const [repoName, setRepoName] = useState("");

  const [repoFiles, setRepoFiles] = useState([]);

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

      window.removeEventListener("resize", checkScreen);

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

        }

        // Files

        if (storedFiles) {

          const files = JSON.parse(storedFiles);

          if (Array.isArray(files)) {

            setRepoFiles(files);

          }

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
  // SYNC SIDEBAR WIDTH WITH MAIN CONTENT
  // =====================================================

  useEffect(() => {
    const width = isMobile ? "0px" : isOpen ? "260px" : "72px";

    document.documentElement.style.setProperty(
      "--nova-sidebar-width",
      width
    );
  }, [isOpen, isMobile]);

  // =====================================================

  // NAVIGATION STYLE

  // =====================================================

  const navStyle = ({ isActive }) => `

    group

    flex

    items-center

    ${isOpen ? "gap-3 px-3" : "justify-center px-2"}

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

        ? "text-gray-900 bg-white/[0.08]"

        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"

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

    const extension =

      fileName

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

        <IoCodeSlashOutline

          className="text-gray-500 shrink-0"

        />

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

        <IoDocumentTextOutline

          className="text-gray-500 shrink-0"

        />

      );

    }

    return (

      <IoDocumentTextOutline

        className="text-gray-500 shrink-0"

      />

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

  // OPEN GITHUB REPOSITORY IN NEWCHAT

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

            bg-white/95

            backdrop-blur-2xl

            text-gray-700

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

            bg-gray-900/10

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

          bg-white/95

          backdrop-blur-3xl

          backdrop-saturate-150

          text-gray-900

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

                setIsOpen((prev) => !prev)

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

              onClick={() => setIsOpen(false)}

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

          <NavLink

            to="/Notebook"

            className={navStyle}

            onClick={handleNavigation}

            title={!isOpen ? "Notebook" : ""}

          >

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

          </NavLink>

          {/* =================================================

              ANALYSIS

          ================================================= */}

          <NavLink

            to="/Analysis"

            className={navStyle}

            onClick={handleNavigation}

            title={!isOpen ? "Analysis" : ""}

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

          {/* =================================================

              REPOSITORY BUTTON

              CLICKING THIS OPENS NEWCHAT

              WITH GITHUB MODE

          ================================================= */}

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

              {/* =================================================

                  REPOSITORY FILES

              ================================================= */}

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

                            hover:text-gray-700

                            hover:bg-white/[0.05]

                            transition-all

                          "

                          title={fileName}

                        >

                          {getFileIcon(fileName)}

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

                text-gray-900

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

                    text-gray-700

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
