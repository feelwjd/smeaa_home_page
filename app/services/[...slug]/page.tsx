import { categories } from "@/data/categories";
import type { Category, Subcategory } from "@/data/categories";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryTabs from "@/components/CategoryTabs";
import SubcategoryChips from "@/components/SubcategoryChips";

type Props = { params: { slug: string[] } };

type FAQ = { q: string; a: string };
type Details = { overview?: string; requiredDocs?: string[]; faqs?: FAQ[] };
type SubWithDetails = Subcategory & { details?: Details };

function defaultsFor(category: Category) {
  const commonFaqs: FAQ[] = [
    {
      q: "처리 기간은 얼마나 걸리나요?",
      a: "업무 성격에 따라 2주~8주 내외입니다. 상담 시 대상과 관할기관 기준으로 예상 일정을 안내드립니다.",
    },
    {
      q: "서류가 일부 부족해도 진행할 수 있나요?",
      a: "사전 진단 후 보완 전략을 제시합니다. 대체 가능 서류나 보완 순서를 함께 설계합니다.",
    },
    {
      q: "수수료는 어떻게 산정되나요?",
      a: "업무 범위·난이도·긴급도에 따라 산정되며, 견적과 일정표를 함께 드립니다.",
    },
  ];

  const bySlug: Record<
    string,
    { requiredDocs: string[]; faqs: FAQ[]; overview: (t: string) => string }
  > = {
    "business-admin": {
      overview: (t) =>
        `${t} 서비스는 자격요건 검토부터 서류 준비, 접수·심사 대응까지 원스톱으로 지원합니다.`,
      requiredDocs: [
        "사업자등록증 사본",
        "법인등기부등본/정관(법인 해당)",
        "제품 규격서·카탈로그(해당 시)",
        "최근 3개년 재무제표 또는 매출자료(해당 시)",
        "신청서·위임장 및 내부 체크리스트",
      ],
      faqs: commonFaqs,
    },
    "public-procurement": {
      overview: (t) =>
        `${t} 진입을 위해 규격/성능·증빙 체계를 정비하고, 평가·심사 대응을 동행합니다.`,
      requiredDocs: [
        "사업자등록증 사본",
        "제품 카탈로그/규격서",
        "시험성적서·인증서(해당 시)",
        "납품실적 또는 유사실적(해당 시)",
        "신청서·위임장",
      ],
      faqs: commonFaqs,
    },
    "immigration-trade": {
      overview: (t) =>
        `${t} 절차 전반에 대해 자격요건 진단과 서류 준비, 일정·심사 대응을 지원합니다.`,
      requiredDocs: [
        "여권 사본 및 증명사진",
        "외국인등록증(해당 시)",
        "재직/고용계약서 또는 초청장(해당 시)",
        "학위·경력증빙(해당 시)",
        "범죄경력증명 또는 무범죄확인(해당 시)",
        "신청서·위임장",
      ],
      faqs: commonFaqs,
    },
    licensing: {
      overview: (t) =>
        `${t} 관련 법령 기준으로 사전요건과 시설 요건을 점검하고, 허가·신고를 대행합니다.`,
      requiredDocs: [
        "사업계획서·영업개요서",
        "임대차계약서 또는 부동산 등기부등본",
        "도면(배치도/평면도) 및 시설·장비 목록",
        "시설 현황 사진",
        "관할기관 요구 추가서류(해당 시)",
        "신청서·위임장",
      ],
      faqs: commonFaqs,
    },
    "other-admin": {
      overview: (t) =>
        `${t}은(는) 의뢰 범위를 명확히 정의하고, 관련 법률·행정 절차에 맞춰 단계별로 수행합니다.`,
      requiredDocs: [
        "의뢰서(업무 범위 정의)",
        "관련 계약·등기·토지 등 증빙서류",
        "필요 시 감정평가/측량 자료",
        "신청서·위임장",
      ],
      faqs: commonFaqs,
    },
  };

  return (
    bySlug[category.slug] ?? {
      overview: (t: string) => `${t} 관련 업무를 원스톱으로 지원합니다.`,
      requiredDocs: ["신청서·위임장", "기본사업자/신원 증빙", "업무별 추가서류"],
      faqs: commonFaqs,
    }
  );
}

export function generateStaticParams() {
  const base = categories.map((c) => ({ slug: [c.slug] }));
  const subs = categories.flatMap((c) =>
    (c.children ?? []).map((s) => ({ slug: [c.slug, s.slug] }))
  );
  return [...base, ...subs];
}

export default function ServicePage({ params }: Props) {
  const parts = params.slug ?? [];
  if (parts.length === 0 || parts.length > 2) return notFound();

  const category = categories.find((c) => c.slug === parts[0]);
  if (!category) return notFound();

  const sub = (category.children ?? []).find(
    (s) => s.slug === parts[1]
  ) as SubWithDetails | undefined;

  const dfl = defaultsFor(category);
  const details = {
    overview: sub?.details?.overview ?? dfl.overview(sub?.title ?? category.title),
    requiredDocs: sub?.details?.requiredDocs ?? dfl.requiredDocs,
    faqs: sub?.details?.faqs ?? dfl.faqs,
  };

  return (
    <article className="space-y-6 clamp-x">
      {/* 1) 상단 가로 탭 (카테고리 이동) */}
      <CategoryTabs />

      {/* 브레드크럼 + 제목 */}
      <nav className="text-sm text-gray-600 mt-4 flex flex-wrap gap-x-1 min-w-0 w-full max-w-full">
        <Link href="/services">서비스</Link> {" / "}
        <Link href={`/services/${category.slug}`}>{category.title}</Link>
        {sub && <> {" / "} <span className="text-gray-900">{sub.title}</span></>}
      </nav>

      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          {sub ? sub.title : category.title}
        </h1>
        {!sub && category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </header>

      {/* 2) 하위 카테고리 칩 (선택) */}
      <SubcategoryChips category={category} currentSub={sub?.slug} />

      {/* 3) 설명/세부 내용 */}
      {!sub ? (
        // 카테고리 수준 화면: 간략 소개 + 하위 카테고리 카드 목록
        <section className="space-y-4 min-w-0 w-full max-w-full">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">카테고리 소개</h2>
            <p className="text-gray-700 mt-1">{dfl.overview(category.title)}</p>
          </div>

          {category.children?.length ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0 w-full max-w-full">
              {category.children.map((s) => (
                <li key={s.slug} className="rounded-2xl bg-white p-5 shadow hover:shadow-md transition-shadow">
                  <Link className="font-medium" href={`/services/${category.slug}/${s.slug}`}>
                    {s.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-2">
                    {dfl.overview(s.title)}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : (
        // 하위 카테고리 상세 화면: 소개/필요서류/절차/FAQ
        <>
          <section className="rounded-2xl bg-white p-6 shadow space-y-3">
            <h2 className="text-lg font-semibold">서비스 소개</h2>
            <p className="text-gray-700">{details.overview}</p>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow space-y-3">
            <h2 className="text-lg font-semibold">필요 서류</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {details.requiredDocs.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              ※ 기관/사안에 따라 추가 서류가 요구될 수 있습니다.
            </p>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow space-y-3">
            <h2 className="text-lg font-semibold">진행 절차</h2>
            <ol className="list-decimal pl-5 text-gray-700 space-y-1">
              <li>무료 상담 및 대상 검토</li>
              <li>서류 체크리스트 제공/수집</li>
              <li>신청/심사 대응</li>
              <li>결과 통지 및 사후관리</li>
            </ol>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow space-y-3">
            <h2 className="text-lg font-semibold">FAQ</h2>
            <ul className="space-y-3">
              {details.faqs.map((f, i) => (
                <li key={i}>
                  <div className="font-medium">Q. {f.q}</div>
                  <div className="text-gray-700">A. {f.a}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow space-y-3">
            <h2 className="text-lg font-semibold">문의</h2>
            <p className="text-gray-700">
              아래 버튼으로 상담을 요청하세요. 영업일 기준 빠르게 연락드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-black text-white px-4 py-2"
            >
              무료 상담 요청
            </Link>
          </section>
        </>
      )}
    </article>
  );
}
