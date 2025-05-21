import React from "react";
import { motion } from "framer-motion";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from "react";


const SigninPage = () => {
  const customBlue = "#007ACC";
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!formData.email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!formData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      // Here you can handle the form submission
      console.log("Form data:", formData);
      // Add your submission logic here (e.g., API call)
    }
  };



  return (
    <div className="font-sans min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#007ACC10] to-[#007ACC01]">
      {/* Floating background elements */}
      <motion.div
        animate={{
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5"
        style={{
          backgroundColor: customBlue,
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 min-md:bg-white/20 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Header Section */}
          <motion.div variants={item} className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#007ACC] blur-lg opacity-10 rounded-full" />
                <div className="relative px-6 py-2 rounded-full border border-[#007ACC20]">
                  <span
                    className="text-sm font-medium"
                    style={{ color: customBlue }}
                  >
                    SECURE ACCESS
                  </span>
                </div>
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600" style={{ color: customBlue }}>
              Secure access to your insurance portal
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.form
            variants={container}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Email Input */}
            <motion.div variants={item} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
                >
                  <FiMail className="text-gray-400" style={{ color: customBlue }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full outline-none bg-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </motion.div>
                {emailError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {emailError}
                  </motion.div>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
                >
                  <FiLock className="text-gray-400" style={{ color: customBlue }} />
                  <input
                    type={isVisible ? "text" : "password"}
                    placeholder="password"
                    className="w-full outline-none bg-transparent"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-gray-400" style={{ color: customBlue }} />
                    ) : (
                      <FiEye className="text-gray-400" style={{ color: customBlue }} />
                    )}
                  </motion.div>
                </motion.div>
                {passwordError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {passwordError}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={item}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0, 122, 204, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg font-bold text-white relative overflow-hidden"
              style={{ backgroundColor: customBlue }}
              type="submit"
            >
              <span className="relative z-10">Sign In</span>
              <motion.span
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.button>
          </motion.form>

          {/* Additional Links */}
          <motion.div
            variants={item}
            className="flex items-center justify-center text-sm"
          >

            <div className="text-gray-600">
              New user?{" "}
              <Link
                to="/signup"
                className="font-medium"
                style={{ color: customBlue }}
              >
                Create account
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-8 w-24 h-24 rounded-full z-0 opacity-5"
        style={{ backgroundColor: customBlue }}
      />
    </div>
  );
};

export default SigninPage;