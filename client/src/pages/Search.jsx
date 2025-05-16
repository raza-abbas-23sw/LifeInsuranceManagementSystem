import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Simulated fetch function with all fields
const fetchPolicies = async () => {
  try {
    var response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/fetch-policies");
    console.log(response);
  } catch (err) {
    console.log(err);
  }

  return response.data.policies;
  
};

// Helper function to calculate age
const calculateAge = (dobString) => {
  if (!dobString) return "N/A";
  const dob = new Date(dobString);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Helper function to calculate policy duration
const calculatePolicyDuration = (startDateString) => {
  if (!startDateString) return "N/A";
  const startDate = new Date(startDateString);
  const diff = Date.now() - startDate.getTime();
  const durationDate = new Date(diff);

  const years = durationDate.getUTCFullYear() - 1970;
  const months = durationDate.getUTCMonth();

  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
};

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch and sort data
  useEffect(() => {
    setIsLoading(true);
    fetchPolicies().then((data) => {
      const sorted = [...data].sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setPolicies(sorted);
      setFilteredPolicies(sorted);
      setIsLoading(false);
    });
  }, []);

  // Filter by search term
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase().trim();
    const results = policies.filter((policy) => {
      const year = policy.startDate.split("-")[0];
      const dobYear = policy.dob.split("-")[0];
      return (
        policy.holderName.toLowerCase().includes(lowerTerm) ||
        policy.policyNumber.toLowerCase().includes(lowerTerm) ||
        policy.startDate.includes(lowerTerm) ||
        policy.nic.includes(lowerTerm) ||
        year.includes(lowerTerm) ||
        dobYear.includes(lowerTerm)
      );
    });
    setFilteredPolicies(results);
    setVisibleCount(4);
  }, [searchTerm, policies]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisibleCount((prev) => prev + 4);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-blue-800">
          🔍 Search Insurance Policies
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Find policy details with our comprehensive search tool
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <input
          type="text"
          placeholder="Search by name, policy number, CNIC, or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border-2 border-blue-100 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg"
        />
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPolicies.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredPolicies.slice(0, visibleCount).map((policy, index) => (
              <motion.div
                key={`${policy.policyNumber}-${index}`}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4">
                  <h3 className="text-xl font-bold text-white">
                    {policy.holderName}
                    <span className="text-sm font-normal text-blue-100 ml-2">
                      (Age: {calculateAge(policy.dob)})
                    </span>
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Policy #: {policy.policyNumber}
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">CNIC</p>
                      <p className="font-medium">{policy.nic}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">
                        {formatDate(policy.dob)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sum Assured</p>
                      <p className="font-medium text-green-600">
                        Rs {policy.sumAssured.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Premium</p>
                      <p className="font-medium text-blue-600">
                        Rs {policy.premium.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Policy Duration</p>
                    <p className="font-medium">
                      {calculatePolicyDuration(policy.startDate)}
                      <span className="text-gray-500 ml-2">
                        (since {formatDate(policy.startDate)})
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Last Payment</p>
                      <p className="font-medium">
                        {formatDate(policy.lastPaidDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{policy.whatsapp}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Optional Riders</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {policy.riders.length > 0 ? (
                        policy.riders.map((rider) => (
                          <span
                            key={rider}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold"
                          >
                            {rider}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No policies found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or check for typos
          </p>
        </motion.div>
      )}

      {filteredPolicies.length > visibleCount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 animate-pulse">
            Scroll down to load more policies...
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Search;