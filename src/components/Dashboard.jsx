import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import React, { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useProfileManager } from "@/hooks/useProfileManager";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// import PdfModal from './VeteransGuideDialog';
import HomePageHeader from "./Dashboard/HomePageHeader";
import ProfileSection from "./Dashboard/ProfileSection";
import RequirementsSection from "./Dashboard/RequirementsSection";
import EditProfileDialog from "./Dashboard/EditProfileDialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import CreatePostDialog from "./Dashboard/CreatePostDialog";
import CitizensCharter from "./Dashboard/CitizensCharter";
import OnlineCourses from "./Dashboard/OnlineCourses";
import FeedbackDialog from "./Dashboard/FeedbackDialog";
import CommunityFeed from "./Dashboard/CommunityFeed";
import ApplicationSubmit from "./Dashboard/ApplicationSubmit";
import SettingsSection from "./Dashboard/SettingsSection";
import Banner from "./Dashboard/Banner";
import ProcessGuide from "./Dashboard/ProcessGuide";
import TestimonialsSection from "./Dashboard/TestimonialsSection";
import AnnouncementsModal from "./Dashboard/AnnouncementsModal";
import { REQUIREMENTS_CONFIG, CONDITIONAL_REQUIREMENTS_CONFIG } from "./Dashboard/RequirementsConstants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Dashboard = ({ onLogout }) => {
  const { userId, userEmail, userName, isLoading: authIsLoading } = useAuth();
  const [view, setView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("profile");
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileAlertOpen, setProfileAlertOpen] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { toast } = useToast();
  const [numPages, setNumPages] = useState(null);
  const [announcementsModalOpen, setAnnouncementsModalOpen] = useState(false);
  
  const {
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
    savedProfileData,   // 
    setProfileData,     // 
    refreshProfile, // 
    setPrivacyAgreedBackend,
  } = useProfileManager(userId, userEmail, userName);

  const {
    posts,
    isLoadingPosts,
    createPostOpen,
    setCreatePostOpen,
    editingPost,
    setEditingPost,
    handleCreatePost,
    handleDeletePost,
    handleEditPost,
  } = useCommunityPosts(userId, profileData, userName);
  const applicationStatus = (profileData?.status || "").toLowerCase();

  const isProfileComplete = useMemo(() => {
    if (!savedProfileData) return false;

    const baseRequiredFields = [
      'full_name', 'phone', 'birthdate', 'address', 'barangay',
      'school', 'academic_year', 'gwa', 'scholarship_type', 'application_type'
    ];

    let dynamicRequiredFields = [...baseRequiredFields];

    if (!savedProfileData.father_is_deceased) {
      dynamicRequiredFields.push('father_name', 'father_contact', 'father_occupation');
    }
    if (!savedProfileData.mother_is_deceased) {
      dynamicRequiredFields.push('mother_name', 'mother_contact', 'mother_occupation');
    }

    return dynamicRequiredFields.every(field =>
      savedProfileData[field] !== undefined &&
      savedProfileData[field] !== '' &&
      savedProfileData[field] !== null
    );
  }, [savedProfileData]);
  useEffect(() => {
    const handler = () => {
      setPdfUrl('/pdf/guide.pdf');
      setShowPdf(true);
    };

    window.addEventListener('showVeteransGuide', handler);
    return () => window.removeEventListener('showVeteransGuide', handler);
  }, []);

  useEffect(() => {
    if (
      activeTab === "requirements" &&
      applicationStatus !== "for evaluation"
    ) {
      setPdfUrl('/pdf/guide.pdf');
      setShowPdf(true);
    }
  }, [activeTab, applicationStatus]);

  // Show announcements modal when dashboard loads (every 10 minutes)
  useEffect(() => {
    if (!isLoadingProfile && userId && !announcementsModalOpen) {
      // Check if user has seen announcements in the last 10 minutes
      const lastSeenKey = `announcements_seen_${userId}`;
      const lastSeen = localStorage.getItem(lastSeenKey);
      const now = new Date().getTime();
      const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
      
      if (!lastSeen || (now - parseInt(lastSeen)) > tenMinutes) {
        // Show modal after a short delay to ensure dashboard is fully loaded
        const timer = setTimeout(() => {
          setAnnouncementsModalOpen(true);
          localStorage.setItem(lastSeenKey, now.toString());
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [isLoadingProfile, userId, announcementsModalOpen]);


  const handleAfterSubmit = (type) => {
    if (type === "feedback") {
      // Open the feedback dialog
      setFeedbackDialogOpen(true);
    } else if (type === "pdf") {
      // Directly show PDF if feedback already exists
      setPdfUrl('/pdf/guide.pdf');
      setShowPdf(true);
    }
  };

  const PdfModal = ({ open, onClose }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfUrl = '/pdf/guide.pdf'; // static PDF

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[90vw] h-[90vh] rounded-lg overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold">Veterans Bank Application Guide</h2>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 overflow-auto">
                    <Worker workerUrl="/pdf.worker.min.js">
                        <Viewer
                            fileUrl={pdfUrl}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>

                {/* Footer with Close button */}
                <div className="p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

  const requiredDocuments = useMemo(() => {
    let documents = [];
    const applicationType = profileData?.application_type;
    const educationLevel = profileData?.education_level?.toLowerCase();

    const isCollege = educationLevel === 'college';
    const isHS = educationLevel === 'high school';

    // ======================
    // BASE REQUIREMENTS
    // ======================
    if (applicationType === 'Renewal') {
      const renewalKeys = ['reportCard', 'enrollmentForm', 'schoolId'];
      if (isCollege) {
        renewalKeys.push('votersRegistration');
      }
      documents = REQUIREMENTS_CONFIG.filter(req =>
        renewalKeys.includes(req.fileKey)
      );

      
    } else {
      documents = [...REQUIREMENTS_CONFIG.filter(req =>
        !req.fileKey.startsWith('vrr')
      )];
    }

    // ======================
    // VRR RULES
    // // ======================
    // if (isCollege) {
    //   if (applicationType === 'Renewal') {
    //     // VRR APPLICANT + Father OR Mother
    //     documents.push(
    //       REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrApplicant')
    //     );

    //     documents.push(
    //       REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrFather') ||
    //       REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrMother')
    //     );
    //   }

    //   if (applicationType === 'New') {
    //     // VRR APPLICANT + BOTH parents
    //     documents.push(
    //       REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrApplicant'),
    //       REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrFather'),
    //       REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrMother')
    //     );
    //   }
    // }

    // if (isHS && applicationType === 'New') {
    //   // Parents VRR only
    //   documents.push(
    //     REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrFather'),
    //     REQUIREMENTS_CONFIG.find(r => r.fileKey === 'vrrMother')
    //   );
    // }
    

    // const isCollege = profileData?.education_level?.toLowerCase() === 'college';

    // if (isCollege) {
    //   const vrr = REQUIREMENTS_CONFIG.find(
    //     r => r.fileKey === 'votersRegistration'
    //   );
    //   if (vrr) {
    //     documents.push(vrr);
    //   }
    // }



    if (profileData?.father_is_deceased) {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.fatherDeathCertificate);
    }
    if (profileData?.mother_is_deceased) {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.motherDeathCertificate);
    }
    if (profileData?.father_occupation === 'OFW') {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.fatherWorkContract);
    }
    if (profileData?.mother_occupation === 'OFW') {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.motherWorkContract);
    }
    if (profileData?.is_solo_parent) {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.soloParentId);
    }
    if (profileData?.scholarship_type === 'EXCEPTIONAL') {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.exceptionalCertTop1);
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.goodMoralCert);
    }
    if (profileData?.scholarship_type === 'ATHLETIC') {
      documents.push(CONDITIONAL_REQUIREMENTS_CONFIG.athleticCert);
    }


    return documents;
  }, [profileData]);
  
  // const isReadyToSubmit = useMemo(() => {
  //   if (!isProfileComplete) return false;
  //   return requiredDocuments.every(req => uploadedFiles[req.fileKey]);
  // }, [isProfileComplete, requiredDocuments, uploadedFiles]);

  const isReadyToSubmit = useMemo(() => {
    if (!isProfileComplete) return false;
    const isGwaValid = profileData?.gwa !== "" && profileData?.gwa !== null;
    if (!profileData?.gwa) return false; //  block submission if empty
    if (profileData?.gwa == '0.1') return false;

   
    return requiredDocuments.every(req => {
      // No variants → simple fileKey
      if (!req.variants || req.variants.length === 0) {
        return Boolean(uploadedFiles?.[req.fileKey]);
      }


      const applicableVariants = req.variants.filter(variant => {
      // Applicant VRR not applicable for High School
      if (
          req.fileKey === "votersRegistration" &&
          variant.fileKey === "applicant" &&
          profileData?.education_level === "High School"
        ) {
          return false;
        }

        return true;
      });

      
      if (req.fileKey === "votersRegistration") {
        return applicableVariants.some(variant => {
          const key = `${req.fileKey}.${variant.fileKey}`;
          return Boolean(uploadedFiles?.[key]);
        });
      }


      // With variants → ALL composite keys must exist
      return req.variants.every(variant => {
        const compositeKey = `${req.fileKey}.${variant.fileKey}`;
        return Boolean(uploadedFiles?.[compositeKey]);
      });
    });
  }, [isProfileComplete, requiredDocuments, uploadedFiles]);


  const handleTabChange = (value) => {
    if (value === "requirements" && !isProfileComplete) {
      setProfileAlertOpen(true);
    } else {
      setActiveTab(value);
    }
  };

  if (authIsLoading || isLoadingProfile) {
    return <LoadingSpinner message={authIsLoading ? "Authenticating..." : "Loading dashboard..."} />;
  }
  if (!profileData && userId) {
    return <LoadingSpinner message="Preparing your space..." />;
  }
  if (!userId) {
    return <LoadingSpinner message="Redirecting..." />;
  }
  

  

  const handleFinalProfileSubmit = async (e) => {
  const success = await handleProfileSubmit(e);
  if (success) {
    await refreshProfile(); 
    setEditProfileOpen(false);
    toast({
      title: "Profile Saved",
      description: "Your profile information has been updated successfully.",
    });
  }
  return success;
};

  const handleGoToProfile = () => {
    setProfileAlertOpen(false);
    setView('dashboard');
    setActiveTab('profile');
    setEditProfileOpen(true);
  };
  
  const handleProfileClick = () => {
    setView('dashboard');
    setActiveTab('profile');
  };

  const handleSettingsClick = () => {
    setView('settings');
  };

  const handleShowPdf = () => {
    window.open('/pdf/guide.pdf', '_blank');
  };

  
  const renderDashboardContent = () => (
    <>
      <Banner onProfileClick={() => setEditProfileOpen(true)} profileData={profileData} />
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="w-full justify-between overflow-x-auto flex-nowrap rounded-lg p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{background:"#f3f4f6"}}>
          {["Profile", "Posts", "Requirements", "Online Courses", "Citizen's Charter", "Process Guide", "Testimonials"].map(tab => (
            <TabsTrigger key={tab.toLowerCase().replace(/[\s']/g, '-')} value={tab.toLowerCase().replace(/[\s']/g, '-')} className="flex-shrink-0 data-[state=active]:text-white data-[state=active]:shadow-md transition-colors px-4 py-2 rounded-md text-slate-600 font-medium hover:bg-gray-200" style={{fontFamily:"Montserrat,sans-serif",fontSize:"0.8rem",fontWeight:600}}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="profile">
          {profileData && <ProfileSection profileData={profileData} onEditClick={() => setEditProfileOpen(true)} />}
        </TabsContent>

        <TabsContent value="posts">
          <CommunityFeed
            posts={posts}
            isLoading={isLoadingPosts}
            currentUserId={userId}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPost}
            onCreatePostClick={() => { setEditingPost(null); setCreatePostOpen(true); }}
          />
        </TabsContent>

        <TabsContent value="requirements">
          {profileData && <RequirementsSection
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            isLoading={isSavingProfile}
            profileData={profileData}
            isProfileComplete={isProfileComplete}
            requiredDocuments={requiredDocuments}
          />}
          <ApplicationSubmit onFinalSubmit={handleFinalSubmit}  onAfterSubmit={handleAfterSubmit}  isLoading={isSavingProfile} isReadyToSubmit={isReadyToSubmit} profileData={profileData}  />
        </TabsContent>

        <TabsContent value="online-courses">
          <OnlineCourses />
        </TabsContent>

        <TabsContent value="citizen-s-charter">
          <CitizensCharter />
        </TabsContent>

        <TabsContent value="process-guide">
          <ProcessGuide />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialsSection />
        </TabsContent>
      </Tabs>
    </>
  );

  return (
    <div className="min-h-screen text-slate-900">
      <HomePageHeader
        userName={profileData?.full_name || userName}
        onLogout={onLogout}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
      />

      <main className="container mx-auto p-4 md:p-8 space-y-8">
        {view === 'dashboard' ? renderDashboardContent() : <SettingsSection onLogout={onLogout} onBack={() => setView('dashboard')} />}
      </main>

      {profileData && (
        <EditProfileDialog
          open={editProfileOpen}
          onOpenChange={setEditProfileOpen}
          profileData={profileData}
          handleProfileChange={handleProfileChange}
          handleProfileSubmit={handleFinalProfileSubmit}
          isLoading={isSavingProfile}
        />
      )}
      <CreatePostDialog
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        onCreatePost={handleCreatePost}
        editingPost={editingPost}
      />
      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        onSubmit={handleFeedbackSubmit}
        isSubmitting={isSubmittingFeedback}
        onSuccess={() => {
          // Show Veterans Guide PDF after feedback is submitted
          setPdfUrl('/pdf/guide.pdf');
          setShowPdf(true);
        }}
      />

      <PdfModal
          open={showPdf}
          onClose={() => setShowPdf(false)}
      />

      <AlertDialog open={profileAlertOpen} onOpenChange={setProfileAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Your Profile First!</AlertDialogTitle>
            <AlertDialogDescription>
              To upload your requirements, you need to completely fill out your profile information first. This ensures we have all the necessary details for your application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setProfileAlertOpen(false)}>Cancel</Button>
            <Button className="bg-red-700 hover:bg-red-800" onClick={handleGoToProfile}>Go to Profile</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AnnouncementsModal
        isOpen={announcementsModalOpen}
        onClose={() => setAnnouncementsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
