import React, { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import How_It_Works from "./pages/How_It_Works";
import SingIn from "./pages/SingIn";
import Get_Started from "./pages/Get_Started";
import About from "./pages/About";
import Not_Found from "./pages/Not_Found";
import Terms_and_con from "./pages/Terms_and_con";
import Privacy_Policy from "./pages/Privacy_Policy";

// Private Pages
import Profile from "./pages2.o/Profile";
import Edit_Profile from "./pages2.o/Edit_Profile";
import NewChat from "./pages2.o/NewChat";
import Analysis from "./pages2.o/Analysis";
import Notebook from "./pages2.o/Notebook";


// =====================================================
// PROTECTED ROUTE
// =====================================================

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/SingIn" replace />;
  }

  return children;
};


// =====================================================
// PUBLIC ROUTE
// =====================================================

const PublicRoute = ({ isAuth, children }) => {
  if (isAuth) {
    return <Navigate to="/NewChat" replace />;
  }

  return children;
};


// =====================================================
// APP
// =====================================================

const App = () => {

  const [isAuth, setIsAuth] = useState(false);

  const location = useLocation();


  // =====================================================
  // AFTER LOGIN ROUTES
  // =====================================================

  const afterLoginRoutes = [
    "/NewChat",
    "/Profile",
    "/Edit_Profile",
    "/Analysis",
    "/Notebook",
  ];


  // =====================================================
  // AUTH ROUTES WITHOUT NAVBAR
  // =====================================================

  const authPages = [
    "/SingIn",
    "/Get_Started",
    "/About",
    "/Terms_and_con",
    "/Privacy_Policy",
  ];


  // =====================================================
  // CHECK CURRENT ROUTE
  // =====================================================

  const isAfterLoginRoute =
    afterLoginRoutes.includes(location.pathname);

  const isAuthPage =
    authPages.includes(location.pathname);


  // =====================================================
  // SHOW LOGGED-IN SIDEBAR
  // =====================================================

  const showAfterLoginLayout =
    isAuth && isAfterLoginRoute;


  // =====================================================
  // SHOW PARTICLES ONLY BEFORE LOGIN
  // =====================================================

  const showParticles =
    !isAuth;


  // =====================================================
  // SHOW FOOTER ONLY ON HOME PAGE
  // =====================================================

  const showFooter =
    location.pathname === "/" && !isAuth;


  return (
    <div
      className="
        min-h-screen
        w-full
        text-white
        overflow-x-hidden
        scroll-smooth
        bg-cover
        relative
      "
    >

      {/* =====================================================
          NAVBAR / SIDEBAR

          Public pages:
          Navbar

          Logged-in pages:
          Sidebar

          SignIn + GetStarted + About + Policies:
          No navbar/sidebar
      ===================================================== */}

      {!isAuthPage && (
        showAfterLoginLayout ? (
          <Sidebar />
        ) : (
          <Navbar
            isAuth={isAuth}
            setIsAuth={setIsAuth}
          />
        )
      )}


      {/* =====================================================
          ROUTES
      ===================================================== */}

      <Routes>


        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/Features"
          element={<Features />}
        />

        <Route
          path="/How_It_Works"
          element={<How_It_Works />}
        />

        <Route
          path="/Get_Started"
          element={<Get_Started />}
        />

        <Route
          path="/About"
          element={<About />}
        />


        {/* =================================================
            SIGN IN
        ================================================= */}

        <Route
          path="/SingIn"
          element={
            <PublicRoute isAuth={isAuth}>
              <SingIn
                setIsAuth={setIsAuth}
              />
            </PublicRoute>
          }
        />


        {/* =================================================
            AFTER LOGIN
        ================================================= */}

        <Route
          path="/NewChat"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <NewChat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Profile"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Edit_Profile"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Edit_Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Analysis"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Analysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Notebook"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Notebook />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            POLICIES
        ================================================= */}

        <Route
          path="/Terms_and_con"
          element={<Terms_and_con />}
        />

        <Route
          path="/Privacy_Policy"
          element={<Privacy_Policy />}
        />


        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={<Not_Found />}
        />

      </Routes>


      {/* =====================================================
          FOOTER — HOME PAGE ONLY
      ===================================================== */}

      {showFooter && <Footer />}


    </div>
  );
};


export default App;