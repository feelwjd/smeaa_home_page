import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryTabs from "@/components/CategoryTabs";
import LeftSubnav from "@/components/LeftSubnav";
import SectionRenderer from "@/components/SectionRenderer";
import { categories } from "@/data/categories";
import { serviceContents } from "@/data/servicesContent";

type Props = { params: { slug: string[] } };

export default function Page({ params }: Props) {
  const [categorySlug, rawSub] = params.slug ?? [];
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return notFound();

  const subs = category.children ?? [];
  if (!subs.length) return notFound();

  // ✅ "전체" 제거: /services/:category 로 진입하면 첫 번째 서브를 기본 노출
  const subSlug = rawSub ?? subs[0].slug;

  // 데이터(섹션) 연결
  const contentCategory = (serviceContents as any[]).find(c => c.categorySlug === category.slug);
  const subContent = contentCategory?.subs?.find((s: any) => s.subSlug === subSlug);

  // 좌측 네비용 현재 서브 존재 확인
  const subMeta = subs.find(s => s.slug === subSlug);
  if (!subMeta) return notFound();

  return (
    <div className="space-y-6">
      <CategoryTabs />
      <div className="mx-auto max-w-6xl px-1 lg:flex lg:gap-8">
        <LeftSubnav category={category} currentSub={subSlug} />
        <article className="flex-1">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">{subMeta.title}</h1>
          </header>

          {subContent?.sections?.length ? (
            subContent.sections.map((sec: any, i: number) => <SectionRenderer key={i} section={sec} />)
          ) : (
            <p className="text-gray-600">해당 서브에 대한 콘텐츠가 준비 중입니다.</p>
          )}

          <section className="mt-12 p-5 rounded-2xl border bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h2 className="text-lg font-semibold">도움이 필요하신가요?</h2>
            <p className="mt-2 text-gray-600">아래 버튼으로 상담을 요청하세요. 영업일 기준 빠르게 연락드립니다.</p>
            <Link href="/contact" className="inline-block rounded-xl bg-black text-white px-4 py-2 mt-3">무료 상담 요청</Link>
          </section>
        </article>
      </div>
    </div>
  );
}
