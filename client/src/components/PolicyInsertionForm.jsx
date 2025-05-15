import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { FiUser, FiCreditCard, FiCalendar, FiDollarSign, FiPhone } from "react-icons/fi";

function PolicyInsertionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Policy submitted successfully!");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6 overflow-hidden">
        {/* Particle Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50 + Math.random() * 100],
                x: [0, -25 + Math.random() * 50],
                opacity: [0.05, 0.2, 0.05],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: "#007ACC",
                opacity: 0.05
              }}
            />
          ))}
        </div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="hidden lg:block absolute -top-32 -left-32 w-64 h-64 opacity-5"
          style={{
            backgroundColor: "#007ACC",
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
          }}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100 relative z-10"
        >
          {/* Form header with animated gradient */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-center"
          >
            <motion.h2
              animate={{
                background: ["linear-gradient(90deg, #007ACC, #00A0E9)", "linear-gradient(90deg, #00A0E9, #007ACC)"],
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-3xl font-bold mb-2"
            >
              Add New Policy
            </motion.h2>
            <p className="text-gray-600">Complete the form to register a new insurance policy</p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Policy Holder Name */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiUser className="mr-2 text-blue-600" />
                Policy Holder Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                {...register("holderName", { required: "Name is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.holderName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.holderName && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.holderName.message}
                </motion.p>
              )}
            </motion.div>

            {/* CNIC Number */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCreditCard className="mr-2 text-blue-600" />
                CNIC Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="1234512345671"
                {...register("nic", {
                  required: "CNIC is required",
                  pattern: {
                    value: /^[0-9]{13}$/,
                    message: "CNIC must be 13 digits with no dashes",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.nic ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.nic && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.nic.message}
                </motion.p>
              )}
            </motion.div>

            {/* Date of Birth */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                Date of Birth
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                {...register("dob", {
                  required: "Date of birth is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.dob ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.dob && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.dob.message}
                </motion.p>
              )}
            </motion.div>

            {/* Policy Number */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCreditCard className="mr-2 text-blue-600" />
                Policy Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                {...register("policyNumber", {
                  required: "Policy number is required",
                  pattern: {
                    value: /^[A-Z0-9]{6,12}$/,
                    message: "Policy number must be 6-12 characters (A-Z, 0-9)",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.policyNumber ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.policyNumber && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.policyNumber.message}
                </motion.p>
              )}
            </motion.div>

            {/* Sum Assured */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiDollarSign className="mr-2 text-blue-600" />
                Sum Assured (Rs)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                {...register("sumAssured", {
                  required: "Sum assured is required",
                  min: { value: 10000, message: "Minimum 10,000" },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.sumAssured ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.sumAssured && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.sumAssured.message}
                </motion.p>
              )}
            </motion.div>

            {/* Premium */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiDollarSign className="mr-2 text-blue-600" />
                Premium (Rs)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                {...register("premium", {
                  required: "Premium is required",
                  min: { value: 500, message: "Minimum 500" },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.premium ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.premium && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.premium.message}
                </motion.p>
              )}
            </motion.div>

            {/* Starting Date */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                Starting Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.startDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.startDate && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.startDate.message}
                </motion.p>
              )}
            </motion.div>

            {/* Last Paid Date */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                Last Paid Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                {...register("lastPaidDate", {
                  required: "Last paid date is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.lastPaidDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.lastPaidDate && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.lastPaidDate.message}
                </motion.p>
              )}
            </motion.div>

            {/* WhatsApp Number */}
            <motion.div variants={itemVariants}>
              <label className="block mb-2 font-medium text-gray-700 flex items-center">
                <FiPhone className="mr-2 text-blue-600" />
                WhatsApp Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="03XXXXXXXXX"
                {...register("whatsapp", {
                  required: "WhatsApp number is required",
                  pattern: {
                    value: /^03[0-9]{9}$/,
                    message: "Format should be 03XXXXXXXXX",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.whatsapp ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } transition-all duration-200`}
              />
              {errors.whatsapp && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm mt-1"
                >
                  {errors.whatsapp.message}
                </motion.p>
              )}
            </motion.div>

            {/* Riders */}
            <motion.div variants={itemVariants}>
              <label className="block mb-3 font-medium text-gray-700">
                Select Optional Riders
              </label>
              <div className="space-y-3">
                <motion.label 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 border border-gray-200"
                >
                  <input
                    type="checkbox"
                    value="FIB"
                    {...register("riders")}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    Family Income Benefit (FIB)
                  </span>
                </motion.label>

                <motion.label 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 border border-gray-200"
                >
                  <input
                    type="checkbox"
                    value="AIB"
                    {...register("riders")}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    Accidental Injury Benefit (AIB)
                  </span>
                </motion.label>

                <motion.label 
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 border border-gray-200"
                >
                  <input
                    type="checkbox"
                    value="ADB"
                    {...register("riders")}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    Accidental Death Benefit (ADB)
                  </span>
                </motion.label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 5px 15px rgba(0, 122, 204, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Submit Policy</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
      <Footer/>
    </>
  );
}

export default PolicyInsertionForm;