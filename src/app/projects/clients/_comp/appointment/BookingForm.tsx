/**
 * BookingForm.tsx
 *
 * TODO: Extract from AppointmentDemo.tsx (978 LOC)
 *
 * This will handle the appointment booking form showing:
 * - Patient selection dropdown
 * - Date and time picker
 * - Appointment type selection (checkup, cleaning, filling, emergency, consultation)
 * - Dentist selection
 * - Notes field
 * - Insurance information
 * - Confirmation step
 *
 * Target: ~280 LOC
 *
 * Can use shared components:
 * - DemoButton for form submission
 * - DemoSection for form sections
 * - DemoCard for confirmation summary
 *
 * Lines to extract from AppointmentDemo: ~695-978
 */

"use client";
import React from "react";

export const BookingForm: React.FC = () => {
  return (
    <div>
      <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
        Booking Form - To be extracted from AppointmentDemo
      </p>
    </div>
  );
};
