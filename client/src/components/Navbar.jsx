import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-green-100 via-green-200 to-green-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-green-700">MealMate 🍽️</h1>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-green-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-700 transition">
            Home
          </Link>
          <Link to="/book" className="text-gray-700 hover:text-green-700 transition">
            Book Your Meal
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-700 transition transform hover:scale-110 duration-200">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-700 transition transform hover:scale-110 duration-200">
            Contact Us
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="ml-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-green-50">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-700">
            Home
          </Link>
          <Link to="/book" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-700">
            Book Your Meal
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-700">
            About Us
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-700">
            Contact Us
          </Link>
          {user ? (
            <button
              onClick={() => { setIsOpen(false); handleLogout(); }}
              className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;