import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Calendar } from "../components/ui/calendar";
import { Link, useParams, useSearchParams } from "react-router";
import { Calendar as CalendarIcon, Clock, Video, MapPin, CheckCircle, ArrowRight, Sparkles, User } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getProviderById } from "../data/providers";
import { demoAppointmentTimes, demoTreatmentInterests, hasDemoAppointmentConflict } from "../data/demoAppointments";
import { useDemoAppointments } from "../data/useDemoAppointments";

const treatmentLabels: Record<string, string> = {
  whitening: "Teeth Whitening",
  veneers: "Porcelain Veneers",
  "smile-design": "Smile Design",
  orthodontics: "Orthodontics",
  implants: "Dental Implants",
  general: "General Consultation",
};

function parseDateParameter(value: string | null): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return undefined;
  }
  return date;
}

export function AppointmentBooking() {
  const { dentistId } = useParams();
  const dentist = getProviderById(dentistId);
  const [searchParams] = useSearchParams();
  const rescheduleId = searchParams.get("reschedule") ?? undefined;
  const { appointments, error: storageError, ready, save } = useDemoAppointments();
  const [date, setDate] = useState<Date | undefined>(() => parseDateParameter(searchParams.get("date")));
  const [selectedTime, setSelectedTime] = useState(() => {
    const time = searchParams.get("time") ?? "";
    return demoAppointmentTimes.includes(time) ? time : "";
  });
  const [consultationType, setConsultationType] = useState<"in-person" | "virtual">("in-person");
  const [treatment, setTreatment] = useState("");
  const [step, setStep] = useState(1);
  const [saveError, setSaveError] = useState<string | null>(null);
  const rescheduleAppointment = appointments.find((appointment) =>
    appointment.id === rescheduleId
    && appointment.status === "scheduled"
    && appointment.providerId === dentist?.id,
  );
  const invalidReschedule = ready && Boolean(rescheduleId) && !rescheduleAppointment;
  const selectedDateKey = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";
  const selectedSlotTaken = Boolean(dentist && selectedTime && selectedDateKey && hasDemoAppointmentConflict(
    appointments,
    {
      providerId: dentist.id,
      date: selectedDateKey,
      time: selectedTime,
      consultationType,
      treatment: treatment || "general",
    },
    rescheduleId,
  ));

  useEffect(() => {
    if (!rescheduleAppointment) return;
    setDate(parseDateParameter(rescheduleAppointment.date));
    setSelectedTime(rescheduleAppointment.time);
    setConsultationType(rescheduleAppointment.consultationType);
    setTreatment(rescheduleAppointment.treatment);
  }, [rescheduleAppointment]);

  const handleBooking = () => {
    if (!dentist || !date || !selectedTime || !treatment || !ready || invalidReschedule) return;
    try {
      save({
        providerId: dentist.id,
        date: selectedDateKey,
        time: selectedTime,
        consultationType,
        treatment,
      }, rescheduleId);
      setSaveError(null);
      setStep(4);
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : "Could not save this demo appointment.");
    }
  };

  if (!dentist) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="mb-4 text-3xl">Provider not found</h1>
        <p className="mb-6 text-[var(--medium-gray)]">Choose a sample provider before previewing an appointment.</p>
        <Button asChild><Link to="/discover">Browse providers</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
            Appointment Demo
          </Badge>
          <h1 className="text-5xl mb-4">Schedule Your Visit</h1>
          <p className="text-xl text-[var(--medium-gray)]">
            Choose your preferred date, time, and consultation type
          </p>
          <p className="mt-4 rounded-lg border border-[var(--premium-blue)]/20 bg-[var(--premium-blue)]/5 p-4 text-sm text-[var(--medium-gray)]" role="note">
            Interactive demo only. Do not enter real patient information. Your sample selection is saved only in this browser and is not sent to a clinic.
          </p>
          {storageError && <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-700" role="alert">{storageError}</p>}
          {invalidReschedule && (
            <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-700" role="alert">
              This sample appointment can no longer be rescheduled. Return to the dashboard and choose an active appointment.
            </p>
          )}
        </motion.div>

        {step < 4 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-8">
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= s 
                            ? "bg-gradient-to-br from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white" 
                            : "bg-[var(--soft-beige)] text-[var(--medium-gray)]"
                        }`}>
                          {s}
                        </div>
                        {s < 3 && (
                          <div className={`flex-1 h-1 mx-4 ${
                            step > s ? "bg-[var(--champagne-gold)]" : "bg-[var(--soft-beige)]"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Date & Time */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-4">Select Date</h3>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-lg border border-border p-4"
                          disabled={(candidate) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return candidate < today;
                          }}
                        />
                      </div>

                      <div>
                        <h3 className="mb-4">Select Time</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {demoAppointmentTimes.map((time) => (
                            (() => {
                              const isTaken = Boolean(date && hasDemoAppointmentConflict(
                                appointments,
                                {
                                  providerId: dentist.id,
                                  date: selectedDateKey,
                                  time,
                                  consultationType,
                                  treatment: treatment || "general",
                                },
                                rescheduleId,
                              ));
                              return (
                                <Button
                                  key={time}
                                  variant={selectedTime === time ? "default" : "outline"}
                                  className={selectedTime === time ? "bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white" : ""}
                                  onClick={() => setSelectedTime(time)}
                                  aria-pressed={selectedTime === time}
                                  disabled={isTaken}
                                  title={isTaken ? "Already selected for another sample appointment" : undefined}
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  {time}
                                </Button>
                              );
                            })()
                          ))}
                        </div>
                      </div>

                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90"
                        onClick={() => setStep(2)}
                        disabled={!date || !selectedTime || selectedSlotTaken || !ready}
                      >
                        Continue
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Consultation Type */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-4">Choose Consultation Type</h3>
                        <RadioGroup
                          value={consultationType}
                          onValueChange={(value) => setConsultationType(value === "virtual" ? "virtual" : "in-person")}
                        >
                          <div className="space-y-4">
                            <Card className={`p-6 cursor-pointer transition-all ${
                              consultationType === "in-person" ? "border-[var(--champagne-gold)] bg-[var(--champagne-gold)]/5" : ""
                            }`} onClick={() => setConsultationType("in-person")}>
                              <div className="flex items-start gap-4">
                                <RadioGroupItem value="in-person" id="in-person" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-[var(--champagne-gold)]" />
                                    <Label htmlFor="in-person" className="cursor-pointer">In-Person Visit</Label>
                                  </div>
                                  <p className="text-sm text-[var(--medium-gray)]">
                                    Visit our office for a comprehensive examination and consultation
                                  </p>
                                </div>
                              </div>
                            </Card>

                            <Card className={`p-6 cursor-pointer transition-all ${
                              consultationType === "virtual" ? "border-[var(--champagne-gold)] bg-[var(--champagne-gold)]/5" : ""
                            }`} onClick={() => setConsultationType("virtual")}>
                              <div className="flex items-start gap-4">
                                <RadioGroupItem value="virtual" id="virtual" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Video className="w-5 h-5 text-[var(--premium-blue)]" />
                                    <Label htmlFor="virtual" className="cursor-pointer">Virtual Consultation</Label>
                                  </div>
                                  <p className="text-sm text-[var(--medium-gray)]">
                                    Connect via video call for an initial assessment and treatment planning
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="treatment">Treatment Interest</Label>
                        <Select value={treatment} onValueChange={setTreatment}>
                          <SelectTrigger id="treatment" className="mt-2">
                            <SelectValue placeholder="Select treatment" />
                          </SelectTrigger>
                          <SelectContent>
                            {demoTreatmentInterests.map((interest) => (
                              <SelectItem key={interest} value={interest}>
                                {treatmentLabels[interest]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <p className="text-sm text-[var(--medium-gray)]">
                        Please don’t include symptoms or other health details in this demo. A real practice should collect that information through a secure, configured service.
                      </p>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="flex-1"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                        <Button 
                          size="lg" 
                          className="flex-1 bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90"
                          onClick={() => setStep(3)}
                          disabled={!treatment || invalidReschedule}
                        >
                          Continue
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                      {!treatment && (
                        <p className="text-sm text-[var(--medium-gray)]" role="status">
                          Select a treatment interest to continue.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Step 3: Review the sample request */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2">Review Your Demo Request</h3>
                        <p className="text-sm text-[var(--medium-gray)]">
                          No personal or contact information is needed for this preview. Review the fictional sample details below.
                        </p>
                      </div>
                      <Card className="space-y-3 bg-[var(--soft-beige)]/50 p-5">
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-[var(--medium-gray)]">Provider</span>
                          <span className="text-right font-medium">{dentist.name}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-[var(--medium-gray)]">Selected date</span>
                          <span className="text-right font-medium">{date?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-[var(--medium-gray)]">Selected time</span>
                          <span className="text-right font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-[var(--medium-gray)]">Treatment interest</span>
                          <span className="text-right font-medium">{treatment.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</span>
                        </div>
                      </Card>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="flex-1"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </Button>
                        <Button 
                          size="lg" 
                          className="flex-1 bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90"
                          onClick={handleBooking}
                          disabled={!ready || invalidReschedule}
                        >
                          {rescheduleId ? "Save New Time" : "Save Demo Appointment"}
                          <CheckCircle className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                      {saveError && <p className="text-sm text-red-700" role="alert">{saveError}</p>}
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 sticky top-24">
                  <h3 className="mb-4">Appointment Summary</h3>
                  
                  {/* Dentist Info */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/${dentist.image}?w=100&q=80`}
                      alt={dentist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{dentist.name}</div>
                      <div className="text-sm text-[var(--medium-gray)]">{dentist.specialty}</div>
                    </div>
                  </div>

                  {/* Selected Details */}
                  <div className="space-y-4">
                    {date && (
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Date</div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-[var(--champagne-gold)]" />
                          <span>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    )}

                    {selectedTime && (
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Time</div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[var(--champagne-gold)]" />
                          <span>{selectedTime}</span>
                        </div>
                      </div>
                    )}

                    {step >= 2 && (
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Type</div>
                        <div className="flex items-center gap-2">
                          {consultationType === "in-person" ? (
                            <>
                              <MapPin className="w-4 h-4 text-[var(--champagne-gold)]" />
                              <span>In-Person Visit</span>
                            </>
                          ) : (
                            <>
                              <Video className="w-4 h-4 text-[var(--premium-blue)]" />
                              <span>Virtual Consultation</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {treatment && (
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Treatment interest</div>
                        <div className="font-medium">{treatment.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</div>
                      </div>
                    )}

                    {consultationType === "in-person" && (
                      <div>
                        <div className="text-sm text-[var(--medium-gray)] mb-1">Location</div>
                        <div className="text-sm">{dentist.location}</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="bg-[var(--soft-beige)]/50 rounded-lg p-4">
                      <div className="text-sm text-[var(--medium-gray)] mb-1">Demo preview</div>
                      <div className="text-sm">Saved only in this browser. No practice is notified and no payment is collected.</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-4xl mb-4">{rescheduleId ? "Demo Appointment Updated" : "Demo Appointment Saved"}</h2>
              <p className="text-xl text-[var(--medium-gray)] mb-8">
                Your sample appointment is saved in this browser for this demo only. The practice has not been contacted, no real appointment is reserved, and no confirmation email is sent.
              </p>
              <p className="mb-8 rounded-lg border border-[var(--premium-blue)]/20 bg-[var(--premium-blue)]/5 p-4 text-sm text-[var(--medium-gray)]" role="status">
                A live booking experience requires a connected scheduling service and a verified practice account.
              </p>

              <div className="bg-[var(--soft-beige)]/50 rounded-lg p-6 mb-8 text-left">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[var(--champagne-gold)]" />
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Dentist</div>
                      <div className="font-medium">{dentist.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-[var(--champagne-gold)]" />
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Date & Time</div>
                      <div className="font-medium">{date?.toLocaleDateString()} at {selectedTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {consultationType === "in-person" ? (
                      <MapPin className="w-5 h-5 text-[var(--champagne-gold)]" />
                    ) : (
                      <Video className="w-5 h-5 text-[var(--premium-blue)]" />
                    )}
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Type</div>
                      <div className="font-medium">
                        {consultationType === "in-person" ? "In-Person Visit" : "Virtual Consultation"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[var(--champagne-gold)]" />
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Treatment interest</div>
                      <div className="font-medium">{treatment.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
