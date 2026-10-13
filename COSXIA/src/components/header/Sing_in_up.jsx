import React from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const Sing_in_up = () => {
  return (
    <div className="flex items-center">
      <Link
        to="/SingIn"
        className="
          group
          relative
          flex items-center gap-2
          px-5 py-2
          rounded-lg
          text-sm
          font-semibold
          font-nova
          tracking-wide
          text-white
          bg-black
          shadow-[0_0_20px_rgba(139,92,246,0.25)]
          transition-all duration-300
          hover:scale-[1.04]
          active:scale-95
        "
      >
        <LogIn
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />

        <span>Login</span>
      </Link>
    </div>
  );
};

export default Sing_in_up;