import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from 'lucide-react';
import { BARANGAY_LIST } from "@/constants/locations";

const EditProfileAddress = ({ profileData, handleProfileChange, disabled }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary">Address & Bio</h3>
      <div className="grid gap-2">
        <Label htmlFor="address">Full Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            name="address"
            value={profileData.address || ""}
            onChange={(e) => handleProfileChange('address', e.target.value)}
            className="pl-9"
            placeholder="e.g., 123 Main St, Sitio Example"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="barangay">Barangay</Label>
        <Select
          name="barangay"
          value={profileData.barangay || ""}
          onValueChange={(value) => handleProfileChange('barangay', value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your barangay" />
          </SelectTrigger>
          <SelectContent>
            {BARANGAY_LIST.map((barangay) => (
              <SelectItem key={barangay} value={barangay}>
                {barangay}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio (Optional)</Label>
        <Textarea
          id="bio"
          name="bio"
          value={profileData.bio || ""}
          onChange={(e) => handleProfileChange('bio', e.target.value)}
          placeholder="Write a brief bio about yourself, your goals, and why you deserve this scholarship."
          className="min-h-[100px]"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EditProfileAddress;