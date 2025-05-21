import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiDollarSign, FiCalendar, FiUser, FiTrendingUp, FiAward, FiPhone } from 'react-icons/fi';

const PlanCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className="h-48 bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
        <div className="mb-4 bg-white rounded-full p-4 shadow-sm">
          {plan.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 text-center">{plan.name}</h3>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Min. Premium</span>
          <span className="font-bold text-[#007ACC]">{plan.minPremium}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Coverage Period</span>
          <span className="font-bold">{plan.coveragePeriod}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">Key Benefit</span>
          <span className="font-bold text-[#007ACC] text-right">{plan.keyBenefit}</span>
        </div>
        
        <div className="space-y-3 mb-6">
          {plan.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-start">
              <svg className="h-5 w-5 text-[#007ACC] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <a href={plan.details} target='_blank' rel='noopener noreferrer' className="block">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#0066cc" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-[#007ACC] text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            View Details
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
};

const SeePlans = () => {
  // WhatsApp redirection function
  const redirectToWhatsApp = () => {
    const phoneNumber = '923023646514'; // Replace with actual State Life WhatsApp number
    const message = 'Hello, I would like to inquire about State Life insurance plans.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const plans = [
    {
      id: 'islamic-takaful',
      name: 'Islamic Takaful',
      icon: <FiShield className="text-3xl text-[#007ACC]" />,
      minPremium: 'PKR 3,000/year',
      coveragePeriod: '5-30 years',
      keyBenefit: 'Sharia-compliant',
      features: [
        'Based on Islamic principles',
        'No interest (Riba) involved',
        'Profit-sharing model',
        'Death and maturity benefits'
      ],
      details: 'https://www.statelife.com.pk/en/productlist/takaful-products'
    },
    {
      id: 'endowment',
      name: 'Endowment',
      icon: <FiDollarSign className="text-3xl text-[#007ACC]" />,
      minPremium: 'PKR 5,000/year',
      coveragePeriod: '10-25 years',
      keyBenefit: 'Savings + Protection',
      features: [
        'Combines savings and protection',
        'Fixed maturity period',
        'Lump sum payment at maturity'
      ],
      details: 'https://statelife.com.pk/en/product/empower-your-life/endowment-table-03'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: <FiAward className="text-3xl text-[#007ACC]" />,
      minPremium: 'PKR 10,000/year',
      coveragePeriod: '10-30 years',
      keyBenefit: 'High-value coverage',
      features: [
        'Higher sum assured',
        'Comprehensive coverage',
        'Additional riders available'
      ],
      details: 'https://www.statelife.com.pk/en/product/wealth-management/platinum-plus'
    },
    {
      id: 'golden',
      name: 'Golden',
      icon: <FiTrendingUp className="text-3xl text-[#007ACC]" />,
      minPremium: 'PKR 2,500/year',
      coveragePeriod: '5-20 years',
      keyBenefit: 'Retirement planning',
      features: [
        'Tailored for retirement',
        'Regular income options',
        'Death benefit coverage'
      ],
      details: 'https://statelife.com.pk/en/viewproduct/takaful-golden-endowment-plan'
    },
    {
      id: 'jeewan-sathi',
      name: 'Jeewan Sathi',
      icon: <FiUser className="text-3xl text-[#007ACC]" />,
      minPremium: 'PKR 1,500/year',
      coveragePeriod: '5-15 years',
      keyBenefit: 'Basic protection',
      features: [
        'Affordable premiums',
        'Simple terms',
        'Easy claim process'
      ],
      details: 'https://statelife.com.pk/en/product/secure-your-family/jeevan-saathi-plan-table-19'
    },
    {
      id: 'one-payment',
      name: 'One Payment',
      icon: <FiCalendar className="text-3xl text-[#007ACC]" />,
      minPremium: 'PKR 50,000 (single)',
      coveragePeriod: '10-20 years',
      keyBenefit: 'Single premium',
      features: [
        'One-time premium payment',
        'Long-term coverage',
        'No renewal hassles'
      ],
      details: ''
    }
  ];

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            <span className="text-[#007ACC]">State Life</span> Insurance Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of comprehensive life insurance solutions tailored to your needs
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Contact Agent CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-xl shadow-md text-center border border-blue-100"
        >
          <div className="bg-[#007ACC]/10 p-3 rounded-full inline-flex items-center justify-center mb-4">
            <FiPhone className="text-[#007ACC] text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need personalized advice?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our certified agents are ready to help you choose the perfect plan for your needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#0066cc" }}
            whileTap={{ scale: 0.98 }}
            onClick={redirectToWhatsApp}
            className="px-8 py-3 bg-[#007ACC] text-white rounded-lg hover:bg-blue-700 transition font-medium inline-flex items-center"
          >
            <FiPhone className="mr-2" /> Chat on WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SeePlans;