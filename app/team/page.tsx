// app/team/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

type Member = {
  name: string;
  role?: string;
  tagline?: string;
  tags?: string[];
  phone?: string;
  blogLabel?: string;
  blogHref?: string;
  photo?: string;        // /images/team/...
  careers?: string[];
  emphasis?: string;
  group?: "chief" | "co-chief" | "member"; // ← 명시하면 최우선 적용
};

// ── 뉴트럴 톤 & 고정 높이 토큰
const TOKENS = {
  cardBg: "bg-white",
  photoBg: "bg-stone-50",
  headerBg: "bg-stone-100",
  headerBorder: "border-stone-300",
  contentBorder: "border-stone-300",
  nameText: "text-neutral-900",
  headerText: "text-neutral-800",
  subText: "text-neutral-600",
  emphasisText: "text-neutral-700",
  btnBg: "bg-stone-300 hover:bg-neutral-800",
  btnText: "text-black hover:text-white",
  headerInfoMinH: "min-h-[96px]",
  careerMinH: "min-h-[200px]",
};

const PLACEHOLDER = "/images/team/placeholder.svg";

// === 데이터 예시 (원하는 만큼 추가) ===
const members: Member[] = [
  { name: "김 기 택", role: "대표 행정사(CEO)", tagline: "SME행정사무소 총괄", tags: ["기업인증","공공조달","인허가"], phone: "010-0000-0000", blogLabel: "김기택행정사 블로그", blogHref: "#", photo: "/images/team/profile-1.png", careers: ["-"], group: "chief" },
  { name: "안 일 선", role: "공동대표", tags: ["공공조달","출입국·이민비자"], phone: "010-0000-0000", blogLabel: "안일선행정사 블로그", blogHref: "#", photo: "/images/team/profile-2.png", careers: ["-"], group: "co-chief" },
  { name: "이 진 일", role: "행정사", tags: ["기업인증","공공조달","외국인번역(중국어) 행정사"], phone: "010-0000-0000", blogLabel: "이진일행정사 블로그", blogHref: "#", photo: "/images/team/profile-3.png", careers: ["-"] },
  { name: "모 영 주", role: "행정사", tags: ["유학생·이민, 출입국업무","외국인 한국투자","직업소개"], phone: "010-0000-0000", blogLabel: "모영주행정사 블로그", blogHref: "#", photo: "/images/team/profile-4.png", careers: ["∙ 연세대 경영학과 졸업","∙ 서울대/고려대 경영대학원","∙ 홍콩대학교 졸업","∙ 총무팀 23년","∙ 재무/법무, 1,2,3군 근무","∙ 중국/홍콩 대사관 근무","∙ 주중 한국투자 20년 경력","∙ 미얀마 사업 10년 경력"] },
  { name: "홍 재 필", role: "행정사", tags: ["기업인증","공공조달","의료기기","인허가 업무"], phone: "010-0000-0000", blogLabel: "홍재필행정사 블로그", blogHref: "#", photo: "/images/team/profile-8.png", careers: ["-"] },
  { name: "유 하 진", role: "행정사", tags: ["기업인증","의료기기 RA 2급","외국어번역(영어) 행정사"], phone: "010-0000-0000", blogLabel: "유하진행정사 블로그", blogHref: "#", photo: "/images/team/profile-6.png", careers: ["-"] },
  { name: "정 창 기", role: "행정사", tags: ["기업인증","공공조달","법인설립","인허가 업무"], phone: "010-0000-0000", blogLabel: "정창기행정사 블로그", blogHref: "#", photo: "/images/team/profile-5.png", careers: ["-"] },
  { name: "조 휘 철", role: "행정사", tags: ["기업인증","각종인허가","법인설립","공인중개사"], phone: "010-0000-0000", blogLabel: "조휘철행정사 블로그", blogHref: "#", photo: "/images/team/profile-7.png", careers: ["-"] },
  { name: "민 병 익", role: "행정사무", tags: ["SME행정사 사무업무","제안서 작성 업무 보조"], phone: "010-2869-7417", blogLabel: "민병익행정사무 블로그", blogHref: "https://blog.naver.com/ibm6711", photo: "/images/team/profile-9.png", careers: ["-"] },
];

// 404 방지: 존재 확인 후만 로드
function SafePhoto({ src, alt }: { src?: string; alt: string }) {
  const [finalSrc, setFinalSrc] = useState<string>(PLACEHOLDER);
  useEffect(() => {
    let canceled = false;
    async function check() {
      if (!src) return;
      try {
        const res = await fetch(`/api/img-exists?p=${encodeURIComponent(src)}`, { cache: "no-store" });
        const data = await res.json();
        if (!canceled && data?.ok && data.exists) setFinalSrc(src);
        else if (!canceled) setFinalSrc(PLACEHOLDER);
      } catch {
        if (!canceled) setFinalSrc(PLACEHOLDER);
      }
    }
    check();
    return () => { canceled = true; };
  }, [src]);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={finalSrc} alt={alt} className="mx-auto h-56 w-auto object-contain rounded-md" />;
}

function TeamCard(m: Member) {
  return (
    <li className={`flex flex-col h-full border ${TOKENS.contentBorder} rounded-2xl overflow-hidden ${TOKENS.cardBg} shadow-sm`}>
      <div className={`${TOKENS.photoBg} p-3`}>
        <SafePhoto src={m.photo} alt={m.name} />
      </div>

      <div className={`${TOKENS.headerBg} text-center px-3 py-2 border-y-4 ${TOKENS.headerBorder}`}>
        <div className={`text-lg font-extrabold tracking-widest ${TOKENS.nameText}`}>{m.name}</div>
        <div className={`flex flex-col items-center justify-center gap-1 ${TOKENS.headerInfoMinH}`}>
          {m.role && <div className={`text-sm font-semibold ${TOKENS.headerText}`}>{m.role}</div>}
          {m.tagline && <div className={`text-[13px] ${TOKENS.subText}`}>{m.tagline}</div>}
          {m.emphasis && <div className={`text-[13px] ${TOKENS.emphasisText} font-semibold`}>{m.emphasis}</div>}
          {m.tags?.length ? <div className={`text-[13px] ${TOKENS.subText}`}>{m.tags.join(" / ")}</div> : null}
        </div>
      </div>

      <div className="p-3">
        <div className={`border-2 ${TOKENS.contentBorder} rounded-md p-0.5`}>
          <div className={`bg-white rounded-sm p-3 ${TOKENS.careerMinH}`}>
            <div className="font-semibold text-neutral-800">경력사항</div>
            <ul className="mt-1 text-sm leading-6 text-neutral-700">
              {m.careers?.length ? m.careers.map((c, i) => <li key={i}>{c}</li>) : <li>-</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3 mt-auto space-y-2">
        {m.phone && (
          <div className="text-center">
            <span className={`inline-block w-full rounded-md ${TOKENS.btnBg} ${TOKENS.btnText} py-2 text-sm font-semibold shadow-sm`}>
              {m.phone}
            </span>
          </div>
        )}
        {m.blogHref && (
          <div className="text-center">
            <a href={m.blogHref} className={`inline-block w-full rounded-md ${TOKENS.btnBg} ${TOKENS.btnText} py-2 text-sm font-semibold shadow-sm`}>
              {m.blogLabel || "블로그 바로가기"}
            </a>
          </div>
        )}
      </div>
    </li>
  );
}

export default function Team() {
  const inferGroup = (m: Member): Member["group"] => {
    if (m.group) return m.group;
    const r = (m.role || "").replace(/\s/g, "");
    if (/(공동대표)/.test(r)) return "co-chief";
    if (/(대표행정사|대표|CEO|CeO)/i.test(r) && !/(공동)/.test(r)) return "chief";
    return "member";
  };

  const { chief, coChief, rest } = useMemo(() => {
    const arr = members.map(m => ({ ...m, group: inferGroup(m) }));
    const chief = arr.find(m => m.group === "chief");
    const coChief = arr.find(m => m.group === "co-chief");
    const rest = arr.filter(m => m !== chief && m !== coChief);
    return { chief, coChief, rest };
  }, []);

  return (
    <div className="space-y-10">
      {/* 상단: 대표 + 공동대표를 나란히 (모바일 1열, 데스크톱 2열) */}
      {(chief || coChief) && (
        <section className="space-y-6">
          <h1 className="text-2xl font-bold">대표 / 공동대표</h1>
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {chief && <TeamCard {...chief} />}
            {coChief && <TeamCard {...coChief} />}
          </ul>
        </section>
      )}

      {/* 나머지 구성원: 최대 4열 */}
      {rest.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold">구성원</h2>
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rest.map((m, i) => <TeamCard key={`${m.name}-rest-${i}`} {...m} />)}
          </ul>
        </section>
      )}
    </div>
  );
}
