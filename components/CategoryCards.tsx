import Link from "next/link";
import { categories } from "@/data/categories";
const imgFor = (slug: string) => {
  const map: Record<string, string> = {
    "business-admin": "/images/category-1.png",
    "public-procurement": "/images/category-2.png",
    "immigration-trade": "/images/category-3.png",
    "licensing": "/images/category-4.png",
    "other-admin": "/images/category-5.png",
  };
  return map[slug] || "/images/intro-1.jpg";
};
export default function CategoryCards() {
  const top = categories.slice(0, 5);
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white drop-shadow">주요 업무</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {top.map(c => (
          <Link key={c.slug} href={`/services/${c.slug}`} className="group rounded-2xl bg-white shadow overflow-hidden hover:shadow-md transition">
            <img src={imgFor(c.slug)} alt={c.title} className="w-full h-28 object-cover" />
            <div className="p-4">
              <div className="font-medium group-hover:underline">{c.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
