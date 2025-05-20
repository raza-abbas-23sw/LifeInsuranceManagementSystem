import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const form = useRef();
  const themeColor = '#007ACC'; // Theme color

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      form.current,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    )
    .then((result) => {
      alert('Message sent successfully!');
      form.current.reset();
    }, (error) => {
      alert('Failed to send message. Please try again.');
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating animated bubbles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20 + Math.random() * 40],
            x: [0, -10 + Math.random() * 20],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="fixed rounded-full bg-[#007ACC]/10 pointer-events-none"
          style={{
            width: `${5 + Math.random() * 10}px`,
            height: `${5 + Math.random() * 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="bg-[#007ACC]/10 text-[#007ACC] px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
              <FiMail className="mr-2" /> Get In Touch
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Contact <span className="text-[#007ACC]">State Life</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? Our team is here to help you with all your insurance needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-[#007ACC]/10 p-3 rounded-full mr-4">
                  <FiMail className="text-[#007ACC] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Us</h3>
                  <p className="text-gray-600">info@statelife.com.pk</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-[#007ACC]/10 p-3 rounded-full mr-4">
                  <FiPhone className="text-[#007ACC] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Call Us</h3>
                  <p className="text-gray-600">+92 3023646514</p>
                  <p className="text-gray-600 mt-1">Mon-Fri: 9am to 5pm</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-[#007ACC]/10 p-3 rounded-full mr-4">
                  <FiMapPin className="text-[#007ACC] text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Visit Us</h3>
                  <p className="text-gray-600">State Life Building No. 9</p>
                  <p className="text-gray-600">Dr. Ziauddin Ahmed Road</p>
                  <p className="text-gray-600">Karachi, Pakistan</p>
                </div>
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.5271646238184!2d67.00486866587153!3d24.84903346346526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e07294c0c95%3A0xdebc7bf5773fc77c!2sState%20Life%20Insurance%20Building%20No.2%2C%20Wallace%20Rd%2C%20City%20Railway%20Colony%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1747774889752!5m2!1sen!2s" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="State Life Location"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="space-y-1"
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="user_name"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:border-transparent transition"
                />
              </motion.div>

              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="space-y-1"
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:border-transparent transition"
                />
              </motion.div>

              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="space-y-1"
              >
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="user_phone"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:border-transparent transition"
                />
              </motion.div>

              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="space-y-1"
              >
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <select 
                  id="subject" 
                  name="subject"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:border-transparent transition appearance-none"
                >
                  <option value="">Select a subject</option>
                  <option value="Policy Inquiry">Policy Inquiry</option>
                  <option value="Claims Assistance">Claims Assistance</option>
                  <option value="New Policy">New Policy</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>

              <motion.div 
                whileFocus={{ scale: 1.01 }}
                className="space-y-1"
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:border-transparent transition"
                ></textarea>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#0066cc" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-[#007ACC] text-white rounded-lg font-medium flex items-center justify-center"
              >
                <FiSend className="mr-2" /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;