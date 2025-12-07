import { ResumeData } from "../../types/resume";
import { getCompanyLogoUrl } from "../../utils/resume";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import {
  EducationSection,
  LanguagesSection,
  ProfileButtons,
  ResumeHeader,
  SkillsGrid,
  WorkExperience,
} from "./_components";
import "./resume.css";

// Import resume data directly - Next.js will bundle this at build time
import resumeData from "../../data/resume.json";

function getResumeData(): ResumeData {
  // Type assertion needed due to minor schema differences (title vs label)
  return resumeData as unknown as ResumeData;
}

export default function ResumePage() {
  const resume = getResumeData();

  // Calculate total years across all jobs (excluding subcontracted companies to avoid double counting)
  const totalYears = calculateTotalYearsOfExperience(resume.work || [], true);
  const totalFullBars = Math.floor(totalYears);
  const totalPartialBar = totalYears - totalFullBars;

  // Count skills and categories
  const skillsCount = resume.skills?.length || 0;
  const totalSkillKeywords =
    resume.skills?.reduce(
      (sum, skill) => sum + (skill.keywords?.length || 0),
      0,
    ) || 0;

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <div className="print-hide">
        <HomeBar />
      </div>
      <main
        id="main"
        className="resume-container"
        tabIndex={-1}
        role="main"
        aria-label="Resume Content"
      >
        <div className="resume-content">
          {/* Header Section */}
          <ResumeHeader basics={resume.basics} />

          {/* Profile Buttons */}
          {(resume.basics.profiles ||
            resume.basics.url ||
            (resume as any).basics.website) && (
            <ProfileButtons
              url={resume.basics.url}
              website={(resume as any).basics.website}
              profiles={resume.basics.profiles}
              basics={resume.basics}
            />
          )}

          {/* PDF Experience Section - Two Column Layout - Only visible in print mode */}
          <div className="print-show">
            <h2 className="pdf-section-heading">
              <i className="fa fa-briefcase" aria-hidden="true"></i> Experience
            </h2>
            <div className="pdf-experience-container">
              {/* Left Column - Work History Cards */}
              <div className="pdf-work-cards">
                {resume.work?.slice(0, 3).map((job, idx) => {
                  const startDate = new Date(job.startDate);
                  const endDate = job.endDate
                    ? new Date(job.endDate)
                    : new Date();
                  const years =
                    (endDate.getTime() - startDate.getTime()) /
                    (1000 * 60 * 60 * 24 * 365.25);

                  const logoUrl = getCompanyLogoUrl(job.name);

                  return (
                    <div key={idx} className="pdf-work-card-full">
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt={job.name}
                          className="pdf-card-logo"
                        />
                      )}
                      <div className="pdf-work-card-content">
                        <div className="pdf-work-card-info">
                          <div className="pdf-work-position">
                            {job.position}
                          </div>
                          <div className="pdf-work-company">{job.name}</div>
                        </div>
                        <div className="pdf-work-duration">
                          {years.toFixed(1)} years
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column - Summary Cards */}
              <div className="pdf-summary-cards">
                <div className="pdf-summary-card">
                  <div className="pdf-card-icon">
                    <i className="fa fa-briefcase" aria-hidden="true"></i>
                  </div>
                  <div className="pdf-card-content">
                    <div className="pdf-card-label">Total Experience</div>
                    <div className="pdf-card-value">
                      {totalYears.toFixed(1)} years
                    </div>
                  </div>
                </div>

                {/* Education Card */}
                {resume.education && resume.education.length > 0 && (
                  <div className="pdf-summary-card pdf-education-card">
                    <div className="pdf-card-content">
                      <div className="pdf-card-label">Education</div>
                      <div className="pdf-card-value-small">
                        {resume.education[0].studyType} -{" "}
                        {resume.education[0].area}
                      </div>
                      {resume.education[0].startDate &&
                        resume.education[0].endDate && (
                          <div className="pdf-card-duration">
                            {new Date(
                              resume.education[0].startDate,
                            ).getFullYear()}{" "}
                            -{" "}
                            {new Date(
                              resume.education[0].endDate,
                            ).getFullYear()}
                          </div>
                        )}
                    </div>
                    <img
                      src="/images/vt-logo.png"
                      alt="Virginia Tech"
                      className="pdf-card-logo"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Education & Languages Side-by-Side */}
          {((resume.education && resume.education.length > 0) ||
            (resume.languages && resume.languages.length > 0)) && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginTop: "2.5rem",
                marginBottom: "2.5rem",
              }}
              className="education-languages-container print-early-position"
            >
              {resume.education && resume.education.length > 0 && (
                <EducationSection education={resume.education} />
              )}
              {resume.languages && resume.languages.length > 0 && (
                <LanguagesSection languages={resume.languages} />
              )}
            </div>
          )}

          {/* Work Experience */}
          {resume.work && resume.work.length > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <WorkExperience work={resume.work} />
              {/* Total Experience Summary */}
              {resume.work && resume.work.length > 0 && (
                <div
                  className="work-total-summary print-hide"
                  style={{ marginTop: "2.5rem" }}
                >
                  <div className="total-label">Total Experience</div>
                  <div className="total-duration-container">
                    <div className="total-duration-bars">
                      {Array.from({ length: totalFullBars }).map((_, i) => (
                        <div key={i} className="duration-bar full" />
                      ))}
                      {totalPartialBar > 0 && (
                        <div className="duration-bar partial" />
                      )}
                    </div>
                    <div className="total-duration-text">
                      {totalYears.toFixed(1)} years
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {resume.skills && resume.skills.length > 0 && (
            <SkillsGrid skills={resume.skills} />
          )}
        </div>
      </main>
      <div className="print-hide">
        <Footer />
      </div>
    </div>
  );
}
