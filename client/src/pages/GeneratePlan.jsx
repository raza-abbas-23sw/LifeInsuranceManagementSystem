import React, { useState, useEffect } from "react";
import { calculateInsuranceData } from "../components/calculateInsuranceData";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const GeneratePlan = () => {
  // Form state with default values
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender:"male", 
    plan: "03/20",
    sumAssured: "",
    customSumAssured: "",
  });

  const [insuranceResults, setInsuranceResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Plan types with disabled plans
  const planTypes = [
    { value: "03/10", label: "Endowment (10 Years)" },
    { value: "03/15", label: "Endowment (15 Years)" },
    { value: "03/20", label: "Endowment (20 Years)" },
    { value: "81/20", label: "Golden (20 Years)" },
    { value: "PLA", label: "Platinum (10 Years)", disabled: true },
    {
      value: "TAKAFUL_ENDOW_20",
      label: "Takaful Endowment (10 Years)",
      disabled: true,
    },
    {
      value: "TAKAFUL_ENDOW_15",
      label: "Takaful Endowment (15 Years)",
      disabled: true,
    },
    {
      value: "TAKAFUL_GOLDEN",
      label: "Takaful Golden Endowment",
      disabled: true,
    },
  ];

  const sumOptions = [
    "2,00,000",
    "3,00,000",
    "4,00,000",
    "5,00,000",
    "6,00,000",
    "7,00,000",
    "8,00,000",
    "9,00,000",
    "10,00,000",
    "15,00,000",
    "20,00,000",
    "30,00,000",
    "Other",
  ];

  useEffect(() => {
    // Animation on component mount
    document.querySelector("form")?.classList.add("animate-fade-in");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCustomSum = (value) => {
    const num = value.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get the final sum assured value
    const finalSumAssured =
      formData.sumAssured === "Other"
        ? formData.customSumAssured
        : formData.sumAssured;

    // Remove commas from the sum for calculations
    const sumAssuredNumber = parseInt(finalSumAssured.replace(/,/g, ""), 10);

    try {
      // Simulate API call delay for animation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate insurance data
      const results = calculateInsuranceData(
        formData.name,
        parseInt(formData.age, 10),
        formData.plan,
        sumAssuredNumber,
      );

      setInsuranceResults(results);
    } catch (error) {
      console.error("Calculation error:", error);
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const format = (num) => {
    // Convert to string if it's a number
    const numStr = typeof num === "number" ? num.toString() : num;

    // Remove any existing commas and non-digit characters (except decimal point)
    const cleaned = numStr.replace(/[^\d.]/g, "");

    // Split into integer and decimal parts
    const parts = cleaned.split(".");
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return integerPart + decimalPart;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            <span className="text-[#007ACC]">Make Your</span> Insurance Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your perfect insurance solution in just a few steps
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Name Field */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007ACC] focus:border-[#007ACC] transition duration-200"
                        placeholder="Enter your full name"
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>

                  {/* Age Field */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <motion.input
                        type="number"
                        id="age"
                        name="age"
                        min="20"
                        max="60"
                        value={formData.age}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007ACC] focus:border-[#007ACC] transition duration-200"
                        placeholder="Enter your age (20-60)"
                        required
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender
                    </label>
                    <div className="mt-1 relative">
                      <motion.select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007ACC] focus:border-[#007ACC] transition duration-200 appearance-none bg-white"
                        required
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="male" selected='true'>
                          male
                        </option>
                        <option value="female">female</option>
                      </motion.select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Plan Field */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="plan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Insurance Plan
                    </label>
                    <div className="mt-1 relative">
                      <motion.select
                        id="plan"
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007ACC] focus:border-[#007ACC] transition duration-200 appearance-none bg-white"
                        required
                        whileFocus={{ scale: 1.02 }}
                      >
                        {planTypes.map((plan, index) => (
                          <option
                            key={index}
                            value={plan.value}
                            disabled={plan.disabled}
                            className={plan.disabled ? "text-gray-400" : ""}
                            selected={plan.value === "03/20"} // Default selected
                          >
                            {plan.label}
                          </option>
                        ))}
                      </motion.select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sum Assured Field */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="sumAssured"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sum Assured (PKR)
                    </label>
                    <div className="mt-1 relative">
                      <motion.select
                        id="sumAssured"
                        name="sumAssured"
                        value={formData.sumAssured}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007ACC] focus:border-[#007ACC] transition duration-200 appearance-none bg-white mb-2"
                        required
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="">Select sum assured</option>
                        {sumOptions.map((sum, index) => (
                          <option key={index} value={sum}>
                            {sum}
                          </option>
                        ))}
                      </motion.select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {formData.sumAssured === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          type="text"
                          name="customSumAssured"
                          value={formData.customSumAssured}
                          onChange={(e) => {
                            const formattedValue = formatCustomSum(
                              e.target.value
                            );
                            setFormData((prev) => ({
                              ...prev,
                              customSumAssured: formattedValue,
                            }));
                          }}
                          placeholder="Enter custom amount"
                          className="block w-full px-4 py-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#007ACC] focus:border-[#007ACC] transition duration-200"
                          required
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants} className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-xl text-white text-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isSubmitting
                          ? "bg-[#007ACC]/80 cursor-not-allowed"
                          : "bg-[#007ACC] hover:bg-[#0066cc] focus:ring-[#007ACC]"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Calculating...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          GENERATE YOUR PLAN
                        </span>
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Display (unchanged from original) */}
        {insuranceResults && (
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.6,
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              border: "2px solid #000",
              backgroundColor: "#fff",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                border: "1px solid #000",
                position: "relative",
              }}
            >
              <img
                src={logo}
                alt="LIC Logo"
                className="hidden sm:block"
                style={{
                  width: "60px",
                  height: "auto",
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                }}
              />
              <img
                src={logo}
                alt="LIC Logo"
                className="hidden sm:block"
                style={{
                  width: "60px",
                  height: "auto",
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              />
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginBottom: "0px",
                  border: "0px solid #000",
                  fontWeight: "bold",
                }}
              >
                State Life Insurance Pakistan
              </h1>
              <p
                style={{
                  textAlign: "center",
                  margin: "0",
                  border: "0px solid #000",
                }}
              >
                This plan is prepared For
                <br />
                <strong>{formData.gender==='male'?"Mr.":"Ms."} {insuranceResults[0].value} </strong>
                <br />
                Sum Assured {format(insuranceResults[3].value)}
              </p>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                margin: "15px 0",
                border: "1px solid #000",
                padding: "10px",
              }}
            >
              <tbody>
                <tr style={{ border: "1px solid #000", textAlign: "center" }}>
                  <td>Age</td>
                  <td style={{ border: "1px solid #000" }}>
                    {insuranceResults[1].value}
                  </td>
                </tr>
                <tr style={{ border: "1px solid #000", textAlign: "center" }}>
                  <td style={{ border: "1px solid #000" }}>Plan</td>
                  <td style={{ border: "1px solid #000" }}>
                    {insuranceResults[2].value}
                  </td>
                </tr>
                <tr style={{ border: "1px solid #000", textAlign: "center" }}>
                  <td style={{ border: "1px solid #000" }}>Sum Assured</td>
                  <td style={{ border: "1px solid #000" }}>
                    Rs. {format(insuranceResults[3].value)}
                  </td>
                </tr>
                <tr style={{ border: "1px solid #000", textAlign: "center" }}>
                  <td style={{ border: "1px solid #000" }}>Annual Premium</td>
                  <td style={{ border: "1px solid #000" }}>
                    Rs. {format(insuranceResults[4].value)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <hr /> */}

            <h2
              style={{
                fontSize: "20px",
                border: "1px solid #000",
                marginTop: "20px",
                textAlign: "center",
                borderBottom: "0px",
                backgroundColor: "#007ACC",
                color: "#fff",
                fontWeight: "bold",
                padding: "5px",
              }}
            >
              Bonus Schedule
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #000",
                borderTop: "0px",
              }}
            >
              <tbody>
                <tr style={{ border: "1px solid #000", paddingLeft: "5px" }}>
                  <td style={{ border: "1px solid #000", paddingLeft: "5px" }}>
                    For the first 5 years(per year)
                  </td>
                  <td style={{ border: "1px solid #000", textAlign: "center" }}>
                    {Math.round(insuranceResults[6].value / 5)} X 5
                  </td>
                  <td style={{ border: "1px solid #000", textAlign: "center" }}>
                    Rs {format(Math.round(insuranceResults[6].value))}
                  </td>
                </tr>
                {insuranceResults[2].value !== "Endowment (10 Years)" &&
                  insuranceResults[2].value !== "Endowment (15 Years)" && (
                    <>
                      <tr style={{ border: "1px solid #000" }}>
                        <td
                          style={{
                            border: "1px solid #000",
                            paddingLeft: "5px",
                          }}
                        >
                          From 6th to 16th year (per year)
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          {Math.round(insuranceResults[7].value / 11)} X 11
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          Rs {format(Math.round(insuranceResults[7].value))}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #000" }}>
                        <td
                          style={{
                            border: "1px solid #000",
                            paddingLeft: "5px",
                          }}
                        >
                          From 17th to 20th year(per year)
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          {Math.round(insuranceResults[8].value / 4)} X 4
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          Rs {format(Math.round(insuranceResults[8].value))}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #000" }}>
                        <td
                          style={{
                            border: "1px solid #000",
                            paddingLeft: "5px",
                          }}
                        >
                          Terminal Bonus (At maturity)
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          {insuranceResults[9].value} X 1
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          Rs {format(insuranceResults[9].value)}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #000" }}>
                        <td
                          style={{
                            border: "1px solid #000",
                            paddingLeft: "5px",
                          }}
                        >
                          Loyalty Terminal Bonus(At maturity)
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          {insuranceResults[10].value} X 1
                        </td>
                        <td
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                          }}
                        >
                          Rs {format(insuranceResults[10].value)}
                        </td>
                      </tr>
                    </>
                  )}
                {insuranceResults[2].value === "Endowment (10 Years)" && (
                  <>
                    <tr style={{ border: "1px solid #000" }}>
                      <td
                        style={{ border: "1px solid #000", paddingLeft: "5px" }}
                      >
                        From 6th to 10th year (per year)
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        {Math.round(insuranceResults[7].value / 5)} X 5
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Rs {format(insuranceResults[7].value)}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #000" }}>
                      <td
                        style={{ border: "1px solid #000", paddingLeft: "5px" }}
                      >
                        Loyalty Terminal Bonus(At maturity)
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        {insuranceResults[8].value} X 1
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Rs {format(insuranceResults[8].value)}
                      </td>
                    </tr>
                  </>
                )}

                {insuranceResults[2].value === "Endowment (15 Years)" && (
                  <>
                    <tr style={{ border: "1px solid #000" }}>
                      <td
                        style={{ border: "1px solid #000", paddingLeft: "5px" }}
                      >
                        From 6th to 15th year (per year)
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        {Math.round(insuranceResults[7].value / 10)} X 10
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Rs {format(Math.round(insuranceResults[7].value))}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #000" }}>
                      <td
                        style={{ border: "1px solid #000", paddingLeft: "5px" }}
                      >
                        Terminal Bonus (At maturity)
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        {insuranceResults[8].value} X 1
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Rs {format(insuranceResults[8].value)}
                      </td>
                    </tr>
                    <tr style={{ border: "1px solid #000" }}>
                      <td
                        style={{ border: "1px solid #000", paddingLeft: "5px" }}
                      >
                        Loyalty Terminal Bonus(At maturity)
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        {insuranceResults[9].value} X 1
                      </td>
                      <td
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Rs {format(insuranceResults[9].value)}
                      </td>
                    </tr>
                  </>
                )}

                <tr style={{ border: "1px solid #000" }}>
                  <td style={{ border: "1px solid #000", paddingLeft: "5px" }}>
                    Sum Assured
                  </td>
                  <td style={{ border: "1px solid #000" }}></td>
                  <td style={{ border: "1px solid #000", textAlign: "center" }}>
                    Rs {format(insuranceResults[3].value)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style={{
                fontSize: "20px",
                border: "1px solid #000",
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "#007ACC",
                color: "#fff",
                fontWeight: "bold",
                padding: "5px",
              }}
            >
              <h1> Current Maturity Total</h1>
              <h1>Rs {format(insuranceResults[5].value)}</h1>
            </div>

            <p
              style={{
                textAlign: "center",
                border: "1px solid #000",
                marginTop: "10px",
              }}
            >
              The Current Bonus Rates have been used in the illustration, Future
              Bonus depends on future Acturial Valuation
            </p>

            <h1
              style={{
                fontSize: "18px",
                marginTop: "10px",
                border: "1px solid #000",
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: "#007ACC",
                padding: "5px",
              }}
            >
              Expected Maturity Return is Rs.{" "}
              {format(insuranceResults[3].value * 4)}
            </h1>

            <h3
              style={{
                fontSize: "18px",
                marginTop: "10px",
                border: "1px solid #000",
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: "#007ACC",
                padding: "5px",
              }}
            >
              Coverage
            </h3>

            <p
              style={{
                textAlign: "center",
                border: "1px solid #000",
                borderTop: "0px",
              }}
            >
              In Case of Accidental Death (God Forbid), if ADB is added, From
              1st day.
              <br />
              Rs. {format(insuranceResults[3].value * 2)} + Bonus(es)
              <br />
              In Case of Death (God Forbid) From 1st day
              <br />
              Rs. {format(insuranceResults[3].value)} + Bonus(es)
            </p>

            <h3
              style={{
                fontSize: "18px",
                marginTop: "10px",
                border: "1px solid #000",
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: "#007ACC",
                padding: "5px",
              }}
            >
              Other Benefits
            </h3>

            <p
              style={{
                textAlign: "left",
                border: "1px solid #000",
                marginTop: "0px",
                borderTop: "0px",
              }}
            >
              1) Sum Assured and all bonuses(es) are Guaranteed by Federal
              Government of Pakistan
              <br />
              2) Loan Facility (After 3 Years).
              <br />
              3) Automatic Premium Loan Facility.
            </p>

            <div
              style={{
                marginTop: "10px",
                border: "1px solid #000",
                textAlign: "center",
                backgroundColor: "#007ACC",
                color: "#fff",
                padding: "5px",
              }}
            >
              <p>
                Roshan Ali Lakho || Senior Sales Manager || Cell 03023646514
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePlan;
