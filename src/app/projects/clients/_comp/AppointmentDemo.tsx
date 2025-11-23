// Dental Office Appointment System Demo
"use client";
import React, { useState } from "react";
import { CalendarView, BookingForm, PatientsView } from "./appointment";

export const AppointmentDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "calendar" | "booking" | "patients"
  >("calendar");

  if (currentView === "booking") {
    return <BookingForm onBack={() => setCurrentView("calendar")} />;
  }

  if (currentView === "patients") {
    return <PatientsView onBack={() => setCurrentView("calendar")} />;
  }

  return (
    <CalendarView
      onNewAppointment={() => setCurrentView("booking")}
      onViewPatients={() => setCurrentView("patients")}
    />
  );
};
