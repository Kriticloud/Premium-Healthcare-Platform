import { Link } from "react-router";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--champagne-gold)]">404 · Page not found</p>
      <h1 className="mb-4 text-4xl">This page isn’t here.</h1>
      <p className="mb-8 text-[var(--medium-gray)]">The link may be out of date, or the page may have moved.</p>
      <Button asChild><Link to="/">Return home</Link></Button>
    </section>
  );
}
