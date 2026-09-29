import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router";
import { 
  Calendar, Clock, FileText, CreditCard,
  Star, Bell, Settings, ChevronRight, Sparkles, AlertCircle
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { demoDate } from "../data/demoDates";
import { getProviderById } from "../data/providers";
import { useDemoAppointments } from "../data/useDemoAppointments";
import { useState } from "react";

const upcomingAppointments = [
  {
    id: 1,
    dentist: "Dr. Sarah Chen",
    type: "Final Placement",
    date: demoDate(14),
    time: "2:00 PM",
    location: "Beverly Hills, CA",
    image: "photo-1594824476967-48c8b964273f",
  },
  {
    id: 2,
    dentist: "Dr. Sarah Chen",
    type: "Follow-up Visit",
    date: demoDate(42),
    time: "10:00 AM",
    location: "Beverly Hills, CA",
    image: "photo-1594824476967-48c8b964273f",
  },
];

const recentActivity = [
  { id: 1, type: "appointment", title: "Appointment completed", description: "Mid-Treatment Check", time: "2 days ago" },
  { id: 2, type: "payment", title: "Payment received", description: "$2,850.00", time: "3 days ago" },
  { id: 3, type: "report", title: "New report available", description: "Post-Procedure Medications", time: "5 days ago" },
  { id: 4, type: "message", title: "Message from Dr. Chen", description: "Treatment progressing well!", time: "1 week ago" },
];

const progressData = [
  { month: "Start", progress: 0 },
  { month: "Week 2", progress: 15 },
  { month: "Week 4", progress: 45 },
  { month: "Week 6", progress: 75 },
  { month: "Week 8", progress: 100 },
];

export function PatientDashboard() {
  const { appointments, error: appointmentError, ready, cancel } = useDemoAppointments();
  const [appointmentActionError, setAppointmentActionError] = useState<string | null>(null);
  const browserAppointments = appointments.filter((appointment) => appointment.status === "scheduled");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-8"
        >
          <div>
            <h1 className="text-5xl mb-4">Welcome back, Sarah!</h1>
            <p className="text-xl text-[var(--medium-gray)]">
              Your smile journey is 60% complete
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="icon" aria-label="Notifications unavailable in preview" disabled title="Notifications are not connected.">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Settings unavailable in preview" disabled title="Account settings are not connected.">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Treatment Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="mb-2">Treatment Progress</h2>
                    <p className="text-[var(--medium-gray)]">Smile Design Journey</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    60% Complete
                  </Badge>
                </div>

                <Progress value={60} className="h-3 mb-6" />

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-[var(--soft-beige)]/50 rounded-lg">
                    <div className="text-2xl text-green-600 mb-1">3</div>
                    <div className="text-sm text-[var(--medium-gray)]">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--champagne-gold)]/10 rounded-lg">
                    <div className="text-2xl text-[var(--champagne-gold)] mb-1">1</div>
                    <div className="text-sm text-[var(--medium-gray)]">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--soft-beige)]/50 rounded-lg">
                    <div className="text-2xl text-[var(--medium-gray)] mb-1">1</div>
                    <div className="text-sm text-[var(--medium-gray)]">Upcoming</div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--champagne-gold)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--champagne-gold)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--medium-gray)" />
                    <YAxis stroke="var(--medium-gray)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--card)', 
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="var(--champagne-gold)" 
                      strokeWidth={2}
                      fill="url(#colorProgress)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>

                <div className="flex gap-3 mt-6">
                  <Button asChild className="flex-1 bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                    <Link to="/timeline">
                      View Timeline
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link to="/gallery">View Gallery</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2>Appointments in This Browser</h2>
                  <p className="text-sm text-[var(--medium-gray)]">Demo-only selections saved locally on this device.</p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/discover">Book a demo visit</Link>
                </Button>
              </div>
              {appointmentError && <p className="mb-4 text-sm text-red-700" role="alert">{appointmentError}</p>}
              {appointmentActionError && <p className="mb-4 text-sm text-red-700" role="alert">{appointmentActionError}</p>}
              {!appointmentError && ready && browserAppointments.length === 0 && (
                <Card className="p-6 text-sm text-[var(--medium-gray)]">
                  No appointments have been saved in this browser yet. Start from Discover to try the full demo flow.
                </Card>
              )}
              <div className="space-y-4">
                {browserAppointments.map((appointment) => {
                  const provider = getProviderById(String(appointment.providerId));
                  return (
                    <Card key={appointment.id} className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3>{provider?.name ?? "Sample provider"}</h3>
                          <p className="text-sm text-[var(--medium-gray)]">
                            {appointment.treatment.replace("-", " ")} · {appointment.consultationType === "in-person" ? "In-person" : "Virtual"}
                          </p>
                          <p className="mt-2 flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />{appointment.date}
                            <Clock className="ml-2 h-4 w-4" />{appointment.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" asChild>
                            <Link
                              to={`/book/${appointment.providerId}?reschedule=${encodeURIComponent(appointment.id)}&date=${appointment.date}&time=${encodeURIComponent(appointment.time)}`}
                            >
                              Reschedule
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            disabled={!ready}
                            onClick={() => {
                              try {
                                cancel(appointment.id);
                                setAppointmentActionError(null);
                              } catch (cause) {
                                setAppointmentActionError(cause instanceof Error ? cause.message : "Could not cancel this demo appointment.");
                              }
                            }}
                          >
                            Cancel demo
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>

            {/* Illustrative Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2>Example Appointments</h2>
                <Button variant="ghost" asChild>
                  <Link to="/timeline">View All <ChevronRight className="ml-1 w-4 h-4" /></Link>
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <Card key={appointment.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/${appointment.image}?w=100&q=80`}
                        alt={appointment.dentist}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3>{appointment.type}</h3>
                          {index === 0 && (
                            <Badge className="bg-[var(--champagne-gold)]/10 text-[var(--champagne-gold)] border-[var(--champagne-gold)]/30">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Next Up
                            </Badge>
                          )}
                        </div>
                        <p className="text-[var(--medium-gray)] mb-3">{appointment.dentist}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2 text-[var(--medium-gray)]">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-2 text-[var(--medium-gray)]">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1" disabled title="Rescheduling is not connected in this preview.">
                            Reschedule
                          </Button>
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90" asChild>
                            <Link to="/timeline">View Timeline</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mb-4">Recent Activity</h2>
              <Card className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "appointment" ? "bg-[var(--premium-blue)]/10" :
                        activity.type === "payment" ? "bg-green-500/10" :
                        activity.type === "report" ? "bg-[var(--champagne-gold)]/10" :
                        "bg-purple-500/10"
                      }`}>
                        {activity.type === "appointment" && <Calendar className="w-5 h-5 text-[var(--premium-blue)]" />}
                        {activity.type === "payment" && <CreditCard className="w-5 h-5 text-green-600" />}
                        {activity.type === "report" && <FileText className="w-5 h-5 text-[var(--champagne-gold)]" />}
                        {activity.type === "message" && <Bell className="w-5 h-5 text-purple-600" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4>{activity.title}</h4>
                          <span className="text-xs text-[var(--medium-gray)]">{activity.time}</span>
                        </div>
                        <p className="text-sm text-[var(--medium-gray)]">{activity.description}</p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-[var(--medium-gray)]" />
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-auto py-4" asChild>
                  <Link to="/discover">
                    <Calendar className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Book Appointment</div>
                      <div className="text-xs text-[var(--medium-gray)]">Schedule your next visit</div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto py-4" asChild>
                  <Link to="/reports">
                    <FileText className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">View Reports</div>
                      <div className="text-xs text-[var(--medium-gray)]">Access medical records</div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto py-4" asChild>
                  <Link to="/payments">
                    <CreditCard className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Manage Payments</div>
                      <div className="text-xs text-[var(--medium-gray)]">View invoices & receipts</div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto py-4" asChild>
                  <Link to="/gallery">
                    <Sparkles className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">My Gallery</div>
                      <div className="text-xs text-[var(--medium-gray)]">Before & after photos</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Financial Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="mb-4">Financial Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--medium-gray)]">Paid to Date</span>
                      <span className="font-medium text-green-600">$4,800</span>
                    </div>
                    <Progress value={36} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[var(--medium-gray)]">Balance Due</span>
                      <span className="text-xl">$8,500</span>
                    </div>
                    <p className="text-xs text-[var(--medium-gray)]">3 sample installments remaining</p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--medium-gray)]">Next Payment</span>
                      <span className="font-medium">$2,850</span>
                    </div>
                    <p className="text-xs text-[var(--medium-gray)]">Due {demoDate(14)}</p>
                  </div>
                </div>

                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link to="/payments">View Details</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Your Dentist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="mb-4">Your Dentist</h3>
                
                <div className="flex items-start gap-3 mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80"
                    alt="Dr. Sarah Chen"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="mb-1">Dr. Sarah Chen</h4>
                    <p className="text-sm text-[var(--medium-gray)] mb-2">Cosmetic Dentistry</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[var(--champagne-gold)] text-[var(--champagne-gold)]" />
                      <span className="text-sm">4.9</span>
                      <span className="text-sm text-[var(--medium-gray)]">(342)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" disabled title="Secure provider messaging is not connected.">
                    Message
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link to="/dentist/1">View Profile</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Rewards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-[var(--champagne-gold)]/10 to-[var(--premium-blue)]/10 border-[var(--champagne-gold)]/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--champagne-gold)] to-[var(--premium-blue)] flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1">Rewards Balance</h4>
                    <div className="text-2xl">1,250 pts</div>
                  </div>
                </div>
                <p className="text-sm text-[var(--medium-gray)] mb-4">
                  Earn points with every visit and redeem for treatments!
                </p>
                <Button variant="outline" size="sm" className="w-full" disabled title="Rewards are not connected in this preview.">
                  Rewards unavailable
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
