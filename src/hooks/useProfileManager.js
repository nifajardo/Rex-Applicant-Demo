import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getProfile, updateProfile, uploadFile, submitFeedback, getSubmittedRequirements, upsertSubmittedRequirements, supabase } from "@/lib/supabase";
import { REQUIREMENTS_CONFIG, CONDITIONAL_REQUIREMENTS_CONFIG } from "@/components/Dashboard/RequirementsConstants";

export const useProfileManager = (userId, userEmail, userName) => {
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState(null);
  const [savedProfileData, setSavedProfileData] = useState(null); // DB snapshot
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const getRequiredDocuments = useCallback((profile) => {
    if (!profile) return [];
    
    let documents = [...REQUIREMENTS_CONFIG];
    
    if (profile.father_is_deceased) documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.fatherDeathCertificate);
    if (profile.mother_is_deceased) documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.motherDeathCertificate);
    if (profile.father_occupation === 'OFW') documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.fatherWorkContract);
    if (profile.mother_occupation === 'OFW') documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.motherWorkContract);
    if (profile.is_solo_parent) documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.soloParentId);
    if (profile.scholarship_type === 'EXCEPTIONAL') {
        documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.exceptionalCertTop1);
        documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.goodMoralCert);
    }
    if (profile.scholarship_type === 'ATHLETIC') documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.athleticCert);

    return documents;
  }, []);

  const fetchProfileData = useCallback(async () => {
    if (!userId) {
      setIsLoadingProfile(false);
      return;
    }
    setIsLoadingProfile(true);
    try {
      const { data: profile, error: profileError } = await getProfile(userId);
      if (profileError && profileError.code !== 'PGRST116') throw profileError;

      const currentProfile = profile || {
        id: userId, full_name: userName || "", email: userEmail || "",
        phone: "", address: "", birthdate: "", barangay: "", school: "",
        program: "", academic_year: "", gwa: "", scholarship_type: "ACADEMIC",
        application_type: "New Application",
        father_is_deceased: false, mother_is_deceased: false, is_solo_parent: false
      };
      setProfileData(currentProfile);
      setSavedProfileData(currentProfile); // DB saved snapshot

      const { data: requirements, error: requirementsError } = await getSubmittedRequirements(userId);
      if (requirementsError && requirementsError.code !== 'PGRST116') throw requirementsError;
      
      if (requirements) {
        const currentUploadedFiles = {};
        const allPossibleDocs = getRequiredDocuments(currentProfile);

        allPossibleDocs.forEach(req => {
          //  CASE 1: Has variants (front/back/etc)
          if (req.variants?.length) {
            req.variants.forEach(variant => {
              const uiKey = `${req.fileKey}.${variant.fileKey}`;      // reportCard.front
              const dbKey = `${req.fileKey}_${variant.fileKey}`;      // reportCard_front
              // console.log('uiKey', uiKey);
              // console.log('dbKey', dbKey);
              const pathKey = `${dbKey}_path`;
              const nameKey = `${dbKey}_name`;

              if (requirements[pathKey] && requirements[nameKey]) {
                currentUploadedFiles[uiKey] = {
                  name: requirements[nameKey],
                  path: requirements[pathKey]
                };
              }
            });
          }

          //  CASE 2: Single file requirement
          else {
            const pathKey = `${req.fileKey}_path`;
            const nameKey = `${req.fileKey}_name`;

            if (requirements[pathKey] && requirements[nameKey]) {
              currentUploadedFiles[req.fileKey] = {
                name: requirements[nameKey],
                path: requirements[pathKey]
              };
            }
          }
        });

        setUploadedFiles(currentUploadedFiles);
      }


    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast({ title: "Error", description: `Could not fetch your data: ${error.message}`, variant: "destructive" });
    } finally {
      setIsLoadingProfile(false);
    }
  }, [userId, userEmail, userName, toast, getRequiredDocuments]);


  // // load profile initially
  // useEffect(() => {
  //   if (!userId) return;
  //   (async () => {
  //     setIsLoadingProfile(true);
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", userId)
  //       .single();
  //     if (!error) setProfileData(data);
  //     setIsLoadingProfile(false);
  //   })();
  // }, [userId]);

  // refreshProfile function
  const refreshProfile = async () => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (!error && data) {
      setProfileData(data);
      return data;
    } else {
      console.error("Failed to refresh profile:", error);
      return null;
    }
  };


  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleFileUpload = async ({ uiKey, dbKey, file }) => {
    if (!file || !userId) return false;
    setIsSavingProfile(true);

    try {
      // Ensure dbKey exists (fallback to uiKey with underscores)
      const safeDbKey = dbKey ?? uiKey.replace(/\./g, "_");
      // const safeDbKey = dbKey ?? uiKey.split('.')[0];
      // console.log(`Starting file upload for ${uiKey}: ${file.name}`);
      // console.log(`safeDbKey ${safeDbKey}: ${dbKey}`);
      // Construct file path
      const extension = file.name.split(".").pop();

      // Sanitize filename to remove special characters that cause Supabase upload errors
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

      // Create unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const uniqueName = `${safeDbKey}_${timestamp}_${sanitizedName}`;

      // Keep same folder, but unique file each time
      const filePath = `${userId}/${safeDbKey}/${uniqueName}`;

      // Upload file
      const { error: uploadError } = await uploadFile(
        "scholarship_requirements",
        filePath,
        file
      );
      if (uploadError) throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);

      // console.log(`File uploaded successfully to ${filePath}`);

      // Update database record
      const requirementsUpdate = {
        [`${safeDbKey}_path`]: filePath,
        [`${safeDbKey}_name`]: `${file.name}`,
      };

      const { error: dbError } = await upsertSubmittedRequirements(userId, requirementsUpdate);
      if (dbError) throw new Error(`Failed to save document record: ${dbError.message}`);

      // console.log(`Requirements record updated successfully`);

      // Update local state (matches old design: keyed by uiKey)
      setUploadedFiles(prev => ({
        ...prev,
        [uiKey]: { name: file.name, path: filePath },
      }));

      toast({
        title: "File Uploaded!",
        description: `${file.name} has been successfully saved.`,
      });

      return true;
    } catch (error) {
      console.error("File upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSavingProfile(false);
    }
  };



  // const handleFileUpload = async (fileKey, file) => {
  //   if (!file || !userId) return false;
  //   setIsSavingProfile(true);
    
  //   try {
  //     console.log(`Starting file upload for ${fileKey}: ${file.name}`);

  //     const extension = file.name.split('.').pop();
  //     const filePath = `${userId}/${fileKey}/${fileKey}.${extension}`;

  //     //const filePath = `${userId}/${fileKey}/${fileKey}`;
  //     const { error: uploadError } = await uploadFile('scholarship_requirements', filePath, file);
  //     if (uploadError) throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);

  //     console.log(`File uploaded successfully to ${filePath}`);
  //     const requirementsUpdate = {
  //       [`${fileKey}_path`]: filePath,
  //       [`${fileKey}_name`]: file.name,
  //     };

  //     console.log(`Updating requirements record with:`, requirementsUpdate);
  //     const { error: dbError } = await upsertSubmittedRequirements(userId, requirementsUpdate);
  //     if (dbError) throw new Error(`Failed to save document record: ${dbError.message}`);
      
  //     console.log(`Requirements record updated successfully`);
  //     setUploadedFiles(prev => ({ ...prev, [fileKey]: { name: file.name, path: filePath } }));

  //     toast({
  //       title: "File Uploaded!",
  //       description: `${file.name} has been successfully saved.`,
  //     });

  //     return true;
  //   } catch (error) {
  //     console.error(`File upload error:`, error);
  //     toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
  //     return false;
  //   } finally {
  //     setIsSavingProfile(false);
  //   }
  // };

  // const handleProfileChange = (field, value) => {
  //   setProfileData(prev => ({ ...prev, [field]: value }));
  // };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => {
      const updated = { ...prev, [field]: value };

      const hasStructuredName =
        updated.first_name || updated.middle_name || updated.last_name;

      if (hasStructuredName) {
        updated.full_name = [
          updated.first_name,
          updated.middle_name,
          updated.last_name,
        ]
          .filter(Boolean)
          .join(" ");
      }

      return updated;
    });
  };



  // Modified handleProfileSubmit to be more robust
  const handleProfileSubmit = async () => {
    if (!userId || !profileData) {
      console.error("Cannot save profile: missing userId or profileData");
      return false;
    }
    
    // setIsSavingProfile(true);
    // console.log("Starting save operation...");
    // console.log("Profile data to save:", profileData);

    try {
      // Clean up the updates object to remove any problematic values
      const updates = { ...profileData };
      
      // Convert GWA to number if present
      if (updates.gwa) {
        try {
          updates.gwa = parseFloat(updates.gwa);
        } catch (e) {
          console.warn("Could not parse GWA as float:", updates.gwa);
        }
      }
      
      // Remove any functions or complex objects that might cause issues
      Object.keys(updates).forEach(key => {
        const value = updates[key];
        if (typeof value === 'function' || 
            (typeof value === 'object' && value !== null && !(value instanceof Date))) {
          delete updates[key];
        }
      });

      // console.log("Calling updateProfile with:", userId, updates);
      const { data, error } = await updateProfile(userId, updates);
      
      if (!error && data) {
        setProfileData(data[0]);       // keep editing state
        setSavedProfileData(data[0]);  // refresh saved snapshot
      }

      if (error) {
        console.error("Profile update error:", error);
        toast({ 
          title: "Save Failed", 
          description: `Could not save your profile: ${error.message || 'Unknown error'}`, 
          variant: "destructive" 
        });
        return false;
      }
      
      // console.log("Profile updated successfully:", data);
      
      // Refresh profile data to ensure we have the latest
      await fetchProfileData();
      
      toast({ 
        title: "Profile Saved", 
        description: "Your information has been successfully updated." 
      });
      
      return true;
    } catch (error) {
      console.error("Exception during profile save:", error);
      toast({ 
        title: "Save Failed", 
        description: `Could not save your profile: ${error?.message || 'Unknown error'}`, 
        variant: "destructive" 
      });
      return false;
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!profileData) {
      toast({ title: "Error", description: "Profile data not loaded.", variant: "destructive" });
      return { showFeedback: false, showPdf: false };
    }

    setIsSavingProfile(true);

    try {
      const { error: emailError } = await supabase.functions.invoke('send-submission-email', {
        body: {
          recipient_email: profileData.email,
          recipient_name: profileData.full_name,
          profile_id: userId
        },
      });

      if (emailError) throw emailError;

      toast({
        title: "Application Submitted!",
        description: "A confirmation email is on its way.",
      });

      //  Check feedback
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (feedbackError && feedbackError.code !== 'PGRST116') {
        throw feedbackError;
      }

      if (!feedbackData) {
        //  No feedback → show dialog
        return { showFeedback: true, showPdf: false };
      } else {
        //  Already has feedback → show PDF
        return { showFeedback: false, showPdf: true };
      }

    } catch (err) {
      console.error("Submission error:", err);

      toast({
        title: "Your documents have been submitted!",
        description: "Please proceed with the feedback form.",
      });

      return { showFeedback: true, showPdf: false };
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    setIsSubmittingFeedback(true);
    try {
      const { error } = await submitFeedback({ ...feedbackData, user_id: userId, email: profileData?.email });
      if (error) throw error;

      toast({
        title: "Feedback Received!",
        description: "Thank you! Your application process is now complete.",
      });

      // Close dialog
      setFeedbackDialogOpen(false);

      // Trigger PDF display
      onSuccess?.();
    } catch (error) {
      toast({ title: "Error", description: `Could not submit feedback: ${error.message}`, variant: "destructive" });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // Add this inside useProfileManager
const setPrivacyAgreedBackend = async () => {
  if (!userId) return false;
  setIsSavingProfile(true);
  
  try {
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ privacy: true })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // Update local state
    setProfileData(prev => ({ ...prev, privacy: true }));
    setSavedProfileData(prev => ({ ...prev, privacy: true }));

    toast({
      title: "Privacy Updated",
      description: "Your consent has been saved successfully.",
    });

    return true;
  } catch (error) {
    console.error("Failed to update privacy:", error);
    toast({
      title: "Update Failed",
      description: `Could not save your consent: ${error.message}`,
      variant: "destructive",
    });
    return false;
  } finally {
    setIsSavingProfile(false);
  }
};


  return {
    profileData,
    isLoadingProfile,
    isSavingProfile,
    uploadedFiles,
    handleFileUpload,
    handleProfileChange,
    handleProfileSubmit,
    handleFinalSubmit,
    feedbackDialogOpen,
    setFeedbackDialogOpen,
    isSubmittingFeedback,
    handleFeedbackSubmit,
    setProfileData, //dinagdag ko lang for usage sa dashboard
    savedProfileData,   // newly added for requirement gate
    refreshProfile,
    setPrivacyAgreedBackend,
  };
};