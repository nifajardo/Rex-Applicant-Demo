import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ApplicantGuideButton = () => {
  return (
    <Link to="/guide">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        title="View the complete applicant guide"
      >
        <BookOpen size={18} />
        <span className="hidden sm:inline">View Guide</span>
        <span className="sm:hidden">Guide</span>
      </Button>
    </Link>
  );
};

export default ApplicantGuideButton;
