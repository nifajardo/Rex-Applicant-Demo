import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';

const PreviewItem = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 text-sm">
    <dt className="font-medium text-muted-foreground col-span-1">{label}</dt>
    <dd className="text-foreground col-span-2">
      {value || <span className="text-muted-foreground/70">Not provided</span>}
    </dd>
  </div>
);

const ConfirmationPreview = ({ profileData, onSubmit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  // ✅ Validate all required fields from EditProfile sections
  const validateFields = () => {
    const requiredFields = {
      // Personal
      
      "First Name": profileData.first_name,
      "Middle Name": profileData.middle_name,
      "Last Name": profileData.last_name,

      "Full Name": profileData.full_name,
      "Email": profileData.email,
      "Phone": profileData.phone,
      "Birthdate": profileData.birthdate,
      "Gender": profileData.gender,

      // Academic
      "School": profileData.school,
      "Academic Year": profileData.academic_year,
      "GWA": profileData.gwa,
      "Scholarship Type": profileData.scholarship_type,
      "Application Type": profileData.application_type,

      // Address
      "Address": profileData.address,
      "Barangay": profileData.barangay,
    };

    // Conditional required parental info
    if (
      profileData.isEbdCardholder === "Yes" ||
      profileData.isPhilhealthMember === "Yes"
    ) {
      requiredFields["Father's Name"] = profileData.father_is_deceased
        ? "Skipped"
        : profileData.father_name;
      requiredFields["Mother's Name"] = profileData.mother_is_deceased
        ? "Skipped"
        : profileData.mother_name;
    }

    const missing = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value === "")
      .map(([label]) => label);

    if (missing.length > 0) {
      toast.error(`Missing required fields: ${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      if (onSubmit) onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      

      {/* --- Personal Info --- */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <PreviewItem label="First Name" value={profileData.first_name} />
          <PreviewItem label="Middle Name" value={profileData.middle_name} />
          <PreviewItem label="Last Name" value={profileData.last_name} />
          <PreviewItem label="Full Name" value={profileData.full_name} />
          <PreviewItem label="Email" value={profileData.email} />
          <PreviewItem label="Phone" value={profileData.phone} />
          <PreviewItem label="Birthdate" value={formatDate(profileData.birthdate)} />
          <PreviewItem label="Gender" value={profileData.gender} />
          <PreviewItem label="Bio" value={profileData.bio} />
        </CardContent>
      </Card>

      {/* --- Academic Info --- */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <PreviewItem label="School" value={profileData.school} />
          <PreviewItem
            label="Program/Course"
            value={
              profileData.program === "Others..."
                ? `${profileData.program} (${profileData.other_program})`
                : profileData.program
            }
          />
          <PreviewItem label="Academic Year" value={profileData.academic_year} />
          <PreviewItem label="GWA" value={profileData.gwa} />
          <PreviewItem label="Scholarship Type" value={profileData.scholarship_type} />
          <PreviewItem label="Application Type" value={profileData.application_type} />
          <PreviewItem label="Top 1 of Batch" value={profileData.is_rank_one ? "Yes" : "No"} />
          <PreviewItem
            label="School in Batangas"
            value={profileData.school_in_batangas ? "Yes" : "No"}
          />
        </CardContent>
      </Card>

      {/* --- Address Info --- */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <PreviewItem label="Address" value={profileData.address} />
          <PreviewItem label="Barangay" value={profileData.barangay} />
        </CardContent>
      </Card>

      {/* --- Parental Info --- */}
      <Card>
        <CardHeader>
          <CardTitle>Parental & Household Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Father's Info</h4>
            <div className="pl-4 border-l-2 space-y-3">
              <PreviewItem
                label="Deceased"
                value={profileData.father_is_deceased ? "Yes" : "No"}
              />
              {!profileData.father_is_deceased && (
                <>
                  <PreviewItem label="Full Name" value={profileData.father_name} />
                  <PreviewItem label="Contact" value={profileData.father_contact} />
                  <PreviewItem label="Occupation" value={profileData.father_occupation} />
                </>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Mother's Info</h4>
            <div className="pl-4 border-l-2 space-y-3">
              <PreviewItem
                label="Deceased"
                value={profileData.mother_is_deceased ? "Yes" : "No"}
              />
              {!profileData.mother_is_deceased && (
                <>
                  <PreviewItem label="Full Name" value={profileData.mother_name} />
                  <PreviewItem label="Contact" value={profileData.mother_contact} />
                  <PreviewItem label="Occupation" value={profileData.mother_occupation} />
                </>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Household Info</h4>
            <div className="pl-4 border-l-2 space-y-3">
              <PreviewItem
                label="Solo Parent Household"
                value={profileData.is_solo_parent ? "Yes" : "No"}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {(profileData.guardian_name ||
        profileData.guardian_contact ||
        profileData.guardian_occupation) && (
        <Card>
          <CardHeader>
            <CardTitle>Guardian's Information (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <PreviewItem label="Guardian's Name" value={profileData.guardian_name} />
            <PreviewItem label="Guardian's Contact" value={profileData.guardian_contact} />
            <PreviewItem label="Guardian's Occupation" value={profileData.guardian_occupation} />
            <PreviewItem label="Relationship" value={profileData.relationship_to_student} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConfirmationPreview;
