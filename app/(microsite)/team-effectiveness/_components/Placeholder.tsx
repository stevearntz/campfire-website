/**
 * Temporary placeholder for micro-site routes built in later increments.
 * Renders inside the micro-site shell so nav/footer links resolve.
 */
export default function Placeholder({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#9D88ED" }}>
          {eyebrow}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#1C1334" }}>
          {title}
        </h1>
        <p className="mt-3 text-gray-500">Coming soon.</p>
      </div>
    </section>
  );
}
