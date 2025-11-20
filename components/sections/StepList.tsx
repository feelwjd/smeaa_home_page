export default function StepList({ title, steps }: { title?: string; steps: string[] }) {
  return (
    <section className="mb-8">
      {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
      <ol className="list-decimal pl-5 space-y-1">
        {steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    </section>
  );
}
