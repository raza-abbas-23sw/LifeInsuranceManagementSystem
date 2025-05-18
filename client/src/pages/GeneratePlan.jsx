import React, { useState, useEffect } from "react";
import { calculateInsuranceData } from "../components/calculateInsuranceData";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const GeneratePlan = () => {
  // Default test data
  const defaultFormData = {
    name: "Raza Abbas",
    age: "20",
    plan: "03/20",
    sumAssured: "4,00,000",
    customSumAssured: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [insuranceResults, setInsuranceResults] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const planTypes = [
    { value: "03/10", label: "Standard (10 Years)" },
    { value: "03/15", label: "Standard (15 Years)" },
    { value: "03/20", label: "Standard (20 Years)" },
    { value: "81/20", label: "Golden (20 Years)" },
    { value: "PLA", label: "Platinium (10 Years)" },
    { value: "TAKAFUL_ENDOW_20", label: "Takaful Endowment (10 Years)" },
    { value: "TAKAFUL_ENDOW_15", label: "Takaful Endowment (15 Years)" },
    { value: "TAKAFUL_GOLDEN", label: "Takaful Golden Endowment" },
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
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Calculate insurance data
      const results = calculateInsuranceData(
        formData.name,
        parseInt(formData.age, 10),
        formData.plan,
        sumAssuredNumber
      );

      setInsuranceResults(results);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const resultVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="bg-white rounded-lg shadow-md p-6 mb-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Insurance Plan Calculator
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="65"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} className="mb-4">
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Plan
            </label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a plan</option>
              {planTypes.map((plan, index) => (
                <option key={index} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="mb-6">
            <label
              htmlFor="sumAssured"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sum Assured (PKR)
            </label>
            <select
              id="sumAssured"
              name="sumAssured"
              value={formData.sumAssured}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              required
            >
              <option value="">Select sum assured</option>
              {sumOptions.map((sum, index) => (
                <option key={index} value={sum}>
                  {sum}
                </option>
              ))}
            </select>

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
                    const formattedValue = formatCustomSum(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      customSumAssured: formattedValue,
                    }));
                  }}
                  placeholder="Enter custom amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </motion.div>
            )}
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
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
              "GET REPORT"
            )}
          </motion.button>
        </form>
      </motion.div>

      {insuranceResults && (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
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
              style={{
                width: "70px",
                height: "auto",
                position: "absolute",
                top: "10px",
                left: "10px",
              }}
            />
            <h1
              style={{
                textAlign: "center",
                fontSize: "24px",
                marginBottom: "10px",
                border: "0px solid #000",
              }}
            >
              {insuranceResults[2].value}
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
              <strong>Mumtaz Ali</strong>
              <br />
              Sum Assured Rs 2,000,000.00
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
              <tr style={{border: "1px solid #000",textAlign:"center"}}>
                <td>Age</td>
                <td style={{ border: "1px solid #000"}}>40 years</td>
              </tr>
              <tr style={{border: "1px solid #000",textAlign:"center"}}>
                <td style={{ border: "1px solid #000" }}>Term</td>
                <td style={{ border: "1px solid #000" }}>20 years</td>
              </tr>
              <tr style={{border: "1px solid #000",textAlign:"center"}}>
                <td style={{ border: "1px solid #000" }}>Sum Assured</td>
                <td style={{ border: "1px solid #000" }}>Rs. 2,000,000.00</td>
              </tr>
              <tr style={{border: "1px solid #000",textAlign:"center"}}>
                <td style={{ border: "1px solid #000" }}>Basic Premium</td>
                <td style={{ border: "1px solid #000" }}>Rs. 100,520.00</td>
              </tr>
              <tr style={{border: "1px solid #000",textAlign:"center"}}>
                <td style={{ border: "1px solid #000" }}>Fib</td>
                <td style={{ border: "1px solid #000" }}>Rs. 0.00</td>
              </tr>
              <tr style={{border: "1px solid #000",textAlign:"center"}}>
                <td style={{ border: "1px solid #000" }}>Yearly Premium</td>
                <td style={{ border: "1px solid #000" }}>Rs. 100,520.00</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2
            style={{
              fontSize: "20px",
              borderBottom: "1px solid #000",
              paddingBottom: "5px",
              marginTop: "20px",
            }}
          >
            Bonus Schedule
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "15px 0",
            }}
          >
            <tbody>
              <tr>
                <td>For the first 5 years(per year)</td>
                <td>82,000.00 X</td>
                <td>5</td>
                <td>Rs</td>
                <td>410,000.00</td>
              </tr>
              <tr>
                <td>From 6th to 16th year (per year)</td>
                <td>182,000.00 X</td>
                <td>11</td>
                <td>Rs</td>
                <td>2,002,000.00</td>
              </tr>
              <tr>
                <td>From 17th to 20th year(per year)</td>
                <td>280,000.00 X</td>
                <td>4</td>
                <td>Rs</td>
                <td>1,120,000.00</td>
              </tr>
              <tr>
                <td>Terminal Bonus (At maturity)</td>
                <td>1,200,000.00 X</td>
                <td>1</td>
                <td>Rs</td>
                <td>1,200,000.00</td>
              </tr>
              <tr>
                <td>Loyalty Terminal Bonus(At maturity)</td>
                <td>400,000.00 X</td>
                <td>1</td>
                <td>Rs</td>
                <td>400,000.00</td>
              </tr>
              <tr>
                <td>Sum Assured</td>
                <td></td>
                <td></td>
                <td>Rs</td>
                <td>2,000,000.00</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2
            style={{
              fontSize: "20px",
              borderBottom: "1px solid #000",
              paddingBottom: "5px",
              marginTop: "20px",
            }}
          >
            Current Maturity Total
          </h2>

          <p style={{ textAlign: "center" }}>
            The Current Bonus Rates have been used in the illustration, Future
            Bonus depends on future Acturial Valuation
          </p>

          <h3 style={{ fontSize: "18px", marginTop: "15px" }}>
            Expected Maturity Return is Rs. 8,000,000.00
          </h3>

          <h3 style={{ fontSize: "18px", marginTop: "15px" }}>Coverage</h3>

          <p>
            In Case of Accidental Death (God Forbid) From 1st day
            <br />
            Rs. 4,000,000.00 + Bonus(es)
            <br />
            In Case of Death (God Forbid) From 1st day
            <br />
            Rs. 2,000,000.00 + Bonus(es)
          </p>

          <hr />

          <h3 style={{ fontSize: "18px", marginTop: "15px" }}>
            Other Benefits
          </h3>

          <p>
            1) Sum Assured and all bonuses(es) are Guaranteed by Federal
            Government of Pakistan
            <br />
            2) Loan Facility (After 3 Years).
            <br />
            3) Automatic Premium Loan Facility.
          </p>

          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <p>
              Roshan Ali Lakho
              <br />
              Senior Sales Manager
              <br />
              Cells 03023646514
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePlan;
