import React from "react";
import styles from "./ApplicationClosed.module.css";
import { useNavigate } from "react-router-dom";

function ApplicationClosed() {
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      {/* Header Section */}
      <header className={styles.headerBanner}>
        <div className={styles.logoPlaceholder}>
          <div className={styles.logoTextTop}>
            <img src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png" alt="REX Education Logo" className={styles.BatangasLogo} />
            <img src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png" alt="REX Education Logo" className={styles.BatangasLogo1} />
            <img src="https://rex.com.ph/wp-content/themes/rexcorporate/assets/images/rex-logo-footer.png" alt="REX Education Logo" className={styles.BatangasLogo2} />
          </div>
        </div>
      </header>

      {/* Main Card */}
      <main className={styles.mainCard}>
        <div className={styles.cardHeaderBar}></div>
        <div className={styles.cardContent}>
          <h1>REX Education Scholarship Program Application Form for School Year 2025-2026</h1>
          <p className={styles.statusMessage}>
            REX Education Scholarship Program Application Form for School Year 2025-2026 is no longer accepting responses.
          </p>
          <p className={styles.contactInfo}>
            Stay tuned for the opening of applications for SY 2026–2027! Follow our social media channels to get the latest updates and announcements.
          </p>
        </div>
      </main>

        <button
          onClick={() => navigate("/")}
          className={styles.redirectButton}
        >
          Go Back to Homepage
        </button>
      
    </div>
  );
}

export default ApplicationClosed;
