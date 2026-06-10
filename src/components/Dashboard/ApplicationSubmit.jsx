
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/customSupabaseClient";
const ApplicationSubmit = ({ onFinalSubmit, onAfterSubmit, isLoading, isReadyToSubmit, profileData }) => {
  
  const handleSubmit = async () => {
    const result = await onFinalSubmit();

    if (!result) return;

    if (result.showFeedback) {
      onAfterSubmit?.("feedback");
    } else if (result.showPdf) {
      onAfterSubmit?.("pdf");
    }
  };
  
  const [applicationStatus, setApplicationStatus] = useState(null);
  
  const status = (applicationStatus || "").toLowerCase();
  
  const isHighSchool = profileData?.education_level?.toLowerCase() === "high school";
  const isTargetAcademicYear =
    profileData?.academic_year?.toLowerCase() === "2025-2026 second semester";

  const allowedHSApplicant =
    profileData?.email === "alexanderpentinio12@gmail.com";


  //  Only these statuses are allowed to resubmit
  const allowedStatuses = ["for evaluation", "for compliance", null, undefined, "", "approved"]; // allow null/undefined/empty for new applicants
  
  const isAllowedStatus = allowedStatuses.includes(status);

  //  Final condition
  const canModify =
    (!isHighSchool || allowedHSApplicant) &&
    isTargetAcademicYear &&
    isAllowedStatus;

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
    // console.log(applicationStatus);
  
 
  return (
    <div className="sticky bottom-0 bg-white dark:bg-slate-900/70 backdrop-blur-sm p-4 border-t border-slate-200 dark:border-slate-800 shadow-lg mt-8">
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !isReadyToSubmit || !canModify}
        size="lg"
        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </div>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Submit Application & Proceed to Final Step
          </>
        )}
      </Button>
      {!isReadyToSubmit && !isLoading && (
        <p className="text-center text-sm text-red-500 mt-2">
           Please complete your profile, ensure your academic year, grades, and other information are up to date, and upload all required documents before submitting.
        </p>
      )}
    </div>
  );
};

export default ApplicationSubmit;
