import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-200 via-green-100 to-green-200 text-gray-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-green-700 mb-2">MealMate 🍽️</h2>
        <p className="mb-6 text-sm">Helping students pre-book meals & reduce food waste.</p>

        {/* Navigation Links */}
        <div className="flex justify-center flex-wrap gap-6 mb-6 text-sm">
          <Link to="/" className="hover:text-green-700 transition">Home</Link>
          <Link to="/book" className="hover:text-green-700 transition">Book Meal</Link>
          <Link to="/about" className="hover:text-green-700 transition">About Us</Link>
          <Link to="/contact" className="hover:text-green-700 transition">Contact</Link>
        </div>

        {/* Divider */}
        <hr className="border-t border-green-300 my-4 w-1/2 mx-auto" />

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} MealMate. 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
