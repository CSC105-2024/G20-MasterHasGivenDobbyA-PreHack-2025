import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const [dropdownProfileOpen, setDropdownProfileOpen] = useState(false);
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav className="bg-[#ADADAD] text-[#491C70] w-full md:w-[72px] md:h-screen flex md:flex-col flex-row justify-between items-center p-4 fixed top-0 md:static z-50">
      <NavLink to="/" className="flex md:flex-col gap-6 items-center">
        <FiHome className="text-4xl" />
      </NavLink>
      <div className="text-2xl font-bold md:hidden">Lyriverse</div>
      <button
        onClick={() => setDropdownProfileOpen(!dropdownProfileOpen)}
        className="text-4xl"
      >
        <FaUserCircle />
      </button>
      {dropdownProfileOpen && (
        <div className="absolute mt-22 right-1 md:left-16 md:mb-4 w-40 md:bottom-0 bg-white shadow-lg rounded-lg overflow-hidden z-[9999]">
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-gray-700 hover:bg-[#95B9FF] hover:text-white transition"
        >
          Log Out
        </button></div>
      )}
    </nav>
  );
}
