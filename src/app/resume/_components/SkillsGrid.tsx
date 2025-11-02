import React from "react";
import { ResumeData } from "../../../types/resume";
import { getProficiencyLevel } from "../../../utils/resume";

interface SkillsGridProps {
  skills: ResumeData["skills"];
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  return (
    <section className="resume-section skills" id="skills">
      <h2 className="section-title">
        <i className="fa fa-code" aria-hidden="true"></i> Skills
      </h2>
      <div className="skills-grid">
        {skills.map((skill, idx) => (
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
              <div className="skill-keywords">{skill.keywords.join(", ")}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
