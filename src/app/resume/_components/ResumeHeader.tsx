import React from "react";
import { ResumeData } from "../../../types/resume";
import styles from "./ResumeHeader.module.css";

interface ResumeHeaderProps {
  basics: ResumeData["basics"];
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ basics }) => {
  const name = basics?.name || "";
  const label = basics?.label || basics?.title || "";

  return (
    <section
      className={`resume-section basics ${styles.header}`}
      id="basics"
      role="banner"
      aria-label="Resume header"
      data-testid="resume-header"
    >
      <div className="resume-header">
        {name ? (
          <h1 className="resume-name" data-testid="resume-name">
            {name}
          </h1>
        ) : null}

        {label ? (
          <p className="resume-label" data-testid="resume-label">
            {label}
          </p>
        ) : null}
      </div>

      {basics?.summary && (
        <div className="resume-summary" data-testid="resume-summary">
          <h2 className="section-title">About</h2>
          <p>{basics.summary}</p>
        </div>
      )}

      <div className="resume-contact" data-testid="resume-contact">
        {basics?.email && (
          <div className="contact-item" data-testid="contact-email">
            <span aria-hidden="true" className="icon email-icon">
              ✉️
            </span>
            <a href={`mailto:${basics.email}`} className="contact-link">
              {basics.email}
            </a>
          </div>
        )}
        {basics?.phone && (
          <div className="contact-item" data-testid="contact-phone">
            <span aria-hidden="true" className="icon phone-icon">
              📞
            </span>
            <span>{basics.phone}</span>
          </div>
        )}
        {basics?.location && (
          <div className="contact-item" data-testid="contact-location">
            <span aria-hidden="true" className="icon location-icon">
              📍
            </span>
            <span>
              {[
                basics.location.city,
                basics.location.region,
                basics.location.countryCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
