import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import profile from "../assets/profile.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setShowMobileMenu(false);
    navigate("/signin");
  };

  return (
    <header className="relative border-b border-black/20 bg-white">
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-[100px] py-[7px]">
        {/* Left: logo */}
        <Link to="/welcome">
          <img src={logo} alt="Logo" className="h-8 md:h-auto" />
        </Link>

        {/* Right: links + avatar, all pushed to the far right by justify-between */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              {/* Desktop links: hidden on mobile, where the hamburger takes over */}
              <nav className="hidden md:flex items-center gap-5">
                <Link to="/new" className="font-semibold text-[#292929]">
                  New Task
                </Link>
                <Link to="/mytask" className="font-semibold text-[#292929]">
                  All Task
                </Link>
              </nav>

              {/* Desktop avatar + logout dropdown: the last item, so it sits at the far right */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  aria-label="Open profile menu"
                >
                  <img
                    src={profile}
                    alt="profile"
                    title={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setShowMobileMenu((prev) => !prev)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
              </button>
            </>
          ) : (
            /* Logged out: one set of buttons that scales with screen size */
            <div className="flex items-center gap-2 md:gap-5">
              <Link
                to="/signin"
                className="px-3 py-2 text-sm md:px-4 md:py-3 md:text-base text-white bg-[#974FD0] rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-sm md:px-4 md:py-3 md:text-base border border-[#974FD0] text-[#974FD0] rounded-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown: overlays the page instead of pushing content down */}
      {user && showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full z-20 flex flex-col gap-1 px-4 pb-4 bg-white border-b border-black/20 shadow-md">
          <Link
            to="/new"
            onClick={() => setShowMobileMenu(false)}
            className="font-montserrat font-semibold text-black py-3 border-b border-black/10"
          >
            New Task
          </Link>
          <Link
            to="/mytask"
            onClick={() => setShowMobileMenu(false)}
            className="font-montserrat font-semibold text-black py-3 border-b border-black/10"
          >
            All Task
          </Link>
          <div className="flex items-center gap-3 py-3">
            <img src={profile} alt="Profile" className="w-8 h-8 rounded-full" />
            <span className="text-sm text-black/70">{user.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-left text-red-500 font-semibold py-2"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
