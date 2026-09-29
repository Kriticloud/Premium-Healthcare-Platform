import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Calendar } from "../components/ui/calendar";
import { Link } from "react-router";
import { Calendar as CalendarIcon, Clock, Video, MapPin, CheckCircle, ArrowRight, Mail, Phone, Sparkles, User } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const dentist = {
  name: "Dr. Sarah Chen",
  specialty: "Cosmetic Dentistry",
  image: "photo-1594824476967-48c8b964273f",
  location: "Beverly Hills, CA",
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM"
];

export function AppointmentBooking() {
  const [date, setDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("in-person");
  const [treatment, setTreatment] = useState("");
  const [patient, setPatient] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [step, setStep] = useState(1);

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(4);
  };

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
            Book Appointment
          </Badge>
          <h1 className="text-5xl mb-4">Schedule Your Visit</h1>
          <p className="text-xl text-[var(--medium-gray)]">
            Choose your preferred date, time, and consultation type
          </p>
          <p className="mt-4 rounded-lg border border-[var(--premium-blue)]/20 bg-[var(--premium-blue)]/5 p-4 text-sm text-[var(--medium-gray)]" role="note">
            Interactive demo only. Do not enter real patient information. Nothing you enter is sent to a clinic or saved.
          </p>
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
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              className={selectedTime === time ? "bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white" : ""}
                              onClick={() => setSelectedTime(time)}
                              aria-pressed={selectedTime === time}
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90"
                        onClick={() => setStep(2)}
                        disabled={!date || !selectedTime}
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
                        <RadioGroup value={consultationType} onValueChange={setConsultationType}>
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
                            <SelectItem value="whitening">Teeth Whitening</SelectItem>
                            <SelectItem value="veneers">Porcelain Veneers</SelectItem>
                            <SelectItem value="smile-design">Smile Design</SelectItem>
                            <SelectItem value="orthodontics">Orthodontics</SelectItem>
                            <SelectItem value="implants">Dental Implants</SelectItem>
                            <SelectItem value="general">General Consultation</SelectItem>
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
                          disabled={!treatment}
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

                  {/* Step 3: Patient Information */}
                  {step === 3 && (
                    <form className="space-y-6" onSubmit={handleBooking}>
                      <div>
                        <h3 className="mb-2">Contact Details</h3>
                        <p className="text-sm text-[var(--medium-gray)]">
                          Use fictional details for this preview. This form does not submit or store your information.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            autoComplete="given-name"
                            placeholder="Alex"
                            className="mt-2"
                            value={patient.firstName}
                            onChange={(event) => setPatient({ ...patient, firstName: event.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            autoComplete="family-name"
                            placeholder="Morgan"
                            className="mt-2"
                            value={patient.lastName}
                            onChange={(event) => setPatient({ ...patient, lastName: event.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="alex@example.com"
                            className="mt-2"
                            value={patient.email}
                            onChange={(event) => setPatient({ ...patient, email: event.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="(555) 010-0123"
                            className="mt-2"
                            value={patient.phone}
                            onChange={(event) => setPatient({ ...patient, phone: event.target.value })}
                            pattern="[0-9+(). -]{7,20}"
                            title="Enter 7 to 20 digits with common phone punctuation."
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="flex-1"
                          type="button"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </Button>
                        <Button 
                          size="lg" 
                          className="flex-1 bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90"
                          type="submit"
                        >
                          Preview Request
                          <CheckCircle className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </form>
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
                      <div className="text-sm">No appointment is booked and no payment is collected.</div>
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
              
              <h2 className="text-4xl mb-4">Demo Request Preview</h2>
              <p className="text-xl text-[var(--medium-gray)] mb-8">
                This is a preview, not a booking. Nothing has been sent to the practice, no appointment is reserved, and no confirmation email will be sent.
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
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[var(--champagne-gold)]" />
                    <div>
                      <div className="text-sm text-[var(--medium-gray)]">Demo contact</div>
                      <div className="font-medium">{patient.firstName} {patient.lastName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[var(--champagne-gold)]" />
                    <div className="font-medium">{patient.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[var(--champagne-gold)]" />
                    <div className="font-medium">{patient.phone}</div>
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
