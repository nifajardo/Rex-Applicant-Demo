
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { analyzeImageQuality } from '@/lib/imageAnalysis';
import React, { useState, useEffect } from 'react';

import { FileText, Eye, Image as ImageIcon, FileText as FilePdf } from "lucide-react";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { PdfPreviewModal } from "./PdfPreviewModal";
import { supabase } from "@/lib/customSupabaseClient";

const getFileType = (file) => {
  const name = file?.name || "";
  const ext = name.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  return "other";
};
import { buildRequirementUrl } from "./buildRequirementURL";

const STORAGE_BASE =
  "https://pyylhcmhsbnutpzmwdua.supabase.co/storage/v1/object/public/scholarship_requirements";

const getPreviewUrl = (file) => {
  if (!file) return null;

  // Local file (before upload)
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }

  // Supabase stored file (path-based)
  if (file.path) {
    return `${STORAGE_BASE}/${file.path}`;
  }

  return null;
};


const FilePreviewItem = ({ file }) => {
  const [open, setOpen] = useState(false);

  const type = getFileType(file);
  const previewUrl = getPreviewUrl(file);
  // console.log("Preview URL:", previewUrl);
  // return (
  //   <>
  //     <div className="flex items-center justify-between text-xs bg-muted p-2 rounded-lg mt-2">
  //       <div className="flex items-center truncate">
  //         {type === "image" && <ImageIcon className="h-4 w-4 mr-2 text-primary" />}
  //         {type === "pdf" && <FilePdf className="h-4 w-4 mr-2 text-primary" />}
  //         {type === "other" && <FileText className="h-4 w-4 mr-2 text-primary" />}

  //         <span className="truncate max-w-[160px]" title={file.name}>
  //           {file.name}
  //         </span>
  //       </div>

  //     {type === "image" && (
  //       <button
  //         type="button"
  //         onClick={() => setOpen(true)}
  //         className="flex items-center gap-1 px-2 py-1 text-[10px] bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
  //       >
  //         <Eye className="h-3 w-3" />
  //         View
  //       </button>
  //     )}

  //     {type === "pdf" && (
  //       <button
  //         type="button"
  //         onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
  //         className="flex items-center gap-1 px-2 py-1 text-[10px] bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
  //       >
  //         <Eye className="h-3 w-3" />
  //         View
  //       </button>
  //     )}

  //     </div>

  //     {type === "image" && (
  //       <ImagePreviewModal
  //         isOpen={open}
  //         onClose={() => setOpen(false)}
  //         src={previewUrl}
  //       />
  //     )}

  //     {type === "pdf" && (
  //       <PdfPreviewModal
  //         isOpen={open}
  //         onClose={() => setOpen(false)}
  //         src={previewUrl}
  //       />
  //     )}
  //   </>
  // );

  return (
    <>
      <div className="flex items-center justify-between text-xs p-2 rounded-lg mt-2">
        <div className="flex items-center truncate">
          {type === "image" && <ImageIcon className="h-4 w-4 mr-2 text-primary" />}
          {type === "pdf" && <FilePdf className="h-4 w-4 mr-2 text-primary" />}
          {type === "other" && <FileText className="h-4 w-4 mr-2 text-primary" />}

          {(type === "image" || type === "pdf") ? (
            <button
              type="button"
              onClick={() => {
                if (type === "image") {
                  setOpen(true);
                } else {
                  window.open(previewUrl, "_blank", "noopener,noreferrer");
                }
              }}
              className="ml-1 truncate max-w-[160px] text-left text-primary underline underline-offset-2 hover:text-primary/80"
              title={file.name}
            >
              {file.name}
            </button>
          ) : (
            <span className="ml-1 truncate max-w-[160px]" title={file.name}>
              {file.name}
            </span>
          )}
        </div>
      </div>

      {type === "image" && (
        <ImagePreviewModal
          isOpen={open}
          onClose={() => setOpen(false)}
          src={previewUrl}
        />
      )}
    </>
  );

};

// Fetch status + notes from Supabase


const RequirementUploadItem = ({
  icon: Icon,
  title,
  description,
  dueDate,
  fileKey,
  dbKey,
  uploadedFile,
  onFileUpload,
  disabled,
  allowReupload = true,
  profileData,
  requirementRules,
  hideTitle = false,   // NEW
  buttonLabel,
}) => {
  const fileInputId = `file-upload-${fileKey}`;
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
  const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];
  const MAX_SIZE_MB = 5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
  
  
  
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    const fetchProfileStatus = async () => {
      if (!profileData?.id) {
        setApplicationStatus(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("synced_profiles")
          .select("status")
          .eq("id", profileData.id)
          .single();

        if (error) throw error;

        setApplicationStatus(data?.status ?? null);
      } catch (err) {
        console.error("Error fetching status:", err);
        setApplicationStatus(null);
      }
    };

    fetchProfileStatus();
  }, [profileData?.id]);
  
const isHighSchool = profileData?.education_level?.toLowerCase() === "high school";
const isTargetAcademicYear =
  profileData?.academic_year?.toLowerCase() === "2025-2026 second semester";

const allowedHSApplicant =
  profileData?.email === "alexanderpentinio12@gmail.com";

const status = (applicationStatus || "").toLowerCase();

//  Only these statuses are allowed to resubmit
const allowedStatuses = ["for evaluation", "for compliance", null, undefined, "", "approved"]; // allow null/undefined/empty for new applicants

const isAllowedStatus = allowedStatuses.includes(status);

//  Final condition
const canModify =
  (!isHighSchool || allowedHSApplicant) &&
  isTargetAcademicYear &&
  isAllowedStatus;
    
  // console.log({
  //   academicYear: profileData?.academic_year,
  //   isNewApplication,
  //   status,
  //   isBlockedStatus,
  // });

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = '';

    // NEW: Rule validation before any upload
    if (requirementRules?.appliesTo === "collegee" && profileData?.educationLevel !== "collegee") {
      toast({
        title: "Requirement Not Applicable",
        description: `${title} is only required for college applicants.`,
        variant: "destructive",
      });
      return;
    }

    if (requirementRules?.appliesTo === "highschool" && profileData?.educationLevel !== "highschool") {
      toast({
        title: "Requirement Not Applicable",
        description: `${title} is only required for high school applicants.`,
        variant: "destructive",
      });
      return;
    }

    if (requirementRules?.scholarship && profileData?.scholarship_type !== requirementRules.scholarship) {
      toast({
        title: "Requirement Not Applicable",
        description: `${title} is only required for ${requirementRules.scholarship} scholarship applicants.`,
        variant: "destructive",
      });
      return;
    }

    // console.log(`File selected: ${file.name}, size: ${file.size}, type: ${file.type}`);

    if (file.size > MAX_SIZE_BYTES) {
      toast({
        title: "File Too Large",
        description: `The selected file exceeds the ${MAX_SIZE_MB}MB size limit. Please choose a smaller file.`,
        variant: "destructive",
      });
      return;
    }

    const fileExtension = `.${file.name.split('.').pop().toLowerCase()}`;

    const hasValidExtension = ALLOWED_EXTENSIONS.includes(fileExtension);
    const hasValidMime =
      !file.type || ALLOWED_MIME_TYPES.includes(file.type);

    const isValidType = hasValidExtension && hasValidMime;


    // const isValidType = ALLOWED_EXTENSIONS.includes(fileExtension) || ALLOWED_MIME_TYPES.includes(file.type);

    if (!isValidType) {
      toast({
        title: "Invalid File Type",
        description: `Please upload a file of one of the following types: ${ALLOWED_EXTENSIONS.join(', ')}.`,
        variant: "destructive",
      });
      return;
    }

    //inalis ko muna yung A.I. 
    // For images, analyze quality
    // if (['image/jpeg', 'image/png'].includes(file.type)) {
    //   setIsAnalyzing(true);
    //   try {
    //     console.log('Analyzing image quality...');

    //     if (typeof window.cv === 'undefined') {
    //       console.log('OpenCV not available, skipping image analysis');
    //     } else {
    //       const { isClear, message } = await analyzeImageQuality(file);
    //       if (!isClear) {
    //         toast({
    //           title: "Image Quality Issue",
    //           description: message,
    //           variant: "destructive",
    //         });
    //         return;
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Image analysis error:', error);
    //   } finally {
    //     setIsAnalyzing(false);
    //   }
    // }

    setIsUploading(true);
    try {
      // console.log(`Starting upload for ${fileKey}: ${file.name}`);
      // await onFileUpload(fileKey, file);

      await onFileUpload({
        uiKey: fileKey,
        dbKey,
        file,
      });
      // console.log(`Upload completed for ${fileKey}`);

      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // const isButtonDisabled = disabled || isAnalyzing || isUploading;
  const isButtonDisabled =
  disabled ||
  isAnalyzing ||
  isUploading ||
  !canModify;

  const acceptString = ALLOWED_EXTENSIONS.join(',');

  const buttonText = isAnalyzing ? "Analyzing..." :
    isUploading ? "Uploading..." :
      uploadedFile ? "Re-upload" : "Upload";
  
  // Dynamic title override
  let displayTitle = title;


  if (fileKey === "reportCard") {
    if (profileData?.education_level === "College" || profileData?.educationLevel === "college") {
      displayTitle = "Report Card with Previous Enrolment Form (for College Applicants only)";
    } else {
      displayTitle = "Report Card"; 
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-b last:border-b-0">
      <div className="flex-1 min-w-0">
        {!hideTitle && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-primary flex-shrink-0" />}
            <span className="font-medium">{displayTitle}</span>
          </div>
        )}

        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {dueDate && <p className="text-xs text-muted-foreground mt-1">Due: {dueDate}</p>}
        {/* {uploadedFile && (
          // <p className="text-xs text-red-700 dark:text-red-400 mt-1 truncate">
          //   Uploaded: {uploadedFile.name}
          // </p>
            <FilePreviewItem file={uploadedFile} />

        )} */}

        {uploadedFile && (
          <FilePreviewItem
            file={{
              name:
                uploadedFile.name ||
                uploadedFile.original_name ||
                uploadedFile.file_name ||
                `${buttonLabel ?? "File"}.pdf`,
              path:
                uploadedFile.path ||
                uploadedFile.storage_path ||
                uploadedFile.file_path,
            }}
          />
        )}

      </div>
      <div className="flex-shrink-0">
        <input
          type="file"
          id={fileInputId}
          className="hidden"
          accept={acceptString}
          onChange={handleFileChange}
          disabled={isButtonDisabled}
        />

       

        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById(fileInputId)?.click()}
          className="w-full sm:w-auto"
          disabled={isButtonDisabled}
        >
          <Upload className="h-4 w-4 mr-2" />
          {buttonText}
        </Button> */}

        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById(fileInputId)?.click()}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
          disabled={isButtonDisabled}
        >
          <Upload className="h-4 w-4" />
          {buttonLabel ? `${buttonLabel} Upload` : buttonText} {/* 👈 Use buttonLabel if provided */}
        </Button>

      </div>
    </div>
  );
};

export default RequirementUploadItem;

