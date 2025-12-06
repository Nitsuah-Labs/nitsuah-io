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
              className="education-languages-container"
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
