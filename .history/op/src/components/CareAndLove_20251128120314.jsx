import React from 'react';
import { motion } from 'framer-motion';

const CareAndLove = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F7F7] via-white to-[#F0F8FF] flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.p 
            className="text-blue-500 text-lg font-semibold mb-4 tracking-wider"
           
          >
            - We can do better -
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            We provide{' '}
          
              care & love
           
          </motion.h1>
          
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {/* Medical & Education Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-black" />
            <motion.div 
              className="flex items-center mb-6"
              variants={iconVariants}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <span className="text-2xl">💊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Medical & Education
              </h2>
            </motion.div>
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              Delivering essential medical supplies and health education programs.
            </p>
            <motion.button 
              className="flex items-center text-blue-500 font-semibold group"
              variants={buttonVariants}
              whileHover="hover"
            >
              Learn More 
              <motion.span 
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                😊
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Food & Build Home Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-black" />
            <motion.div 
              className="flex items-center mb-6"
              variants={iconVariants}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <span className="text-2xl">🏠</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Food & Build Home
              </h2>
            </motion.div>
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              Help us provide meals and build homes for struggling families.
            </p>
            <motion.button 
              className="flex items-center text-green-500 font-semibold group"
              variants={buttonVariants}
              whileHover="hover"
            >
              Learn More 
              <motion.span 
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                😊
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Fresh & Clean Water Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400" />
            <motion.div 
              className="flex items-center mb-6"
              variants={iconVariants}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl flex items-center justify-center mr-4 shadow-md">
                <span className="text-2xl">💧</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Fresh & Clean Water
              </h2>
            </motion.div>
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              Your contribution brings fresh, clean water to save lives globally.
            </p>
            <motion.button 
              className="flex items-center text-cyan-500 font-semibold group"
              variants={buttonVariants}
              whileHover="hover"
            >
              Learn More 
              <motion.span 
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                😊
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join Our Mission Today</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CareAndLove;