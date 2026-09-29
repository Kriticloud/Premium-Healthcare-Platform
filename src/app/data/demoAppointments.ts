import { getProviderById } from "./providers";

const STORAGE_KEY = "smileos.demoAppointments.v1";
const CHANGE_EVENT = "smileos:demo-appointments-change";

export const demoAppointmentTimes = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];
export const demoTreatmentInterests = [
  "whitening", "veneers", "smile-design", "orthodontics", "implants", "general",
];

export type DemoAppointment = {
  id: string;
  providerId: number;
  date: string;
  time: string;
  consultationType: "in-person" | "virtual";
  treatment: string;
  createdAt: string;
  status: "scheduled" | "cancelled";
};

export type DemoAppointmentInput = Omit<DemoAppointment, "id" | "createdAt" | "status">;

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function isFutureOrToday(value: string): boolean {
  if (!isValidDate(value)) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day) >= today;
}

function isDemoAppointment(value: unknown): value is DemoAppointment {
  if (!value || typeof value !== "object") return false;
  const appointment = value as Record<string, unknown>;
  return typeof appointment.id === "string"
    && Number.isInteger(appointment.providerId)
    && Boolean(getProviderById(String(appointment.providerId)))
    && typeof appointment.date === "string"
    && isValidDate(appointment.date)
    && typeof appointment.time === "string"
    && demoAppointmentTimes.includes(appointment.time)
    && (appointment.consultationType === "in-person" || appointment.consultationType === "virtual")
    && typeof appointment.treatment === "string"
    && demoTreatmentInterests.includes(appointment.treatment)
    && typeof appointment.createdAt === "string"
    && (appointment.status === "scheduled" || appointment.status === "cancelled");
}

export function readDemoAppointments(): DemoAppointment[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isDemoAppointment)) {
      throw new Error("Saved demo appointments have an invalid format.");
    }
    return parsed;
  } catch (error) {
    throw new Error(
      "Could not load demo appointments from this browser. Check browser storage settings and try again.",
      { cause: error },
    );
  }
}

function writeDemoAppointments(appointments: DemoAppointment[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch (error) {
    throw new Error(
      "Could not save demo appointments in this browser. Check browser storage settings and try again.",
      { cause: error },
    );
  }
}

export function hasDemoAppointmentConflict(
  appointments: DemoAppointment[],
  input: DemoAppointmentInput,
  excludingId?: string,
): boolean {
  return appointments.some((appointment) =>
    appointment.id !== excludingId
    && appointment.status === "scheduled"
    && appointment.providerId === input.providerId
    && appointment.date === input.date
    && appointment.time === input.time,
  );
}

export function saveDemoAppointment(
  appointments: DemoAppointment[],
  input: DemoAppointmentInput,
  id?: string,
  createdAt = new Date().toISOString(),
): DemoAppointment[] {
  if (!getProviderById(String(input.providerId))
    || !isFutureOrToday(input.date)
    || !demoAppointmentTimes.includes(input.time)
    || !demoTreatmentInterests.includes(input.treatment)
    || (input.consultationType !== "in-person" && input.consultationType !== "virtual")) {
    throw new Error("Choose a valid sample provider, date, time, and treatment interest.");
  }
  if (id && !appointments.some((appointment) => appointment.id === id && appointment.status === "scheduled")) {
    throw new Error("This demo appointment is no longer available to reschedule.");
  }
  if (hasDemoAppointmentConflict(appointments, input, id)) {
    throw new Error("That sample time is already selected. Choose another time to continue.");
  }

  const appointmentId = id ?? globalThis.crypto.randomUUID();
  const existing = appointments.find((appointment) => appointment.id === appointmentId);
  const saved: DemoAppointment = {
    ...input,
    id: appointmentId,
    createdAt: existing?.createdAt ?? createdAt,
    status: "scheduled",
  };
  return existing
    ? appointments.map((appointment) => appointment.id === appointmentId ? saved : appointment)
    : [...appointments, saved];
}

export function cancelDemoAppointment(
  appointments: DemoAppointment[],
  id: string,
): DemoAppointment[] {
  if (!appointments.some((appointment) => appointment.id === id && appointment.status === "scheduled")) {
    throw new Error("This demo appointment is no longer scheduled.");
  }
  return appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, status: "cancelled" } : appointment,
  );
}

export function persistDemoAppointments(appointments: DemoAppointment[]): void {
  writeDemoAppointments(appointments);
}

export function subscribeToDemoAppointments(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}
