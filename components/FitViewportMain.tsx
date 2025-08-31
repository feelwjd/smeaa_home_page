"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 헤더/푸터 실측 → main에 min-height 적용
 *  - 초기 진입, 라우트 변경, 윈도우 리사이즈마다 갱신
 *  - 콘텐츠가 짧으면 푸터가 화면 하단에 고정
 *  - 콘텐츠가 길면 자연스럽게 아래로 밀려나 겹치지 않음
 */
export default function FitViewportMain() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      const main = document.querySelector("main") as HTMLElement | null;
      if (!main) return;

      const hh = header?.getBoundingClientRect().height ?? 0;
      const fh = footer?.getBoundingClientRect().height ?? 0;

      // 화면 높이에서 헤더/푸터를 뺀 값을 main의 최소 높이로 강제
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const min = Math.max(0, Math.round(vh - hh - fh));
      main.style.minHeight = `${min}px`;
    };

    apply();
    window.addEventListener("resize", apply);
    // 모바일 브라우저 주소창 수축/확장 대응
    window.visualViewport?.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("resize", apply);
      window.visualViewport?.removeEventListener("resize", apply);
    };
  }, [pathname]); // 페이지 이동 시마다 다시 계산

  return null;
}
