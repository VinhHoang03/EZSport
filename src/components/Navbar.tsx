import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon, UserIcon, LogOutIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-border py-4" : "bg-gradient-to-r from-brand-navy/95 to-brand-navy py-6"}`}
      initial={{
        y: -100,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span
            className={`text-xl font-bold tracking-tight ${isScrolled ? "text-brand-navy" : "text-white"}`}
          >
            EZSport
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/listing")}
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-brand-navy hover:text-brand-coral" : "text-white hover:text-brand-coral"}`}
          >
            Find Courts
          </button>
          {isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/bookings")}
                className={`text-sm font-medium transition-colors ${isScrolled ? "text-brand-navy hover:text-brand-coral" : "text-white hover:text-brand-coral"}`}
              >
                My Bookings
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className={`text-sm font-medium transition-colors ${isScrolled ? "text-brand-navy hover:text-brand-coral" : "text-white hover:text-brand-coral"}`}
              >
                Dashboard
              </button>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isScrolled ? "text-brand-navy hover:bg-gray-100 border border-brand-border" : "text-white hover:bg-white/20 border border-white/40"}`}
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className={`flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border transition-colors cursor-pointer ${isScrolled ? "border-brand-border hover:shadow-md bg-white" : "border-white/40 hover:bg-white/20 bg-white/10"}`}
            >
              <MenuIcon
                className={`w-4 h-4 ${isScrolled ? "text-brand-navy" : "text-white"}`}
              />

              <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center text-white">
                <UserIcon className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
