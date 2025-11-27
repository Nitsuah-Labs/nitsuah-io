// AppointmentForm for Appointment Demo
import type {
  AppointmentType,
  Patient,
} from "@/lib/data/demos/appointment-data";
import React from "react";

interface Props {
  patients: Patient[];
  appointmentTypes: AppointmentType[];
  timeSlots: string[];
}

export const AppointmentForm: React.FC<Props> = ({
  patients,
  appointmentTypes,
  timeSlots,
}) => {
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
        Schedule New Appointment
      </h2>
      <div
        style={{
          background: "rgba(20, 184, 166, 0.1)",
          border: "2px solid rgba(20, 184, 166, 0.3)",
          borderRadius: 8,
          padding: "2rem",
        }}
      >
        <form style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <label
              style={{
                display: "block",
                color: "#14b8a6",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Patient
            </label>
            <select
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 6,
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

          <div>
            <label
              style={{
                display: "block",
                color: "#14b8a6",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Appointment Type
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
                    borderRadius: 6,
                    color: "#fff",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
                    {type.icon}
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>
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
                  fontWeight: 600,
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
                  borderRadius: 6,
                  border: "2px solid rgba(20, 184, 166, 0.3)",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  color: "#14b8a6",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Time
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 6,
                  border: "2px solid rgba(20, 184, 166, 0.3)",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                }}
              >
                <option value="">Select time...</option>
                {timeSlots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#14b8a6",
                fontWeight: 600,
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
                borderRadius: 6,
                border: "2px solid rgba(20, 184, 166, 0.3)",
                background: "rgba(0,0,0,0.3)",
                color: "#fff",
                fontFamily: "system-ui, sans-serif",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <input
              type="checkbox"
              id="sms-reminder"
              style={{ width: 20, height: 20 }}
            />
            <label
              htmlFor="sms-reminder"
              style={{ color: "rgba(255,255,255,0.9)", cursor: "pointer" }}
            >
              📱 Send SMS reminder 24 hours before appointment
            </label>
          </div>

          <button
            type="submit"
            style={{
              padding: "1rem",
              background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "1rem",
              marginTop: "1rem",
            }}
          >
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
};
