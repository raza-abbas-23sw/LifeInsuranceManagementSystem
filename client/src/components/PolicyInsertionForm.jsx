import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";


function PolicyInsertionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const sumAssuredOptions = [
    "200,000", "250,000", "300,000", "350,000", "400,000", "450,000",
    "500,000", "600,000", "700,000", "800,000", "900,000", "1,000,000",
    "1,500,000", "2,000,000", "2,500,000", "3,000,000", "3,500,000",
    "4,000,000", "4,500,000", "5,000,000"
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Format the WhatsApp number by removing the +92 if it exists
      const formattedWhatsapp = data.whatsapp.replace(/^\+92\s?/, '');
      const payload = {
        ...data,
        whatsapp: formattedWhatsapp,
        sumAssured: parseInt(data.sumAssured.replace(/,/g, '')) // Remove commas and convert to number
      };
      const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/submit-policy", payload);
      toast.success(response.data.message || "Policy submitted successfully!");
      console.log(response.data.message || "Policy submitted successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to submit policy. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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

  // Handle WhatsApp number input
  const handleWhatsappChange = (e) => {
    let value = e.target.value;
    console.log(value)
    // Ensure it starts with +92 3 and has max 12 digits
    if (!value.startsWith("+92 3")) {
      value = "+92 3";
    }

    console.log(value)
    // Limit to 12 digits after +92
    if (value.length > 14) {
      value = value.substring(0, 14);
    }

    setValue("whatsapp", value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <Toaster reverseOrder={false}></Toaster>
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

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  } transition-all duration-200`}
                placeholder="example@gmail.com"
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm mt-1"
              >
                {errors.email.message}
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
                validate: {
                  notFuture: value => new Date(value) <= new Date() || "Date cannot be in the future",
                  minAge: value => {
                    const dob = new Date(value);
                    const diff = Date.now() - dob.getTime();
                    const ageDate = new Date(diff);
                    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                    return age >= 18 || "Must be at least 18 years old";
                  }
                }
              })}
              max={`${new Date().getFullYear() - 18}-12-31`}
              min="1950-01-01"
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
                  value: /^[0-9]{6,12}$/,
                  message: "Policy number must be 6-12 digits",
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
            <select
              {...register("sumAssured", {
                required: "Sum assured is required",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.sumAssured ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                } transition-all duration-200`}
            >
              <option value="">Select Sum Assured</option>
              {sumAssuredOptions.map((amount) => (
                <option key={amount} value={amount}>
                  Rs. {amount}
                </option>
              ))}
            </select>
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
                validate: {
                  notFuture: value => new Date(value) <= new Date() || "Date cannot be in the future"
                }
              })}
              max={new Date().toISOString().split('T')[0]}
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
                validate: {
                  notFuture: value => new Date(value) <= new Date() || "Date cannot be in the future",
                  afterStartDate: value => {
                    const startDate = watch("startDate");
                    if (!startDate) return true;
                    return new Date(value) >= new Date(startDate) || "Must be after start date";
                  }
                }
              })}
              max={new Date().toISOString().split('T')[0]}
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
              value={watch("whatsapp") || "+92 3"}
              onChange={handleWhatsappChange}
              {...register("whatsapp", {
                required: "WhatsApp number is required",
                pattern: {
                  value: /^\+92 3[0-9]{9}$/,
                  message: "Format should be +92 3XXXXXXXXX",
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
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) :
                "Submit Policy"
              }
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default PolicyInsertionForm;



