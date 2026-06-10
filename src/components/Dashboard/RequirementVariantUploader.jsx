import RequirementUploadItem from "./RequirementUploadItem";

const RequirementVariantUploader = ({
  requirement,
  uploadedFiles,
  handleFileUpload,
  isLoading,
  isProfileComplete,
  profileData,
}) => {
    const fileKey = requirement.fileKey ?? requirement.key;
    const uiKey = requirement.fileKey ?? requirement.key;
    const dbKey = uiKey.replace(/\./g, "_");


    const { icon, title, description, dueDate, variants, rules } = requirement;
     // FILTER VARIANTS BASED ON PROFILE
    const educationLevel = profileData?.education_level;
    const applicationType = profileData?.application_type;

    const filteredVariants = variants?.filter((variant) => {
      // Remove applicant VRR for HS (new or renewal)
      if (
        variant.fileKey === "applicant" &&
        educationLevel === "High School"
      ) {
        return false;
      }
      return true;
    });

    
  // No variants → single uploader
  if (!variants || variants.length === 0) {
    return (
      <RequirementUploadItem
        fileKey={uiKey}      // UI logic
        dbKey={dbKey}        // DB logic
        icon={icon}
        title={title}
        description={description}
        dueDate={dueDate}
        uploadedFile={uploadedFiles[fileKey]}
        onFileUpload={handleFileUpload}
        disabled={isLoading || !isProfileComplete}
        allowReupload
        profileData={profileData}
        requirementRules={rules}
      />
    );
  }
  const Icon = icon;

  return (
    <div className="py-3 border-b last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Title */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <span className="font-medium">{title}</span>
        </div>

        {/* Right side: Upload Buttons */}
        <div className="flex flex-wrap justify-end gap-2">
          {/* {variants.map((variant) => {
            const compositeKey = `${fileKey}.${variant.fileKey }`;

            return (
              <RequirementUploadItem
                key={compositeKey}
                fileKey={compositeKey}
                icon={null}
                title={`Upload ${variant.label}`}
                uploadedFile={uploadedFiles[compositeKey]}
                onFileUpload={handleFileUpload}
                disabled={isLoading || !isProfileComplete}
                allowReupload
                profileData={profileData}
                requirementRules={rules}
                hideTitle
                buttonLabel={variant.label} // 👈 NEW PROP for the button itself
              />
            );
          })} */}


          {filteredVariants.map((variant) => {
            const compositeKey = `${fileKey}.${variant.fileKey}`;

            return (
              <RequirementUploadItem
                key={compositeKey}
                fileKey={compositeKey}
                icon={null}
                title={`Upload ${variant.label}`}
                uploadedFile={uploadedFiles[compositeKey]}
                onFileUpload={handleFileUpload}
                disabled={isLoading || !isProfileComplete}
                allowReupload
                profileData={profileData}
                requirementRules={rules}
                hideTitle
                buttonLabel={variant.label}
              />
            );
          })}
        </div>
      </div>




      {description && (
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      )}

      {dueDate && (
        <p className="text-xs text-muted-foreground mt-1">
          Due: {dueDate}
        </p>
      )}
    </div>
  );

};

export default RequirementVariantUploader;
