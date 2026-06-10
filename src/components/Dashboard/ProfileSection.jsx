import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AcademicInfo from "./info-sections/AcademicInfo";
import ParentalInfo from "./info-sections/ParentalInfo";
import { supabase } from "@/lib/customSupabaseClient";

const ProfileSection = ({ profileData, onEditClick }) => {
  const [activeTab, setActiveTab] = useState("academic");
  const [applicationStatus, setApplicationStatus] = useState(null); // 🟢 changed default to null
  const [notes, setNotes] = useState(""); 
  const [fetchError, setFetchError] = useState(null);
  const [stage, setStage] = useState(null);

  // Fetch status + notes from Supabase
  const fetchProfileStatus = async (profileId) => {
    setFetchError(null);

    if (!profileId) {
      setApplicationStatus(null);
      setNotes("");
      return;
    }

    // console.log("Querying Supabase with ID:", profileId);

    try {
      const { data, error } = await supabase
        .from("synced_profiles") 
        .select("status, notes, stage ")
        .eq("id", profileId)
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setApplicationStatus(data[0].status ?? null); // 🟢 store null if empty
        setNotes(data[0].notes || "");
        setStage(data[0].stage || "");
      } else {
        setApplicationStatus(null);
        setNotes("");
        setStage("");
      }
    } catch (err) {
      console.error("Error fetching status:", err);
      setApplicationStatus(null);
      setFetchError(err.message);
      setNotes("");
    }
  };

  useEffect(() => {
    const profileId = profileData?.id;
    fetchProfileStatus(profileId);
  }, [profileData?.id]);

  // 🟢 Dynamic color styling based on status
  const getStatusStyle = (status) => {
    const normalized = (status || "").toLowerCase();

    if (normalized.includes("pending")) {
      return "bg-yellow-100 border-yellow-500 text-yellow-700";
    } else if (normalized.includes("approved")) {
      return "bg-red-100 border-red-700 text-red-700";
    } else if (normalized.includes("rejected")) {
      return "bg-red-100 border-red-500 text-red-700";
    } else if (normalized.includes("for compliance")) {
      return "bg-red-100 border-red-500 text-red-700";
    } else {
      return "bg-blue-100 border-blue-500 text-blue-700";
    }
  };

  // 🟦 Convert status text to Pascal Case
  const toPascalCase = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      {/* --- Application Status Message Box (only show if not null) --- */}
      {applicationStatus && (
        <div
          className={`border-l-4 p-4 rounded-md ${getStatusStyle(
            applicationStatus
          )}`}
          role="alert"
        >
          <p className="font-bold">Application Status</p>
          <p>
            Your application status is:{" "}
            <span className="font-semibold">
              {applicationStatus?.toLowerCase() === "pending"
                ? `Pending ${toPascalCase(stage || "")}`
                : toPascalCase(applicationStatus)}
            </span>

          </p>
          
          {notes && notes.trim() !== "" ? (
            <p>Notes: {notes}</p>
          ) : (
            <p className="text-warning">Please ensure that your profile and requirements are complete.</p>
          )}  


          {fetchError && (
            <p className="mt-2 text-red-600 text-sm">Error: {fetchError}</p>
          )}
        </div>
      )}
      {/* ------------------------------------------------------------- */}

      <div className="flex items-center justify-center bg-slate-200/60 p-1 rounded-lg max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("academic")}
          className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-all duration-300 ${
            activeTab === "academic"
              ? "bg-white text-slate-800 shadow"
              : "bg-transparent text-slate-600 hover:bg-slate-200"
          }`}
        >
          Academic Info
        </button>
        <button
          onClick={() => setActiveTab("parental")}
          className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-all duration-300 ${
            activeTab === "parental"
              ? "bg-white text-slate-800 shadow"
              : "bg-transparent text-slate-600 hover:bg-slate-200"
          }`}
        >
          Parental Info
        </button>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          {activeTab === "academic" && (
            <AcademicInfo profileData={profileData} />
          )}
          {activeTab === "parental" && (
            <ParentalInfo profileData={profileData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;

