/**
 * Mock data for Appointment Demo
 */

export interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment?: string;
  insuranceProvider?: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  date: string;
  time: string;
  type: "checkup" | "cleaning" | "filling" | "emergency" | "consultation";
  dentist: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  notes?: string;
}

export interface AppointmentType {
  value: string;
  label: string;
  duration: string;
  icon: string;
}

export const mockPatients: Patient[] = [
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

export const mockAppointments: Appointment[] = [
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

export const appointmentTypes: AppointmentType[] = [
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
    icon: "🦷",
  },
  { value: "filling", label: "Filling", duration: "60 min", icon: "🪥" },
  { value: "emergency", label: "Emergency", duration: "90 min", icon: "🚨" },
  {
    value: "consultation",
    label: "Consultation",
    duration: "30 min",
    icon: "💬",
  },
];

export const timeSlots = [
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
