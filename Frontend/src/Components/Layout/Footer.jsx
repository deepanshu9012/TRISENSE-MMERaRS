import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-linear-to-b from-gray-900 via-gray-900 to-slate-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-white text-lg mb-3">Trisense</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Helping you tune into feelings — with warmth and care.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                aria-label="twitter" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                aria-label="instagram" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="#" 
                aria-label="youtube" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                <FaYoutube size={20} />
              </a>
              <a 
                href="#" 
                aria-label="github" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Site Links Column */}
          <div>
            <h5 className="font-semibold text-white mb-4">Site</h5>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/expressions" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Expressions
                </Link>
              </li>
              <li>
                <Link 
                  to="/live-scan" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Live Scan
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h5 className="font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Column */}
          <div>
            <h5 className="font-semibold text-white mb-4">Subscribe</h5>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Get gentle reminders: wellbeing tips and brief practices.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                aria-label="email" 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-sm"
              />
              <button 
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-linear-to-r from-purple-600 to-purple-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Trisense — Designed with cultural warmth.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MdOutlinePrivacyTip size={16} />
              <span>Privacy First</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;