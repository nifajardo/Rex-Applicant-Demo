import React from "react";
import InfoCard from "./InfoCard";
import { User, Briefcase, Phone, Heart, HeartHandshake } from "lucide-react";

const ParentalInfo = ({ profileData }) => {
  if (!profileData) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-slate-800">Parental Information</h2>

      {/* Father Info */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Father&apos;s Information</h3>
        {profileData.father_is_deceased ? (
          <InfoCard icon={Heart} label="Status" value="Deceased" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <InfoCard icon={User} label="Name" value={profileData.father_name} />
            <InfoCard icon={Phone} label="Contact Number" value={profileData.father_contact} />
            <InfoCard icon={Briefcase} label="Occupation" value={profileData.father_occupation} />
            <InfoCard icon={HeartHandshake} label="REX Education Cardholder" value={profileData.father_is_ebd} isBoolean />
            <InfoCard icon={HeartHandshake} label="Philhealth Member" value={profileData.father_is_philhealth} isBoolean />
          </div>
        )}
      </div>

      {/* Mother Info */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Mother&apos;s Information</h3>
        {profileData.mother_is_deceased ? (
          <InfoCard icon={Heart} label="Status" value="Deceased" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <InfoCard icon={User} label="Name" value={profileData.mother_name} />
            <InfoCard icon={Phone} label="Contact Number" value={profileData.mother_contact} />
            <InfoCard icon={Briefcase} label="Occupation" value={profileData.mother_occupation} />
            <InfoCard icon={HeartHandshake} label="REX Education Cardholder" value={profileData.mother_is_ebd} isBoolean />
            <InfoCard icon={HeartHandshake} label="Philhealth Member" value={profileData.mother_is_philhealth} isBoolean />
          </div>
        )}
      </div>

      {/* Household Info */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Household Information</h3>
        <InfoCard icon={HeartHandshake} label="Solo Parent Household" value={profileData.is_solo_parent} isBoolean />
      </div>
    </div>
  );
};

export default ParentalInfo;
