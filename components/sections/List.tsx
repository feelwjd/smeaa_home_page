export default function List({ title, items }: { title?: string; items: string[] }) {
  return (
    <section className="mb-8">
      {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
      <ul className="list-disc pl-5 space-y-1">
        {items.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </section>
  );
}
