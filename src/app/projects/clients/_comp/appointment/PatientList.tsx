// PatientList for Appointment Demo
import type { Patient } from "@/lib/data/demos/appointment-data";
import React from "react";

interface Props {
  patients: Patient[];
}

export const PatientList: React.FC<Props> = ({ patients }) => {
  return (
    <div>
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#14b8a6",
          marginBottom: "1rem",
        }}
      >
        Patient Records
      </h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {patients.map((patient) => (
          <div
            key={patient.id}
            style={{
              background: "rgba(20, 184, 166, 0.1)",
              border: "2px solid rgba(20, 184, 166, 0.3)",
              borderRadius: 8,
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#14b8a6",
                    marginBottom: "0.75rem",
                  }}
                >
                  {patient.name}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <div>📧 {patient.email}</div>
                  <div>📞 {patient.phone}</div>
                  <div>🏥 {patient.insuranceProvider}</div>
                  <div>🗓️ Last Visit: {patient.lastVisit}</div>
                  {patient.nextAppointment && (
                    <div style={{ color: "#14b8a6", fontWeight: 600 }}>
                      📅 Next: {patient.nextAppointment}
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#14b8a6",
                    border: "none",
                    color: "#fff",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  View History
                </button>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(20, 184, 166, 0.2)",
                    border: "1px solid #14b8a6",
                    color: "#14b8a6",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
