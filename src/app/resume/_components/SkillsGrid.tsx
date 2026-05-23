"use client";

import React, { useMemo, useState } from "react";
import { ResumeData } from "../../../types/resume";
import { getSkillLevelMeta, parseSkillKeywords } from "../../../utils/resume";

interface SkillsGridProps {
  skills: ResumeData["skills"];
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const enrichedSkills = useMemo(
    () =>
      skills.map((skill) => {
        const levelMeta = getSkillLevelMeta(skill.level);
        return {
          ...skill,
          parsedKeywords: parseSkillKeywords(skill.keywords || []),
          levelMeta,
        };
      }),
    [skills],
  );

  const filteredSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return enrichedSkills.filter((skill) => {
      const matchesLevel =
        levelFilter === "all" || skill.levelMeta.normalized === levelFilter;

      if (!normalizedQuery) return matchesLevel;

      const haystack = [
        skill.name,
        skill.levelMeta.label,
        ...skill.parsedKeywords,
      ]
        .join(" ")
        .toLowerCase();

      return matchesLevel && haystack.includes(normalizedQuery);
    });
  }, [enrichedSkills, levelFilter, query]);

  return (
    <section className="resume-section skills" id="skills">
      <div className="skills-header-row">
        <h2 className="section-title">
          <i className="fa fa-code" aria-hidden="true"></i> Skills
        </h2>

        <div className="skills-toolbar print-hide">
          <label className="sr-only" htmlFor="skills-search">
            Search skills
          </label>
          <input
            id="skills-search"
            type="search"
            className="skills-search"
            placeholder="Search skills, tools, or keywords"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <label className="sr-only" htmlFor="skills-level-filter">
            Filter skills by proficiency
          </label>
          <select
            id="skills-level-filter"
            className="skills-filter-select"
            value={levelFilter}
            onChange={(event) => setLevelFilter(event.target.value)}
          >
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert / Master</option>
          </select>

          <span className="skill-results-count" aria-live="polite">
            {filteredSkills.length} / {skills.length}
          </span>
        </div>
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill, idx) => (
          <div
            key={idx}
            className={`skill-item${skill.levelMeta.normalized === "beginner" ? " skill-item-beginner" : ""}`}
          >
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              {skill.levelMeta && (
                <span
                  className={`skill-level skill-level-${skill.levelMeta.normalized}`}
                >
                  {skill.levelMeta.label}
                </span>
              )}
            </div>
            {skill.levelMeta && (
              <div className="skill-bar">
                <div
                  className={`skill-bar-fill skill-bar-fill-${skill.levelMeta.normalized}`}
                  style={{
                    width: `${(skill.levelMeta.score / 5) * 100}%`,
                  }}
                ></div>
              </div>
            )}
            {skill.parsedKeywords.length > 0 && (
              <ul className="skill-keyword-list">
                {skill.parsedKeywords.map((keyword) => (
                  <li key={`${skill.name}-${keyword}`}>
                    <span className="skill-keyword-chip">{keyword}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <p className="skills-empty-state">
          No matching skill categories found.
        </p>
      )}

      {/* Print-only compact skills list */}
      <div className="skills-print-list">
        {skills
          .filter((skill) => {
            const meta = getSkillLevelMeta(skill.level);
            return meta.normalized !== "beginner";
          })
          .map((skill, idx) => {
            const meta = getSkillLevelMeta(skill.level);
            const keywords = parseSkillKeywords(skill.keywords || []);
            return (
              <div key={idx} className="skills-print-row">
                <span className="skills-print-category">{skill.name}</span>
                <span
                  className={`skills-print-level skills-print-level-${meta.normalized}`}
                >
                  {meta.label}
                </span>
                {keywords.length > 0 && (
                  <span className="skills-print-keywords">
                    {keywords.join(", ")}
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};
