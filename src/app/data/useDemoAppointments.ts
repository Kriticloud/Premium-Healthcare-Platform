import { useCallback, useEffect, useState } from "react";
import {
  cancelDemoAppointment,
  persistDemoAppointments,
  readDemoAppointments,
  saveDemoAppointment,
  subscribeToDemoAppointments,
  type DemoAppointment,
  type DemoAppointmentInput,
} from "./demoAppointments";

export function useDemoAppointments() {
  const [appointments, setAppointments] = useState<DemoAppointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    try {
      setAppointments(readDemoAppointments());
      setError(null);
      setReady(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load demo appointments.");
      setReady(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    return subscribeToDemoAppointments(refresh);
  }, [refresh]);

  const save = useCallback((input: DemoAppointmentInput, id?: string) => {
    if (!ready) throw new Error("Demo appointments are not available until browser storage loads.");
    const next = saveDemoAppointment(appointments, input, id);
    persistDemoAppointments(next);
    setAppointments(next);
  }, [appointments, ready]);

  const cancel = useCallback((id: string) => {
    if (!ready) throw new Error("Demo appointments are not available until browser storage loads.");
    const next = cancelDemoAppointment(appointments, id);
    persistDemoAppointments(next);
    setAppointments(next);
  }, [appointments, ready]);

  return { appointments, error, ready, save, cancel };
}
