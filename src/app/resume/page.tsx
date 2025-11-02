"use client";

import { useState } from "react";
import resumeDataImport from "../../../public/assets/resume.json";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import "./resume.css";

/**
 * Extracts duration text from parentheses if present, otherwise returns the original duration.
 * Example: "Jan 2020 - Dec 2021 (2 years)" => "2 years"
 */
function extractDurationText(duration: string): string {
  return duration.match(/\(([^)]+)\)/)?.[1] || duration;
}

interface ResumeData {
  basics: {
    name: string;
    label: string;
    title?: string;
    image?: string;
    email: string;
    phone?: string;
    url?: string;
    summary: string;
    location: {
      address?: string;
      postalCode?: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    name: string;
    position: string;
    url?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }>;
  skills: Array<{
    name: string;
    level?: string;
    keywords: string[];
  }>;
  education: Array<{
    institution: string;
    url?: string;
    area: string;
    studyType: string;
    startDate?: string;
    endDate?: string;
    score?: string;
    courses?: string[];
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
  projects?: Array<{
    name: string;
    description?: string;
    highlights?: string[];
    keywords?: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
    roles?: string[];
    entity?: string;
    type?: string;
  }>;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function calculateDuration(startDate: string, endDate?: string): string {
  if (!startDate) return "";

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(); // Use today if no end date

  const diffMs = end.getTime() - start.getTime();
  const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44); // Average days per month
  const years = Math.floor(diffMonths / 12);
  const months = Math.round(diffMonths % 12);

  // Calculate decimal representation (e.g., 2.5 years)
  const decimalYears = (diffMonths / 12).toFixed(1);

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""} (${(diffMonths / 12).toFixed(1)} years)`;
  } else if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""} (${decimalYears} years)`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""} (${decimalYears} years)`;
  }
}

function getResumeData(): ResumeData {
  // Use imported JSON data (works in client components)
  try {
    return resumeDataImport as unknown as ResumeData;
  } catch (err) {
    // Fallback if import fails
    // eslint-disable-next-line no-console
    console.warn("Could not load resume.json; using fallback data", err);
    return {
      basics: {
        name: "Austin J. Hardy",
        label: "Systems Engineer",
        title: "Systems Engineer",
        email: "",
        summary: "",
        location: { city: "", countryCode: "US", region: "" },
        profiles: [],
      },
      work: [],
      skills: [],
      education: [],
      languages: [],
    } as ResumeData;
  }
}

function getProficiencyLevel(level?: string): number {
  const levels: { [key: string]: number } = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
    Master: 5,
  };
  return level ? levels[level] || 3 : 3;
}

function getNetworkIcon(network: string): string {
  const icons: { [key: string]: string } = {
    GitHub: "fa-github",
    LinkedIn: "fa-linkedin",
    Twitter: "fa-twitter",
    X: "fa-twitter",
    Website: "fa-globe",
    Portfolio: "fa-briefcase",
  };
  return icons[network] || "fa-link";
}

export default function ResumePage() {
  const resume = getResumeData();
  const [showAllJobs, setShowAllJobs] = useState(false);

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <div className="print-hide">
        <HomeBar />
      </div>
      <main className="resume-container">
        <div className="resume-content">
          {/* Basics Section */}
          <section className="resume-section basics" id="basics">
            <div className="resume-header">
              <h1 className="resume-name">{resume.basics.name}</h1>
              <p className="resume-label">
                {resume.basics.label || resume.basics.title || ""}
              </p>
            </div>

            {resume.basics.summary && (
              <div className="resume-summary">
                <h2 className="section-title">About</h2>
                <p>{resume.basics.summary}</p>
              </div>
            )}

            <div className="resume-contact">
              {/* Email/Website - only render email if present to avoid mailto:undefined */}
              {resume.basics.email ? (
                <div className="contact-item">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <a
                    href={`mailto:${resume.basics.email}`}
                    className="contact-link"
                  >
                    {resume.basics.email}
                  </a>
                </div>
              ) : null}
              {resume.basics.phone && (
                <div className="contact-item">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>{resume.basics.phone}</span>
                </div>
              )}
              {resume.basics.location && (
                <div className="contact-item">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>
                    {[
                      resume.basics.location.city,
                      resume.basics.location.region,
                      resume.basics.location.countryCode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>

            {(resume.basics.profiles ||
              resume.basics.url ||
              (resume as any).basics.website) && (
              <div className="resume-profiles">
                {/* Website/URL Button */}
                {(resume.basics.url || (resume as any).basics.website) && (
                  <a
                    href={resume.basics.url || (resume as any).basics.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                    aria-label="Personal website"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: "#f97316",
                      border: "1px solid #ea580c",
                      borderRadius: "6px",
                      color: "#000",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      fontWeight: "600",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ea580c";
                      e.currentTarget.style.borderColor = "#c2410c";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(249, 115, 22, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f97316";
                      e.currentTarget.style.borderColor = "#ea580c";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>🌐</span>
                    <span>Website</span>
                  </a>
                )}

                {/* Projects Button */}
                <a
                  href="/projects"
                  className="profile-link"
                  aria-label="View portfolio projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    background: "#f97316",
                    border: "1px solid #ea580c",
                    borderRadius: "6px",
                    color: "#000",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ea580c";
                    e.currentTarget.style.borderColor = "#c2410c";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(249, 115, 22, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f97316";
                    e.currentTarget.style.borderColor = "#ea580c";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>📁</span>
                  <span>Projects</span>
                </a>

                {/* Social Profile Buttons */}
                {resume.basics.profiles &&
                  resume.basics.profiles.map((profile, idx) => (
                    <a
                      key={idx}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-link"
                      aria-label={`${profile.network} profile`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        background: "rgba(249, 115, 22, 0.1)",
                        border: "1px solid rgba(249, 115, 22, 0.3)",
                        borderRadius: "6px",
                        color: "#c2410c",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(249, 115, 22, 0.2)";
                        e.currentTarget.style.borderColor =
                          "rgba(249, 115, 22, 0.6)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(249, 115, 22, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(249, 115, 22, 0.3)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>
                        {profile.network === "GitHub"
                          ? "💻"
                          : profile.network === "LinkedIn"
                            ? "👔"
                            : profile.network === "Twitter" ||
                                profile.network === "X"
                              ? "🐦"
                              : "🔗"}
                      </span>
                      <span>{profile.network}</span>
                    </a>
                  ))}
              </div>
            )}
          </section>

          {/* Work Experience Section */}
          {resume.work && resume.work.length > 0 && (
            <section className="resume-section work" id="work">
              <h2 className="section-title">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                Work Experience
              </h2>
              <div className="work-items">
                {(showAllJobs ? resume.work : resume.work.slice(0, 5)).map(
                  (job, idx) => (
                    <div key={idx} className="work-item">
                      <input
                        type="checkbox"
                        id={`work-item-${idx}`}
                        className="work-toggle"
                        aria-label={`Toggle details for ${job.position} at ${job.name}`}
                      />
                      <label
                        htmlFor={`work-item-${idx}`}
                        className="work-label"
                        style={{ position: "relative" }}
                      >
                        <div className="work-header">
                          <div className="work-left">
                            <div className="work-date">
                              <span className="startDate">
                                {formatDate(job.startDate)}
                              </span>
                              {" - "}
                              <span className="endDate">
                                {job.endDate
                                  ? formatDate(job.endDate)
                                  : "Present"}
                              </span>
                              <div
                                className="expand-indicator"
                                style={{
                                  marginTop: "0.5rem",
                                  color: "#f97316",
                                  fontSize: "1.2rem",
                                  transition: "transform 0.3s ease",
                                }}
                              >
                                <i
                                  className="fa fa-chevron-down"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                            <div className="work-info">
                              <div className="work-position">
                                {job.position}
                              </div>
                              <div className="work-company">
                                {job.url ? (
                                  <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {job.name}
                                  </a>
                                ) : (
                                  job.name
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="work-duration">
                            {(() => {
                              const duration = calculateDuration(
                                job.startDate,
                                job.endDate,
                              );
                              const years = parseFloat(
                                duration.match(/\(([^)]+) years\)/)?.[1] || "0",
                              );
                              const fullBars = Math.floor(years);
                              const partialBar = years - fullBars;
                              const isCurrent = !job.endDate;

                              return (
                                <div className="duration-container">
                                  <div className="duration-bars">
                                    {Array.from({ length: fullBars }).map(
                                      (_, i) => (
                                        <div
                                          key={i}
                                          className="duration-bar full"
                                        />
                                      ),
                                    )}
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
                              );
                            })()}
                          </div>
                        </div>
                      </label>
                      <div className="work-details">
                        {job.summary && (
                          <p className="work-summary">{job.summary}</p>
                        )}
                        {job.highlights && job.highlights.length > 0 && (
                          <ul className="work-highlights">
                            {job.highlights.map((highlight, hidx) => (
                              <li key={hidx}>{highlight}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
              {resume.work.length > 5 && (
                <div
                  style={{ textAlign: "center", marginTop: "1.5rem" }}
                  className="print-hide"
                >
                  <button
                    onClick={() => setShowAllJobs(!showAllJobs)}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
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
                      ? `Show Less (${resume.work.length - 5} hidden)`
                      : `Show All (${resume.work.length - 5} more)`}
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Skills Section */}
          {resume.skills && resume.skills.length > 0 && (
            <section className="resume-section skills" id="skills">
              <h2 className="section-title">
                <i className="fa fa-code" aria-hidden="true"></i> Skills
              </h2>
              <div className="skills-grid">
                {resume.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      {skill.level && (
                        <span className="skill-level">{skill.level}</span>
                      )}
                    </div>
                    {skill.level && (
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width: `${(getProficiencyLevel(skill.level) / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                    )}
                    {skill.keywords && skill.keywords.length > 0 && (
                      <div className="skill-keywords">
                        {skill.keywords.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Languages Side-by-Side */}
          {((resume.education && resume.education.length > 0) ||
            (resume.languages && resume.languages.length > 0)) && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginBottom: "2.5rem",
              }}
              className="education-languages-container"
            >
              {/* Education Section */}
              {resume.education && resume.education.length > 0 && (
                <section
                  className="resume-section education"
                  id="education"
                  style={{ marginBottom: 0 }}
                >
                  <h2 className="section-title">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>{" "}
                    Education
                  </h2>
                  <div className="education-items">
                    {resume.education.map((edu, idx) => (
                      <div key={idx} className="education-item">
                        <div className="education-header">
                          <div className="education-degree">
                            {edu.studyType} in {edu.area}
                          </div>
                          <div className="education-institution">
                            {edu.url ? (
                              <a
                                href={edu.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {edu.institution}
                              </a>
                            ) : (
                              edu.institution
                            )}
                          </div>
                        </div>
                        {(edu.startDate || edu.endDate) && (
                          <div className="education-date">
                            {edu.startDate && formatDate(edu.startDate)}
                            {edu.startDate && edu.endDate && " - "}
                            {edu.endDate && formatDate(edu.endDate)}
                          </div>
                        )}
                        {edu.score && (
                          <div className="education-score">
                            GPA: {edu.score}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages Section */}
              {resume.languages && resume.languages.length > 0 && (
                <section className="resume-section languages" id="languages">
                  <h2 className="section-title">
                    <i className="fa fa-language" aria-hidden="true"></i>{" "}
                    Languages
                  </h2>
                  <div className="languages-list">
                    {resume.languages.map((lang, idx) => (
                      <div key={idx} className="language-item">
                        <span className="language-name">{lang.language}</span>
                        <span className="language-fluency">{lang.fluency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
      <div className="print-hide">
        <Footer />
      </div>
    </div>
  );
}
