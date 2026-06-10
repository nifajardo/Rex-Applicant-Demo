import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for password reset instructions.');
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-transparent p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
        <p className="text-sm text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-red-700 rounded-lg"
            required
            disabled={isLoading}
          />
        </div>

        {message && (
          <p className={`text-sm text-center ${message.startsWith('Error') ? 'text-red-600' : 'text-red-700'}`}>
            {message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-lg text-base"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Email'}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-gray-100 hover:bg-gray-200 border-transparent text-gray-700 font-semibold py-3 rounded-lg text-base"
          onClick={onBack}
          disabled={isLoading}
        >
          Back to Login
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
