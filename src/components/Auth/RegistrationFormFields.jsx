
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User as UserIcon, Phone as PhoneIcon, MapPin as MapPinIcon, Calendar as CalendarIcon, Eye as EyeOffIcon, Mail as MailIcon, FolderKey as KeyIcon, School as SchoolIcon, GraduationCap, VenetianMask, Eye as EyeIcon } from 'lucide-react';
import { HIGHSCHOOLS, COLLEGES } from "@/constants/schools";
import { MAJORS } from "@/constants/majors";

const RegistrationFormFields = ({ formData, handleChange, handleSelectChange, showPassword, setShowPassword, isLoading }) => {
    
    const [schools, setSchools] = useState(formData.educationLevel === 'High School' ? HIGHSCHOOLS : COLLEGES);
    const [showOtherProgram, setShowOtherProgram] = useState(false);

    const handleLevelChange = (value) => {
        handleSelectChange('educationLevel', value);
        handleSelectChange('school', ''); 
        handleSelectChange('program', '');
        handleSelectChange('other_program', '');
        setShowOtherProgram(false);
        if (value === 'High School') {
            setSchools(HIGHSCHOOLS);
        } else {
            setSchools(COLLEGES);
        }
    };

    const handleProgramChange = (value) => {
        handleSelectChange('program', value);
        if (value === 'Others') {
            setShowOtherProgram(true);
            handleSelectChange('other_program', '');
        } else {
            setShowOtherProgram(false);
            handleSelectChange('other_program', '');
        }
    }

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="displayName">Full Name</Label>
                <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        id="displayName"
                        name="displayName"
                        type="text"
                        placeholder="e.g., Juan Dela Cruz"
                        value={formData.displayName}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="pl-9"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g., juandelacruz@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="pl-9"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="pl-9 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        disabled={isLoading}
                    >
                        {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                        ) : (
                            <EyeIcon className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g., 09123456789"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="pl-9"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Your full address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="pl-9"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="birthdate">Birthdate</Label>
                <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="pl-9"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <div className="relative">
                    <VenetianMask className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                        name="gender"
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange('gender', value)}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="pl-9">
                            <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Level</Label>
                <RadioGroup
                    value={formData.educationLevel}
                    onValueChange={handleLevelChange}
                    className="flex space-x-4"
                    disabled={isLoading}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="High School" id="reg-level-hs" />
                        <Label htmlFor="reg-level-hs">High School</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="College" id="reg-level-college" />
                        <Label htmlFor="reg-level-college">College</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <div className="relative">
                    <SchoolIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Select 
                        value={formData.school} 
                        onValueChange={(value) => handleSelectChange('school', value)} 
                        disabled={isLoading || !formData.educationLevel}
                    >
                        <SelectTrigger className="w-full pl-9">
                            <SelectValue placeholder={!formData.educationLevel ? "Select a level first" : "Select your school"} />
                        </SelectTrigger>
                        <SelectContent>
                            {schools.map((school) => (
                                <SelectItem key={school} value={school}>
                                    {school}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {formData.educationLevel === 'College' && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="program">Major/Course</Label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                            <Select
                                name="program"
                                value={formData.program || ""}
                                onValueChange={handleProgramChange}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="pl-9">
                                    <SelectValue placeholder="Select your major/course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...MAJORS, "Others"].map((major) => (
                                        <SelectItem key={major} value={major}>
                                            {major}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {showOtherProgram && (
                        <div className="space-y-2">
                            <Label htmlFor="other_program">Specify Your Course</Label>
                             <div className="relative">
                                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                <Input
                                    id="other_program"
                                    name="other_program"
                                    type="text"
                                    placeholder="e.g., Bachelor of Science in Geodetic Engineering"
                                    value={formData.other_program}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default RegistrationFormFields;