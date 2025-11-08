"use client";

import React, { useState } from "react";
import { ResumeData } from "../../../types/resume";
import { calculateDuration, extractDurationText } from "../../../utils/resume";

interface WorkExperienceProps {
  work: ResumeData["work"];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ work }) => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const displayedJobs = showAllJobs ? work : work.slice(0, 3);

  // Calculate total years across all jobs (excluding "sub." companies to avoid double counting)
  const totalYears = work.reduce((sum, job) => {
    // Skip subcontracted work to avoid double counting
    if (job.name.toLowerCase().includes("sub.")) {
      return sum;
    }
    const duration = calculateDuration(job.startDate, job.endDate);
    const years = parseFloat(duration.match(/\(([^)]+) years\)/)?.[1] || "0");
    return sum + years;
  }, 0);
  const totalFullBars = Math.floor(totalYears);
  const totalPartialBar = totalYears - totalFullBars;

  return (
    <section className="resume-section work" id="work">
      <h2 className="section-title">
        <i className="fa fa-briefcase" aria-hidden="true"></i> Work Experience
      </h2>

      {/* Total Years Summary */}
      <div className="work-total-summary">
        <div className="total-label">Total Experience</div>
        <div className="total-duration-container">
          <div className="total-duration-bars">
            {Array.from({ length: totalFullBars }).map((_, i) => (
              <div key={i} className="duration-bar full" />
            ))}
            {totalPartialBar > 0 && <div className="duration-bar partial" />}
          </div>
          <div className="total-duration-text">
            {totalYears.toFixed(1)} years
          </div>
        </div>
      </div>

      <div className="work-items">
        {displayedJobs.map((job, idx) => {
          const duration = calculateDuration(job.startDate, job.endDate);
          const years = parseFloat(
            duration.match(/\(([^)]+) years\)/)?.[1] || "0",
          );
          const fullBars = Math.floor(years);
          const partialBar = years - fullBars;
          const isCurrent = !job.endDate;

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
                      <div className="work-position">{job.position}</div>
                      <div className="work-company">
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
                    </div>
                  </div>
                  <div className="work-duration-section">
                    <div className="work-dates">
                      {new Date(job.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {job.endDate
                        ? new Date(job.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Present"}
                    </div>
                    <div className="duration-visual">
                      <div className="duration-bars">
                        {Array.from({ length: fullBars }).map((_, i) => (
                          <div key={i} className="duration-bar full" />
                        ))}
                        {partialBar > 0 && (
                          <div className="duration-bar partial" />
                        )}
                      </div>
                      <div
                        className={`duration-text ${isCurrent ? "current" : ""}`}
                      >
                        {extractDurationText(duration)}
                      </div>
                    </div>
                  </div>
                </div>
              </label>
              <div className="work-details">
                {job.summary && <p className="work-summary">{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="work-highlights">
                    {job.highlights.map((highlight, hidx) => (
                      <li key={hidx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {work.length > 3 && (
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
              ? `Show Less (${work.length - 3} hidden)`
              : `Show All (${work.length - 3} more)`}
          </button>
        </div>
      )}
    </section>
  );
};
