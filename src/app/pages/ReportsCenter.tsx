import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { FileText, Download, Eye, Share2, Calendar, Image, FileArchive } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { demoDate } from "../data/demoDates";

type Report = {
  id: number;
  name: string;
  date: string;
  doctor?: string;
  type: string;
  size?: string;
  pages?: number;
};

const reports: Record<"prescriptions" | "scans" | "xrays" | "plans", Report[]> = {
  prescriptions: [
    { id: 1, name: "Post-Procedure Medications", date: demoDate(-3), doctor: "Dr. Sarah Chen", type: "Prescription" },
    { id: 2, name: "Pain Management Plan", date: demoDate(-10), doctor: "Dr. Sarah Chen", type: "Prescription" },
  ],
  scans: [
    { id: 3, name: "Digital Smile Preview", date: demoDate(-10), type: "3D Scan", size: "12.4 MB" },
    { id: 4, name: "Intraoral Scan - Upper Arch", date: demoDate(-10), type: "3D Scan", size: "8.2 MB" },
    { id: 5, name: "Intraoral Scan - Lower Arch", date: demoDate(-10), type: "3D Scan", size: "7.9 MB" },
  ],
  xrays: [
    { id: 6, name: "Panoramic X-Ray", date: demoDate(-10), type: "X-Ray", size: "3.1 MB" },
    { id: 7, name: "Bitewing X-Rays (Right)", date: demoDate(-10), type: "X-Ray", size: "1.8 MB" },
    { id: 8, name: "Bitewing X-Rays (Left)", date: demoDate(-10), type: "X-Ray", size: "1.7 MB" },
  ],
  plans: [
    { id: 9, name: "Smile Design Treatment Plan", date: demoDate(-10), type: "Treatment Plan", pages: 8 },
    { id: 10, name: "Cost Breakdown & Timeline", date: demoDate(-10), type: "Financial Plan", pages: 3 },
    { id: 11, name: "Post-Treatment Care Guide", date: demoDate(-3), type: "Care Instructions", pages: 5 },
  ],
};

function ReportCard({ report, icon: Icon }: { report: Report; icon: LucideIcon }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--champagne-gold)]/10 to-[var(--premium-blue)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-[var(--champagne-gold)]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="mb-2">{report.name}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--medium-gray)] mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {report.date}
            </div>
            {report.doctor && <span>• {report.doctor}</span>}
            {report.size && <span>• {report.size}</span>}
            {report.pages && <span>• {report.pages} pages</span>}
          </div>

          <Badge variant="outline" className="mb-4 border-[var(--champagne-gold)]/30">
            {report.type}
          </Badge>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" disabled title="Document preview is not available for sample records.">
              <Eye className="w-4 h-4 mr-2" />
              Preview only
            </Button>
            <Button size="sm" variant="outline" className="flex-1" disabled title="Document downloads are not connected in this preview.">
              <Download className="w-4 h-4 mr-2" />
              Download unavailable
            </Button>
            <Button size="sm" variant="ghost" disabled title="Secure document sharing is not connected." aria-label={`Sharing unavailable for ${report.name}`}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ReportsCenter() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
            Medical Records
          </Badge>
          <h1 className="text-5xl mb-4">Reports Center</h1>
          <p className="text-xl text-[var(--medium-gray)] mb-8">
            Explore sample document layouts. This preview does not contain patient records.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--champagne-gold)]/10 flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-[var(--champagne-gold)]" />
            </div>
            <div className="font-medium mb-1">Sample documents</div>
            <div className="text-sm text-[var(--medium-gray)]">Downloads are not connected</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--premium-blue)]/10 flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-6 h-6 text-[var(--premium-blue)]" />
            </div>
            <div className="font-medium mb-1">Secure sharing</div>
            <div className="text-sm text-[var(--medium-gray)]">Not enabled in this preview</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
              <FileArchive className="w-6 h-6 text-green-600" />
            </div>
            <div className="font-medium mb-1">Archive</div>
            <div className="text-sm text-[var(--medium-gray)]">Organize files</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
              <Image className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-medium mb-1">Photo Gallery</div>
            <div className="text-sm text-[var(--medium-gray)]">Before & After</div>
          </Card>
        </motion.div>

        {/* Reports Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start bg-card border-b rounded-none h-auto p-0">
              <TabsTrigger value="all" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                All Documents
              </TabsTrigger>
              <TabsTrigger value="prescriptions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Prescriptions
              </TabsTrigger>
              <TabsTrigger value="scans" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Dental Scans
              </TabsTrigger>
              <TabsTrigger value="xrays" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                X-Rays
              </TabsTrigger>
              <TabsTrigger value="plans" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Treatment Plans
              </TabsTrigger>
            </TabsList>

            {/* All Documents */}
            <TabsContent value="all" className="mt-8">
              <div className="space-y-4">
                <h3 className="mb-4">Recent Documents</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[...reports.prescriptions.slice(0, 1), ...reports.scans.slice(0, 1), ...reports.xrays.slice(0, 1), ...reports.plans.slice(0, 1)].map((report) => (
                    <ReportCard key={report.id} report={report} icon={FileText} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Prescriptions */}
            <TabsContent value="prescriptions" className="mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                {reports.prescriptions.map((report) => (
                  <ReportCard key={report.id} report={report} icon={FileText} />
                ))}
              </div>
            </TabsContent>

            {/* Dental Scans */}
            <TabsContent value="scans" className="mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                {reports.scans.map((report) => (
                  <ReportCard key={report.id} report={report} icon={Image} />
                ))}
              </div>
            </TabsContent>

            {/* X-Rays */}
            <TabsContent value="xrays" className="mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                {reports.xrays.map((report) => (
                  <ReportCard key={report.id} report={report} icon={FileArchive} />
                ))}
              </div>
            </TabsContent>

            {/* Treatment Plans */}
            <TabsContent value="plans" className="mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                {reports.plans.map((report) => (
                  <ReportCard key={report.id} report={report} icon={FileText} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Storage Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="mb-1">Storage Usage</h3>
                <p className="text-[var(--medium-gray)]">Storage is not connected in this preview.</p>
              </div>
              <Badge variant="outline">Sample interface</Badge>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
