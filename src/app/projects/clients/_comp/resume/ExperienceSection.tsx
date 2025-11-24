"use client";
import React from "react";

export const ExperienceSection: React.FC = () => {
  const jobs = [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      period: "2021 - Present",
      points: [
        "Led development of customer portal serving 50k+ users",
        "Reduced API response time by 40% through optimization",
        "Mentored 5 junior developers",
      ],
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      period: "2018 - 2021",
      points: [
        "Built e-commerce platform from scratch",
        "Implemented CI/CD pipeline with 99.9% uptime",
        "Collaborated with design team on UX improvements",
      ],
    },
    {
      title: "Junior Developer",
      company: "WebSolutions Inc",
      period: "2016 - 2018",
      points: [
        "Developed client websites using React and Node.js",
        "Contributed to open-source projects",
        "Participated in agile development process",
      ],
    },
  ];

  return (
    <div className="resume-container">
      {/* Professional Summary */}
      <section className="resume-section">
        <h2 className="resume-section-title">Professional Summary</h2>
        <p className="resume-summary">
          Experienced software engineer with 8+ years building scalable web
          applications. Specialized in React, TypeScript, and cloud
          architecture. Passionate about creating efficient, user-friendly
          solutions.
        </p>
      </section>

      {/* Work Experience */}
      <section className="resume-section">
        <h2 className="resume-section-title">Work Experience</h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {jobs.map((job, idx) => (
            <div key={idx} className="resume-card">
              <div className="resume-card-job">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="company-name">{job.company}</p>
                </div>
                <span className="period-pill">{job.period}</span>
              </div>
              <ul className="resume-ul">
                {job.points.map((point, pidx) => (
                  <li key={pidx} style={{ marginBottom: "0.25rem" }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="resume-section-title">Education</h2>
        <div className="resume-card">
          <h3 className="job-title">Bachelor of Science in Computer Science</h3>
          <p className="company-name">University of California, Berkeley</p>
          <span className="period-pill">2012 - 2016</span>
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;
