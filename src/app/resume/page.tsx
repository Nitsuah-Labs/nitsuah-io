import { promises as fs } from "fs";
import path from "path";
import { ResumeData } from "../../types/resume";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import {
  EducationSection,
  ExportPDFButton,
  LanguagesSection,
  ProfileButtons,
  ResumeHeader,
  SkillsGrid,
  WorkExperience,
} from "./_components";
import "./resume.css";

async function getResumeData(): Promise<ResumeData> {
  try {
    // Read JSON file from the filesystem (works in both dev and production)
    const filePath = path.join(process.cwd(), "src", "data", "resume.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    // Type assertion needed due to minor schema differences (title vs label)
    return data as unknown as ResumeData;
  } catch (err) {
    console.error("Failed to load resume.json", err);
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

export default async function ResumePage() {
  const resume = await getResumeData();

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
          {/* PDF Export Button */}
          <div
            className="print-hide"
            style={{ textAlign: "right", marginBottom: "1rem" }}
          >
            <ExportPDFButton />
          </div>

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
              {resume.education && resume.education.length > 0 && (
                <EducationSection education={resume.education} />
              )}
              {resume.languages && resume.languages.length > 0 && (
                <LanguagesSection languages={resume.languages} />
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
