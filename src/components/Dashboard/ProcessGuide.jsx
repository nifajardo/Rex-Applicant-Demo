import React from "react";
import { Helmet } from "react-helmet-async";

const ProcessGuide = () => {
  return (
    <>
      <Helmet>
        <title>Process Guide | REX Education Scholarship</title>
        <meta name="description" content="Comprehensive guide to navigate the REX Education Scholarship application process." />
        <meta property="og:title" content="Process Guide | REX Education Scholarship" />
        <meta property="og:description" content="Comprehensive guide to navigate the REX Education Scholarship application process." />
      </Helmet>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl text-red-700">REX Education Scholarship Process Guide</h1>
        <p className="text-slate-600 mb-6">Here's a comprehensive guide to help you navigate the REX Education Scholarship application process.</p>
        <div className="overflow-x-auto">
          <img 
            src="https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/a4771a628bb4d09fcf4352dee94b6dd7.png"
            alt="REX Education Scholarship Process Guide"
            className="max-w-full h-auto rounded-lg shadow-sm mx-auto block"
          />
        </div>
      </div>
    </>
  );
};

export default ProcessGuide;
