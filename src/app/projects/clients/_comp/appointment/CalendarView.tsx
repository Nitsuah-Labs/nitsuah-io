import React from "react";

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

interface AppointmentType {
  value: string;
  label: string;
  duration: string;
  icon: string;
}

interface CalendarViewProps {
  selectedDate: string;
  appointments: Appointment[];
  patients: Patient[];
  appointmentTypes: AppointmentType[];
  onDateChange: (date: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  appointments,
  patients,
  appointmentTypes,
  onDateChange,
}) => {
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
          onChange={(e) => onDateChange(e.target.value)}
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
            const typeInfo = appointmentTypes.find((t) => t.value === apt.type);
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
                    <span style={{ fontSize: "1.5rem" }}>{typeInfo?.icon}</span>
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

      {appointments.filter((apt) => apt.date === selectedDate).length === 0 && (
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
  );
};
