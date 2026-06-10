import React from 'react';
import {
  FileText, FileSignature, FileCheck, DollarSign, FileStack, WalletCards as IdCard, Baby, Vote, GraduationCap, Award, Palette, Star, Library, Briefcase, UserCheck, FileHeart, FileUp, UserSquare, ShieldCheck, Trophy
} from 'lucide-react';

export const REQUIREMENTS_CONFIG = [
  {
    fileKey: "endorsementLetter",
    title: "Endorsement Letter",
    icon: FileText,
    description: "Letter from barangay endorsing your scholarship application.",
  },
  {
    fileKey: "applicationLetter",
    title: "Application Letter addressed to Mayor Marvey Mariño",
    icon: FileSignature,
    description: "Formal letter requesting scholarship consideration.",
  },
  {
    fileKey: "reportCard",
    title: "Report Card",
    icon: FileCheck,
    description: "Complete academic records from your current institution.",
    variants: [
      { fileKey: "front", label: "Front" },
      // { fileKey: "back", label: "Back" },
      { fileKey: "previousEnrollment", label: "Previous Enrollment Form" }, // 👈 changed
    ],
  },
  {
    fileKey: "combinedIncome",
    title: "Combined Income of Parents",
    description: "Documentation showing total household income (e.g., ITR, Sinumpaang Salaysay).",
    icon: DollarSign,
  },
  {
    fileKey: "enrollmentForm",
    title: "Enrolment Form / Certificate of Enrolment",
    description: "Proof of current enrollment in an educational institution.",
    icon: FileStack,
  },
  {
    fileKey: "schoolId",
    title: "School ID",
    icon: IdCard,
    description: "Valid identification card from your current school.",
    variants: [
      { fileKey: "front", label: "Front" },
      { fileKey: "back", label: "Back" },
    ],
  },
  {
    fileKey: "birthCertificate",
    title: "Birth Certificate",
    description: "Official birth certificate (e.g., PSA copy).",
    icon: Baby,
  },
  {
  fileKey: "votersRegistration",
  title: "Voters Registration Record",
  description: "Voters registration record of parents and applicant (if applicable).",
  icon: Vote,
  optional: true, 
  rules: {
    educationLevel: ["college"],
  },
  variants: [
    { fileKey: "father", label: "Father" },
    { fileKey: "mother", label: "Mother" },
    { fileKey: "applicant", label: "Applicant" },
  ],
},

];


export const CONDITIONAL_REQUIREMENTS_CONFIG = {
  fatherDeathCertificate: {
    fileKey: "fatherDeathCertificate",
    icon: FileHeart,
    title: "Father's Death Certificate",
    description: "Required as father is marked as deceased.",
    dueDate: "October 31, 2025",
  },
  motherDeathCertificate: {
    fileKey: "motherDeathCertificate",
    icon: FileHeart,
    title: "Mother's Death Certificate",
    description: "Required as mother is marked as deceased.",
    dueDate: "October 31, 2025",
  },
  fatherWorkContract: {
    fileKey: "fatherWorkContract",
    icon: FileUp,
    title: "Father's OFW Contract of Work",
    description: "Required as father is an OFW.",
    dueDate: "October 31, 2025",
  },
  motherWorkContract: {
    fileKey: "motherWorkContract",
    icon: FileUp,
    title: "Mother's OFW Contract of Work",
    description: "Required as mother is an OFW.",
    dueDate: "October 31, 2025",
  },
  soloParentId: {
    fileKey: "soloParentId",
    icon: UserSquare,
    title: "Solo Parent ID",
    description: "Required for solo parent applicants.",
    dueDate: "October 31, 2025",
  },
  exceptionalCertTop1: {
    fileKey: "exceptionalCertTop1",
    icon: Award,
    title: "Certificate of Being Top 1 (For Incoming 1st Year College Applicants)",
    description: "Copy of Certificate of being Top 1 in your Graduating class.",
    dueDate: "October 31, 2025",
    rules: { appliesTo: "college" }, // ✅ Example rule
  },
  goodMoralCert: {
    fileKey: "goodMoralCert",
    icon: ShieldCheck,
    title: "Good Moral Character Certificate (For Incoming 1st Yr College Applicants)",
    description: "Certificate of Good Moral Character from your school.",
    dueDate: "October 31, 2025",
    rules: { appliesTo: "college" }, // ✅ Example rule
  },
  athleticCert: {
    fileKey: "athleticCert",
    icon: Trophy,
    title: "Certificate as Winner",
    description: "Copy of Certificate as Winner in a national-level competition.",
    dueDate: "October 31, 2025",
    rules: { scholarship: "ATHLETIC" }, // ✅ Example rule
  },
};

// export const CONDITIONAL_REQUIREMENTS_CONFIG = {
//   exceptionalTop1: {
//     fileKey: "exceptionalTop1",
//     title: "Certificate of Being Top 1",
//     icon: Award,
//     rules: { scholarship: ["EXCEPTIONAL"] },
//   },
//   goodMoral: {
//     fileKey: "goodMoral",
//     title: "Good Moral Character Certificate",
//     icon: ShieldCheck,
//     rules: { scholarship: ["EXCEPTIONAL"] },
//   },
//   athleticWinner: {
//     fileKey: "athleticWinner",
//     title: "Certificate as Winner",
//     icon: Trophy,
//     rules: { scholarship: ["ATHLETIC"] },
//   },
// };



export const SCHOLARSHIP_TYPES = {
  DEFAULT: {
    title: "No Scholarship Selected",
    description: "Please select a scholarship type in your profile to see the requirements.",
    icon: Star,
  },
  EXCEPTIONAL: {
    title: "EXCEPTIONAL SCHOLARSHIP",
    description: "For students with the highest honors or at the top of their class (GWA 85% and above).",
    icon: Award,
  },
  ATHLETIC: {
    title: "ATHLETIC SCHOLARSHIP",
    description: "For student-athletes who have won in national-level competitions.",
    icon: Trophy,
  },
  ARTISTIC: {
    title: "ARTISTIC SCHOLARSHIP",
    description: "For students enrolled in a Special Program in the Arts.",
    icon: Palette,
  },
  ACADEMIC: {
    title: "ACADEMIC SCHOLARSHIP",
    description: "Minimum Grade Requirement: 85% or 2.5 or equivalent.",
    icon: GraduationCap,
  },
  SUMMER: {
    title: "SUMMER CLASS",
    description: "For students taking 6-9 units of summer classes.",
    icon: Library,
  },
  TESDA: {
    title: "TESDA SCHOLARSHIP",
    description: "For students enrolled in TESDA-accredited Technical Vocational Institutions (TVIs).",
    icon: Briefcase,
  },
  EDUCATIONAL: {
    title: "EDUCATIONAL ASSISTANCE",
    description: "For students with a GWA of 82%-84% or below 2.5.",
    icon: UserCheck,
  },
};
