import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowUp, FiMail, FiPhone, FiClock, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  // Back to top button animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative bg-gray-900 text-white pt-16 pb-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20 + Math.random() * 40],
              x: [0, -10 + Math.random() * 20],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: "#007ACC"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold text-white">State<span className="text-[#007ACC]">Life</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing trusted life insurance solutions for over 50 years. We protect what matters most to you.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-fit"
            >
              <button className="bg-[#007ACC] hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
                Get a Quote
              </button>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#007ACC]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Plans', 'Claims', 'Contact'].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-[#007ACC] transition-all text-sm"
                >
                  <a href="#">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#007ACC]">
              Resources
            </h3>
            <ul className="space-y-3">
              {['Blog', 'FAQ', 'Glossary', 'Calculators', 'Support'].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="text-gray-400 hover:text-[#007ACC] transition-all text-sm"
                >
                  <a href="#">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[#007ACC]">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start text-gray-400 text-sm"
              >
                <FiMapPin className="mt-1 mr-3 flex-shrink-0 text-[#007ACC]" />
                <span>123 Insurance Ave, Suite 100<br />New York, NY 10001</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center text-gray-400 text-sm"
              >
                <FiPhone className="mr-3 text-[#007ACC]" />
                <span>+1 (800) 555-1234</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center text-gray-400 text-sm"
              >
                <FiMail className="mr-3 text-[#007ACC]" />
                <span>info@statelife.com</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center text-gray-400 text-sm"
              >
                <FiClock className="mr-3 text-[#007ACC]" />
                <span>Mon-Fri: 9AM - 6PM</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px w-full bg-gray-800 mb-8"
          style={{ originX: 0 }}
        />

        {/* Copyright and social */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {currentYear} StateLife. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ color: "#007ACC" }}
                className="text-gray-500 hover:text-[#007ACC] text-sm transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#007ACC] shadow-lg flex items-center justify-center z-50 hover:bg-blue-600 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <FiArrowUp className="text-white text-xl" />
      </motion.button>
    </footer>
  )
}

export default Footer