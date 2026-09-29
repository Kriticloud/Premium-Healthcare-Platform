import assert from "node:assert/strict";
import test from "node:test";
import {
  cancelDemoAppointment,
  hasDemoAppointmentConflict,
  saveDemoAppointment,
  type DemoAppointment,
  type DemoAppointmentInput,
} from "./demoAppointments";

const futureDate = (days = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const input: DemoAppointmentInput = {
  providerId: 1,
  date: futureDate(),
  time: "10:00 AM",
  consultationType: "in-person",
  treatment: "general",
};

const existing: DemoAppointment = {
  ...input,
  id: "demo-1",
  createdAt: "2030-01-01T00:00:00.000Z",
  status: "scheduled",
};

test("saves a sample appointment without collecting patient details", () => {
  const appointments = saveDemoAppointment([], input, undefined, "2030-01-02T00:00:00.000Z");
  assert.equal(appointments.length, 1);
  assert.equal(appointments[0].providerId, input.providerId);
  assert.equal(appointments[0].createdAt, "2030-01-02T00:00:00.000Z");
  assert.equal(appointments[0].status, "scheduled");
});

test("rejects occupied provider time slots but permits another provider", () => {
  assert.equal(hasDemoAppointmentConflict([existing], input), true);
  assert.equal(hasDemoAppointmentConflict([existing], { ...input, providerId: 2 }), false);
  assert.equal(hasDemoAppointmentConflict([existing], input, existing.id), false);
});

test("reschedules an existing sample appointment without duplicating it", () => {
  const updated = saveDemoAppointment(
    [existing],
    { ...input, date: futureDate(31), time: "11:00 AM" },
    existing.id,
    "2030-02-01T00:00:00.000Z",
  );
  assert.equal(updated.length, 1);
  assert.equal(updated[0].date, futureDate(31));
  assert.equal(updated[0].createdAt, existing.createdAt);
});

test("cancels a sample appointment and rejects repeated cancellation", () => {
  const cancelled = cancelDemoAppointment([existing], existing.id);
  assert.equal(cancelled[0].status, "cancelled");
  assert.throws(() => cancelDemoAppointment(cancelled, existing.id), /no longer scheduled/);
});

test("rejects invalid dates and providers", () => {
  assert.throws(() => saveDemoAppointment([], { ...input, date: "2030-02-30" }), /valid sample provider/);
  assert.throws(() => saveDemoAppointment([], { ...input, providerId: 999 }), /valid sample provider/);
});
