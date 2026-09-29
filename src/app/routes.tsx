import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/LandingPage")).LandingPage }) },
      { path: "discover", lazy: async () => ({ Component: (await import("./pages/DentistDiscovery")).DentistDiscovery }) },
      { path: "dentist/:id", lazy: async () => ({ Component: (await import("./pages/DentistProfile")).DentistProfile }) },
      { path: "treatments", lazy: async () => ({ Component: (await import("./pages/Treatments")).Treatments }) },
      { path: "book/:dentistId", lazy: async () => ({ Component: (await import("./pages/AppointmentBooking")).AppointmentBooking }) },
      { path: "timeline", lazy: async () => ({ Component: (await import("./pages/TreatmentTimeline")).TreatmentTimeline }) },
      { path: "gallery", lazy: async () => ({ Component: (await import("./pages/BeforeAfterGallery")).BeforeAfterGallery }) },
      { path: "reports", lazy: async () => ({ Component: (await import("./pages/ReportsCenter")).ReportsCenter }) },
      { path: "payments", lazy: async () => ({ Component: (await import("./pages/PaymentDashboard")).PaymentDashboard }) },
      { path: "dashboard", lazy: async () => ({ Component: (await import("./pages/PatientDashboard")).PatientDashboard }) },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).NotFound }) },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
