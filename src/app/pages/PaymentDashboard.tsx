import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Download, Calendar, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";

const invoices = [
  {
    id: "INV-2026-003",
    date: "March 22, 2026",
    description: "Smile Design - Preparation Phase",
    amount: 2850,
    status: "paid",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-2026-002",
    date: "March 15, 2026",
    description: "Initial Consultation & Digital Scan",
    amount: 450,
    status: "paid",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-2026-001",
    date: "April 12, 2026",
    description: "Final Placement - Balance Due",
    amount: 5200,
    status: "upcoming",
    method: "Auto-pay enabled",
  },
];

const installments = [
  { month: "March 2026", amount: 2850, status: "paid", date: "March 22, 2026" },
  { month: "April 2026", amount: 2850, status: "upcoming", date: "April 12, 2026" },
  { month: "May 2026", amount: 2800, status: "scheduled", date: "May 12, 2026" },
];

const paymentHistory = [
  { id: 1, date: "March 22, 2026", description: "Treatment Payment", amount: 2850, status: "completed" },
  { id: 2, date: "March 15, 2026", description: "Consultation Fee", amount: 450, status: "completed" },
  { id: 3, date: "February 28, 2026", description: "Deposit Payment", amount: 1500, status: "completed" },
];

export function PaymentDashboard() {
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const totalDue = installments.filter(i => i.status !== "paid").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="mb-4 bg-[var(--soft-beige)] text-[var(--dark-text)] border-0">
            Financial Dashboard
          </Badge>
          <h1 className="text-5xl mb-4">Payment Center</h1>
          <p className="text-xl text-[var(--medium-gray)] mb-8">
            Manage invoices, installments, and payment methods
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="p-6">
            <div className="text-sm text-[var(--medium-gray)] mb-2">Total Paid</div>
            <div className="text-3xl text-green-600 mb-1">${totalPaid.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              All caught up
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-[var(--medium-gray)] mb-2">Balance Due</div>
            <div className="text-3xl text-[var(--champagne-gold)] mb-1">${totalDue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-[var(--medium-gray)]">
              <Clock className="w-3 h-3 mr-1" />
              2 payments remaining
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-[var(--medium-gray)] mb-2">Next Payment</div>
            <div className="text-3xl text-[var(--dark-text)] mb-1">$2,850</div>
            <div className="flex items-center text-xs text-[var(--medium-gray)]">
              <Calendar className="w-3 h-3 mr-1" />
              April 12, 2026
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-[var(--medium-gray)] mb-2">Treatment Total</div>
            <div className="text-3xl text-[var(--dark-text)] mb-1">$13,300</div>
            <div className="flex items-center text-xs text-[var(--medium-gray)]">
              <CreditCard className="w-3 h-3 mr-1" />
              Auto-pay enabled
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="invoices" className="w-full">
            <TabsList className="w-full justify-start bg-card border-b rounded-none h-auto p-0">
              <TabsTrigger value="invoices" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Invoices
              </TabsTrigger>
              <TabsTrigger value="installments" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Installment Plan
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Payment History
              </TabsTrigger>
              <TabsTrigger value="receipts" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[var(--champagne-gold)]">
                Receipts
              </TabsTrigger>
            </TabsList>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="mt-8">
              <div className="space-y-4">
                {invoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{invoice.id}</h3>
                            {invoice.status === "paid" ? (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Paid
                              </Badge>
                            ) : (
                              <Badge className="bg-[var(--champagne-gold)]/10 text-[var(--champagne-gold)] border-[var(--champagne-gold)]/30">
                                <Clock className="w-3 h-3 mr-1" />
                                Upcoming
                              </Badge>
                            )}
                          </div>
                          <p className="text-[var(--medium-gray)] mb-4">{invoice.description}</p>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-[var(--medium-gray)] mb-1">Date</div>
                              <div className="font-medium">{invoice.date}</div>
                            </div>
                            <div>
                              <div className="text-[var(--medium-gray)] mb-1">Amount</div>
                              <div className="font-medium">${invoice.amount.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-[var(--medium-gray)] mb-1">Payment Method</div>
                              <div className="font-medium">{invoice.method}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-6">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          {invoice.status === "upcoming" && (
                            <Button size="sm" className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Installments Tab */}
            <TabsContent value="installments" className="mt-8">
              <Card className="p-8 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="mb-2">Your Payment Plan</h3>
                    <p className="text-[var(--medium-gray)]">3 monthly installments of approximately $2,850</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Modify Plan
                  </Button>
                </div>

                <div className="space-y-4">
                  {installments.map((installment, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        installment.status === "paid"
                          ? "border-green-500/30 bg-green-500/5"
                          : installment.status === "upcoming"
                          ? "border-[var(--champagne-gold)] bg-[var(--champagne-gold)]/5"
                          : "border-border bg-[var(--soft-beige)]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4>{installment.month}</h4>
                            {installment.status === "paid" ? (
                              <Badge className="bg-green-500 text-white border-0">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Paid
                              </Badge>
                            ) : installment.status === "upcoming" ? (
                              <Badge className="bg-[var(--champagne-gold)] text-white border-0">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Due Soon
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Scheduled
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-[var(--medium-gray)]">Due: {installment.date}</div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl mb-1">${installment.amount.toLocaleString()}</div>
                          {installment.status === "upcoming" && (
                            <Button size="sm" className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-[var(--soft-beige)]/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--premium-blue)]/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-[var(--premium-blue)]" />
                  </div>
                  <div>
                    <h4 className="mb-2">Auto-Pay Enabled</h4>
                    <p className="text-sm text-[var(--medium-gray)]">
                      Your payments will be automatically charged to Visa •••• 4242 on the due date.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-8">
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="mb-1">{payment.description}</h4>
                            <div className="text-sm text-[var(--medium-gray)]">{payment.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-2xl">${payment.amount.toLocaleString()}</div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline">Load More History</Button>
              </div>
            </TabsContent>

            {/* Receipts Tab */}
            <TabsContent value="receipts" className="mt-8">
              <Card className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--soft-beige)] flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-[var(--champagne-gold)]" />
                </div>
                <h3 className="mb-2">Download All Receipts</h3>
                <p className="text-[var(--medium-gray)] mb-6">Get a complete record of all your payments</p>
                <Button className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  Download ZIP Archive
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
