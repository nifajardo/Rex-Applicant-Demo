import React, { useState, useRef } from 'react';
import { Download, X } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ApplicantGuideViewer = ({ onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef(null);

  const guideContent = `
# CGB Scholarship Application Guide
## For First-Time Applicants

**Welcome!** This guide will walk you through the entire scholarship application process step-by-step. Follow along and you'll have your application submitted in no time!

---

## Table of Contents
1. [Before You Start](#before-you-start)
2. [Creating Your Account](#creating-your-account)
3. [Completing the Learning Module](#completing-the-learning-module)
4. [Navigating Your Dashboard](#navigating-your-dashboard)
5. [Step 1: Complete Your Profile](#step-1-complete-your-profile)
6. [Step 2: Upload Required Documents](#step-2-upload-required-documents)
7. [Step 3: Submit Your Application](#step-3-submit-your-application)
8. [Step 4: Provide Feedback](#step-4-provide-feedback)
9. [Troubleshooting & FAQs](#troubleshooting--faqs)
10. [What Happens Next?](#what-happens-next)

---

## Before You Start

### What You'll Need
✓ A valid email address
✓ A password (at least 8 characters)
✓ The following documents (scanned or digital copies):
- Endorsement Letter from your school/organization
- Application Letter (your motivation letter)
- Report Card or academic records
- Proof of parental income
- Enrollment Form from your school
- Copy of your School ID
- Copy of your Birth Certificate
- Copy of your Voter's Registration Record

### System Requirements
- A computer, tablet, or smartphone with internet access
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection

### Important Notes
- The application process takes approximately **30-45 minutes**
- You can save your profile and come back later to complete documents
- All your information is secure and confidential
- Deadline information will be displayed on the application home page

---

## Creating Your Account

### Option 1: Sign Up with Email

**Step 1:** Go to the application website and click **"Sign Up"**

**Step 2:** You'll see the registration form with these fields:
- **Email Address** - Use an email you check regularly
- **Full Name** - Enter your complete name as it appears in your ID
- **Password** - Create a strong password (mix of letters, numbers, and symbols)
- **Confirm Password** - Re-enter your password to verify

**Step 3:** Click the checkbox to **accept the terms and conditions**

**Step 4:** Click **"Register"** button

**Step 5:** A confirmation email will be sent to your email address
- Check your inbox (or spam folder)
- Click the verification link in the email
- Your account is now active!

### Option 2: Sign Up with Google (Faster!)

**Step 1:** On the registration page, click **"Sign Up with Google"**

**Step 2:** Select which Google account to use

**Step 3:** Google will ask for permission to share your information
- Click **"Allow"**

**Step 4:** You're automatically logged in!
- Your full name and email come from your Google account

---

## Logging In

### First Time Login

**Step 1:** Go to the application website

**Step 2:** Click **"Log In"**

**Step 3:** Enter your email and password
- Or click **"Login with Google"** if you registered with Google

**Step 4:** Click **"Log In"** button

✓ You're now logged in and will see the learning module!

### Forgot Your Password?

**Step 1:** On the login page, click **"Forgot Password?"**

**Step 2:** Enter your email address

**Step 3:** Click **"Send Reset Link"**

**Step 4:** Check your email for the password reset link

**Step 5:** Click the link and create a new password

**Step 6:** Log in with your new password

---

## Completing the Learning Module

### What is This?

Before applying for the scholarship, you'll need to complete an **Image Presentation** and a **Quiz**. This helps us ensure all applicants understand the scholarship program and the application process.

### Completing the Image Presentation

**Step 1:** After logging in, you'll see an **Image Presentation** screen

**Step 2:** This is an informational presentation about the scholarship program
- Watch the presentation (approximately 5 minutes)
- Look at all the images and information provided
- This will help you understand the scholarship better

**Step 3:** Click **"Next"** or **"Continue"** to move through the slides

**Step 4:** Once finished, click **"Proceed to Quiz"** or similar button

### Completing the Quiz

**Step 1:** The quiz will appear with **multiple-choice questions**

**Step 2:** For each question:
- Read the question carefully
- Select your answer
- Move to the next question

**Step 3:** The quiz typically has **5-10 questions** covering:
- Scholarship eligibility
- Application requirements
- Important dates and processes

**Step 4:** Once you complete all questions, click **"Submit Quiz"**

**Step 5:** Your score will be displayed
- **Pass:** You can proceed to the dashboard (most applicants pass!)
- **Fail:** You can retake the quiz

✓ After passing, you'll have access to your **Dashboard** to start the application!

---

## Navigating Your Dashboard

Once you pass the quiz, you'll see your **Dashboard Home** with several options:

### Dashboard Menu

The main sections you'll use are:

1. **Home** - Quick overview and quick actions
2. **Profile** - Your personal and academic information
3. **Requirements** - Upload required documents
4. **Submit Application** - Final application submission
5. **Community Feed** - Connect with other applicants
6. **Settings** - Account settings and preferences
7. **Chatbot** (bottom right) - Ask questions anytime

### Dashboard Tips
- The chatbot in the bottom right corner is available 24/7
- You can navigate between sections using the menu on the left
- Your progress is automatically saved
- Come back anytime to continue where you left off

---

## Step 1: Complete Your Profile

This is where you enter your personal and academic information.

### How to Start

**Option A - From Home:**
1. Click **"Complete Your Profile"** button on the home page
2. Go to the **"Profile"** section

**Option B - From Menu:**
1. Click **"Profile"** in the sidebar menu
2. Click **"Edit Profile"** button

### Profile Information to Enter

#### Personal Information
- **Full Name** - Your complete legal name
- **Email Address** - Your active email
- **Phone Number** - Mobile or home phone
- **Date of Birth** - Your birthdate (MM/DD/YYYY)
- **Home Address** - Complete street address
- **Barangay** - Your home barangay

#### Academic Information
- **School/University** - Name of your school
  - *If your school isn't listed, select "Other" and type the name*
- **Degree Program** - Your current program (e.g., Bachelor of Science)
- **Academic Year** - Your current year (1st Year, 2nd Year, etc.)
- **GWA (Grade Weighted Average)** - Your GPA in percentage format
  - *Example: 87.5 (NOT 3.5)*
- **Scholarship Type** - Select which scholarship you're applying for:
  - EXCEPTIONAL (GWA 85%+)
  - ACADEMIC (GWA 85%+)
  - ATHLETIC (national-level athletes)
  - ARTISTIC (special arts programs)
  - SUMMER CLASS (6-9 units)
  - TESDA (technical education)
  - EDUCATIONAL ASSISTANCE (GWA 82%-84%)

#### Family Information
- **Father's Name** - Your father's full name
- **Mother's Name** - Your mother's full name

### Uploading Your Profile Picture (Optional)

1. Click on the **profile picture area**
2. Select an image from your computer
3. Crop/adjust if needed
4. Click **"Upload"**

### Saving Your Profile

1. After entering all information, click **"Save Profile"** button
2. You'll see a **"Profile saved successfully"** message
3. Your information is now saved!

---

## Step 2: Upload Required Documents

Now you'll upload the documents needed for your application.

### Required Documents

Here are the **8 documents** you need to upload:

1. **Endorsement Letter** - From your school or organization
2. **Application Letter** - Your personal motivation letter
3. **Report Card/Grades** - Your latest academic records
4. **Proof of Parental Income** - Family income documentation
5. **Enrollment Form** - School enrollment proof
6. **School ID Photocopy** - Your student ID
7. **Birth Certificate Photocopy** - Certified copy
8. **Voter's Registration Record** - Proof of residency

### How to Upload

1. Click **"Requirements"** in the sidebar
2. For each document, click **"Upload"** or drag and drop
3. Select your file
4. Wait for upload to complete
5. Repeat for all 8 documents

---

## Step 3: Submit Your Application

### Pre-Submission Checklist

- [ ] Profile information is complete
- [ ] All 8 documents are uploaded
- [ ] Documents are clear and readable
- [ ] No information is missing

### How to Submit

1. Click **"Submit Application"** in the menu
2. Review your information
3. Click **"Confirm & Submit Application"**
4. You'll see a success message with your reference number

---

## Step 4: Provide Feedback

After submission, fill out the feedback form with:
- Your rating (1-5 stars)
- Any comments or suggestions
- Click **"Submit Feedback"**

---

## Troubleshooting & FAQs

### Common Issues

**Q: I forgot my password. What do I do?**
A: Click "Forgot Password?" on the login page and follow the email instructions.

**Q: My file failed to upload.**
A: Try again with a smaller file (max 10MB) in JPG, PNG, or PDF format.

**Q: My school isn't on the list.**
A: Select "Other" and type your school name manually.

**Q: How long will my application take?**
A: Processing takes 6-8 weeks from submission.

**Q: Where is the REX Education office?**
A: REX Education Support Center. Contact info will be in your confirmation email.

---

## What Happens Next?

### Timeline
- **Application Received:** Immediately - confirmation email
- **Initial Review:** 2-4 weeks
- **Final Decision:** 6-8 weeks - email notification
- **Onboarding:** 8-12 weeks

### Contact Information
- **Technical Support:** Use the 24/7 chatbot
- **Application Questions:** Check FAQs or chatbot
- **Final Decisions:** REX Education office email/phone

---

**Good luck with your application!** 🎓

*Best wishes from the CGB Scholarship Team!*
`;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = contentRef.current;
      const options = {
        margin: 10,
        filename: 'CGB_Scholarship_Application_Guide.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      };

      html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatMarkdown = (text) => {
    // Convert markdown to HTML for display
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 className="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 className="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 className="text-3xl font-bold mt-8 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Lists
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul className="list-disc list-inside">$1</ul>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');

    return html;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold">CGB Scholarship Application Guide</h2>
            <p className="text-blue-100 mt-1">Complete guide for first-time applicants</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
            >
              <Download size={18} />
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div
            ref={contentRef}
            className="bg-white p-8 rounded-lg shadow-sm prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: guideContent
                .split('\n')
                .map(line => {
                  // Handle headers
                  if (line.startsWith('# ')) {
                    return `<h1 style="font-size: 28px; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">${line.substring(2)}</h1>`;
                  }
                  if (line.startsWith('## ')) {
                    return `<h2 style="font-size: 22px; font-weight: bold; margin-top: 18px; margin-bottom: 8px;">${line.substring(3)}</h2>`;
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 style="font-size: 18px; font-weight: bold; margin-top: 14px; margin-bottom: 6px;">${line.substring(4)}</h3>`;
                  }
                  if (line.startsWith('#### ')) {
                    return `<h4 style="font-size: 16px; font-weight: bold; margin-top: 12px; margin-bottom: 4px;">${line.substring(5)}</h4>`;
                  }
                  if (line.startsWith('- ')) {
                    return `<li style="margin-left: 20px; margin-bottom: 4px;">${line.substring(2)}</li>`;
                  }
                  if (line === '---') {
                    return '<hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />';
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return `<p style="font-weight: bold;">${line}</p>`;
                  }
                  if (line.startsWith('✓') || line.startsWith('✗')) {
                    return `<p style="margin: 4px 0; margin-left: 20px;">${line}</p>`;
                  }
                  if (line.trim() === '') {
                    return '<div style="height: 4px;"></div>';
                  }
                  if (line.includes('|')) {
                    return `<p style="font-family: monospace;">${line}</p>`;
                  }
                  return `<p style="margin: 8px 0; line-height: 1.6;">${line}</p>`;
                })
                .join('')
            }}
          />
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-white rounded-b-lg text-center text-gray-600">
          <p className="text-sm">Last Updated: May 13, 2026 | CGB Scholarship Application System</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantGuideViewer;
