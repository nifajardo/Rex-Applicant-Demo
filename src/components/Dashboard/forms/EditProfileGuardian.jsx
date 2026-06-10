
    import React from 'react';
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { User, Phone, Briefcase, Users } from 'lucide-react';
    
    const EditProfileGuardian = ({ profileData, handleProfileChange, isLoading }) => {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Guardian's Information (Optional)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please fill this out only if you are not living with your parents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardian_name">Guardian's Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="guardian_name" name="guardian_name" value={profileData.guardian_name || ''} onChange={(e) => handleProfileChange('guardian_name', e.target.value)} className="pl-9" disabled={isLoading} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardian_contact">Guardian's Contact No.</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="guardian_contact" name="guardian_contact" value={profileData.guardian_contact || ''} onChange={(e) => handleProfileChange('guardian_contact', e.target.value)} className="pl-9" disabled={isLoading} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardian_occupation">Guardian's Occupation</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="guardian_occupation" name="guardian_occupation" value={profileData.guardian_occupation || ''} onChange={(e) => handleProfileChange('guardian_occupation', e.target.value)} className="pl-9" disabled={isLoading} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship_to_student">Relationship to Student</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="relationship_to_student" name="relationship_to_student" value={profileData.relationship_to_student || ''} onChange={(e) => handleProfileChange('relationship_to_student', e.target.value)} className="pl-9" disabled={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default EditProfileGuardian;
  