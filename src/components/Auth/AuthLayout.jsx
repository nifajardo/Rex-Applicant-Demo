import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
  // Rex Academy-style hero: white left panel with red accent stripe + editorial photo right
  return (
    <div className="relative flex min-h-screen w-full bg-white">
      {/* Left panel - branding */}
      <div
        className="hidden md:flex md:w-1/2 flex-col justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #2d0a0e 60%, #c0242d 100%)' }}
      >
        {/* Decorative geometric shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: '#c0242d', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10" style={{ background: '#fff', transform: 'translate(-30%, 30%)' }} />

        {/* Top logos area */}
        <div className="relative z-10 p-10 flex items-center gap-4">
          <img
            alt="REX Education Logo"
            className="h-14 w-14 rounded-full bg-white/10 p-1"
            src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png"
          />
          {/* <img
            alt="REX Education Logo"
            className="h-14 w-14 rounded-full bg-white/10 p-1"
            src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png"
          />
          <img
            alt="REX Education Logo"
            className="h-14 w-14 rounded-full bg-white/10 p-1"
            src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png"
          /> */}
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 px-10 pb-16"
        >
          <div className="mb-4 h-1 w-12 rounded" style={{ background: '#c0242d' }} />
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            REX Education Scholarship<br />Program
          </h1>
          <p className="text-base text-white/70 leading-relaxed max-w-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Empowering the youth through education. Apply online and take the first step toward your future.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['4b85d9a86e069798981e8693d7ce111a','1112a950c98683824791d86dcdb41123'].map((id, i) => (
                <div key={i} className="h-9 w-9 rounded-full border-2 border-white overflow-hidden" style={{ zIndex: 10 - i }}>
                  <img
                    src={`https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/${id}.jpg`}
                    className="w-full h-full object-cover"
                    alt="Scholar"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-white/60">Thousands of scholars supported</p>
          </div>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo row */}
          <div className="flex md:hidden justify-center gap-3 mb-6">
            <img alt="REX Education Logo" className="h-12 w-12" src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png" />
            <img alt="REX Education Logo" className="h-12 w-12" src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png" />
            <img alt="REX Education Logo" className="h-12 w-12" src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png" />
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
