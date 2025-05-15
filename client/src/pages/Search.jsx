import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { FiSearch, FiUser, FiCreditCard, FiCalendar, FiDollarSign, FiPhone, FiChevronDown } from "react-icons/fi";

// Simulated fetch function with all fields
const fetchPolicies = () => {
  return Promise.resolve([
    {
      holderName: "Majid Ali",
      cnic: "1234512345671",
      dateOfBirth: "1985-05-15",
      policyNumber: "AB123456",
      sumAssured: 500000,
      premium: 12000,
      startDate: "2021-01-01",
      lastPaidDate: "2023-06-01",
      whatsapp: "03001234567",
      riders: ["FIB", "ADB"]
    },
    {
      holderName: "Raza Abbas",
      cnic: "1234512345672",
      dateOfBirth: "1978-11-22",
      policyNumber: "AB123457",
      sumAssured: 500000,
      premium: 12000,
      startDate: "2015-01-01",
      lastPaidDate: "2023-05-15",
      whatsapp: "03001234568",
      riders: ["AIB"]
    },
    {
      holderName: "Sara Khan",
      cnic: "1234512345673",
      dateOfBirth: "1992-08-30",
      policyNumber: "CD789012",
      sumAssured: 750000,
      premium: 15000,
      startDate: "2020-03-15",
      lastPaidDate: "2023-07-20",
      whatsapp: "03111234567",
      riders: ["FIB", "AIB"]
    },
    {
      holderName: "Ali Ahmed",
      cnic: "1234512345674",
      dateOfBirth: "1980-04-25",
      policyNumber: "EF345678",
      sumAssured: 1000000,
      premium: 20000,
      startDate: "2018-11-01",
      lastPaidDate: "2023-08-05",
      whatsapp: "03221234567",
      riders: ["ADB"]
    },
    {
      holderName: "Fatima Riaz",
      cnic: "1234512345675",
      dateOfBirth: "1975-12-10",
      policyNumber: "GH901234",
      sumAssured: 300000,
      premium: 8000,
      startDate: "2019-06-20",
      lastPaidDate: "2023-07-15",
      whatsapp: "03331234567",
      riders: []
    },
    {
      holderName: "Imran Khan",
      cnic: "1234512345676",
      dateOfBirth: "1988-07-18",
      policyNumber: "IJ567890",
      sumAssured: 600000,
      premium: 14000,
      startDate: "2022-02-10",
      lastPaidDate: "2023-08-01",
      whatsapp: "03441234567",
      riders: ["FIB", "AIB", "ADB"]
    }
  ]);
};

// Helper functions remain the same
const calculateAge = (dobString) => {
  if (!dobString) return "N/A";
  const dob = new Date(dobString);
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

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
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Fetch and sort data
  useEffect(() => {
    setIsLoading(true);
    fetchPolicies().then((data) => {
      const sorted = sortPolicies(data, sortOption);
      setPolicies(sorted);
      setFilteredPolicies(sorted);
      setIsLoading(false);
    });
  }, [sortOption]);

  // Sort function
  const sortPolicies = (data, option) => {
    const sorted = [...data];
    switch(option) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      case "highest":
        return sorted.sort((a, b) => b.sumAssured - a.sumAssured);
      case "lowest":
        return sorted.sort((a, b) => a.sumAssured - b.sumAssured);
      default:
        return sorted;
    }
  };

  // Filter by search term
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase().trim();
    const results = policies.filter((policy) => {
      const year = policy.startDate.split("-")[0];
      const dobYear = policy.dateOfBirth.split("-")[0];
      return (
        policy.holderName.toLowerCase().includes(lowerTerm) ||
        policy.policyNumber.toLowerCase().includes(lowerTerm) ||
        policy.startDate.includes(lowerTerm) ||
        policy.cnic.includes(lowerTerm) ||
        year.includes(lowerTerm) ||
        dobYear.includes(lowerTerm)
      );
    });
    setFilteredPolicies(results);
    setVisibleCount(4);
    setExpandedPolicy(null);
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
      boxShadow: "0 10px 25px -5px rgba(0, 122, 204, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const toggleExpand = (policyNumber) => {
    setExpandedPolicy(expandedPolicy === policyNumber ? null : policyNumber);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        {/* Particle Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40 + Math.random() * 80],
                x: [0, -20 + Math.random() * 40],
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.1, 1]
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
                backgroundColor: "#007ACC",
                opacity: 0.05
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-2 text-blue-800"
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
            >
              Search Insurance Policies
            </motion.h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Find policy details with our comprehensive search tool
            </p>
          </motion.div>

          {/* Search and Sort */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, policy number, CNIC, or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-4 border-2 border-blue-100 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-lg"
              />
            </div>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center justify-between w-full md:w-48 px-4 py-4 bg-white border-2 border-blue-100 rounded-xl shadow-sm focus:outline-none transition-all duration-300"
              >
                <span className="text-gray-700">Sort: {sortOption}</span>
                <FiChevronDown className={`ml-2 transition-transform ${showSortOptions ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {showSortOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-full md:w-48 bg-white rounded-xl shadow-lg z-10 border border-gray-100"
                  >
                    {["newest", "oldest", "highest", "lowest"].map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ backgroundColor: "#f0f7ff" }}
                        onClick={() => {
                          setSortOption(option);
                          setShowSortOptions(false);
                        }}
                        className={`w-full text-left px-4 py-3 ${sortOption === option ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
              />
            </div>
          ) : filteredPolicies.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <AnimatePresence>
                {filteredPolicies.slice(0, visibleCount).map((policy, index) => (
                  <motion.div
                    key={`${policy.policyNumber}-${index}`}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 cursor-pointer"
                      onClick={() => toggleExpand(policy.policyNumber)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {policy.holderName}
                            <span className="text-sm font-normal text-blue-100 ml-2">
                              (Age: {calculateAge(policy.dateOfBirth)})
                            </span>
                          </h3>
                          <p className="text-blue-100 text-sm">
                            Policy #: {policy.policyNumber}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedPolicy === policy.policyNumber ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown className="text-white" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: expandedPolicy === policy.policyNumber ? "auto" : 0,
                          opacity: expandedPolicy === policy.policyNumber ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <FiCreditCard className="text-blue-500 mr-2 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">CNIC</p>
                                <p className="font-medium">{policy.cnic}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <FiUser className="text-blue-500 mr-2 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Date of Birth</p>
                                <p className="font-medium">
                                  {formatDate(policy.dateOfBirth)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <FiDollarSign className="text-blue-500 mr-2 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Sum Assured</p>
                                <p className="font-medium text-green-600">
                                  Rs {policy.sumAssured.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <FiDollarSign className="text-blue-500 mr-2 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Premium</p>
                                <p className="font-medium text-blue-600">
                                  Rs {policy.premium.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t border-gray-100 flex items-start">
                            <FiCalendar className="text-blue-500 mr-2 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Policy Duration</p>
                              <p className="font-medium">
                                {calculatePolicyDuration(policy.startDate)}
                                <span className="text-gray-500 ml-2">
                                  (since {formatDate(policy.startDate)})
                                </span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <FiCalendar className="text-blue-500 mr-2 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Last Payment</p>
                                <p className="font-medium">
                                  {formatDate(policy.lastPaidDate)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <FiPhone className="text-blue-500 mr-2 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">WhatsApp</p>
                                <p className="font-medium">{policy.whatsapp}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <FiCreditCard className="text-blue-500 mr-2 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Optional Riders</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {policy.riders.length > 0 ? (
                                  policy.riders.map((rider) => (
                                    <motion.span
                                      key={rider}
                                      whileHover={{ scale: 1.05 }}
                                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold"
                                    >
                                      {rider}
                                    </motion.span>
                                  ))
                                ) : (
                                  <span className="text-gray-400">None</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
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
              <motion.p 
                className="text-gray-500"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Scroll down to load more policies...
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;