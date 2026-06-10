import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  signIn as supabaseSignIn, 
  signInWithGoogle as supabaseSignInWithGoogle, 
  signOut as supabaseSignOut, 
  onAuthStateChange as supabaseOnAuthStateChange, 
  getProfile as supabaseGetProfile
} from '@/lib/supabase';

export const useAuth = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with true

  const resetAuthStates = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserEmail("");
    setUserName("");
    setQuizCompleted(false);
  }, []);

  const fetchUserProfile = useCallback(async (sessionUser) => {
    if (!sessionUser) {
      resetAuthStates();
      return null;
    }
    
    setUserId(sessionUser.id);
    setUserEmail(sessionUser.email);
    setIsLoggedIn(true);

    try {
      const { data: profile, error } = await supabaseGetProfile(sessionUser.id);
      if (error && error.code !== 'PGRST116') { 
        throw error;
      }
      if (profile?.full_name) {
        setUserName(profile.full_name);
      } else if (sessionUser.user_metadata?.full_name) {
        setUserName(sessionUser.user_metadata.full_name);
      } else {
        setUserName(sessionUser.email?.split('@')[0] || 'User');
      }
      
      setQuizCompleted(profile?.quiz_completed || false);
      return profile;
    } catch (error) {
      console.error("Error fetching profile in useAuth:", error);
      setUserName(sessionUser.email?.split('@')[0] || 'User'); 
      setQuizCompleted(false); 
      return null;
    }
  }, [resetAuthStates]);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabaseOnAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        try {
          if (session?.user) {
            await fetchUserProfile(session.user);
          } else {
            resetAuthStates();
          }
        } catch (e) {
          console.error("Error during auth state processing in useEffect:", e);
          if (mounted) {
            resetAuthStates(); 
          }
        } finally {
          if (mounted) {
            setIsLoading(false); 
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchUserProfile, resetAuthStates]);

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      toast({ title: "Login Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabaseSignIn(email, password);
      if (error) throw error;
    } catch (error) {
      toast({ title: "Login Failed", description: error.message || "Failed to sign in. Please check your credentials.", variant: "destructive" });
      if (isLoggedIn) resetAuthStates();
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabaseSignInWithGoogle();
      if (error) throw error;
    } catch (error) {
      toast({ title: "Google Sign-In Failed", description: error.message || "Failed to sign in with Google.", variant: "destructive" });
      if (isLoggedIn) resetAuthStates();
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabaseSignOut();
      if (error) throw error;
    } catch (error) {
      toast({ title: "Logout Failed", description: error.message || "Failed to sign out.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    userEmail,
    userName,
    userId,
    quizCompleted,
    setQuizCompleted,
    isLoading,
    handleLogin,
    handleGoogleSignIn,
    handleLogout,
  };
};