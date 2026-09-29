import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { CheckCircle, Clock, Calendar, FileText, AlertCircle } from "lucide-react";
import { demoDate } from "../data/demoDates";
import { Link } from "react-router";

const timeline = [
  {
    id: 1,
    title: "Initial Consultation",
    date: demoDate(-42),
    status: "completed",
    description: "Comprehensive examination and treatment planning",
    notes: "Digital smile preview completed. Treatment plan approved.",
  },
  {
    id: 2,
    title: "Preparation Phase",
    date: demoDate(-28),
    status: "completed",
    description: "Tooth preparation and impressions taken",
    notes: "Temporary veneers placed. No sensitivity reported.",
  },
  {
    id: 3,
    title: "Mid-Treatment Check",
    date: demoDate(-1),
    status: "current",
    description: "Progress evaluation and adjustments",
    notes: "Healing progressing well. Ready for final placement.",
  },
  {
    id: 4,
    title: "Final Placement",
    date: demoDate(14),
    status: "upcoming",
    description: "Permanent restoration placement",
    notes: "Scheduled for final veneer bonding.",
  },
  {
    id: 5,
    title: "Follow-up Visit",
    date: demoDate(42),
    status: "upcoming",
    description: "Post-treatment evaluation",
    notes: "Final check and bite adjustment if needed.",
  },
];

export function TreatmentTimeline() {
  const completedSteps = timeline.filter(t => t.status === "completed").length;
  const progress = (completedSteps / timeline.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
            Treatment Journey
          </Badge>
          <h1 className="text-5xl mb-4">Your Treatment Timeline</h1>
          <p className="text-xl text-[var(--medium-gray)] mb-8">
            Track your smile transformation progress
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="mb-2">Overall Progress</h3>
                <p className="text-[var(--medium-gray)]">
                  {completedSteps} of {timeline.length} milestones completed
                </p>
              </div>
              <div className="text-3xl text-[var(--champagne-gold)]">{Math.round(progress)}%</div>
            </div>
            <Progress value={progress} className="h-3" />
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10 ${
                  item.status === "completed" 
                    ? "bg-green-500" 
                    : item.status === "current"
                    ? "bg-[var(--champagne-gold)] animate-pulse"
                    : "bg-[var(--light-gray)]"
                }`} />

                <div className="ml-20">
                  <Card className={`p-6 ${item.status === "current" ? "border-[var(--champagne-gold)] shadow-lg" : ""}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3>{item.title}</h3>
                          {item.status === "completed" && (
                            <Badge className="bg-green-500 text-white border-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {item.status === "current" && (
                            <Badge className="bg-[var(--champagne-gold)] text-white border-0">
                              <Clock className="w-3 h-3 mr-1" />
                              In Progress
                            </Badge>
                          )}
                          {item.status === "upcoming" && (
                            <Badge variant="outline" className="border-[var(--medium-gray)]">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                        <p className="text-[var(--medium-gray)]">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--medium-gray)]">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                    </div>

                    {item.notes && (
                      <div className="bg-[var(--soft-beige)]/50 rounded-lg p-4 flex items-start gap-3">
                        <FileText className="w-5 h-5 text-[var(--champagne-gold)] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium mb-1">Notes</div>
                          <div className="text-sm text-[var(--medium-gray)]">{item.notes}</div>
                        </div>
                      </div>
                    )}

                    {item.status === "current" && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <Button disabled title="Milestone details are not connected in this preview." className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                          Sample milestone
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="p-8 bg-gradient-to-br from-[var(--soft-beige)] to-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--champagne-gold)]/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[var(--champagne-gold)]" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Next Appointment</h3>
                <p className="text-[var(--medium-gray)] mb-4">
                  Sample schedule: final placement on {demoDate(14)} at 2:00 PM
                </p>
                <div className="flex gap-3">
                  <Button asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                    <Link to="/book/1">Preview Appointment</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/discover">Explore Providers</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
