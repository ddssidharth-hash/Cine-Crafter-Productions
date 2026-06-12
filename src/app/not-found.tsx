import Link from "next/link";

// Minimal, on-brand 404.
export default function NotFound() {
  return (
    <section className="frame flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-serif text-display-sm text-ink">
        This scene didn&rsquo;t make the final cut.
      </h1>
      <Link href="/" className="link-underline mt-8">
        Back to home <span className="ml-2">&rarr;</span>
      </Link>
    </section>
  );
}
