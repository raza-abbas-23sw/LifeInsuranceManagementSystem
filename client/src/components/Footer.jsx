import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import {
  FiShield,
  FiArrowRight,
  FiClock,
  FiDollarSign,
  FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden pt-20 pb-12">


      {/* Floating decorative elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-32 left-1/4 w-64 h-64 opacity-5 hidden lg:block"
        style={{
          backgroundColor: "#007ACC",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold">State Life</span>
            </div>
            <p className="text-gray-400">
              Protecting families since 1972 with trusted life insurance
              solutions.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              <span>Quick Links</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5"
                style={{ backgroundColor: "#007ACC" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Home",
                  path: "/",
                },
                {
                  name: "Explore Plans",
                  path: "/see-plans",
                },
                {
                  name: "Make Your Plan",
                  path: "/generate-plan",
                },
                {
                  name: "Search Policy",
                  path: "/search",
                },
                {
                  name: "Add Policy",
                  path: "/add",
                },
                {
                  name: "FAQs",
                  path: "/faqs",
                },
                {
                  name: "Contact",
                  path: "/contact",
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-[#007ACC] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              <span>Contact Us</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5"
                style={{ backgroundColor: "#007ACC" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-4">
              {[
                "Mon-Fri: 9AM - 6PM",
                "raza84abbas@gmail.com",
                "+92 3023646514",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-400"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px w-full bg-gray-800 mb-8"
          style={{ originX: 0 }}
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm text-center"
        >
          © {new Date().getFullYear()} State Life. All rights reserved.
        </motion.p>
      </div>

      {/* Floating scroll-to-top button */}
      {showScroll && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-20"
          style={{ backgroundColor: "#007ACC" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
