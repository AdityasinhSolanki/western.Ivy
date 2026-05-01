import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black mt-5 text-white px-4 sm:px-8 lg:px-10 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">

        {/* LEFT SIDE */}
        <div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-wide">
            Western Ivy
          </h3>

          <p className="text-gray-400 mt-4 max-w-sm text-sm sm:text-base">
            Where comfort meets crazy.
            Premium streetwear designed for everyday confidence.
          </p>
          <div className="flex gap-4 mt-4 text-2xl">

            {/* WhatsApp */}
            <a
              href="https://wa.me/918849157601"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-green-500 hover:scale-110 transition" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/_the__zoro___"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-pink-500 hover:scale-110 transition" />
            </a>

          </div>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-sm">

          <Link to="/terms-conditions" className="hover:text-gray-300 transition">
            Terms & Conditions
          </Link>

          <Link to="/returns-exchange" className="hover:text-gray-300 transition">
            Returns & Exchange Policy
          </Link>

          <Link to="/privacy-policy" className="hover:text-gray-300 transition">
            Privacy Policy
          </Link>

          <Link to="/ContactUs" className="hover:text-gray-300 transition">
            Contact Us
          </Link>

          <Link to="/about" className="hover:text-gray-300 transition">
            About Us
          </Link>

          <Link to="/help-support" className="hover:text-gray-300 transition">
            Help & Support
          </Link>

          <Link to="/login" className="hover:text-gray-300 transition">
            Login
          </Link>

          <Link to="/signup" className="hover:text-gray-300 transition">
            Signup
          </Link>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} Western Ivy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;