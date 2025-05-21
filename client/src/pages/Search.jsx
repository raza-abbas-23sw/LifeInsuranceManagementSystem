import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// Helper functions
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

const fetchPolicies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/fetch-policies`);
    return response.data.policies;
  } catch (err) {
    toast.error("Failed to fetch policies. Please try again later.");
    throw err;
  }
};


// SERVER CONNECTIONS
const deletePolicy = async (policyId) => {
  console.log("POLICYID", policyId)
  try {
    await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-policy", { policyId });
    toast.success("Policy deleted successfully");
    return true;
  } catch (err) {
    toast.error("Failed to delete policy. Please try again later.");
    return false;
  }
};

const updatePolicy = async (policyId, updatedData) => {
  console.log("policyId: ", policyId)
  console.log("updatedData: ", updatedData)
  try {
    await axios.put(import.meta.env.VITE_SERVER_DOMAIN + "/update-policy", { policyId, ...updatedData });
    toast.success("Policy updated successfully");
    return true;
  } catch (err) {
    toast.error("Failed to update policy. Please try again later.");
    return false;
  }
};

function Search() {
  let riders_arr = ["AIB", "FIB", "ADB"];
  const [searchTerm, setSearchTerm] = useState("");
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [editFormData, setEditFormData] = useState({
    holderName: "",
    sumAssured: 0,
    premium: 0,
    whatsapp: "",
    email: "",
    dob: "",
    nic: "",
    startDate: "",
    lastPaidDate: "",
    policyNumber: "",
    riders: []
  });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch and sort data
  useEffect(() => {
    const loadPolicies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPolicies();
        const sorted = [...data].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        setPolicies(sorted);
        setFilteredPolicies(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPolicies();
  }, []);

  // Filter by search term
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase().trim();
    const results = policies.filter((policy) => {
      const year = policy.startDate?.split("-")[0] || "";
      const dobYear = policy.dob?.split("-")[0] || "";
      return (
        policy.holderName?.toLowerCase().includes(lowerTerm) ||
        policy.policyNumber?.toLowerCase().includes(lowerTerm) ||
        policy.startDate?.includes(lowerTerm) ||
        policy.nic?.includes(lowerTerm) ||
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



  // Handle edit
  const handleEditClick = (policy) => {
    setEditingPolicy(policy);
    console.log(policy)
    setEditFormData({
      holderName: policy.holderName,
      sumAssured: policy.sumAssured,
      premium: policy.premium,
      whatsapp: policy.whatsapp,
      email: policy.email,
      dob: policy.dob,
      nic: policy.nic,
      startDate: policy.startDate,
      lastPaidDate: policy.lastPaidDate,
      policyNumber: policy.policyNumber,
      riders: policy.riders
    });
  };


  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    setEditFormData(prev => ({
      ...prev,
      [name]: name === "sumAssured" || name === "premium" ? Number(value) : value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Policy Number validation
    if (!/^\d{6,12}$/.test(editFormData.policyNumber)) {
      newErrors.policyNumber = "Policy number must be 6-12 digits";
    }

    // CNIC validation
    if (!/^\d{13}$/.test(editFormData.nic)) {
      newErrors.nic = "CNIC must be 13 digits without dashes";
    }

    // Premium validation
    if (editFormData.premium <= 500) {
      newErrors.premium = "Premium must be more than 500";
    }

    // WhatsApp validation
    if (!/^3\d{9}$/.test(editFormData.whatsapp)) {
      newErrors.whatsapp = "Invalid format. Use 3XXXXXXXXX";
    }

    // Email validation
    if (editFormData.email && !/^\S+@\S+\.\S+$/.test(editFormData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Date validations
    const today = new Date();
    const dob = new Date(editFormData.dob);
    const startDate = new Date(editFormData.startDate);
    const lastPaidDate = new Date(editFormData.lastPaidDate);

    if (dob >= today) newErrors.dob = "Date of birth cannot be in the future";
    if (startDate >= today) newErrors.startDate = "Start date cannot be in the future";
    if (lastPaidDate >= today) newErrors.lastPaidDate = "Last paid date cannot be in the future";

    if (startDate <= dob) {
      newErrors.startDate = "Start date must be after date of birth";
    }

    if (lastPaidDate <= startDate) {
      newErrors.lastPaidDate = "Last paid date must be after start date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({})

    const success = await updatePolicy(editingPolicy._id, editFormData);
    if (success) {
      const updatedPolicies = policies.map(policy =>
        policy._id === editingPolicy._id ? { ...policy, ...editFormData } : policy
      );
      setPolicies(updatedPolicies);
      setEditingPolicy(null);
    }
  };

  const handleEditRidersChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the rider to the array if checked
      setEditFormData((prev) => ({
        ...prev,
        riders: [...prev.riders, value],
      }));
    } else {
      // Remove the rider from the array if unchecked
      setEditFormData((prev) => ({
        ...prev,
        riders: prev.riders.filter((r) => r !== value),
      }));
    }
  };


  // Handle delete
  const handleDeleteClick = (policyId) => {
    console.log(policyId)
    setShowDeleteConfirm(policyId);
  };

  const confirmDelete = async () => {
    const policyId = showDeleteConfirm;
    const success = await deletePolicy(policyId);
    if (success) {
      setPolicies(policies.filter(policy => policy._id !== policyId));
    }
    setShowDeleteConfirm(null);
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
      {/* Toast container */}
      <Toaster reverseOrder={false}></Toaster>

      {/* Header */}
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

      {/* Search input */}
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

      {/* Loading state */}
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
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Edit/Delete buttons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(policy)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    aria-label="Edit policy"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(policy._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    aria-label="Delete policy"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Policy content */}
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
                      {policy.riders?.length > 0 ? (
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

      {/* Load more indicator */}
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

      {/* Edit Modal */}
      {editingPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md h-[80vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4">Edit Policy</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holder Name
                  </label>
                  <input
                    type="text"
                    name="holderName"
                    value={editFormData.holderName}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={editFormData.policyNumber}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                  {errors.policyNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.policyNumber}</p>
                  )}
                </div>
                {/* CNIC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CNIC
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={editFormData.nic}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                  {errors.nic && (
                    <p className="text-red-500 text-sm mt-1">{errors.nic}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sum Assured (Rs)
                  </label>
                  <input
                    type="number"
                    name="sumAssured"
                    value={editFormData.sumAssured}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium (Rs)
                  </label>
                  <input
                    type="number"
                    name="premium"
                    value={editFormData.premium}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="501"
                    required
                  />
                  {errors.premium && (
                    <p className="text-red-500 text-sm mt-1">{errors.premium}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={editFormData.whatsapp}
                    onChange={handleEditFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    pattern="\3\d{9}"
                    required
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                  )}
                </div>

                {/* Dates */}
                {['dob', 'startDate', 'lastPaidDate'].map((dateField) => (
                  <div key={dateField}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {dateField.charAt(0).toUpperCase() + dateField.slice(1)}
                    </label>
                    <input
                      type="date"
                      name={dateField}
                      value={editFormData[dateField]}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                    {errors[dateField] && (
                      <p className="text-red-500 text-sm mt-1">{errors[dateField]}</p>
                    )}
                  </div>
                ))}

                {/* Riders as radio buttons */}
                <div className="space-y-2">
                  {riders_arr.map((rider, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="riders"
                        value={rider}
                        checked={editFormData.riders.includes(rider)}
                        onChange={handleEditRidersChange}
                        className={
                          editFormData.riders.includes(rider)
                            ? "accent-blue-500"
                            : "accent-gray-400"
                        }
                      />
                      <span
                        className={
                          editFormData.riders.includes(rider)
                            ? "text-blue-600"
                            : "text-gray-400"
                        }
                      >
                        {rider}
                      </span>
                    </label>
                  ))}
                </div>


              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingPolicy(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this policy? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Policy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Search;