// ReservationForm component for RestaurantDemo
"use client";
import React from "react";
import {
  DemoButton,
  DemoCard,
  DemoSection,
} from "../../../../../components/demos";

interface Props {
  reservationDate: string;
  setReservationDate: (s: string) => void;
  guests: number;
  setGuests: (n: number) => void;
}

export const ReservationForm: React.FC<Props> = ({
  reservationDate,
  setReservationDate,
  guests,
  setGuests,
}) => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <DemoSection title="Reserve a Table">
        <DemoCard>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#ec4899",
                fontWeight: "600",
              }}
            >
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#ec4899",
                fontWeight: "600",
              }}
            >
              Number of Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              background: "rgba(236, 72, 153, 0.1)",
              border: "2px solid rgba(236, 72, 153, 0.3)",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h4
              style={{
                color: "#ec4899",
                marginBottom: "0.5rem",
                fontWeight: "700",
              }}
            >
              📝 Reservation Details
            </h4>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>
              <strong>Date:</strong>{" "}
              {reservationDate
                ? new Date(reservationDate).toLocaleString()
                : "Not selected"}
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>
              <strong>Guests:</strong> {guests}
            </p>
          </div>

          <DemoButton
            variant="success"
            onClick={() =>
              alert(
                `Reservation confirmed!\nDate: ${new Date(reservationDate).toLocaleString()}\nGuests: ${guests}`,
              )
            }
            disabled={!reservationDate}
            style={{ width: "100%" }}
          >
            Confirm Reservation
          </DemoButton>
        </DemoCard>
      </DemoSection>
    </div>
  );
};
