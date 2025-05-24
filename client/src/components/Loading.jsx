import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const Loading = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-blue-500 text-3xl"
      >
        <FiLoader />
      </motion.div>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="ml-3 text-gray-600"
      >
        Loading...
      </motion.span>
    </motion.div>
  );
};

export default Loading;