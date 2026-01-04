import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden relative">
      <button
        aria-label="menu"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-700"
        >
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-xl rounded-xl p-2 flex flex-col z-50">
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
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-gray-100 my-2"></div>
            <Link
              to="/live-scan"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg bg-linear-to-r from-purple-600 to-purple-700 text-white font-medium text-sm text-center shadow-md"
            >
              Join Live Scan
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
