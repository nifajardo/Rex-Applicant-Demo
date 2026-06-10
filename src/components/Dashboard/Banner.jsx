import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Mail, Phone } from 'lucide-react';

const Banner = ({ onProfileClick, profileData }) => {
  const userInitials = profileData?.full_name
    ? profileData.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SP';

  const displayBio = profileData?.bio || null;

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
    >
      {/* Red accent banner strip */}
      <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #c0242d, #1a1a2e)' }} />

      <div className="bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold"
            style={{ background: '#c0242d', border: '3px solid #f0c0c2', fontFamily: 'Montserrat, sans-serif' }}
          >
            {userInitials}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {profileData?.full_name || "Scholar Applicant"}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-500 justify-center sm:justify-start">
              {profileData?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" style={{ color: '#c0242d' }} />
                  {profileData.email}
                </span>
              )}
              {profileData?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" style={{ color: '#c0242d' }} />
                  {profileData.phone}
                </span>
              )}
              {profileData?.barangay && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" style={{ color: '#c0242d' }} />
                  {profileData.barangay}, Batangas City
                </span>
              )}
            </div>

            {displayBio && (
              <p className="text-xs text-gray-400 mt-2 italic">{displayBio}</p>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onProfileClick}
          className="flex-shrink-0 flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-md"
          style={{ borderColor: '#c0242d', color: '#c0242d' }}
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Banner;
