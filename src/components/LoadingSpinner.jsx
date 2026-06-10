import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Loading application..." }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
      {/* Rex-style logo mark */}
      <motion.div
        className="mb-6 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-10 w-2 rounded-full" style={{ background: '#c0242d' }} />
        <div>
          <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#c0242d', fontFamily: 'Montserrat, sans-serif' }}>REX Education Scholarship</div>
          <div className="text-lg font-extrabold" style={{ color: '#1a1a2e', fontFamily: 'Montserrat, sans-serif' }}>Online System</div>
        </div>
      </motion.div>

      {/* Spinner */}
      <motion.div
        className="w-10 h-10 rounded-full mb-4"
        style={{ border: '3px solid #f0c0c2', borderTopColor: '#c0242d' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />

      <p className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>{message}</p>
      <p className="text-xs text-gray-400 mt-1">Please wait a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
