import React from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiHeart,
  FiDollarSign,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const customBlue = "oklch(0.57 0.15 248.52)";



  const features = [
    {
      icon: <FiShield className="w-8 h-8" style={{ color: customBlue }} />,
      title: "Comprehensive Coverage",
      desc: "Protection for you and your loved ones",
    },
    {
      icon: <FiHeart className="w-8 h-8" style={{ color: customBlue }} />,
      title: "Health Benefits",
      desc: "Additional health coverage options",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" style={{ color: customBlue }} />,
      title: "Affordable Premiums",
      desc: "Flexible payment plans to suit your budget",
    },
    {
      icon: <FiClock className="w-8 h-8" style={{ color: customBlue }} />,
      title: "Quick Claims",
      desc: "Fast and hassle-free claim processing",
    },
  ];
  const redirectToWhatsApp = () => {
    const phoneNumber = "923023646514"; // Replace with actual State Life WhatsApp number
    const message =
      "Hello, I would like to inquire about State Life insurance plans.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="font-sans ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start md:items-center md:pl-20   overflow-hidden">
        {/* Particle background */}
      

        {/* Floating 3D shapes */}
        <motion.div
          animate={{
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 hidden lg:block"
          style={{
            backgroundColor: "#007ACC",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />

        {/* Main content - centered horizontally and vertically */}
        <div className="container mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="relative">
              {/* Animated tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block px-4 py-2 rounded-full font-medium mb-4"
                  style={{
                    background:
                      "linear-gradient(90deg, #007ACC10, #007ACC30, #007ACC10)",
                    backgroundSize: "200% auto",
                  }}
                >
                  <span className="text-sm" style={{ color: "#007ACC" }}>
                    TRUSTED SINCE 1972
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
                >
                  <span className="block">Secure Your</span>
                  <motion.span
                    className="block"
                    animate={{
                      textShadow: [
                        "0 0 0px #007ACC",
                        "0 0 10px #007ACC40",
                        "0 0 0px #007ACC",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    style={{ color: "#007ACC" }}
                  >
                    Financial Legacy
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-gray-600 mb-8 max-w-lg"
                >
                  State Life's innovative protection plans evolve with your
                  family through every life stage.
                </motion.p>
              </motion.div>

              {/* Interactive buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link to={"/generate-plan"}>
                  <motion.button
                    whileHover={{
                      y: -3,
                      boxShadow: "0 8px 20px #007ACC40",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-lg font-bold text-white relative overflow-hidden group"
                    style={{ backgroundColor: "#007ACC" }}
                  >
                    <span className="relative z-10">Get Your Plan Now</span>

                    <motion.span
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.button>
                </Link>
                <Link to={"/see-plans"}>
                  <motion.button
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-lg font-bold border-2 relative group"
                    style={{ borderColor: "#007ACC", color: "#007ACC" }}
                  >
                    <span className="relative z-10">Explore Solutions</span>
                    <motion.span className="absolute inset-0 bg-[#007ACC] opacity-0 group-hover:opacity-10 transition-opacity" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Animated stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-8"
              >
                {[
                  { value: "2M+", label: "Families Protected" },
                  { value: "50+", label: "Years Serving" },
                  { value: "99%", label: "Claim Approval" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex items-center"
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: "#007ACC" }}
                    />
                    <div>
                      <motion.p
                        className="text-2xl font-bold text-gray-900"
                        style={{ color: "#007ACC" }}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Interactive visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Main card */}
                <motion.div
                  whileHover={{ rotateY: 5, rotateX: -5 }}
                  className="bg-white rounded-2xl md:shadow-2xl p-8 border border-gray-100 relative z-10"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Family Protection
                      </h3>
                      <p className="text-[#007ACC]">Premium Plan</p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#007ACC10" }}
                    >
                      <FiShield
                        className="w-6 h-6"
                        style={{ color: "#007ACC" }}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="h-3 w-full bg-gray-100 rounded-full mb-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: "#007ACC" }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Coverage: <span className="font-medium">$500,000</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { label: "Term", value: "20 Years" },
                      { label: "Premium", value: "$99/mo" },
                      { label: "Payout", value: "Guaranteed" },
                      { label: "Rating", value: "AAA" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3 }}
                        className="p-3 rounded-lg border border-gray-100"
                      >
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-bold" style={{ color: "#007ACC" }}>
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-lg font-bold text-white"
                    style={{ backgroundColor: "#007ACC" }}
                  >
                    Customize Plan
                  </motion.button>
                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 -left-8 w-32 h-32 rounded-full z-0"
                  style={{ backgroundColor: "#007ACC05" }}
                />

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-lg z-0"
                  style={{ backgroundColor: "#007ACC05" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex flex-col items-center"
          >
            <div
              className="w-10 h-16 rounded-full border-2 flex items-start justify-center pt-2"
              style={{ borderColor: "#007ACC20" }}
            >
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#007ACC" }}
              />
            </div>
            <p className="text-sm mt-2" style={{ color: "#007ACC" }}>
              Scroll Down
            </p>
          </motion.div>
        </motion.div>
      </section>
      {/* Features Section */}
      <section id="features" className="relative py-24 overflow-hidden">
       

        {/* Floating decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hidden lg:block absolute -top-32 -left-32 w-64 h-64 opacity-5"
          style={{
            backgroundColor: "#007ACC",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Animated section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.div
              whileInView={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#007ACC] blur-lg opacity-10 rounded-full"></div>
                <div className="relative px-6 py-2 rounded-full border border-[#007ACC20] bg-white/80 backdrop-blur-sm">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#007ACC" }}
                  >
                    OUR ADVANTAGES
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Why <span style={{ color: "#007ACC" }}>State Life</span> Stands
              Out
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Innovative protection that evolves with your family through every
              life stage, backed by 50+ years of trusted service.
            </motion.p>
          </motion.div>

          {/* Animated features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 25px -5px rgba(0, 122, 204, 0.1)",
                }}
                className="relative group"
              >
                {/* Feature card background glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-0.5 bg-[#007ACC] rounded-xl blur opacity-0 group-hover:opacity-20"
                />

                {/* Feature card */}
                <div className="relative h-full bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {/* Animated icon */}
                  <motion.div
                    whileHover={{
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.6 },
                    }}
                    className="mb-6 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "#007ACC10",
                      border: "1px solid #007ACC20",
                    }}
                  >
                    {React.cloneElement(feature.icon, {
                      className: "w-6 h-6",
                      style: { color: "#007ACC" },
                    })}
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{feature.desc}</p>

                  {/* Animated learn more link */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-[#007ACC] font-medium"
                  >
                    <span className="mr-2">Learn more</span>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <FiArrowRight />
                    </motion.div>
                  </motion.div>

                  {/* Floating dots decoration */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 right-4 w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#007ACC" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated CTA at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 122, 204, 0.3)",
              }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-lg font-bold text-white relative overflow-hidden"
              style={{ backgroundColor: "#007ACC" }}
              onClick={() => {navigate("/see-plans")} }
            >
              <span className="relative z-10">Explore All Features</span>
              <motion.span
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
      {/* See Plans Section */}
      <section
        id="plans"
        className="relative py-24 overflow-hidden "
      >
        

        {/* Floating abstract shape */}
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hidden lg:block absolute -bottom-32 -right-32 w-64 h-64 opacity-5"
          style={{
            backgroundColor: "#007ACC",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            {/* Image with creative frame */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                damping: 10,
              }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Image frame decoration */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-6 border-2 border-[#007ACC20] rounded-xl pointer-events-none"
                />

                {/* Floating dots decoration */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -left-6 w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#007ACC" }}
                />

                {/* Main image with hover effect */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 122, 204, 0.15)",
                  }}
                  className="overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Insurance plans"
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 flex items-center"
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: "#007ACC" }}
                  />
                  <span className="font-medium" style={{ color: "#007ACC" }}>
                    50+ Plans Available
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content with animated elements */}
            <motion.div
              className="lg:w-1/2"
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                damping: 10,
              }}
              viewport={{ once: true }}
            >
              {/* Animated section header */}
              <motion.div
                whileInView={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block px-4 py-2 rounded-full font-medium mb-6"
                style={{
                  background:
                    "linear-gradient(90deg, #007ACC10, #007ACC30, #007ACC10)",
                  backgroundSize: "200% auto",
                }}
              >
                <span className="text-sm" style={{ color: "#007ACC" }}>
                  CUSTOMIZED SOLUTIONS
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-gray-900 mb-6"
              >
                Tailored <span style={{ color: "#007ACC" }}>Protection</span>{" "}
                Plans
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-6"
              >
                Discover the perfect coverage for your family's needs with our
                range of customizable insurance plans. Whether you're looking
                for basic protection or comprehensive coverage, we have options
                to fit every budget and lifestyle.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 mb-8"
              >
                Our expert advisors can help you choose the right plan with
                transparent pricing and no hidden fees.
              </motion.p>

              {/* Animated CTA button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 122, 204, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/see-plans")}
                  className="px-8 py-4 rounded-lg font-bold text-white relative overflow-hidden"
                  style={{ backgroundColor: "#007ACC" }}
                >
                  <span className="relative z-10">View All Plans</span>
                  <motion.span
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#007ACC10",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-bold border-2"
                  style={{ borderColor: "#007ACC", color: "#007ACC" }}
                  onClick={redirectToWhatsApp}
                >
                  <span className="relative z-10">Talk to Expert</span>
                </motion.button>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full opacity-5 hidden lg:block"
                style={{ backgroundColor: "#007ACC" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
