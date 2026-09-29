import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Sparkles, User, Calendar, FileText, CreditCard, LayoutDashboard, Menu, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function RootLayout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-white p-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      {/* Premium Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl"
        aria-label="Primary"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--champagne-gold)] to-[var(--premium-blue)] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl tracking-tight">
                Smile<span className="text-[var(--champagne-gold)]">OS</span>
              </span>
            </Link>

            {/* Center Navigation */}
            {!isLanding && (
              <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full p-1">
                <NavLink to="/discover" icon={User}>Discover</NavLink>
                <NavLink to="/treatments" icon={Sparkles}>Treatments</NavLink>
                <NavLink to="/gallery" icon={FileText}>Gallery</NavLink>
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              </div>
            )}

            {!isLanding && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}

            {/* Right Actions */}
            <div className={`${isLanding ? "flex" : "hidden md:flex"} items-center gap-3`}>
              {isLanding ? (
                <>
                  <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                    <Link to="/dashboard">Patient demo</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-[var(--champagne-gold)] to-[var(--premium-blue)] text-white hover:opacity-90">
                    <Link to="/discover">Get Started</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="icon" aria-label="Reports" asChild>
                    <Link to="/reports"><FileText className="w-5 h-5" /></Link>
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Payments" asChild>
                    <Link to="/payments"><CreditCard className="w-5 h-5" /></Link>
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Treatment timeline" asChild>
                    <Link to="/timeline"><Calendar className="w-5 h-5" /></Link>
                  </Button>
                  <Button size="icon" aria-label="Patient dashboard" className="rounded-full bg-gradient-to-br from-[var(--champagne-gold)] to-[var(--premium-blue)]" asChild>
                    <Link to="/dashboard"><User className="w-5 h-5 text-white" /></Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          {!isLanding && (
            <div
              id="mobile-navigation"
              className={`${mobileMenuOpen ? "grid" : "hidden"} absolute left-0 right-0 top-20 gap-1 border-b border-border bg-card p-4 shadow-lg md:hidden`}
              role="group"
              aria-label="Mobile navigation links"
            >
              {[
                ["Discover", "/discover"],
                ["Treatments", "/treatments"],
                ["Gallery", "/gallery"],
                ["Dashboard", "/dashboard"],
                ["Timeline", "/timeline"],
                ["Reports", "/reports"],
                ["Payments", "/payments"],
              ].map(([label, path]) => (
                <Link
                  key={path}
                  to={path}
                  aria-current={location.pathname === path ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main id="main-content" className="pt-20" tabIndex={-1}>
        <aside className="border-b border-[var(--premium-blue)]/15 bg-[var(--premium-blue)]/5 px-6 py-3 text-center text-sm text-[var(--medium-gray)]" role="note">
          Product preview: providers, reviews, schedules, records, and payments are sample data. No clinic, booking, or payment service is connected.
        </aside>
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, icon: Icon, children }: { to: string; icon: LucideIcon; children: ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={`gap-2 rounded-full ${isActive ? "bg-white shadow-sm" : ""}`}
      asChild
    >
      <Link to={to} aria-current={isActive ? "page" : undefined}>
        <Icon className="w-4 h-4" />
        {children}
      </Link>
    </Button>
  );
}
