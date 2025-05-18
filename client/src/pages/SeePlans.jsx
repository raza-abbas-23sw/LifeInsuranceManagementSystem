import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiDollarSign, FiCalendar, FiUser, FiTrendingUp, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const PlanCard = ({ plan, index }) => {
  const navigate = useNavigate();
  const icons = {
    'Islamic Takaful': <FiShield className="text-3xl" />,
    'Endowment': <FiDollarSign className="text-3xl" />,
    'Platinum': <FiAward className="text-3xl" />,
    'Golden': <FiTrendingUp className="text-3xl" />,
    'Jeewan Sathi': <FiUser className="text-3xl" />,
    'One Payment': <FiCalendar className="text-3xl" />
  };

  const colors = {
    'Islamic Takaful': 'from-green-100 to-green-200',
    'Endowment': 'from-blue-100 to-blue-200',
    'Platinum': 'from-purple-100 to-purple-200',
    'Golden': 'from-yellow-100 to-yellow-200',
    'Jeewan Sathi': 'from-red-100 to-red-200',
    'One Payment': 'from-indigo-100 to-indigo-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className={`h-48 bg-gradient-to-r ${colors[plan.name]} flex flex-col items-center justify-center p-6`}>
        <div className="mb-4 text-white bg-opacity-20 bg-black rounded-full p-4">
          {icons[plan.name]}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 text-center">{plan.name}</h3>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Min. Premium</span>
          <span className="font-bold">{plan.minPremium}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">Coverage Period</span>
          <span className="font-bold">{plan.coveragePeriod}</span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">Key Benefit</span>
          <span className="font-bold text-right">{plan.keyBenefit}</span>
        </div>
        
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/plans/${plan.id}`)}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const SeePlans = () => {
  const plans = [
    {
      id: 'islamic-takaful',
      name: 'Islamic Takaful',
      minPremium: 'PKR 3,000/year',
      coveragePeriod: '5-30 years',
      keyBenefit: 'Sharia-compliant',
      features: [
        'Based on Islamic principles of mutual cooperation',
        'No interest (Riba) involved',
        'Profit-sharing model',
        'Death and maturity benefits',
        'Zakat applicable'
      ],
      description: 'A Sharia-compliant insurance plan where participants contribute to a mutual fund to help each other against defined losses.'
    },
    {
      id: 'endowment',
      name: 'Endowment',
      minPremium: 'PKR 5,000/year',
      coveragePeriod: '10-25 years',
      keyBenefit: 'Savings + Protection',
      features: [
        'Combines savings and protection',
        'Fixed maturity period',
        'Lump sum payment at maturity',
        'Death benefit during term',
        'Bonus additions possible'
      ],
      description: 'A savings-oriented plan that provides life coverage along with a lump sum payment at the end of the policy term.'
    },
    {
      id: 'platinum',
      name: 'Platinum',
      minPremium: 'PKR 10,000/year',
      coveragePeriod: '10-30 years',
      keyBenefit: 'High-value coverage',
      features: [
        'Higher sum assured',
        'Comprehensive coverage',
        'Additional riders available',
        'Wealth accumulation',
        'Tax benefits'
      ],
      description: 'A premium insurance product offering extensive coverage and benefits for high-net-worth individuals.'
    },
    {
      id: 'golden',
      name: 'Golden',
      minPremium: 'PKR 2,500/year',
      coveragePeriod: '5-20 years',
      keyBenefit: 'Retirement planning',
      features: [
        'Tailored for retirement needs',
        'Regular income options',
        'Death benefit coverage',
        'Loan facility available',
        'Bonus declarations'
      ],
      description: 'A retirement-focused plan that helps build a corpus for golden years while providing life coverage.'
    },
    {
      id: 'jeewan-sathi',
      name: 'Jeewan Sathi',
      minPremium: 'PKR 1,500/year',
      coveragePeriod: '5-15 years',
      keyBenefit: 'Basic protection',
      features: [
        'Affordable premiums',
        'Simple terms',
        'Death benefit',
        'Accidental death rider',
        'Easy claim process'
      ],
      description: 'An economical life insurance plan providing basic protection at affordable premium rates.'
    },
    {
      id: 'one-payment',
      name: 'One Payment',
      minPremium: 'PKR 50,000 (single)',
      coveragePeriod: '10-20 years',
      keyBenefit: 'Single premium',
      features: [
        'One-time premium payment',
        'Long-term coverage',
        'Maturity benefits',
        'Death coverage',
        'No renewal hassles'
      ],
      description: 'A convenient single-premium plan offering long-term coverage without periodic payment obligations.'
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">State Life Insurance Plans</h1>
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

        {/* Comparison CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white p-8 rounded-xl shadow-md text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need help choosing the right plan?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our insurance advisors can help you compare plans and find the perfect coverage for your needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Compare All Plans
          </motion.button>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default SeePlans;