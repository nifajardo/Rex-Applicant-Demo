import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditProfilePersonal from "./forms/EditProfilePersonal";
import EditProfileAcademic from "./forms/EditProfileAcademic";
import EditProfileAddress from "./forms/EditProfileAddress";
import EditProfileParental from "./forms/EditProfileParental";
import EditProfileGuardian from "./forms/EditProfileGuardian";
import ConfirmationPreview from "./ConfirmationPreview";

import { useProfileManager } from "@/hooks/useProfileManager";
const EditProfileDialog = ({ 
  open, 
  onOpenChange, 
  profileData, 
  handleProfileChange, 
  handleProfileSubmit,
  isLoading
}) => {

    const userId = profileData?.id;
    const userEmail = profileData?.email;
    const userName = profileData?.full_name;
    const {
      setPrivacyAgreedBackend, // <-- get it from the hook
      refreshProfile,
      // ...other functions if needed
    } = useProfileManager(userId, userEmail, userName);
    
  const [isConfirming, setIsConfirming] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const hasAgreedToPrivacy =
    profileData?.privacy !== undefined
      ? profileData.privacy
      : privacyAgreed;

      
  if (!profileData) return null;

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (!privacyAgreed) {
    //   setShowPrivacy(true); // force them to read & agree
    //   return;
    // }

    // check the database privacy column
    if (!profileData?.privacy) {
      setShowPrivacy(true); // show modal only if privacy not agreed in DB
      return;
    }
    setIsConfirming(true);
    setSaveStatus(null);
  };

  const handleConfirmAndSave = async () => {
    setSaveStatus("saving");
    try {
      const success = await handleProfileSubmit();
      if (success) {
        setSaveStatus("success");
        setTimeout(() => {
          setIsConfirming(false);
          onOpenChange(false);
        }, 500);
        if (window.showToast) {
          window.showToast("Profile saved successfully!");
        }
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setSaveStatus(null);
    setPrivacyAgreed(false);
    onOpenChange(false);
  };

  const handleBackToEdit = () => {
    setIsConfirming(false);
    setSaveStatus(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleCancel();
        } else {
          onOpenChange(true);
        }
      }}
    >
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-card p-6 pb-4 border-b">
          <DialogTitle className="text-2xl">
            {isConfirming ? "Confirm Your Information" : "Edit Profile Information"}
          </DialogTitle>
          <DialogDescription>
            {isConfirming
              ? "Please review your information carefully before saving."
              : "Update your personal, academic, and family information. Ensure all details are accurate."}
          </DialogDescription>
        </DialogHeader>

        {isConfirming ? (
          <div className="p-6">
            <ConfirmationPreview profileData={profileData} />

            {saveStatus === "error" && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                <strong>Error:</strong> Failed to save profile. Please check your connection and try again.
              </div>
            )}

            {saveStatus === "success" && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                <strong>Success:</strong> Profile saved successfully!
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t sticky bottom-0 bg-card py-4 px-6">
              <Button
                variant="outline"
                type="button"
                onClick={handleBackToEdit}
                disabled={isLoading || saveStatus === "saving"}
              >
                Back to Edit
              </Button>
              <Button
                type="button"
                onClick={handleConfirmAndSave}
                disabled={isLoading || saveStatus === "saving"}
                className={saveStatus === "success" ? "bg-red-800 hover:bg-red-900" : ""}
              >
                {saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "success"
                  ? "Saved!"
                  : "Confirm & Save"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInitialSubmit} className="space-y-8 p-6">
            <EditProfilePersonal
              profileData={profileData}
              handleProfileChange={handleProfileChange}
              disabled={isLoading}
            />

            <EditProfileAcademic
              profileData={profileData}
              handleProfileChange={handleProfileChange}
              disabled={isLoading}
            />

            <EditProfileAddress
              profileData={profileData}
              handleProfileChange={handleProfileChange}
              disabled={isLoading}
            />

            <EditProfileParental
              profileData={profileData}
              handleProfileChange={handleProfileChange}
              disabled={isLoading}
            />

            <EditProfileGuardian
              profileData={profileData}
              handleProfileChange={handleProfileChange}
              disabled={isLoading}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t sticky bottom-0 bg-card py-4 px-6 gap-2">
              <div className="text-sm">
                <Button
                  type="button"
                  variant="link"
                  className="underline text-muted-foreground"
                  onClick={() => setShowPrivacy(true)}
                >
                  View Data Privacy Notice
                </Button>
                {privacyAgreed ? (
                  <span className="ml-2 text-red-700 font-medium">(Agreed)</span>
                ) : (
                  <span className="ml-2 text-red-600 font-medium">(Required)</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" 
                        // disabled={ !profileData?.privacy || !privacyAgreed || isLoading  
                         disabled={!hasAgreedToPrivacy || isLoading}
                >
                  {isLoading ? "Saving..." : "Review & Save"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>

      {/* Privacy Consent Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Data Privacy Consent</DialogTitle>
            <DialogDescription>
              In compliance with Republic Act No. 10173 or the Data Privacy Act of 2012, we are committed to
              protecting your personal information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              By providing your personal data, you consent to its collection, processing, and storage by our
              institution for legitimate purposes such as student profiling, academic records, reporting to
              government agencies, and other school-related functions.
            </p>
            <p>
              Your information will be kept confidential and will not be shared with third parties without your
              consent, unless required by law. You have the right to access, correct, or request deletion of
              your data as provided under the Data Privacy Act.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowPrivacy(false)}>
              Close
            </Button>
            <Button
              onClick={async () => {
                const success = await setPrivacyAgreedBackend();
                
                if (success) {
                  setPrivacyAgreed(true);
                  handleProfileChange("privacy", true);
                  setShowPrivacy(false);
                }
              }}
            >
              I Agree
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default EditProfileDialog;

