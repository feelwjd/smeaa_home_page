import Link from "next/link";
import { categories } from "@/data/categories";
export default function Services() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">서비스</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {categories.map(c => (
          <Link key={c.slug} href={`/services/${c.slug}`} className="rounded-2xl bg-white p-5 shadow hover:shadow-md transition">
            <div className="text-base font-semibold">{c.title}</div>
            {c.children && <div className="mt-2 text-sm text-gray-600">{c.children.slice(0,4).map(x=>x.title).join(" · ")}…</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
