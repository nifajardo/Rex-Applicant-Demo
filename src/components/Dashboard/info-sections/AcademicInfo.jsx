
import React from 'react';
import InfoCard from './InfoCard';
import {
  BookOpen,
  School,
  GraduationCap,
  Calendar,
  Award,
  FileText,
  CheckSquare,
  MapPin,
  Trophy
} from 'lucide-react';

const AcademicInfo = ({ profileData }) => {
  const displayProgram = profileData.program === 'Others' && profileData.other_program
    ? profileData.other_program?.toUpperCase()
    : profileData.program?.toUpperCase();
    
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-slate-800">Academic Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        <InfoCard icon={BookOpen} label="Education Level" value={profileData.education_level} />
        <InfoCard icon={School} label="School" value={profileData.school?.toUpperCase()} />
        <InfoCard icon={GraduationCap} label="Program/Major" value={displayProgram} />
        <InfoCard icon={Calendar} label="Academic Year" value={profileData.academic_year} />
        <InfoCard icon={Trophy} label="GWA" value={profileData.gwa} />
        <InfoCard icon={Award} label="Scholarship Type" value={profileData.scholarship_type?.toUpperCase()} />
        <InfoCard icon={FileText} label="Application Type" value={profileData.application_type} />
        <InfoCard icon={CheckSquare} label="Rank 1 Student" value={profileData.is_rank_one} isBoolean />
        <InfoCard icon={MapPin} label="School in Batangas City" value={profileData.school_in_batangas} isBoolean /> 
      </div>
    </div>
  );
};

export default AcademicInfo;