"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

export default function CategoryTabs() {
  const pathname = usePathname();
  const current = pathname.split("/")[2] ?? categories[0]?.slug;

  return (
   <div className="w-full max-w-full min-w-0 overflow-x-hidden bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-2xl border shadow-sm">
     <nav className="h-scroll clamp-x">
        {categories.map((c) => {
          const active = c.slug === current;
          return (
            <Link
              key={c.slug}
              href={`/services/${c.slug}`}
              className={[
               "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              ].join(" ")}
            >
              {c.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
