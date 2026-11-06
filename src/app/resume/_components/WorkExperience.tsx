"use client";

import React, { useState } from "react";
import { ResumeData } from "../../../types/resume";
import {
  formatDate,
  getCompanyLogoUrl,
  isContractingRole,
} from "../../../utils/resume";
import { CompanyLogo } from "./CompanyLogo";

interface WorkExperienceProps {
  work: ResumeData["work"];
}

const INITIAL_VISIBLE = 3;

export const WorkExperience: React.FC<WorkExperienceProps> = ({ work }) => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  // With a short list (e.g. three featured roles + collapsed earlier experience),
  // show everything rather than hiding the undated summary behind "Show All".
  const needsCollapse = work.length > INITIAL_VISIBLE + 1;
  const displayedJobs =
    showAllJobs || !needsCollapse ? work : work.slice(0, INITIAL_VISIBLE);

  return (
    <section className="resume-section work" id="work">
      <h2 className="section-title">
        <i className="fa fa-briefcase" aria-hidden="true"></i> Work Experience
      </h2>

      <div className="work-items">
        {displayedJobs.map((job, idx) => {
          const logoUrl = getCompanyLogoUrl(job.name);
          const isContractRole = isContractingRole(job.name);

          return (
            <div className="work-item" key={idx}>
              <input
                type="checkbox"
                id={`work-${idx}`}
                className="work-toggle"
              />
              <label htmlFor={`work-${idx}`} className="work-header">
                <div className="work-header-content">
                  <div className="work-title-group">
                    <div className="work-toggle-icon">
                      <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                    <div className="work-info">
                      <div className="work-position">
                        {logoUrl ? (
                          <>
                            <a
                              href={job.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="company-logo-link print-hide"
                              title={job.name}
                            >
                              <CompanyLogo
                                src={logoUrl}
                                alt={job.name}
                                width={168}
                                height={56}
                                style={{
                                  objectFit: "contain",
                                  borderRadius: "6px",
                                }}
                              />
                            </a>
                            <span>
                              {job.position}
                              {isContractRole ? (
                                <span className="contract-role-marker">*</span>
                              ) : null}
                            </span>
                          </>
                        ) : (
                          <span>
                            {job.position}
                            {isContractRole ? (
                              <span className="contract-role-marker">*</span>
                            ) : null}
                          </span>
                        )}
                      </div>
                      {logoUrl ? (
                        <div className="work-company print-show">
                          {job.url ? (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {job.name}
                            </a>
                          ) : (
                            job.name
                          )}
                        </div>
                      ) : (
                        <div className="work-company work-company-inline">
                          {job.url ? (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {job.name}
                            </a>
                          ) : (
                            job.name
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {job.startDate ? (
                    <div className="work-duration-section">
                      <div className="work-dates">
                        {formatDate(job.startDate)}
                        {" - "}
                        {job.endDate ? formatDate(job.endDate) : "Present"}
                      </div>
                    </div>
                  ) : null}
                </div>
              </label>
              <div className="work-details">
                {job.summary && <p className="work-summary">{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="work-highlights">
                    {job.highlights.map((highlight, hidx) => {
                      // Match title prefix delimiters such as " - ", " – ", or " — "
                      // within the first 80 characters.
                      const prefixMatch = highlight.match(
                        /^(.{1,80}?)\s([-–—])\s(.+)$/,
                      );

                      if (prefixMatch) {
                        const beforeDash = prefixMatch[1];
                        const dash = prefixMatch[2];
                        const afterDash = prefixMatch[3];
                        return (
                          <li key={hidx}>
                            <strong>{beforeDash}</strong> {dash} {afterDash}
                          </li>
                        );
                      }
                      return <li key={hidx}>{highlight}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {needsCollapse && (
        <div
          style={{ textAlign: "center", marginTop: "1.5rem" }}
          className="print-hide"
        >
          <button
            onClick={() => setShowAllJobs(!showAllJobs)}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(249, 115, 22, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <i
              className={`fa fa-chevron-${showAllJobs ? "up" : "down"}`}
              aria-hidden="true"
              style={{ marginRight: "0.5rem" }}
            ></i>
            {showAllJobs
              ? `Show Less (${work.length - INITIAL_VISIBLE} hidden)`
              : `Show All (${work.length - INITIAL_VISIBLE} more)`}
          </button>
        </div>
      )}
    </section>
  );
};
