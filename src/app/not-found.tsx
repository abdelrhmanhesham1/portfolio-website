import Link from "next/link";

export default function NotFound() {
  return (
    <main className="dotted-grid flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-sm text-cyan-400">404</p>
      <h1 className="font-display text-4xl font-bold">This page doesn&apos;t exist.</h1>
      <p className="max-w-md text-muted">
        The link you followed may be outdated. Everything worth seeing is one click away.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-grad-cta rounded-full px-5 py-2.5 text-sm font-semibold text-navy-950"
        >
          Home
        </Link>
        <Link
          href="/#work"
          className="rounded-full border border-navy-800 px-5 py-2.5 text-sm text-foreground transition-colors hover:border-cyan-400"
        >
          View my work
        </Link>
      </div>
    </main>
  );
}
