import React from "react";
import { ResumeData } from "../../../types/resume";
import styles from "./ResumeHeader.module.css";

interface ResumeHeaderProps {
  basics: ResumeData["basics"];
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ basics }) => {
  return (
    <section className={`resume-section basics ${styles.header}`} id="basics">
      <div className="resume-header">
        <h1 className="resume-name">{basics.name}</h1>
        <p className="resume-label">{basics.label || basics.title || ""}</p>
      </div>

      {basics.summary && (
        <div className="resume-summary">
          <h2 className="section-title">About</h2>
          <p>{basics.summary}</p>
        </div>
      )}

      <div className="resume-contact">
        {basics.email && (
          <div className="contact-item">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <a href={`mailto:${basics.email}`} className="contact-link">
              {basics.email}
            </a>
          </div>
        )}
        {basics.phone && (
          <div className="contact-item">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <span>{basics.phone}</span>
          </div>
        )}
        {basics.location && (
          <div className="contact-item">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
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
