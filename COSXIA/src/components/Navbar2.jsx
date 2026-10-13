import React, { useEffect, useState } from "react";
import Logo from "../icons/Logo";
import Logo1 from "../icons/Logo1";

import { NavLink } from "react-router-dom";
import { GrPin } from "react-icons/gr";

import {
  IoChatbubbleEllipsesOutline,
  IoChatbubblesOutline,
  IoSearchOutline,
} from "react-icons/io5";

import { GiNotebook } from "react-icons/gi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* ================= CHECK SCREEN SIZE ================= */
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

  const pinnedChats = [];

  const recentChats = [];

  /* ================= NAV LINK STYLE ================= */
  const linkStyle = ({ isActive }) =>
    `flex items-center w-full py-2 rounded-lg transition duration-300 ${
      isOpen ? "px-4 gap-3" : "justify-center px-0"
    } ${
      isActive
        ? "bg-white/10 text-white"
        : "text-gray-100 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      {/* =================================================
          MOBILE LOGO BUTTON
      ================================================= */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed
            top-5
            left-5
            z-[60]

            w-12
            h-12

            flex
            items-center
            justify-center

            rounded-full

            bg-white/[0.07]
            backdrop-blur-2xl
            backdrop-saturate-150

            border
            border-white/[0.12]

            shadow-[0_8px_30px_rgba(0,0,0,0.35)]

            hover:bg-white/[0.12]

            transition-all
            duration-300
          "
        >
          <Logo1 />
        </button>
      )}

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}
      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            z-40

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
          h-screen

          bg-white/[0.035]
          backdrop-blur-3xl
          backdrop-saturate-150

          border-r
          border-white/[0.10]

          shadow-[8px_0_40px_rgba(0,0,0,0.25)]

          text-white

          flex
          flex-col

          py-6

          z-50

          transition-all
          duration-300
          ease-in-out

          ${
            isMobile
              ? isOpen
                ? "translate-x-0 w-[17.5rem] px-4"
                : "-translate-x-full w-[17.5rem] px-4"
              : isOpen
                ? "translate-x-0 w-[17.5rem] px-4"
                : "translate-x-0 w-16 px-2"
          }
        `}
      >

        {/* ================= GLASS HIGHLIGHT ================= */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-white/[0.035]
            via-transparent
            to-black/[0.08]
          "
        />

        {/* =================================================
            LOGO SECTION
        ================================================= */}
        <div
          className={`
            relative
            z-10
            mb-8
            flex
            items-center
            ${
              isOpen
                ? "px-2 justify-between"
                : "justify-center"
            }
          `}
        >

          {/* ================= LOGO ================= */}
          <div
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Logo /> : <Logo1 />}
          </div>

          {/* ================= SEARCH ================= */}
          {isOpen && (
            <button
              className="
                w-9
                h-9

                flex
                items-center
                justify-center

                rounded-lg

                text-gray-300

                bg-white/[0.035]

                border
                border-white/[0.06]

                hover:bg-white/[0.09]
                hover:text-white

                transition-all
                duration-300
              "
            >
              <IoSearchOutline className="text-xl" />
            </button>
          )}

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}
        <nav
          className="
            relative
            z-10
            flex
            flex-col
            gap-2
            mb-8
            text-sm
            font-medium
          "
        >

          {/* ================= NEW CHAT ================= */}
          <NavLink
            to="/"
            className={linkStyle}
            onClick={() => {
              if (isMobile) {
                setIsOpen(false);
              }
            }}
          >
            <IoChatbubblesOutline className="text-xl shrink-0" />

            {isOpen && (
              <span className="text-white font-['Poppins'] tracking-wider">
                New Chat
              </span>
            )}
          </NavLink>

          {/* ================= NOTE BOOK ================= */}
          <NavLink
            to="/project"
            className={linkStyle}
            onClick={() => {
              if (isMobile) {
                setIsOpen(false);
              }
            }}
          >
            <GiNotebook className="text-xl shrink-0" />

            {isOpen && (
              <span className="text-white font-['Poppins'] tracking-wider">
                Note Book
              </span>
            )}
          </NavLink>

        </nav>

        {/* =================================================
            SCROLLABLE CHAT AREA
        ================================================= */}
        <div
          className="
            relative
            z-10
            flex-1
            overflow-y-auto
            scrollbar-hide
          "
        >

          {/* ================= PINNED ================= */}
          <div className="mb-8">

            {isOpen ? (
              <p
                className="
                  text-xs
                  text-white
                  font-['Poppins']
                  tracking-wider
                  px-3
                  mb-3
                "
              >
                Pinned
              </p>
            ) : (
              <div className="flex justify-center mb-3">
                <GrPin className="text-lg text-gray-300" />
              </div>
            )}

            {/* PINNED CHATS */}
            {isOpen && (
              <div className="flex flex-col gap-1">

                {pinnedChats.map((chat, index) => (
                  <button
                    key={index}
                    className="
                      group
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5

                      rounded-lg

                      text-sm
                      text-gray-100

                      hover:bg-white/10
                      hover:text-white

                      transition
                    "
                  >
                    <GrPin className="text-gray-200 shrink-0" />

                    <span className="truncate text-left">
                      {chat}
                    </span>
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* ================= RECENT ================= */}
          <div>

            {isOpen ? (
              <p
                className="
                  text-xs
                  text-white
                  font-['Poppins']
                  tracking-wider
                  px-3
                  mb-3
                "
              >
                Recent
              </p>
            ) : (
              <div className="flex justify-center mb-3">
                <IoChatbubbleEllipsesOutline className="text-xl text-gray-300" />
              </div>
            )}

            {/* RECENT CHATS */}
            {isOpen && (
              <div className="flex flex-col gap-1">

                {recentChats.map((chat, index) => (
                  <button
                    key={index}
                    className="
                      group
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5

                      rounded-lg

                      text-sm
                      text-gray-100

                      hover:bg-white/10
                      hover:text-white

                      transition
                    "
                  >
                    <IoChatbubbleEllipsesOutline
                      className="
                        text-lg
                        text-gray-200
                        shrink-0
                      "
                    />

                    <span className="truncate text-left">
                      {chat}
                    </span>
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* =================================================
            USER SECTION
        ================================================= */}
        {isOpen && (
          <div
            className="
              relative
              z-10

              border-t
              border-white/[0.08]

              pt-4
              mt-4
            "
          >

            <button
              className="
                w-full
                flex
                items-center
                gap-3

                px-3
                py-3

                rounded-xl

                bg-white/[0.025]

                border
                border-white/[0.04]

                hover:bg-white/[0.08]

                transition-all
                duration-300
              "
            >

              <div
                className="
                  w-8
                  h-8

                  rounded-full

                  bg-purple-500

                  flex
                  items-center
                  justify-center

                  text-sm
                  font-bold

                  shadow-[0_0_20px_rgba(168,85,247,0.25)]
                "
              >
                S
              </div>

              <div className="text-left">

                <p className="text-sm font-medium">
                  Subhadeep
                </p>

                <p className="text-xs text-gray-500">
                  View Profile
                </p>

              </div>

            </button>

          </div>
        )}

      </aside>
    </>
  );
};

export default Sidebar;