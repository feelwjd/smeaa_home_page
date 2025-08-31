"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";

type Props = {
  srcMp4: string;
  srcWebm?: string;
  poster?: string;
  /** 배경 어둡게(가독성 향상) */
  darken?: boolean;
  /** 로딩 스플래시 최대 표시 시간(ms) - 네트워크 이슈 대비 */
  maxWaitMs?: number;
  /** 페이드아웃 시간(ms) — PageTransition 과 톤을 맞춤 */
  fadeMs?: number;
};

export default function BackgroundVideo({
  srcMp4,
  srcWebm,
  poster,
  darken = true,
  maxWaitMs = 6000,
  fadeMs = 200, // PageTransition의 exit(0.20s)과 동일
}: Props) {
  const [ready, setReady] = useState(false);
  const [hideSplash, setHideSplash] = useState(false); // 애니메이션 끝난 뒤 완전 제거

  // 비디오 준비 or 타임아웃 → ready
  useEffect(() => {
    const t = setTimeout(() => setReady(true), maxWaitMs);
    return () => clearTimeout(t);
  }, [maxWaitMs]);

  return (
    <>
      {/* 배경 비디오 (페이지 뒤로 고정) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster={poster}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={srcMp4} type="video/mp4" />
        </video>

        {darken && (
          <div className="pointer-events-none absolute inset-0 bg-black/20 sm:bg-black/30" />
        )}
      </div>

      {/* 로딩 스플래시: 준비되면 같은 톤으로 페이드아웃 */}
      {!hideSplash && (
        <m.div
          className="fixed inset-0 z-50 grid place-items-center bg-white"
          aria-busy={!ready}
          aria-live="polite"
          initial={{ opacity: 1 }}
          animate={
            ready
              ? { opacity: 0, transition: { duration: fadeMs / 1000, ease: "easeOut" } }
              : { opacity: 1 }
          }
          onAnimationComplete={() => {
            if (ready) setHideSplash(true);
          }}
        >
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
            <p className="mt-4 text-sm text-gray-600">홈페이지 불러오는 중...</p>
          </div>
        </m.div>
      )}
    </>
  );
}
