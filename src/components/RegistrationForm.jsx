
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { signUp } from "@/lib/supabase";
import RegistrationFormFields from "@/components/Auth/RegistrationFormFields";

const INITIAL_FORM_DATA = {
  displayName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  birthdate: "",
  gender: "",
  school: "",
  educationLevel: "High School",
  program: "",
  other_program: ""
};

const RegistrationForm = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['displayName', 'email', 'password', 'phone', 'address', 'birthdate', 'gender', 'school', 'educationLevel'];
    if (formData.educationLevel === 'College') {
      requiredFields.push('program');
      if (formData.program === 'Others') {
        requiredFields.push('other_program');
      }
    }
    for (const field of requiredFields) {
        if (!formData[field]) {
            let friendlyName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
            if (field === 'other_program') friendlyName = 'specific course';

            toast({
                title: "Error",
                description: `Please fill in the ${friendlyName} field.`,
                variant: "destructive",
            });
            return false;
        }
    }
    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        toast({
            title: "Error",
            description: "Please enter a valid email address.",
            variant: "destructive",
        });
        return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    const finalProgram = formData.program === 'Others' ? formData.other_program : formData.program;

    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        displayName: formData.displayName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        birthdate: formData.birthdate,
        gender: formData.gender,
        school: formData.school,
        educationLevel: formData.educationLevel,
        program: finalProgram,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Registration successful! Please check your email to verify your account.",
      });
      
      onOpenChange(false); 
      setFormData(INITIAL_FORM_DATA); 
      setShowPassword(false);

    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogStateChange = (isOpen) => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_DATA);
      setShowPassword(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogStateChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">Register as an Applicant</DialogTitle>
          <DialogDescription>
            Create your account to apply for the REX Education Scholarship Program
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 pr-2">
          <RegistrationFormFields
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
          />
          <DialogFooter className="pt-6">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;