export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">FAQ</h2>
      <div className="space-y-4">
        {items.map((it, i) => (
          <details key={i} className="border rounded-lg p-3">
            <summary className="cursor-pointer font-medium">{it.q}</summary>
            <div className="mt-2 text-gray-700">{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
