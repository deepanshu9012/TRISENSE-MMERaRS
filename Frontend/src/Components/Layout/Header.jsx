import React from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "../Layout/MobileMenu";
import logoImage from "../../assets/logo-removebg-preview.png";

function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo and Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative">
              <div className="w-24 h-24 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img 
                  src={logoImage} 
                  alt="Trisense Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-xl md:text-2xl leading-tight font-semibold text-gray-900 tracking-tight">
                Trisense
              </h1>
              <p className="text-xs text-gray-500 leading-tight font-normal">
                Emotion Intelligence • Compassionate Technology
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8 flex-1 max-w-2xl mx-8">
            {[
              { path: "/", label: "Home" },
              { path: "/expressions", label: "Expressions" },
              { path: "/resources", label: "Resources" },
              { path: "/about", label: "About" },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative px-0 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Underline effect - Samsung style */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ease-in-out ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              to="/live-scan"
              className="group relative px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-purple-700 text-white font-medium text-sm shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 transition-all duration-300 hover:scale-[1.02] whitespace-nowrap overflow-hidden"
            >
              <span className="relative z-10">Join Live Scan</span>
              <span className="absolute inset-0 bg-linear-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
