import fs from "fs";
import { Metadata } from "next";
import path from "path";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import { PrintButton } from "./_components/PrintButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume | Austin J. Hardy",
  description:
    "Professional resume of Austin J. Hardy - Senior Systems Engineer at Netflix with experience in Web3, DevOps, and full-stack development",
  openGraph: {
    title: "Resume | Austin J. Hardy",
    description:
      "Professional resume of Austin J. Hardy - Senior Systems Engineer at Netflix",
    type: "profile",
  },
};

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

function getResumeData(): ResumeData {
  const resumePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "resume.json",
  );
  try {
    const resumeContent = fs.readFileSync(resumePath, "utf-8");
    return JSON.parse(resumeContent);
  } catch (err) {
    // If file read fails (dev server startup edge cases), return a minimal fallback
    // so the page still renders meaningful DOM for tests and a11y checks.
    // Keep shape matching ResumeData to avoid undefined accessors.
    // eslint-disable-next-line no-console
    console.warn("Could not read resume.json; using fallback data", err);
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

  return (
    <>
      <div className="print-hide">
        <HomeBar />
      </div>
      <main className="resume-container">
        <div className="resume-content">
          {/* Header Actions */}
          <div className="resume-actions print-hide">
            <PrintButton />
          </div>

          {/* Basics Section */}
          <section className="resume-section basics" id="basics">
            <header className="resume-header">
              <h1 className="resume-name">{resume.basics.name}</h1>
              <h2 className="resume-label">
                {resume.basics.label || resume.basics.title}
              </h2>
            </header>

            {resume.basics.summary && (
              <div className="resume-summary">
                <h3>About</h3>
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
              ) : resume.basics.url || (resume as any).basics.website ? (
                <div className="contact-item">
                  <i className="fa fa-globe" aria-hidden="true"></i>
                  <a
                    href={resume.basics.url || (resume as any).basics.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    {resume.basics.url || (resume as any).basics.website}
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
                    {resume.basics.location.city},{" "}
                    {resume.basics.location.region}
                  </span>
                </div>
              )}
            </div>

            {resume.basics.profiles && resume.basics.profiles.length > 0 && (
              <div className="resume-profiles">
                {resume.basics.profiles.map((profile, idx) => (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link"
                    aria-label={`${profile.network} profile`}
                  >
                    <i
                      className={`fa ${getNetworkIcon(profile.network)}`}
                      aria-hidden="true"
                    ></i>
                    <span>{profile.network}</span>
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Work Experience Section */}
          {resume.work && resume.work.length > 0 && (
            <section className="resume-section work" id="work">
              <h3 className="section-title">
                <i className="fa fa-briefcase" aria-hidden="true"></i> Work
                Experience
              </h3>
              <div className="work-items">
                {resume.work.map((job, idx) => (
                  <div key={idx} className="work-item">
                    <input
                      type="checkbox"
                      id={`work-item-${idx}`}
                      className="work-toggle"
                      aria-label={`Toggle details for ${job.position} at ${job.name}`}
                    />
                    <label htmlFor={`work-item-${idx}`} className="work-label">
                      <div className="work-header">
                        <div className="work-date">
                          <span className="startDate">
                            {formatDate(job.startDate)}
                          </span>
                          {" - "}
                          <span className="endDate">
                            {job.endDate ? formatDate(job.endDate) : "Present"}
                          </span>
                        </div>
                        <div className="work-info">
                          <div className="work-position">{job.position}</div>
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
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {resume.skills && resume.skills.length > 0 && (
            <section className="resume-section skills" id="skills">
              <h3 className="section-title">
                <i className="fa fa-code" aria-hidden="true"></i> Skills
              </h3>
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

          {/* Education Section */}
          {resume.education && resume.education.length > 0 && (
            <section className="resume-section education" id="education">
              <h3 className="section-title">
                <i className="fa fa-graduation-cap" aria-hidden="true"></i>{" "}
                Education
              </h3>
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
                      <div className="education-score">GPA: {edu.score}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {resume.languages && resume.languages.length > 0 && (
            <section className="resume-section languages" id="languages">
              <h3 className="section-title">
                <i className="fa fa-language" aria-hidden="true"></i> Languages
              </h3>
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

          {/* Projects Link */}
          <section className="resume-section projects-link" id="projects">
            <h3 className="section-title">
              <i className="fa fa-rocket" aria-hidden="true"></i> Projects
            </h3>
            <p>
              View my portfolio of selected projects at{" "}
              <a href="/projects" className="projects-link-anchor">
                nitsuah.io/projects
              </a>
            </p>
          </section>
        </div>
      </main>
      <div className="print-hide">
        <Footer />
      </div>
    </>
  );
}
