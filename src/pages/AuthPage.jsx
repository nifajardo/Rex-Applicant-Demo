import React, { useState } from 'react';
import AuthLayout from '@/components/Auth/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';

const AuthPage = ({ onLogin, onGoogleSignIn, onDemoLogin, onOpenRegistration, isLoading }) => {
  const [currentView, setCurrentView] = useState('login');

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  return (
    <AuthLayout>
      {currentView === 'login' ? (
        <LoginForm 
          onLogin={onLogin}
          onGoogleSignIn={onGoogleSignIn}
          onDemoLogin={onDemoLogin}
          onOpenRegistration={onOpenRegistration}
          onForgotPassword={handleForgotPassword}
          isLoading={isLoading}
        />
      ) : currentView === 'forgot-password' ? (
        <ForgotPasswordForm onBack={handleBackToLogin} />
      ) : null}
    </AuthLayout>
  );
};

export default AuthPage;