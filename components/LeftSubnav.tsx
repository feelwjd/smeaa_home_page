'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { Category } from '@/data/categories';

export default function LeftSubnav({ category, currentSub }: { category: Category; currentSub: string; }) {
  const pathname = usePathname();
  const subs = category.children ?? [];
  return (
    <aside className="lg:w-64 lg:shrink-0 mb-6 lg:mb-0">
      <nav className="border rounded-2xl p-3 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <ul className="space-y-1">
          {subs.map((sub) => {
            const href = `/services/${category.slug}/${sub.slug}`;
            const active = pathname === href || currentSub === sub.slug;
            return (
              <li key={sub.slug}>
                <Link
                  href={href}
                  className={clsx(
                    'block rounded px-3 py-2 text-sm',
                    active ? 'bg-black text-white' : 'hover:bg-gray-100'
                  )}
                >
                  {sub.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
