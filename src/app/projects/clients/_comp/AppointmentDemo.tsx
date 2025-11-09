// Appointment Booking Demo - Dentist Office Theme
"use client";
import React, { useState } from "react";

interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  insuranceProvider?: string;
}

interface Appointment {
  id: number;
  patientId: number;
  date: string;
  time: string;
  type: "checkup" | "cleaning" | "filling" | "emergency" | "consultation";
  dentist: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  notes?: string;
}

export const AppointmentDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "calendar" | "patients" | "book"
  >("calendar");
  const [selectedDate, setSelectedDate] = useState("2025-01-15");
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const patients: Patient[] = [
    {
      id: 1,
      name: "Emma Wilson",
      phone: "(555) 123-4567",
      email: "emma.w@email.com",
      lastVisit: "2024-12-10",
      nextAppointment: "2025-01-15 10:00 AM",
      insuranceProvider: "Delta Dental",
    },
    {
      id: 2,
      name: "James Anderson",
      phone: "(555) 234-5678",
      email: "j.anderson@email.com",
      lastVisit: "2024-11-22",
      insuranceProvider: "Cigna",
    },
    {
      id: 3,
      name: "Sophia Martinez",
      phone: "(555) 345-6789",
      email: "sophia.m@email.com",
      lastVisit: "2024-12-28",
      nextAppointment: "2025-01-15 2:00 PM",
      insuranceProvider: "Aetna",
    },
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      patientId: 1,
      date: "2025-01-15",
      time: "10:00 AM",
      type: "checkup",
      dentist: "Dr. Sarah Johnson",
      status: "confirmed",
      notes: "6-month checkup",
    },
    {
      id: 2,
      patientId: 3,
      date: "2025-01-15",
      time: "2:00 PM",
      type: "cleaning",
      dentist: "Dr. Michael Chen",
      status: "confirmed",
      notes: "Deep cleaning needed",
    },
    {
      id: 3,
      patientId: 2,
      date: "2025-01-16",
      time: "11:00 AM",
      type: "filling",
      dentist: "Dr. Sarah Johnson",
      status: "pending",
      notes: "Cavity on lower left molar",
    },
  ];

  const appointmentTypes = [
    {
      value: "checkup",
      label: "Routine Checkup",
      duration: "30 min",
      icon: "🔍",
    },
    {
      value: "cleaning",
      label: "Teeth Cleaning",
      duration: "45 min",
      icon: "✨",
    },
    { value: "filling", label: "Filling", duration: "60 min", icon: "🦷" },
    { value: "emergency", label: "Emergency", duration: "90 min", icon: "🚨" },
    {
      value: "consultation",
      label: "Consultation",
      duration: "30 min",
      icon: "💬",
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "checkup":
        return "#14b8a6";
      case "cleaning":
        return "#06b6d4";
      case "filling":
        return "#f59e0b";
      case "emergency":
        return "#ef4444";
      case "consultation":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "completed":
        return "#6b7280";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

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
            <div
              style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff" }}
            >
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
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
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
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
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
              currentView === "calendar"
                ? "#14b8a6"
                : "rgba(255, 255, 255, 0.7)",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
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
              currentView === "patients"
                ? "#14b8a6"
                : "rgba(255, 255, 255, 0.7)",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
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
            color:
              currentView === "book" ? "#14b8a6" : "rgba(255, 255, 255, 0.7)",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.875rem",
          }}
        >
          ➕ New Appointment
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: "1.5rem", maxHeight: "450px", overflowY: "auto" }}>
        {/* CALENDAR VIEW */}
        {currentView === "calendar" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#14b8a6",
                  margin: 0,
                }}
              >
                Today's Schedule
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "2px solid rgba(20, 184, 166, 0.3)",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            {/* Appointments Timeline */}
            <div style={{ display: "grid", gap: "1rem" }}>
              {appointments
                .filter((apt) => apt.date === selectedDate)
                .map((apt) => {
                  const patient = patients.find((p) => p.id === apt.patientId);
                  const typeInfo = appointmentTypes.find(
                    (t) => t.value === apt.type,
                  );
                  return (
                    <div
                      key={apt.id}
                      style={{
                        background: "rgba(20, 184, 166, 0.1)",
                        border: `2px solid ${getTypeColor(apt.type)}`,
                        borderLeft: `6px solid ${getTypeColor(apt.type)}`,
                        borderRadius: "8px",
                        padding: "1.5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "0.75rem",
                          }}
                        >
                          <span style={{ fontSize: "1.5rem" }}>
                            {typeInfo?.icon}
                          </span>
                          <div>
                            <h3
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                color: "#14b8a6",
                                margin: 0,
                              }}
                            >
                              {patient?.name}
                            </h3>
                            <div
                              style={{
                                fontSize: "0.875rem",
                                color: "rgba(255,255,255,0.7)",
                              }}
                            >
                              {typeInfo?.label} • {typeInfo?.duration}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gap: "0.5rem",
                            fontSize: "0.875rem",
                            color: "rgba(255,255,255,0.8)",
                          }}
                        >
                          <div>⏰ {apt.time}</div>
                          <div>👨‍⚕️ {apt.dentist}</div>
                          <div>📧 {patient?.email}</div>
                          <div>📞 {patient?.phone}</div>
                          {patient?.insuranceProvider && (
                            <div>🏥 Insurance: {patient.insuranceProvider}</div>
                          )}
                          {apt.notes && <div>📝 {apt.notes}</div>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            background: `${getStatusColor(apt.status)}20`,
                            color: getStatusColor(apt.status),
                            textTransform: "capitalize",
                          }}
                        >
                          {apt.status}
                        </span>
                        <div
                          style={{
                            marginTop: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          <button
                            style={{
                              padding: "0.375rem 0.75rem",
                              background: "#14b8a6",
                              border: "none",
                              color: "#fff",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                            }}
                          >
                            Send Reminder
                          </button>
                          <button
                            style={{
                              padding: "0.375rem 0.75rem",
                              background: "rgba(20, 184, 166, 0.2)",
                              border: "1px solid #14b8a6",
                              color: "#14b8a6",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                            }}
                          >
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {appointments.filter((apt) => apt.date === selectedDate).length ===
              0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
                <div>No appointments scheduled for this date</div>
              </div>
            )}
          </div>
        )}

        {/* PATIENTS VIEW */}
        {currentView === "patients" && (
          <div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#14b8a6",
                marginBottom: "1.5rem",
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
                    borderRadius: "8px",
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
                          fontWeight: "600",
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
                          <div style={{ color: "#14b8a6", fontWeight: "600" }}>
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
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "600",
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
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "600",
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
        )}

        {/* BOOK NEW APPOINTMENT VIEW */}
        {currentView === "book" && (
          <div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#14b8a6",
                marginBottom: "1.5rem",
              }}
            >
              Schedule New Appointment
            </h2>
            <div
              style={{
                background: "rgba(20, 184, 166, 0.1)",
                border: "2px solid rgba(20, 184, 166, 0.3)",
                borderRadius: "8px",
                padding: "2rem",
              }}
            >
              <form style={{ display: "grid", gap: "1.5rem" }}>
                {/* Patient Selection */}
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#14b8a6",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Patient
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "2px solid rgba(20, 184, 166, 0.3)",
                      background: "rgba(0,0,0,0.3)",
                      color: "#fff",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="">Select patient...</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#14b8a6",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Appointment Type
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {appointmentTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        style={{
                          padding: "0.75rem",
                          background: "rgba(20, 184, 166, 0.1)",
                          border: "2px solid rgba(20, 184, 166, 0.3)",
                          borderRadius: "6px",
                          color: "#fff",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#14b8a6";
                          e.currentTarget.style.background =
                            "rgba(20, 184, 166, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(20, 184, 166, 0.3)";
                          e.currentTarget.style.background =
                            "rgba(20, 184, 166, 0.1)";
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.5rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {type.icon}
                        </div>
                        <div
                          style={{ fontSize: "0.875rem", fontWeight: "600" }}
                        >
                          {type.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          {type.duration}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#14b8a6",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: "2px solid rgba(20, 184, 166, 0.3)",
                        background: "rgba(0,0,0,0.3)",
                        color: "#fff",
                        fontSize: "0.875rem",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#14b8a6",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Time
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "6px",
                        border: "2px solid rgba(20, 184, 166, 0.3)",
                        background: "rgba(0,0,0,0.3)",
                        color: "#fff",
                        fontSize: "0.875rem",
                      }}
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#14b8a6",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Special Instructions / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special requirements or notes..."
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "2px solid rgba(20, 184, 166, 0.3)",
                      background: "rgba(0,0,0,0.3)",
                      color: "#fff",
                      fontSize: "0.875rem",
                      fontFamily: "system-ui, sans-serif",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* SMS Reminder Option */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <input
                    type="checkbox"
                    id="sms-reminder"
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                  <label
                    htmlFor="sms-reminder"
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      cursor: "pointer",
                    }}
                  >
                    📱 Send SMS reminder 24 hours before appointment
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    padding: "1rem",
                    background:
                      "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  Schedule Appointment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(20, 184, 166, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 SmileCare Dental - Appointment System Demo
      </div>
    </div>
  );
};
