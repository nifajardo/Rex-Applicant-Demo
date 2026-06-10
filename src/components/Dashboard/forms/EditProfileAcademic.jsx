import React, { useMemo, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { School, GraduationCap } from 'lucide-react';
import { HIGHSCHOOLS, COLLEGES } from "@/constants/schools";
import { MAJORS } from "@/constants/majors";
import { SCHOLARSHIP_TYPES } from "../RequirementsConstants";

const collegeYearOptions = [
  "2025-2026 First Semester",
  "2025-2026 Second Semester",
  "2024-2025 First Semester",
  "2024-2025 Second Semester",
];

const highSchoolYearOptions = [
  "2025-2026 HS",
  "2025-2026 SHS",
];

const highSchoolYearLevelOptions = [
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11 SHS",
  "Grade 12 SHS",
];

const collegeYearLevelOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year or beyond",
];


const scholarshipOptions = Object.entries(SCHOLARSHIP_TYPES)
  .filter(([key]) => key !== 'DEFAULT')
  .map(([key, { title, description }]) => ({
    value: key,
    label: `${title} (${description})`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const EditProfileAcademic = ({ profileData, handleProfileChange, disabled }) => {
  const [showOtherSchoolInput, setShowOtherSchoolInput] = useState(false);
  const [showOtherProgramInput, setShowOtherProgramInput] = useState(false);
  const [gwaError, setGwaError] = useState(""); // 🔹 GWA validation error
  const [yearLevelError, setYearLevelError] = useState("");
  const [semesterChanged, setSemesterChanged] = useState(false);

  const academicYearOptions = profileData.education_level === 'High School' ? highSchoolYearOptions : collegeYearOptions;
  const schoolOptions = useMemo(() => {
    const baseSchools = profileData.education_level === 'High School' ? HIGHSCHOOLS : COLLEGES;
    return [...baseSchools, "Others"];
  }, [profileData.education_level]);
  
  useEffect(() => {
    const predefinedSchools = profileData.education_level === 'High School' ? HIGHSCHOOLS : COLLEGES;
    if (profileData.school && !predefinedSchools.includes(profileData.school)) {
      setShowOtherSchoolInput(true);
    } else {
      setShowOtherSchoolInput(false);
    }
  }, [profileData.school, profileData.education_level]);
  
  useEffect(() => {
    if (!profileData.education_level) {
      handleProfileChange("education_level", "College");
    }
  }, [profileData.education_level]);


  useEffect(() => {
    if (profileData.program && !MAJORS.includes(profileData.program)) {
      setShowOtherProgramInput(true);
    } else {
      setShowOtherProgramInput(false);
    }
  }, [profileData.program]);

  const handleSchoolChange = (value) => {
    if (value === "Others") {
      setShowOtherSchoolInput(true);
      handleProfileChange('school', ''); 
    } else {
      setShowOtherSchoolInput(false);
      handleProfileChange('school', value);
    }
  };
  
  const handleProgramChange = (value) => {
    if (value === "Others") {
      setShowOtherProgramInput(true);
      handleProfileChange('program', 'Others');
      handleProfileChange('other_program', '');
    } else {
      setShowOtherProgramInput(false);
      handleProfileChange('program', value);
      handleProfileChange('other_program', '');
    }
  };

  const isRankOneDisabled = useMemo(() => {
    return profileData.scholarship_type !== 'EXCEPTIONAL';
  }, [profileData.scholarship_type]);

  useEffect(() => {
    if (isRankOneDisabled) {
      handleProfileChange('is_rank_one', false);
    }
  }, [isRankOneDisabled, handleProfileChange]);

  // 🔹 GWA validation logic
  const handleGwaChange = (value) => {
    const numValue = parseFloat(value);

    if (value === "") {
      if (semesterChanged) {
        setGwaError("Please enter your grade average for the selected semester.");
      } else {
        setGwaError("");
      }
      handleProfileChange("gwa", "");
      return;
    }

    if (profileData.education_level === "High School") {
      if (!isNaN(numValue) && numValue >= 75 && numValue <= 100) {
        setGwaError("");
        handleProfileChange("gwa", value);
      } else {
        setGwaError("High School grade must be between 75 and 100.");
        handleProfileChange("gwa", value);
      }
    } else if (profileData.education_level === "College") {
      if (!isNaN(numValue) && numValue >= 1.0 && numValue <= 5.0) {
        setGwaError("");
        handleProfileChange("gwa", value);
      } else {
        if (numValue === 0) {
          setGwaError("College GWA cannot be zero.");
        } else {
          setGwaError("College GWA field must not be empty.");
        }
        handleProfileChange("gwa", value);
      }
    } else {
      setGwaError("");
      handleProfileChange("gwa", value);
    }
  };

  const yearLevelOptions =
  profileData.education_level === "High School"
    ? highSchoolYearLevelOptions
    : collegeYearLevelOptions;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary">Academic Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Level</Label>
          <RadioGroup
            name="education_level"
            value={profileData.education_level || "College"}
            onValueChange={(value) => {
              handleProfileChange("level", "");
              handleProfileChange('education_level', value);
              handleProfileChange('academic_year', '');
              handleProfileChange('school', ''); 
              setShowOtherSchoolInput(false);
              setYearLevelError("");
              if (value === 'High School') {
                handleProfileChange('program', '');
                handleProfileChange('other_program', '');
                setShowOtherProgramInput(false);
              }
              setGwaError(""); // reset errors when switching
            }}
            className="flex space-x-4 pt-2"
            disabled={disabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="High School" id="edit-level-hs" />
              <Label htmlFor="edit-level-hs">High School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="College" id="edit-level-college" />
              <Label htmlFor="edit-level-college">College</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="school">School</Label>
          <div className="relative">
            <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
            <Select
              name="school"
              value={showOtherSchoolInput ? "Others" : profileData.school || ""}
              onValueChange={handleSchoolChange}
              disabled={disabled || !profileData.education_level}
            >
              <SelectTrigger className="pl-9">
                <SelectValue placeholder={!profileData.education_level ? "Select a level first" : "Select your school"} />
              </SelectTrigger>
              <SelectContent>
                {schoolOptions.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {showOtherSchoolInput && (
        <div className="grid gap-2">
            <Label htmlFor="other_school">Specify School</Label>
            <Input
              id="other_school"
              name="school"
              value={profileData.school || ""}
              onChange={(e) => handleProfileChange('school', e.target.value)}
              placeholder="Enter your school name"
              disabled={disabled}
            />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {profileData.education_level === 'College' && (
          <div className="grid gap-2">
            <Label htmlFor="program">Student Number</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="student_number"
                name="student_number"
                value={profileData.student_number || ""}
                onChange={(e) =>
                  handleProfileChange("student_number", e.target.value)
                }
                className="pl-9"
                disabled={disabled}
                required={true}
              />
            </div>
          </div>
        )}

        {profileData.education_level === 'College' && (
          <div className="grid gap-2">
            <Label htmlFor="program">Major/Course</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Select
                name="program"
                value={profileData.program || ""}
                onValueChange={handleProgramChange}
                disabled={disabled}
              >
                <SelectTrigger className="pl-9">
                  <SelectValue placeholder="Select your major/course" />
                </SelectTrigger>
                <SelectContent>
                  {[...MAJORS, "Others"].map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="yearLevel">Year Level</Label>
          <Select
            name="yearLevel"
            value={profileData.level || ""}
            onValueChange={(value) => {
              handleProfileChange("level", value);
              if (value) setYearLevelError("");
            }}
            disabled={disabled || !profileData.education_level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year level" />
            </SelectTrigger>
            <SelectContent>
              {yearLevelOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {yearLevelError && (
            <p className="text-red-500 text-sm mt-1">{yearLevelError}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="academicYear">Academic Year & Semester</Label>
          <Select
            name="academicYear"
            value={profileData.academic_year || ""}
            onValueChange={(value) => {
              setSemesterChanged(true);
              handleProfileChange('academic_year', value);
              handleProfileChange('gwa', '0'); // reset GWA when academic year changes

              if (!profileData.level) {
                setYearLevelError('Please select your year level for this semester.');
              }
              setGwaError('Please enter your grade average for this semester.');
            }}
            disabled={disabled || !profileData.education_level}
          >
            <SelectTrigger>
              <SelectValue placeholder={!profileData.education_level ? "Select a level first" : "Select academic year/semester"} />
            </SelectTrigger>
            <SelectContent>
              {academicYearOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      {showOtherProgramInput && profileData.education_level === 'College' && (
        <div className="grid gap-2">
            <Label htmlFor="other_program">Specify Course</Label>
            <Input
              id="other_program"
              name="other_program"
              value={profileData.other_program || ""}
              onChange={(e) => handleProfileChange('other_program', e.target.value)}
              placeholder="Enter your course name"
              disabled={disabled}
            />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <div className="grid gap-2">
          <Label htmlFor="gwa">GWA (General Weighted Average)</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="gwa"
              name="gwa"
              type="number"
              step="0.01"
              value={profileData.gwa || ""}
              onChange={(e) => handleGwaChange(e.target.value)}
              className="pl-9"
              placeholder={
                profileData.education_level === "High School"
                  ? "e.g., 85"
                  : "e.g., 2.75"
              }
              disabled={disabled}
            />
          </div>
          {gwaError && <p className="text-red-500 text-sm">{gwaError}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="scholarshipType">Type of Scholarship</Label>
          <Select
            name="scholarshipType"
            value={profileData.scholarship_type || ""}
            onValueChange={(value) => handleProfileChange('scholarship_type', value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select scholarship type" />
            </SelectTrigger>
            <SelectContent>
              {scholarshipOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="isRankOne"
            name="isRankOne"
            checked={profileData.is_rank_one || false}
            onCheckedChange={(checked) => handleProfileChange('is_rank_one', checked)}
            disabled={disabled || isRankOneDisabled}
          />
          <Label htmlFor="isRankOne" className="flex flex-col">
            <span>Are you a Rank 1 student?</span>
            <span className="text-xs text-muted-foreground">Only for Exceptional Scholarship applicants.</span>
          </Label>
        </div>

        <div className="space-y-1">
          <Label>Is your school within Batangas City?</Label>
          <RadioGroup
            name="schoolInBatangas"
            value={profileData.school_in_batangas ? "Yes" : "No"}
            onValueChange={(value) => handleProfileChange('school_in_batangas', value === "Yes")}
            className="flex space-x-4 pt-2"
            disabled={disabled}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="schoolYes" />
              <Label htmlFor="schoolYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="schoolNo" />
              <Label htmlFor="schoolNo">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Application Type</Label>
        <RadioGroup
          name="applicationType"
          value={profileData.application_type || ""}
          onValueChange={(value) => handleProfileChange('application_type', value)}
          className="flex space-x-4"
          disabled={disabled}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="New Application" id="new" />
            <Label htmlFor="new">New Application</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Renewal" id="renewal" />
            <Label htmlFor="renewal">Renewal</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default EditProfileAcademic;
