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

interface AppointmentType {
  value: string;
  label: string;
  duration: string;
  icon: string;
}

interface BookingFormProps {
  patients: Patient[];
  appointmentTypes: AppointmentType[];
  timeSlots: string[];
}

export const BookingForm: React.FC<BookingFormProps> = ({
  patients,
  appointmentTypes,
  timeSlots,
}) => {
  return (
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
              className="appt-type-grid"
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
                  <div style={{ fontSize: "0.875rem", fontWeight: "600" }}>
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
            className="appt-form-grid"
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
              background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
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
  );
};
