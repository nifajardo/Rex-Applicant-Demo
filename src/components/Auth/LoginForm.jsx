import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react';

const LoginForm = ({ onLogin, onGoogleSignIn, onOpenRegistration, onForgotPassword, isLoading }) => {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 w-full max-w-md mx-auto rounded-xl"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="mb-1 h-1 w-10 rounded" style={{ background: '#c0242d' }} />
        <h1 className="text-2xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Applicant Login
        </h1>
        <p className="text-sm text-gray-500 mt-1">Sign in to access your scholarship application</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
          <Input
            id="email" name="email" type="email"
            placeholder="Enter your email"
            className="bg-gray-50 border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md"
            value={formData.email} onChange={handleChange} disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
          <div className="relative">
            <Input
              id="password" name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-gray-50 border-gray-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md pr-10"
              value={formData.password} onChange={handleChange} disabled={isLoading}
            />
            <button
              type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe" name="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
            disabled={isLoading}
            className="data-[state=checked]:bg-red-700 data-[state=checked]:border-red-700"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">Remember me</label>
        </div>

        <Button
          type="submit"
          className="w-full font-bold py-2.5 rounded-md text-sm tracking-wide"
          style={{ background: '#c0242d', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in…' : 'Sign In →'}
        </Button>

        <Button
          type="button"
          className="w-full font-semibold py-2.5 rounded-md text-sm"
          style={{ background: '#1a1a2e', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}
          onClick={onOpenRegistration} disabled={false}
        >
          Create New Account
        </Button>
      </form>
    </motion.div>
  );
};

export default LoginForm;
