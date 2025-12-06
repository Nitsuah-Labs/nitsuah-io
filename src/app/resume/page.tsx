import { ResumeData } from "../../types/resume";
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

  // Calculate total years across all jobs (excluding "sub." companies to avoid double counting)
  const totalYears =
    resume.work?.reduce((sum, job) => {
      // Skip subcontracted work to avoid double counting
      if (job.name.toLowerCase().includes("sub.")) {
        return sum;
      }
      const startDate = new Date(job.startDate);
      const endDate = job.endDate ? new Date(job.endDate) : new Date();
      const years =
        (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);
      return sum + years;
    }, 0) || 0;
  const totalFullBars = Math.floor(totalYears);
  const totalPartialBar = totalYears - totalFullBars;

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

          {/* Total Experience Summary */}
          {resume.work && resume.work.length > 0 && (
            <div className="work-total-summary" style={{ marginTop: "2.5rem" }}>
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

          {/* Work Experience */}
          {resume.work && resume.work.length > 0 && (
            <div style={{ marginTop: "2.5rem" }}>
              <WorkExperience work={resume.work} />
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
