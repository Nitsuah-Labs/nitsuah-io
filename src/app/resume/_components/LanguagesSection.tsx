import React from "react";
import { ResumeData } from "../../../types/resume";

interface LanguagesSectionProps {
  languages: ResumeData["languages"];
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
}) => {
  return (
    <section className="resume-section languages" id="languages">
      <h2 className="section-title">
        <i className="fa fa-language" aria-hidden="true"></i> Languages
      </h2>
      <div className="languages-list">
        {languages.map((lang, idx) => (
          <div key={idx} className="language-item">
            <span className="language-name">{lang.language}</span>
            <span className="language-fluency">{lang.fluency}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
