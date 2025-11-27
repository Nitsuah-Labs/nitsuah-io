import type { Appointment, Patient } from "@/lib/data/demos/appointment-data";
import { getAppointmentTypeColor } from "@/lib/utils/demo-helpers";
import React from "react";

interface CalendarViewProps {
  appointments: Appointment[];
  patients: Patient[];
  selectedDate: string;
  setSelectedDate: (d: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  appointments,
  patients,
  selectedDate,
  setSelectedDate,
}) => {
  const todays = appointments.filter((a) => a.date === selectedDate);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0, color: "#14b8a6" }}>Today's Schedule</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {todays.length === 0 ? (
        <div
          style={{
            padding: 24,
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          No appointments scheduled
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {todays.map((apt) => {
            const patient = patients.find((p) => p.id === apt.patientId);
            const typeColor = getAppointmentTypeColor(apt.type);

            return (
              <div
                key={apt.id}
                style={{
                  padding: 12,
                  borderLeft: `6px solid ${typeColor}`,
                  background: "rgba(20,184,166,0.04)",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontWeight: 600, color: "#14b8a6" }}>
                    {patient?.name}
                  </div>
                  <div
                    style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}
                  >
                    {apt.time}
                  </div>
                </div>
                {apt.notes && (
                  <div style={{ marginTop: 8, color: "rgba(255,255,255,0.8)" }}>
                    {apt.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
