import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Phone, Briefcase, HeartHandshake, AlertTriangle } from "lucide-react";

const EditProfileParental = ({ profileData = {}, handleProfileChange, isLoading }) => {
  const occupationOptions = ["Employed", "Self-Employed", "OFW", "Unemployed"];

  const isRequired =
    profileData.isEbdCardholder === "Yes" ||
    profileData.isPhilhealthMember === "Yes";

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        Parents&apos; Information
      </h3>

      {isRequired && (
        <div className="flex items-center gap-2 p-3 rounded bg-amber-50 text-amber-700 text-sm border border-amber-200 mb-4">
          <AlertTriangle className="h-4 w-4" />
          This section is required because the applicant is a REX Education Cardholder or
          a Philhealth Member.
        </div>
      )}

      {/* Father's Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
          Father&apos;s Information
        </h3>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="father_is_deceased"
            checked={!!profileData.father_is_deceased}
            onCheckedChange={(checked) =>
              handleProfileChange("father_is_deceased", checked)
            }
            disabled={isLoading}
          />
          <Label htmlFor="father_is_deceased" className="text-sm font-medium leading-none">
            Deceased
          </Label>
        </div>
        {!profileData.father_is_deceased && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="father_name">Father&apos;s Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="father_name"
                  name="father_name"
                  value={profileData.father_name || ""}
                  onChange={(e) => handleProfileChange("father_name", e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="father_contact">Father&apos;s Contact No.</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="father_contact"
                  name="father_contact"
                  value={profileData.father_contact || ""}
                  onChange={(e) => handleProfileChange("father_contact", e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Father: REX Education & Philhealth */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="father_is_ebd"
                checked={!!profileData.father_is_ebd}
                onCheckedChange={(checked) => handleProfileChange("father_is_ebd", checked)}
                disabled={isLoading}
              />
              <Label htmlFor="father_is_ebd" className="text-sm">REX Education Cardholder</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="father_is_philhealth"
                checked={!!profileData.father_is_philhealth}
                onCheckedChange={(checked) => handleProfileChange("father_is_philhealth", checked)}
                disabled={isLoading}
              />
              <Label htmlFor="father_is_philhealth" className="text-sm">Philhealth Member</Label>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="father_occupation">Father&apos;s Occupation</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Select
                  name="father_occupation"
                  value={profileData.father_occupation || ""}
                  onValueChange={(value) => handleProfileChange("father_occupation", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupationOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mother's Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
          Mother&apos;s Information
        </h3>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="mother_is_deceased"
            checked={!!profileData.mother_is_deceased}
            onCheckedChange={(checked) => handleProfileChange("mother_is_deceased", checked)}
            disabled={isLoading}
          />
          <Label htmlFor="mother_is_deceased" className="text-sm font-medium leading-none">
            Deceased
          </Label>
        </div>
        {!profileData.mother_is_deceased && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mother_name">Mother&apos;s Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mother_name"
                  name="mother_name"
                  value={profileData.mother_name || ""}
                  onChange={(e) => handleProfileChange("mother_name", e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mother_contact">Mother&apos;s Contact No.</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mother_contact"
                  name="mother_contact"
                  value={profileData.mother_contact || ""}
                  onChange={(e) => handleProfileChange("mother_contact", e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Mother: REX Education & Philhealth */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mother_is_ebd"
                checked={!!profileData.mother_is_ebd}
                onCheckedChange={(checked) => handleProfileChange("mother_is_ebd", checked)}
                disabled={isLoading}
              />
              <Label htmlFor="mother_is_ebd" className="text-sm">REX Education Cardholder</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mother_is_philhealth"
                checked={!!profileData.mother_is_philhealth}
                onCheckedChange={(checked) => handleProfileChange("mother_is_philhealth", checked)}
                disabled={isLoading}
              />
              <Label htmlFor="mother_is_philhealth" className="text-sm">Philhealth Member</Label>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="mother_occupation">Mother&apos;s Occupation</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <Select
                  name="mother_occupation"
                  value={profileData.mother_occupation || ""}
                  onValueChange={(value) => handleProfileChange("mother_occupation", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupationOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Household Information */}
      <div className="pt-6 border-t">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Household Information</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_solo_parent"
            checked={!!profileData.is_solo_parent}
            onCheckedChange={(checked) => handleProfileChange("is_solo_parent", checked)}
            disabled={isLoading}
          />
          <Label htmlFor="is_solo_parent" className="flex items-center gap-2 text-sm font-medium leading-none">
            <HeartHandshake className="h-5 w-5 text-red-700" />
            <span>Solo Parent Household</span>
          </Label>
        </div>
        <p className="text-xs text-muted-foreground mt-1 pl-7">
          Check this if the applicant is from a solo-parent family.
        </p>
      </div>
    </div>
  );
};

export default EditProfileParental;

