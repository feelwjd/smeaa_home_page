export default function Text({ title, html, markdown }: { title?: string; html?: string; markdown?: string }) {
  return (
    <section className="prose max-w-none mb-8">
      {title && <h2>{title}</h2>}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      {markdown && <pre>{markdown}</pre>}
    </section>
  );
}
