import Image from "next/image";
import React from "react";
import vtLogo from "../../../../public/images/vt-logo.png";
import { ResumeData } from "../../../types/resume";
import { formatDate } from "../../../utils/resume";

interface EducationSectionProps {
  education: ResumeData["education"];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
}) => {
  return (
    <section
      className="resume-section education"
      id="education"
      style={{ marginBottom: 0 }}
    >
      <h2 className="section-title">
        <i className="fa fa-graduation-cap" aria-hidden="true"></i> Education
      </h2>
      <div className="education-items">
        {education.map((edu, idx) => (
          <div key={idx} className="education-item">
            <div className="education-header">
              <div className="education-title-group">
                <div className="education-info">
                  <div className="education-degree-row">
                    {edu.url ? (
                      <>
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="education-logo-link print-hide"
                        >
                          <Image
                            src={vtLogo}
                            alt={edu.institution}
                            width={48}
                            height={48}
                            style={{
                              objectFit: "contain",
                              borderRadius: "6px",
                            }}
                          />
                        </a>
                        <div className="education-degree-text">
                          <div className="education-degree">
                            {edu.studyType} in {edu.area}
                          </div>
                          <div className="education-institution print-show">
                            <a
                              href={edu.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {edu.institution}
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="education-degree-text">
                        <div className="education-degree">
                          {edu.studyType} in {edu.area}
                        </div>
                        <div className="education-institution">
                          {edu.institution}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="education-dates-section">
                {(edu.startDate || edu.endDate) && (
                  <div className="education-date">
                    {edu.startDate && formatDate(edu.startDate)}
                    {edu.startDate && edu.endDate && " - "}
                    {edu.endDate && formatDate(edu.endDate)}
                  </div>
                )}
                {edu.score && (
                  <div className="education-score">GPA: {edu.score}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
