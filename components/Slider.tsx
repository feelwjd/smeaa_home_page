"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  /** 선택: 크롭 포커스 (예: "center", "top", "bottom", "left", "right", "50% 40%") */
  objectPosition?: string;
  /** ✅ 추가: 슬라이드별 헤드라인/서브라인(없으면 props fallback) */
  headline?: string;
  subline?: string;
};

type Props = {
  /** 기존 방식: 경로만 전달 */
  images?: string[];
  /** 선택: 이미지별 크롭 포커스/텍스트를 주고 싶을 때 사용 */
  slides?: Slide[];
  /** 자동 전환 간격(ms) */
  autoMs?: number;
  /** 슬라이더 높이(디자인 유지). 필요 시 값만 조절 */
  heightClass?: string;
  /** 이미지가 박스를 채우는 방식: cover(권장) | contain | fill */
  fit?: "cover" | "contain" | "fill";
  /** 크롭 포커스 위치 (예: 'center', '50% 40%', 'right top') */
  objectPosition?: string;
  /** 오버레이/텍스트 옵션 */
  withOverlayText?: boolean;
  /** ✅ fallback: 슬라이드별 텍스트가 없을 때 사용 */
  headline?: string;
  subline?: string;
};

export default function Slider({
  images,
  slides,
  autoMs = 6000,
  heightClass = "h-[420px] md:h-[560px] lg:h-[680px]",
  fit = "cover",
  objectPosition,
  withOverlayText,
  headline,
  subline,
}: Props) {
  // 데이터: slides 우선, 없으면 images 사용
  const data: Slide[] =
    (slides && slides.length ? slides : (images ?? []).map((src) => ({ src })));

  const [idx, setIdx] = useState(0);
  if (data.length === 0) return null;

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + data.length) % data.length),
    [data.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % data.length),
    [data.length]
  );

  useEffect(() => {
    const timer = setInterval(() => next(), autoMs);
    return () => clearInterval(timer);
  }, [autoMs, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-black ${heightClass}`}>
      {/* 슬라이드 트랙 */}
      <div
        className="absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {data.map((s, i) => {
          // ✅ 슬라이드별 텍스트(없으면 props fallback)
          const curHeadline = s.headline ?? headline;
          const curSubline = s.subline ?? subline;

          return (
            <div key={i} className="relative shrink-0 basis-full h-full">
              <Image
                src={s.src}
                alt={`slide-${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                priority={i === 0}
                className={
                  (fit === "contain" ? "object-contain" :
                    fit === "fill" ? "object-fill" : "object-cover")
                }
                style={{ objectPosition: s.objectPosition ?? objectPosition ?? "center" }}
              />

              {/* 오버레이/텍스트 (옵션) */}
              {withOverlayText && i === idx && (curHeadline || curSubline) && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              )}
              {withOverlayText && i === idx && (
                <div className="absolute right-0 bottom-0 w-full z-10">
                  {/* 오른쪽 화살표 버튼과 겹치지 않도록 padding-right 확보 */}
                  <div className="pl-4 sm:pl-6 md:pl-8 pr-16 sm:pr-20 md:pr-24 pb-4 sm:pb-6 md:pb-8">
                    <div className="ml-auto text-right max-w-2xl sm:max-w-3xl md:max-w-4xl">
                      {curHeadline && (
                        <h1
                          className="whitespace-pre-line break-keep text-white text-xl sm:text-2xl md:text-4xl font-extrabold drop-shadow leading-snug"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {curHeadline}
                        </h1>
                      )}
                      {curSubline && (
                        <p className="mt-2 sm:mt-3 text-white/90 text-xs sm:text-sm md:text-base drop-shadow">
                          {curSubline}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 이전/다음 버튼 */}
      <button
        aria-label="previous"
        onClick={prev}
        className="absolute z-20 left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2 shadow"
      >
        ‹
      </button>
      <button
        aria-label="next"
        onClick={next}
        className="absolute z-20 right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2 shadow"
      >
        ›
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {data.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
