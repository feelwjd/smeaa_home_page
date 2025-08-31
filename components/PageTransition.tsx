"use client";

import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, AnimatePresence, m, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";

export const PAGE_FADE: Variants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.48, ease: "easeOut" } },
  exit:    { opacity: 0, transition: { duration: 0.40, ease: "easeOut" } },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 전환 안정화용: 콘텐츠 실제 높이 측정
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastH = useRef<number>(0);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(false);

  // 경로 바뀌면: 이전 높이로 잠깐 고정 + 전환 시작
  useLayoutEffect(() => {
    if (lastH.current) setHeight(lastH.current);
    setIsAnimating(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 실제 콘텐츠 높이 갱신
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => {
      const h = Math.max(1, Math.round(el.getBoundingClientRect().height));
      lastH.current = h;
      setHeight(h);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname]);

  const booted = useRef(false);
  const [showBoot, setShowBoot] = useState(!booted.current);

  return (
    // 전환 중에만 height 고정, 끝나면 자동 해제 → 긴 페이지에서 푸터가 자연스럽게 아래로 밀림
    <div className="grid min-w-0 w-full" style={{ minHeight: 1, height: isAnimating && height ? `${height}px` : undefined }}>
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={pathname}
            style={{ gridArea: "1 / 1", willChange: "opacity", backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
            variants={PAGE_FADE}
            initial="initial"
            animate="enter"
            exit="exit"
            onAnimationComplete={() => setIsAnimating(false)} // 전환 종료 → height 해제
          >
            <div ref={contentRef}>{children}</div>
          </m.div>
        </AnimatePresence>
        {/* 초기 1회 오버레이: 기존 exit과 동일한 트랜지션으로 페이드아웃 */}
        {showBoot && (
          <m.div
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
            initial={{ opacity: 1 }}
            animate="enter"
            exit="exit"
            onAnimationComplete={() => {
              booted.current = true;
              setShowBoot(false);
            }}
          />
        )}
      </LazyMotion>
    </div>
  );
}
