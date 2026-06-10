import React, { useState } from 'react';
import ApplicantGuideViewer from '@/components/ApplicantGuideViewer';
import { BookOpen } from 'lucide-react';

const ApplicantGuidePage = () => {
  const [showGuide, setShowGuide] = useState(true);

  if (!showGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Guide Closed</h1>
          <button
            onClick={() => setShowGuide(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Guide Again
          </button>
        </div>
      </div>
    );
  }

  return <ApplicantGuideViewer onClose={() => setShowGuide(false)} />;
};

export default ApplicantGuidePage;
