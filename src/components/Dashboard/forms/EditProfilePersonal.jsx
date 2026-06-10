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
import { User, Mail, Phone, Calendar, VenetianMask } from "lucide-react";

const EditProfilePersonal = ({ profileData, handleProfileChange, disabled }) => {

  const hasStructuredName =
  profileData.first_name ||
  profileData.last_name;


  const computedFullName = [
  profileData.first_name,
  profileData.middle_name,
  profileData.last_name,
]
  .filter(Boolean)
  .join(" ");


  const fullNameToDisplay = hasStructuredName
  ? computedFullName
  : profileData.full_name || "";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary">Personal Information</h3>

      {/* Applicant Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="grid gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="first_name"
              name="first_name"
              value={profileData.first_name || ""}
              onChange={(e) =>
                handleProfileChange("first_name", e.target.value)
              }
              className="pl-9"
              disabled={disabled}
              required={true}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="middle_name">Middle Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="middle_name"
              name="middle_name"
              value={profileData.middle_name || ""}
              onChange={(e) =>
                handleProfileChange("middle_name", e.target.value)
              }
              className="pl-9"
              disabled={disabled}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last_name">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="last_name"
              name="last_name"
              value={profileData.last_name || ""}
              onChange={(e) =>
                handleProfileChange("last_name", e.target.value)
              }
              className="pl-9"
              disabled={disabled}
              required={true}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="full_name"
              name="full_name"
              value={fullNameToDisplay}
              // onChange={(e) =>
              //   handleProfileChange("full_name", e.target.value)
              // }
              className="pl-9"
              disabled={disabled}
              readOnly = {true}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              value={profileData.email || ""}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="pl-9"
              disabled={disabled || true}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              value={profileData.phone || ""}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              className="pl-9"
              disabled={disabled}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthdate">Birthdate</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="birthdate"
              name="birthdate"
              type="date"
              value={profileData.birthdate || ""}
              onChange={(e) =>
                handleProfileChange("birthdate", e.target.value)
              }
              className="pl-9"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <div className="relative">
            <VenetianMask className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
            <Select
              name="gender"
              value={profileData.gender || ""}
              onValueChange={(value) => handleProfileChange("gender", value)}
              disabled={disabled}
            >
              <SelectTrigger className="pl-9">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Scholar Status */}
      <div className="grid gap-2">
        <Label htmlFor="scholar_status">Are you currently a scholar of the following?</Label>
        <Select
          name="scholar_status"
          value={profileData.scholar_status || "None"}
          onValueChange={(value) => handleProfileChange("scholar_status", value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select scholar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Batangas Provincial Government">
              Batangas Provincial Government
            </SelectItem>
            <SelectItem value="CHED">CHED</SelectItem>
            <SelectItem value="DOST">DOST</SelectItem>
            <SelectItem value="Private Institution">
              Private Institution
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SPES Beneficiary */}
      <div className="grid gap-2">
        <Label htmlFor="spes_beneficiary">
          Are you a beneficiary of the SPES program?
        </Label>
        <Select
          name="spes_beneficiary"
          value={profileData.spes_beneficiary || "No"}
          onValueChange={(value) =>
            handleProfileChange("spes_beneficiary", value)
          }
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conditional Applicant + Parents Profile */}
      {(profileData.isEbdCardholder === "Yes" ||
        profileData.isPhilhealthMember === "Yes") && (
        <div className="p-4 border rounded bg-gray-50 space-y-4">
          <h3 className="font-medium">Applicant and Parents Profile</h3>

          <div className="grid gap-2">
            <Label htmlFor="father_name">Father's Name</Label>
            <Input
              id="father_name"
              name="father_name"
              value={profileData.father_name || ""}
              onChange={(e) =>
                handleProfileChange("father_name", e.target.value)
              }
              disabled={disabled}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mother_name">Mother's Name</Label>
            <Input
              id="mother_name"
              name="mother_name"
              value={profileData.mother_name || ""}
              onChange={(e) =>
                handleProfileChange("mother_name", e.target.value)
              }
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePersonal;
