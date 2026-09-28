import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import avatar from "../assets/profile.svg";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white relative">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/welcome">
          <img src={logo} alt="" />
        </Link>

        {/* Hide navbar on small screen */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/new" className="hover:text-[#974FD0]">
            New Task
          </Link>
          <Link to="/" className="hover:text-[#974FD0]">
            All Tasks
          </Link>
          <img src={avatar} alt="" />
        </nav>

        {/* Hamburger menu- visible on small screen */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-gray-700" />
          <span className="w-6 h-0.5 bg-gray-700" />
          <span className="w-6 h-0.5 bg-gray-700" />
        </button>
      </div>

      {/* Mobile dropdown menu - only rendered when open */}
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 flex flex-col gap-1 px-4 text-sm font-medium text-gray-600">
          <Link
            to="/new"
            onClick={() => setIsOpen(false)}
            className="py-2 hover:text-[#974FD0]"
          >
            New Task
          </Link>

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="py-2 hover:text-[#974FD0]"
          >
            All Tasks
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
