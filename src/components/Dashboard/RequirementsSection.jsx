import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RequirementVariantUploader from "./RequirementVariantUploader";
import { SCHOLARSHIP_TYPES } from "./RequirementsConstants";

const RequirementsSection = ({
  uploadedFiles,
  handleFileUpload,
  isLoading,
  profileData,
  isProfileComplete,
  requiredDocuments
}) => {
  const selectedScholarshipKey = profileData?.scholarship_type;
  const scholarshipInfo = SCHOLARSHIP_TYPES[selectedScholarshipKey] || SCHOLARSHIP_TYPES.DEFAULT;
  const { title: scholarshipTitle, description: scholarshipDesc, icon: ScholarshipIcon } = scholarshipInfo;

  // Defensive: filter out docs with missing fileKey
  const safeRequiredDocuments = requiredDocuments.filter((req, idx) => {
    if (!req || !req.fileKey) {
      console.warn(
        `[RequirementsSection] Missing fileKey for document at index ${idx}:`,
        req,
        "Applicant:", profileData?.userId || profileData?.full_name
      );
      return false;
    }
    return true;
  });

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader className="border-b border-slate-200 pb-4 px-6">
        <CardTitle className="text-primary">Application Requirements</CardTitle>
        <CardDescription className="text-slate-500">
          Documents and materials needed for your scholarship application. Please upload JPG, JPEG, PNG, PDF, or DOCX files (max 5MB).
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              {ScholarshipIcon && <ScholarshipIcon className="h-6 w-6 text-primary flex-shrink-0" />}
              <div>
                <h3 className="font-semibold text-lg text-slate-800">{scholarshipTitle}</h3>
                <p className="text-sm text-slate-500">{scholarshipDesc}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
            <div className="grid gap-2">
              {safeRequiredDocuments.map((req) => (
                <RequirementVariantUploader
                  key={req.fileKey}             // Safe: guaranteed to exist
                  requirement={req}
                  uploadedFiles={uploadedFiles}
                  handleFileUpload={handleFileUpload}
                  isLoading={isLoading}
                  isProfileComplete={isProfileComplete}
                  profileData={profileData}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequirementsSection;
