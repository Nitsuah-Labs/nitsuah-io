import React from "react";
import styles from "./HeroSection.module.css";

/**
 * Landing Hero - Simplified intro for home page
 * No scroll indicator, no scroll effects, just clean intro + CTA
 */
export const LandingHero: React.FC = () => {
  return (
    <section className={styles.landingHero}>
      <div className={styles.heroBackdrop} aria-hidden="true" />
      <div className={styles.landingContent}>
        <div className={styles.landingTagline}></div>

        <h1 className={styles.landingTitle}>
          Austin J. Hardy
          <br />
          <span className={styles.highlight}>
            Senior Platform & AI Engineer
          </span>
        </h1>

        <p className={styles.landingDescription}>
          15 years building enterprise tooling, Atlassian platforms, and
          AI-powered systems that engineers actually want to use.
        </p>

        <p className={styles.landingCompanies}>
          Netflix &middot; Coinbase &middot; Blackboard
        </p>
      </div>
    </section>
  );
};
