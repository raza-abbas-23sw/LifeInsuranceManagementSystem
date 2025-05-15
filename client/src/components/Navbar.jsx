import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  // Close dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Plans", 
      subItems: [
        { name: "See Plans", path: "/see-plans" },
        { name: "Generate Plan", path: "/generate-plan" }
      ]
    },
    { 
      name: "Manage", 
      subItems: [
        { name: "Search", path: "/search" },
        { name: "Add Policy", path: "/add" }
      ]
    },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`w-full fixed z-50 font-sans transition-all duration-500 ${scrolled ? "bg-[#007ACC] shadow-xl py-2" : "bg-[#007ACC]/90 backdrop-blur-sm py-4"}`}>
      {/* Floating particles for navbar */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10 + Math.random() * 20],
              x: [0, -5 + Math.random() * 10],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: "white",
              opacity: 0.05
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img 
            src={logo} 
            alt="State Life Logo" 
            className="w-10 h-10"
            whileHover={{
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.6 }
            }}
          />
          <motion.span 
            className="text-white text-2xl font-extrabold tracking-wide"
            initial={{ opacity: 1 }}
            whileHover={{
              background: "linear-gradient(to right, white, #a5d8ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              transition: { duration: 0.5 }
            }}
          >
            State Life Insurance
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.subItems ? (
                <>
                  <motion.button 
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeDropdown === item.name || item.subItems.some(sub => sub.path === location.pathname) ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {activeDropdown === item.name ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </motion.button>
                  
                  <motion.div 
                    className={`absolute left-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden ${activeDropdown === item.name ? "pointer-events-auto" : "pointer-events-none"}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: activeDropdown === item.name ? 1 : 0,
                      y: activeDropdown === item.name ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      {item.subItems.map((subItem) => (
                        <motion.div
                          key={subItem.name}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Link
                            to={subItem.path}
                            className="block px-4 py-3 text-gray-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                            onClick={() => setActiveDropdown(null)} // Close dropdown when clicked
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${location.pathname === item.path ? "text-white bg-white/20" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.span 
                        className="absolute bottom-0 left-1/4 h-0.5 bg-white"
                        layoutId="navIndicator"
                        style={{ width: '50%' }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
          
          <motion.div 
            className="relative ml-4 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-[#007ACC] transition-all duration-500 rounded-full bg-white hover:bg-gradient-to-r hover:from-white hover:to-blue-100 group"
            >
              <span className="relative z-10">Login</span>
              <motion.span
                className="absolute inset-0 border-2 border-white rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  opacity: 1,
                  scale: 1.1,
                  transition: { duration: 1.5, repeat: Infinity }
                }}
              />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Toggle Button */}
        <motion.button 
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X size={28} className="transform transition-transform duration-300" />
          ) : (
            <Menu size={28} className="transform transition-transform duration-300" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-[#007ACC]/95 backdrop-blur-sm">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <motion.button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                    {activeDropdown === item.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.button>
                  
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="pl-6 space-y-1 overflow-hidden"
                    >
                      {item.subItems.map((subItem) => (
                        <motion.div
                          key={subItem.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link
                            to={subItem.path}
                            className="block px-4 py-2 text-lg font-medium text-white/90 rounded-lg hover:bg-white/20 transition-colors duration-200"
                            onClick={() => {
                              setIsOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.path}
                    className="block px-4 py-3 text-lg font-medium text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4"
          >
            <Link
              to="/login"
              className="block text-center px-6 py-3 bg-white text-[#007ACC] text-lg font-bold rounded-full shadow-md hover:bg-blue-50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}