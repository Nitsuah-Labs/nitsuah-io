// Appointment Booking Demo - Dentist Office Theme
"use client";
import {
  appointmentTypes,
  mockAppointments,
  mockPatients,
  timeSlots,
} from "@/lib/data/demos/appointment-data";
import React, { useState } from "react";
import { AppointmentForm } from "./appointment/AppointmentForm";
import { CalendarView } from "./appointment/CalendarView";
import { PatientList } from "./appointment/PatientList";

export const AppointmentDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "calendar" | "patients" | "book"
  >("calendar");
  const [selectedDate, setSelectedDate] = useState("2025-01-15");

  // Use imported data
  const patients = mockPatients;
  const appointments = mockAppointments;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", height: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "2rem" }}>🦷</span>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>
              SmileCare Dental
            </div>
            <div
              style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.9)" }}
            >
              Schedule & Patient Management
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            📞 Call Patient
          </button>
          <button
            style={{
              background: "#fff",
              border: "none",
              color: "#14b8a6",
              padding: "0.5rem 1rem",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            👤 Staff
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          padding: "1rem 1.5rem",
          background: "rgba(20, 184, 166, 0.1)",
          borderBottom: "2px solid rgba(20, 184, 166, 0.3)",
        }}
      >
        <button
          onClick={() => setCurrentView("calendar")}
          style={{
            background:
              currentView === "calendar"
                ? "rgba(20, 184, 166, 0.3)"
                : "transparent",
            border:
              currentView === "calendar"
                ? "2px solid #14b8a6"
                : "2px solid transparent",
            color:
              currentView === "calendar" ? "#14b8a6" : "rgba(255,255,255,0.7)",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          📅 Calendar
        </button>
        <button
          onClick={() => setCurrentView("patients")}
          style={{
            background:
              currentView === "patients"
                ? "rgba(20, 184, 166, 0.3)"
                : "transparent",
            border:
              currentView === "patients"
                ? "2px solid #14b8a6"
                : "2px solid transparent",
            color:
              currentView === "patients" ? "#14b8a6" : "rgba(255,255,255,0.7)",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          👥 Patients
        </button>
        <button
          onClick={() => setCurrentView("book")}
          style={{
            background:
              currentView === "book"
                ? "rgba(20, 184, 166, 0.3)"
                : "transparent",
            border:
              currentView === "book"
                ? "2px solid #14b8a6"
                : "2px solid transparent",
            color: currentView === "book" ? "#14b8a6" : "rgba(255,255,255,0.7)",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          ➕ New Appointment
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: "1.5rem", maxHeight: "450px", overflowY: "auto" }}>
        {currentView === "calendar" && (
          <CalendarView
            appointments={appointments}
            patients={patients}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}

        {currentView === "patients" && <PatientList patients={patients} />}

        {currentView === "book" && (
          <AppointmentForm
            patients={patients}
            appointmentTypes={appointmentTypes}
            timeSlots={timeSlots}
          />
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(20, 184, 166, 0.3)",
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 SmileCare Dental - Appointment System Demo
      </div>
    </div>
  );
};
