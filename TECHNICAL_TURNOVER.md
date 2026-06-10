# CGB Applicant System Technical Turnover

## 1. Project Overview

The CGB Applicant system is a React-based scholarship application portal built with Vite. It supports user registration, login, learning module completion, profile management, document upload, community engagement, and application submission.

The application is designed as a single-page app with client-side routing via React Router and authentication integrated with Supabase.

## 2. Technology Stack

- Frontend:
  - React 18
  - Vite
  - Tailwind CSS
  - Framer Motion
  - Radix UI components
  - Lucide React icons

- Authentication & Backend Integration:
  - Supabase Authentication
  - Custom Supabase client wrappers in `src/lib`

- PDF / Document Export:
  - html2pdf.js
  - markdown-pdf (included as dependency)

- Additional libraries:
  - `react-router-dom`
  - `react-helmet-async`
  - `react-player`
  - `react-pdf-viewer`

- `src/`
  - `App.jsx` - main application router and authentication flow
  - `main.jsx` - root render and provider setup
  - `index.css` - global styles
  - `components/` - reusable UI components
  - `components/Dashboard/` - dashboard pages, forms, requirements, and application workflow
  - `components/Chatbot/` - chatbot interface and FAQ data
  - `components/ui/` - shared UI primitives and toast system
  - `contexts/` - authentication provider for Supabase
  - `hooks/` - custom React hooks for auth, profile management, community posts
  - `lib/` - Supabase clients, utilities, and helpers
  - `pages/` - top-level route page components

- `APPLICANT_GUIDE.md` - applicant-facing guide content
- `GUIDE_FEATURE_README.md` - feature notes for the applicant guide
- `package.json` - dependencies and scripts
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind configuration

## 4. Application Flow

### 4.1 Routing and Root

- `src/main.jsx` wraps the application in:
  - `React.StrictMode`
  - `HelmetProvider`
  - `AuthProvider`
  - `BrowserRouter`

- `src/App.jsx` defines routes:
  - `/` - main application entry point with auth gating and quiz workflow
  - `/guide` - applicant guide page
  - `/application-closed` - closed application notice page

### 4.2 Authentication Flow

- `src/context/SupabaseAuthContext.jsx` provides `AuthProvider`
  - subscribes to Supabase auth state changes
  - manages `user`, `session`, and `loading`
  - exposes `signUp`, `signIn`, `signOut`

- `src/hooks/useAuth.js` manages application auth state
  - tracks `isLoggedIn`, `userId`, `userName`, `quizCompleted`, `isLoading`
  - handles login, Google sign-in, logout
  - fetches user profile from Supabase and sets quiz completion state

### 4.3 Main App Rendering Logic

- If auth is loading, display `LoadingSpinner`
- If user is not logged in, render `AuthPage`
- If quiz was completed, render `Dashboard`
- If the learning presentation is not finished, render `ImagePresentation`
- Else render `Quiz`

### 4.4 Dashboard

- `src/components/Dashboard/index.jsx` contains the dashboard shell
  - loads profile data via `useProfileManager`
  - loads community posts via `useCommunityPosts`
  - manages navigation, dialogs, and workflow state

- Dashboard sections include:
  - Home page header
  - Profile section
  - Requirements upload section
  - Community feed
  - Online courses
  - Citizens charter
  - Settings
  - Testimonials

- `Header.jsx` includes:
  - guide navigation to `/guide`
  - logout button
  - mobile menu toggle

## 5. Key Features and Components

### 5.1 Applicant Guide

- `src/pages/ApplicantGuidePage.jsx` renders the guide page
- `src/components/ApplicantGuideViewer.jsx` displays guide content and PDF export
- `src/components/ApplicantGuideButton.jsx` provides a reusable guide access button
- `APPLICANT_GUIDE.md` stores applicant guidance content

### 5.2 Registration and Login

- `src/components/RegistrationForm.jsx` handles registration modal form
- `src/pages/AuthPage.jsx` handles login and registration entry
- `src/components/Auth/*` contains authentication UI components and forms

### 5.3 Learning Module

- `src/components/Quiz/ImagePresentation.jsx` presents the onboarding presentation
- `src/components/Quiz/Quiz.jsx` collects quiz answers and submits results

### 5.4 Profile & Requirements

- `src/components/Dashboard/ProfileSection.jsx` displays profile information
- `src/components/Dashboard/EditProfileDialog.jsx` allows profile editing
- `src/components/Dashboard/RequirementsSection.jsx` manages required document uploads
- `src/components/Dashboard/RequirementUploadItem.jsx` handles each file upload item
- `src/components/Dashboard/RequirementVariantUploader.jsx` supports alternate upload flows

### 5.5 Application Submission

- `src/components/Dashboard/ApplicationSubmit.jsx` shows submission CTA for completed requirements
- `src/components/Dashboard/FeedbackDialog.jsx` collects applicant feedback after submission

### 5.6 Community and Content

- `src/components/Dashboard/CommunityFeed.jsx` displays posts and comments
- `src/components/Dashboard/CreatePostDialog.jsx` lets users create or edit posts
- `src/components/Chatbot/Chatbot.jsx` provides an in-app chatbot or FAQ experience
- `src/components/Dashboard/TestimonialsSection.jsx` displays testimonials content

## 6. Data and Backend Integration

### 6.1 Supabase

- Supabase is used for:
  - user authentication
  - user session management
  - profile fetching and persistence
  - file upload flow (likely in backend functions or storage - check `src/lib/supabase.js`)

### 6.2 Custom Supabase Client

- `src/lib/customSupabaseClient.js` likely configures Supabase client with keys and URL
- `src/lib/supabase.js` contains helper functions for auth and profile operations

### 6.3 Profile and Community Hooks

- `src/hooks/useProfileManager.js` manages profile CRUD, file upload, and submission state
- `src/hooks/useCommunityPosts.js` manages community feed create/update/delete operations

## 7. Deployment and Local Setup

### 7.1 Prerequisites

- Node.js 18+ recommended
- npm available
- Supabase project with auth enabled

### 7.2 Install Dependencies

```bash
npm install
```

### 7.3 Run Locally

```bash
npm run dev
```

### 7.4 Build for Production

```bash
npm run build
```

### 7.5 Preview Production Build

```bash
npm run preview
```

## 8. Environment and Configuration

- The repo does not include environment variables in source control.
- Expect `.env` or `.env.local` to provide Supabase URL and key for local development.
- Vite configuration is located in `vite.config.js`.

## 9. Important Files and Paths

- `src/App.jsx` - main page routing and app flow
- `src/main.jsx` - root render and provider wrapping
- `src/contexts/SupabaseAuthContext.jsx` - auth state provider
- `src/hooks/useAuth.js` - auth and profile fetching logic
- `src/components/Dashboard/index.jsx` - dashboard shell
- `src/components/Dashboard/Header.jsx` - dashboard header and navigation
- `src/components/ApplicantGuideViewer.jsx` - guide viewer and PDF export
- `src/pages/ApplicantGuidePage.jsx` - guide page route
- `src/lib/supabase.js` - Supabase helper interface
- `APPLICANT_GUIDE.md` - guide content source

## 10. Recommended Handover Notes

- Keep `APPLICANT_GUIDE.md` updated when business rules or document requirements change.
- Verify Supabase auth session handling after deployment, especially Google OAuth and password reset flows.
- Confirm file upload storage and submission workflow in `useProfileManager.js` and backend storage policies.
- The guide route is accessible at `/guide` and is linked in the dashboard header.
- The application uses client-side routing; refreshes on non-root routes require server support for SPA fallback.

---

## 11. Known System Behavior

- Users must complete the onboarding presentation and quiz before accessing the dashboard.
- Application submission is gated by profile completion and required document uploads.
- Feedback collection is triggered after a successful application submission action.
- Chatbot appears for authenticated users.

## 12. Next Steps for Developers

- Add explicit API endpoint documentation for Supabase schema and storage usage.
- Add unit tests for custom hooks and dashboard workflows.
- Add deployment README or CI/CD pipeline docs if using Vercel/Netlify/Azure.
- Document any environment variables required by `src/lib/customSupabaseClient.js`.
