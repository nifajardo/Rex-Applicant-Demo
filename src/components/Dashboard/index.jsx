import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfileManager } from '@/hooks/useProfileManager';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';

import Header from './Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProfileSection from './ProfileSection';
import RequirementsSection from './RequirementsSection';
import EditProfileDialog from './EditProfileDialog';
import FeedbackDialog from './FeedbackDialog';
import ApplicationSubmit from './ApplicationSubmit';
import CommunityFeed from './CommunityFeed';
import CreatePostDialog from './CreatePostDialog';
import OnlineCourses from './OnlineCourses';
import CitizensCharter from './CitizensCharter';
import SettingsSection from './SettingsSection';
import HomePageHeader from './HomePageHeader';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import Chatbot from '../Chatbot/Chatbot';
import TestimonialsSection from './TestimonialsSection'; // Import the new component

const Dashboard = ({ onLogout }) => {
  const { user, session } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "New User";
  
  const {
    profileData, isLoadingProfile, isSavingProfile, uploadedFiles,
    handleFileUpload, handleProfileChange, handleProfileSubmit,
    feedbackDialogOpen, setFeedbackDialogOpen, isSubmittingFeedback, handleFeedbackSubmit,
  } = useProfileManager(user?.id, user?.email, userName);
  
  const {
    posts, isLoadingPosts, isSubmittingPost,
    handleCreatePost, handleUpdatePost, handleDeletePost,
  } = useCommunityPosts(user?.id, profileData?.full_name);

  const [currentView, setCurrentView] = useState('home');
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleEditPostClick = (post) => {
    setEditingPost(post);
    setCreatePostOpen(true);
  };
  
  const handleClosePostDialog = () => {
    setEditingPost(null);
    setCreatePostOpen(false);
  };

  // Modified to directly pass through to the hook's handleProfileSubmit without adding event handling
  const handleSaveProfile = async () => {
    // Direct pass-through to the hook's implementation
    return await handleProfileSubmit();
  };

  const isProfileComplete = profileData &&
    profileData.full_name &&
    profileData.email &&
    profileData.phone &&
    profileData.address &&
    profileData.birthdate &&
    profileData.barangay &&
    profileData.school &&
    profileData.program &&
    profileData.academic_year &&
    profileData.gwa &&
    profileData.scholarship_type &&
    profileData.father_name &&
    profileData.mother_name;

  const handleApplicationSubmit = async () => {
    setSuccessAlertOpen(true);
  };
  
  const handleProceedToFeedback = () => {
    setSuccessAlertOpen(false);
    setFeedbackDialogOpen(true);
  };

  const renderContent = () => {
    if (isLoadingProfile) {
      return <LoadingSpinner message="Loading your dashboard..." />;
    }

    switch (currentView) {
      case 'home':
        return <HomePageHeader profileData={profileData} onNavigate={setCurrentView} onEditProfile={() => setEditProfileOpen(true)} />;
      case 'profile':
        return <ProfileSection profileData={profileData} onEditClick={() => setEditProfileOpen(true)} />;
      case 'requirements':
        return <RequirementsSection 
                  profileData={profileData}
                  uploadedFiles={uploadedFiles}
                  handleFileUpload={handleFileUpload}
                  isLoading={isSavingProfile}
                  isProfileComplete={isProfileComplete}
                  onProfileClick={() => setEditProfileOpen(true)}
               />;
      case 'community':
        return <CommunityFeed 
                  posts={posts} 
                  isLoading={isLoadingPosts} 
                  currentUserId={user?.id}
                  onDeletePost={handleDeletePost}
                  onEditPost={handleEditPostClick}
                  onCreatePostClick={() => setCreatePostOpen(true)}
                  onProfileClick={() => setEditProfileOpen(true)}
                  profileData={profileData}
               />;
      case 'courses':
        return <OnlineCourses onProfileClick={() => setEditProfileOpen(true)} profileData={profileData} />;
      case 'charter':
        return <CitizensCharter onProfileClick={() => setEditProfileOpen(true)} profileData={profileData} />;
      case 'testimonials': // New case for testimonials
        return <TestimonialsSection />;
      case 'settings':
        return <SettingsSection onLogout={onLogout} />;
      default:
        return <HomePageHeader profileData={profileData} onNavigate={setCurrentView} onEditProfile={() => setEditProfileOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={onLogout}
        profileData={profileData}
      />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {renderContent()}
        {currentView === 'requirements' && (
          <ApplicationSubmit onSubmit={handleApplicationSubmit} isProfileComplete={isProfileComplete} />
        )}
      </main>
      
      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        profileData={profileData}
        handleProfileChange={handleProfileChange}
        handleProfileSubmit={handleSaveProfile}
        isLoading={isSavingProfile}
      />
      
      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        onSubmit={handleFeedbackSubmit}
        isSubmitting={isSubmittingFeedback}
        userEmail={user?.email}
      />
      
      <CreatePostDialog
        key={editingPost ? editingPost.id : 'new-post'}
        open={createPostOpen}
        onOpenChange={handleClosePostDialog}
        onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
        isSubmitting={isSubmittingPost}
        postToEdit={editingPost}
      />

      <AlertDialog open={successAlertOpen} onOpenChange={setSuccessAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>
              Your application documents have been queued for submission. The final step is to provide your feedback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleProceedToFeedback}>Next</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Chatbot />
    </div>
  );
};

export default Dashboard;