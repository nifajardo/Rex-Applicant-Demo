import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ import routing components
import RegistrationForm from "@/components/RegistrationForm";
import Dashboard from "@/components/Dashboard";
import AuthPage from "@/pages/AuthPage";
import ApplicationClosed from "@/components/ApplicationClosed"; // ✅ import your closed page
import ApplicantGuidePage from "@/pages/ApplicantGuidePage"; // ✅ import applicant guide
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import Chatbot from "./components/Chatbot/Chatbot";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const {
    isLoggedIn,
    userId,
    isLoading: authIsLoading,
    handleLogin,
    handleLogout,
  } = useAuth();

  const [registrationOpen, setRegistrationOpen] = useState(false);
  if (authIsLoading) {
    return <LoadingSpinner message="Authenticating, please wait..." />;
  }

  const renderMainApp = () => {
    if (!isLoggedIn || !userId) {
      return (
        <AuthPage
          onLogin={handleLogin}
          onOpenRegistration={() => setRegistrationOpen(true)}
          isLoading={authIsLoading}
        />
      );
    }

    return <Dashboard onLogout={handleLogout} />;
  };

  return (
    <>
      <Routes>
        {/* Main app logic */}
        <Route path="/" element={renderMainApp()} />

        {/* Applicant Guide Page */}
        <Route path="/guide" element={<ApplicantGuidePage />} />

        {/* Application Closed Page */}
        <Route path="/application-closed" element={<ApplicationClosed />} />
      </Routes>

      <RegistrationForm open={registrationOpen} onOpenChange={setRegistrationOpen} />
      {isLoggedIn && <Chatbot />}
      <Toaster />
    </>
  );
};

export default App;
