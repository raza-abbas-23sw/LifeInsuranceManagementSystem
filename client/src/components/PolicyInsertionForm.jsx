import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from 'axios';

function PolicyInsertionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);

    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/submit-policy", data);
      console.log(response.data);
      //HANDLE THIS SUCCESS MESSAGE
      console.log(response?.data?.message);
    } catch (err) {
      // HANDLE THIS ERROR IN FRONTEND
      console.log(err?.response?.data?.error);
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-6 text-center text-blue-800"
        >
          Add New Policy
        </motion.h2>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Policy Holder Name */}
          <motion.div variants={itemVariants}>
            <label className="block mb-2 font-medium text-gray-700">
              Policy Holder Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("holderName", { required: "Name is required" })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.holderName ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              CNIC Number
              <span className="text-red-500">*</span>
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.nic ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              Date of Birth
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("dob", {
                required: "Date of birth is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.dob ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              Policy Number
              <span className="text-red-500">*</span>
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.policyNumber ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              Sum Assured (Rs)
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("sumAssured", {
                required: "Sum assured is required",
                min: { value: 10000, message: "Minimum 10,000" },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.sumAssured ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              Premium (Rs)
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("premium", {
                required: "Premium is required",
                min: { value: 500, message: "Minimum 500" },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.premium ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              Starting Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("startDate", {
                required: "Start date is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.startDate ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              Last Paid Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("lastPaidDate", {
                required: "Last paid date is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastPaidDate ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
            <label className="block mb-2 font-medium text-gray-700">
              WhatsApp Number
              <span className="text-red-500">*</span>
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.whatsapp ? "border-red-500" : "border-gray-300 focus:border-blue-500"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Submit Policy
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default PolicyInsertionForm;