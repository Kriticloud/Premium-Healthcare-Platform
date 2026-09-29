import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { Button } from "./ui/button";

export function RouteErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center" role="alert">
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--champagne-gold)]">
        {isNotFound ? "Page not found" : "Something went wrong"}
      </p>
      <h1 className="mb-4 text-4xl">
        {isNotFound ? "We couldn’t find that page." : "This page could not be loaded."}
      </h1>
      <p className="mb-8 text-[var(--medium-gray)]">
        {isNotFound
          ? "The link may be out of date, or the page may have moved."
          : "Your information has not been submitted. Please try again or return to the home page."}
      </p>
      <Button asChild>
        <Link to="/">Return home</Link>
      </Button>
    </main>
  );
}
