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
    </section>
  );
};
