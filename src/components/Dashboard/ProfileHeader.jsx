import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';

const ProfileHeader = ({ profileData, onEditClick }) => {
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar className="h-24 w-24 text-3xl border-4 border-red-700 bg-red-100 text-red-700 font-bold">
            <AvatarFallback>{getInitials(profileData.full_name)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{profileData.full_name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{profileData.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.barangay || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                <Button onClick={onEditClick} className="bg-red-700 hover:bg-red-800 text-white">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {profileData.bio || "No bio provided. Click 'Edit Profile' to add one."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
