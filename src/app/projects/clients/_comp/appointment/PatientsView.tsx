/**
 * PatientsView.tsx
 *
 * TODO: Extract from AppointmentDemo.tsx (978 LOC)
 *
 * This will handle the patients list view showing:
 * - Patient list with search
 * - Patient cards (name, phone, email, last visit, next appointment)
 * - Insurance provider information
 * - Quick actions (call, email, schedule appointment)
 * - Patient history
 *
 * Target: ~250 LOC
 *
 * Can use shared components:
 * - DemoTable for patient list (columns: name, phone, last visit, next appointment)
 * - DemoCard for patient cards
 * - DemoButton for quick actions
 *
 * Lines to extract from AppointmentDemo: ~589-694
 */

"use client";
import React from "react";

export const PatientsView: React.FC = () => {
  return (
    <div>
      <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
        Patients View - To be extracted from AppointmentDemo
      </p>
    </div>
  );
};
